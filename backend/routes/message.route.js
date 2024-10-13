import express from 'express';
import { sendMessage,getMessages } from '../controller/Message.controller.js';
const messageRouter = express.Router();

messageRouter.post("/send/:receiverId",sendMessage);
messageRouter.post("/get/:id",getMessages);

export default messageRouter;