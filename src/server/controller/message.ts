import { Message } from "../models/message";
import { Collections } from "../services/database";
import { InsertOneResult, ObjectId } from "mongodb";
import { buckServer } from "../..";



/**
 * create a new message
 * @param message message
 * @param senderId sender id
 * @returns insert acknowledgement
 */
export const createMessage = async (message: Message, senderId: string | ObjectId): Promise<InsertOneResult|Error> => {
    try {
        message["sender"] = senderId;
        message["timestamp"] = new Date();
        message["room"] = new ObjectId(message["room"]);
        const result = await Collections.Messages!.insertOne(message);
        if (result && result.acknowledged === true) {
            buckServer.in(message["room"].toString()).emit("message", message["sender"] as string, message["content"], message["room"].toString());
            return result;
        }
        else
            throw new Error("Failed to create message.");
    } catch (e) {
        console.error(e);
        return e as Error;
    }
}


/**
 *  get a list of messages for a chat room
 * @param roomId chat room id
 * @returns list of messages
 */
export const getMessages = async (roomId: string | ObjectId): Promise<Message[]|Error> => {
    try {
        const messages = await Collections.Messages!.find({ room: new ObjectId(roomId) }).toArray();
        if (messages)
            return messages;
        else
            throw new Error("Failed to get messages.");
    } catch (e) {
        console.error(e);
        return e as Error;
    }
}
