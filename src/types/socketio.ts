import { DisconnectReason, Server, Socket } from "socket.io";
 
/**
 * the events that the server can emit to the client
 * @function message - a message from the server
 */
export interface ServerToClientEvents {
    message: (sender: string, message: string, room: string) => void;
}


/**
 * the events that the client can emit to the server
 * @function joinRoom - join a room
 * @function disconnect - disconnect from the server
 */
export interface ClientToServerEvents {
    join: (room: string, callback: any) => void;
    message: (sender: string, message: string, room: string) => void;
    disconnect: (reason: DisconnectReason) => void;
}


/**
 * the events that the server can emit to other servers
 * @function ping - ping the server
 */
export interface InterServerEvents {
    ping: () => void;
}


/**
 * the data that is attached to the socket
 * @property socketId - the id of the socket
 * @property room - the room the socket is in
 */
export interface SocketData {
    username: string;
}


/**
 * default socket type used by the server
 */
export type BuckServer = Server<ClientToServerEvents, ServerToClientEvents, InterServerEvents, SocketData>;


/**
 * default socket type used by the client
 */
export type BuckSocket = Socket<ClientToServerEvents, ServerToClientEvents, InterServerEvents, SocketData>;
