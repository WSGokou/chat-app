import express from 'express';
import ViteExpress from 'vite-express';
import mongoose from 'mongoose';

import MessageModel from './models/Message.js';

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
    content: 'Hello Vegeta',
    timestamp: new Date(),
  });
  const createdMessage = await newMessage.save();
  res.json(createdMessage);
});

mongoose
  .connect(
    'mongodb+srv://gokou-chatapp:OT3X1zpjnenX0IQa@cluster0.yjlri8f.mongodb.net/?retryWrites=true&w=majority',
  )
  .then(() => {
    ViteExpress.listen(app, 3000, () =>
      console.log('Server is listening on port 3000...'),
    );
  });
