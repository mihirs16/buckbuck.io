import { Router, Request, Response } from "express";
import * as RoomController from "../controller/room";

const router = Router();

router.put("/", async (request: Request, response: Response) => {
    const result = await RoomController.createRoom(request.body);
    const status = result instanceof Error ? 500 : 200;
    response.status(status).send(result);
});


router.get("/", async (request: Request, response: Response) => {
    const result = await RoomController.getRoomsByMember(request.query._id as string);
    const status = result instanceof Error ? 500 : 200;
    response.status(status).send(result);
});


router.get("/join", async (request: Request, response: Response) => {
    const result = await RoomController.joinRoom(request.query.user_id as string, request.query.room_id as string);
    const status = result instanceof Error ? 500 : 200;
    response.status(status).send(result);
});


export default router;