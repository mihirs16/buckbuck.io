import { BSON } from "mongodb";


/**
 * interface for a chat room
 */
export interface Room extends BSON.Document {
    _id: BSON.ObjectId;
    members: Array<BSON.ObjectId> | Array<string>;
    metadata: Object;
}


/**
 * MongoDB schema for a chat room
 */
export const RoomSchema = {
    $jsonSchema: {
        bsonType: "object",
        required: ["members"],
        additionalProperties: false,
        properties: {
            _id: {
                bsonType: "objectId"
            },
            members: {
                bsonType: "array",
                items: {
                    bsonType: "string",
                }
            },
            metadata: {
                bsonType: "object"
            }
        } 
    }
}

