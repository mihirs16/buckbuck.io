import { createServer } from "http";
import { Server } from "socket.io";
import express from "express";

const app = express();
const server = createServer(app);
const ioServer = new Server(server);

ioServer.on("connection", (socket) => {
    console.info("New client connected");
    socket.on("disconnect", () => console.log("Client disconnected"));
    socket.on("message", (message) => {
        console.log("Message received: ", message);
        socket.broadcast.emit("message", message);
    });
});

server.listen(3000, () => {
    console.info("Server started on port 3000");
});