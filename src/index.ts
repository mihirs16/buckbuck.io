import dotenv from "dotenv";
dotenv.config();

import http from "http";
import express from "express";
import { Server } from "socket.io";
import { BuckServer } from "./types/socketio";
import { connection } from "./server/routes/socketio";
import roomRouter from "./server/routes/room";
import { connectDB } from "./server/services/database";

connectDB();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/room", roomRouter);

const httpServer = http.createServer(app);

export const buckServer: BuckServer = new Server(httpServer);
buckServer.on("connection", connection);
httpServer.listen(8080, () => console.log("Server started on port 8080"));
