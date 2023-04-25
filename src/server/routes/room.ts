import express, { Request, Response } from "express";
import * as RoomController from "../controller/room";

const router = express.Router();

router.put("/", (request: Request, response: Response) => {
    const result = RoomController.createRoom(request.body);
    const status = result instanceof Error ? 500 : 200;
    response.status(status).send(result);
});


router.get("/", (request: Request, response: Response) => {
    const result = RoomController.getRoomsByMember(request.query._id as string);
    const status = result instanceof Error ? 500 : 200;
    response.status(status).send(result);
});

export default router;