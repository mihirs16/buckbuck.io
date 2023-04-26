import { BSON } from "mongodb";


/**
 * interface for a chat message
 */
export interface Message extends BSON.Document {
    _id: BSON.ObjectId,
    sender: BSON.ObjectId | string,
    room: BSON.ObjectId,
    content: string,
    type: "text" | "file",
    replyTo: BSON.ObjectId,
    timestamp: Date;
}


/**
 * MongoDB schema for a chat message
 */
export const MessageSchema = {
    $jsonSchema: {
        bsonType: "object",
        required: ["sender", "room", "content", "type", "timestamp"],
        additionalProperties: false,
        properties: {
            _id: {
                bsonType: "objectId"
            },
            sender: {
                bsonType: "string"
            },
            message: {
                bsonType: "string"
            },
            room: {
                bsonType: "objectId"
            },
            content: {
                bsonType: "string"
            },
            type: {
                bsonType: "string",
                enum: ["text", "file"]
            },
            replyTo: {
                bsonType: "objectId"
            },
            timestamp: {
                bsonType: "date"
            }
        }
    }
}
