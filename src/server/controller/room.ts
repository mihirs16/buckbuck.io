import { Room } from "../models/room";
import { Collections } from "../services/database";
import { InsertOneResult, ObjectId, UpdateResult } from "mongodb";


/**
 * create a new chat room
 * @param room chat room
 * @returns insert acknowledgement
 */
export const createRoom = async (room: Room): Promise<InsertOneResult|Error> => {
    try {
        const result = await Collections.Rooms!.insertOne(room);
        console.log(result)
        if (result && result.acknowledged === true)
            return result;
        else
            throw new Error("Failed to create room.");
    } catch (e) {
        console.error(e);
        return e as Error;
    }
}


/**
 * get a list of chat rooms that a user is a member of
 * @param userId user id
 * @returns list of rooms a user is a member of
 */
export const getRoomsByMember = async (userId: string): Promise<Room[]|Error> => {
    try {
        const rooms = await Collections.Rooms!.find({ members: { $elemMatch: { $eq: userId } } }).toArray();
        return rooms;
    } catch (e) {
        console.error(e);
        return e as Error;
    }
}

/**
 * add a user to a chat room
 * @param user_id user id 
 * @param room_id room id
 * @returns update acknowledgment
 */
export const joinRoom = async (user_id: string, room_id: string): Promise<UpdateResult|Error> => {
    try {
        const result = await Collections.Rooms!.updateOne({_id: new ObjectId(room_id)}, {$addToSet: {members: user_id}});
        if (result && result.acknowledged === true)
            return result;
        else
            throw new Error("Failed to add member.");
    } catch (e) {
        console.error(e);
        return e as Error;
    }
}
