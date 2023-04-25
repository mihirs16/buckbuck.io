import { Collection, MongoClient } from "mongodb";
import { Message, MessageSchema } from "../models/message";
import { Room, RoomSchema } from "../models/room";

export const Collections: {
    Rooms?: Collection<Room>,
    Messages?: Collection<Message>,
} = {};

export const connectDB = async () => {
    const DBURL = `mongodb+srv://${process.env.MDB_UNAME}:${process.env.MDB_PASSW}@buckbuckhome.6c0c39h.mongodb.net/?retryWrites=true&w=majority`;
    const client = new MongoClient(DBURL);
    await client.connect();
    const db = client.db('buckbuckdev');
    
    // initialize collections
    Collections.Rooms = db.collection<Room>('rooms');
    Collections.Messages = db.collection<Message>('messages');

    // apply validators
    await db.command({ collMod: 'rooms', validator: RoomSchema });
    await db.command({ collMod: 'messages', validator: MessageSchema });
};