import express from 'express';
import ViteExpress from 'vite-express';
import mongoose from 'mongoose';
import cors from 'cors';
import {createServer} from 'http';
import {Server} from 'socket.io';

import {config} from 'dotenv';
config();

import MessageModel from './models/Message.js';

const PORT = process.env.PORT || 3000;

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: '*',
  },
});

// app.use(cors);
app.use(express.json());

app.get('/hello', (req, res) => {
  res.send('Hello Vite + Reactjj!');
});

app.get('/messages', async (req, res) => {
  // TODO: Fetch messages from the database
  // only get messages between specific sender and receipient
  const messages = await MessageModel.find();
  res.json(messages);
});

app.post('/messages', async (req, res) => {
  const newMessage = new MessageModel({
    sender: 'Goku',
    receipient: 'Vegeta',
    content: req.body.content,
    timestamp: new Date(),
  });
  const createdMessage = await newMessage.save();
  res.json(createdMessage);
});

app.delete('/messages/:id', async (req, res) => {
  const messageId = req.params.id;

  const deletedMessage = await MessageModel.findByIdAndDelete(messageId);

  res.json(deletedMessage);
});

mongoose.connect(process.env.MONGO_URL).then(() => {
  ViteExpress.listen(app, PORT, () =>
    console.log(`Server is listening on port ${PORT}`),
  );
});
