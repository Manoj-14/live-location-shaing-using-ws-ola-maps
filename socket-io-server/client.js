// import io from "socket.io-client";
const io = require("socket.io-client").io;
const SERVER = "http://localhost:5003";

let socket = null;

socket = io(SERVER);

socket.on("connect", () => {
    console.log("Successfully connected with socket io server");
    console.log(socket.id);
});

socket.on("sock", (data) => {
    console.log(data);
})