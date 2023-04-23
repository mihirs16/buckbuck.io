import { BuckSocket } from "../../types/socketio";

export const joinRoom = function (this: BuckSocket, room: string) {
    this.join(room);
    console.info(`User ${this.id} joined room ${room}`);
}

export const disconnect = function(this: BuckSocket, reason: string) {
    console.info(`User ${this.id} disconnected: ${reason}`);
}

export const sendMessage = function(this: BuckSocket, sender: string, message: string, room: string) {
    this.to(room).emit("message", sender, message, room);
    console.info(`User ${sender} sent message ${message} to room ${room}`);
}
