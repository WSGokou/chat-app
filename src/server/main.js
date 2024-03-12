import express from 'express';
import ViteExpress from 'vite-express';
import mongoose from 'mongoose';

import {config} from 'dotenv';
config();

import MessageModel from './models/Message.js';

const PORT = 3000;

const app = express();

app.use(express.json());

app.get('/hello', (req, res) => {
  res.send('Hello Vite + Reactjj!');
});

app.get('/messages', (req, res) => {
  res.send('Get messages');
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

mongoose.connect(process.env.MONGO_URL).then(() => {
  ViteExpress.listen(app, PORT, () =>
    console.log(`Server is listening on port ${PORT}`),
  );
});
