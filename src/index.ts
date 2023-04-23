import { Server } from "socket.io";
import { BuckServer } from "./types/socketio";
import { connection } from "./server/routes/socketio";

const server: BuckServer = new Server();
server.on("connection", connection);
server.listen(8080);