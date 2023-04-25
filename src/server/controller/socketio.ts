import { BuckSocket } from "../../types/socketio";
import { buckServer } from "../..";

export const joinRoom = async function (this: BuckSocket, room: string, callback: (success: false | object) => void) {
    try {
        await this.join(room);
        console.info(`User ${this.id} joined room ${room}`);
        const members = await buckServer.in(room).fetchSockets();
        const sendMembers = [];
        for (const member of members) {
            sendMembers.push(member.data.username);
        }
        callback({ members: sendMembers });
    } catch (err) {
        console.error(`User ${this.id} failed to join room ${room}: ${err}`);
        callback(false);
    }
}

export const disconnect = function (this: BuckSocket, reason: string) {
    console.info(`User ${this.id} disconnected: ${reason}`);
}

export const sendMessage = function (this: BuckSocket, sender: string, message: string, room: string) {
    this.to(room).emit("message", sender, message, room);
    console.info(`User ${sender} sent message ${message} to room ${room}`);
}
