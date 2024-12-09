const express = require("express");
const cors = require("cors");
const http = require("http");
const { v4: uuidv4 } = require("uuid");
const app = express();

const server = http.createServer(app);
const PORT = 5003;

app.use(cors());


const io = require("socket.io")(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"],
    },
});

var connectedUser = [];
var connections = [];
io.on("connection", (socket) => {
    console.log("user connected", socket.id);
    // socket.on("location-data", (data) => {
    //     console.log("getting data");

    //     console.log(data);
    // })
    socket.on("create-new-connection", (data) => {
        createLocationConnection(data, socket);
    });
    socket.on("join-connection", (data) => {
        joinConnection(data, socket);
    });
    socket.on("conn-signal", (data) => {
        signalingHandler(data, socket);
    })
    socket.on("disconnect", () => {
        console.log(socket.id);
    })
    socket.on("reconnect-after-referesh", (data) => {
        reconnectAfterReferesh(data, socket);
    })
})

const createLocationConnection = (data, socket) => {
    const { identity } = data;
    const connectionId = uuidv4();
    const newUser = {
        identity,
        id: uuidv4(),
        connectionId,
        socketId: socket.id
    }

    connectedUser = [newUser, ...connectedUser];

    const newConnection = {
        id: connectionId,
        connectedUser: [newUser]
    }
    socket.join(connectionId);
    connections = [newConnection, ...connections];
    io.to(socket.id).emit("connection-id", { connectionId, isHost: true, newUser });
}

const joinConnection = (data, socket) => {
    const { identity, connectionId, isHost } = data;
    const newUser = {
        identity,
        id: uuidv4(),
        connectionId,
        socketId: socket.id
    }

    const connection = connections.find(connection => connection.id = connectionId);
    connection.connectedUser = [newUser, ...connection.connectedUser]

    socket.join(connectionId);
    connectedUser = [...connectedUser, newUser];
    io.to(socket.id).emit("connection-id", { connectionId, isHost, newUser, connectedUsers: connection.connectedUser });
}

const signalingHandler = (data, socket) => {
    const { connectedUserSocketId, message, connectionId } = data;
    const connection = connections.find(connection => connection.id == connectionId);
    console.log(connection.connectedUser);
    const user = connection.connectedUser.find(user => user.socketId != connectedUserSocketId);
    console.log(user);
    socket.to(user.socketId).emit("conn-signal", message);
};

const reconnectAfterReferesh = (data, socket) => {
    const { socketId, connectionId, isHost } = data;
    const connection = connections.find(connection => connection.id == connectionId);
    const updatedConnectedUser = connection.connectedUser.filter((user) => user.socketId != socketId);
    console.log(updatedConnectedUser);
    connection.connectedUser = [...updatedConnectedUser];
    console.log(connection);
    joinConnection({ identity: "Manoj", connectionId, isHost }, socket);
}


server.listen(PORT, () => {
    console.log("Server is listening on", PORT);
});
