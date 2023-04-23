import { BuckSocket } from "../../types/socketio";
import { joinRoom, disconnect, sendMessage } from "../controller/socketio";

export const connection = function (socket: BuckSocket) {
    socket.on("join", joinRoom);
    socket.on("disconnect", disconnect);
    socket.on("message", sendMessage);
}