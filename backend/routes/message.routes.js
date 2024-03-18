import express from 'express';
import {
  deleteMessage,
  editMessage,
  getMessages,
  sendMessage,
} from '../controllers/message.controller.js';
import protectRoute from '../middleware/protectRoute.js';

const messageRouter = express.Router();

messageRouter.get('/:id', protectRoute, getMessages);
messageRouter.post('/send/:id', protectRoute, sendMessage);
messageRouter.delete('/delete/:id', protectRoute, deleteMessage);
messageRouter.patch('/edit/:id', protectRoute, editMessage);

export default messageRouter;
