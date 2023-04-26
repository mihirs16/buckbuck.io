import * as MessageController from '../controller/message';
import { Request, Response, Router } from 'express';

const router = Router();


router.put('/', async (request: Request, response: Response) => {
    const result = await MessageController.createMessage(request.body.message, request.query.senderId as string);
    if (result instanceof Error)
        response.status(500).send(result);
    else
        response.status(200).send(result);
});


router.get('/', async (request: Request, response: Response) => {
    const result = await MessageController.getMessages(request.query.roomId as string);
    if (result instanceof Error)
        response.status(500).send(result);
    else
        response.status(200).send(result);
});


export default router;