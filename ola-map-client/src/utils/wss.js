// import io from "socket.io-client";
import { io } from "socket.io-client";
import { setCoords, setHostConnectionIdAndSocketId, setUserConnectionIdAndSocketId, store } from "../store/store";
const SERVER = "http://localhost:5003";

let socket = null;



export const connectWithSockerIOServer = () => {

    socket = io(SERVER);

    socket.on("connect", () => {
        console.log("Successfully connected with socket io server");
        console.log(socket.id);
    });

    // socket.on("connection-update", (data) => {
    //     localStorage.setItem("userConnectionId", data.connectionId);
    //     console.log(data);
    // })

    socket.on("connection-id", (data) => {
        if (data.isHost) {
            store.dispatch(setHostConnectionIdAndSocketId({ connectionId: data.connectionId, socketId: data.newUser.socketId }))
        } else {
            store.dispatch(setUserConnectionIdAndSocketId({ connectionId: data.connectionId, socketId: data.newUser.socketId }))
        }
        console.log(data);
    })
    socket.on("conn-signal", (data) => {
        store.dispatch(setCoords(data));
        console.log(data);
    })
}



export const sendLocationDataToServer = (longitide, latitude) => {
    console.log("Sending to server");
    console.log(socket.id);
    socket.emit("location-data", { longitide, latitude })
}

export const createNewConnection = (identity) => {
    // emit an event to server that need to create a room
    const data = {
        identity,
    };
    socket.emit("create-new-connection", data);
};

export const joinRoom = (identity, connectionId, isHost) => {
    // emit an event to server that need to join a room
    const data = {
        identity,
        connectionId,
        isHost
    };
    socket.emit("join-connection", data);
};

export const sendLocationInfo = (longitude, latitude) => {
    socket.emit("location-update", { longitude, latitude });
}

export const signalhost = (coords) => {
    const data = { connectedUserSocketId: store.getState().user.userSocketId, message: coords, connectionId: store.getState().user.userConnectionId }
    console.log(data);

    socket.emit("conn-signal", data);
}

export const reconnectAfterReferesh = (socketId, connectionId, isHost) => {
    // console.log("socket", socket.i);
    setTimeout(() => {
        socket.emit("reconnect-after-referesh", { socketId, connectionId, isHost });
    }, 2000)
}

