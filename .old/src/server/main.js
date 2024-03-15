import express from 'express';
import {config} from 'dotenv';
import cookieParser from 'cookie-parser';
import ViteExpress from 'vite-express';
import cors from 'cors';

import authRouter from './routes/auth.routes.js';
import messageRouter from './routes/message.routes.js';
import userRouter from './routes/user.routes.js';

import connectToMongoDB from './db/connectToMongoDB.js';
import {app, server} from './socket/socket.js';

import MessageModel from './models/message.model.js';

const PORT = process.env.PORT || 3000;

config();

app.use(express.json()); // for parsing application/json from the request body
app.use(cookieParser()); // for parsing cookies from the request headers
app.use(cors({origin: '*', credentials: true}));

// routes
app.use('/api/auth', authRouter);
app.use('/api/messages', messageRouter);
app.use('/api/users', userRouter);

app.delete('/api/messages/:id', async (req, res) => {
  const messageId = req.params.id;

  const deletedMessage = await MessageModel.findByIdAndDelete(messageId);

  res.json(deletedMessage);
});

// Start server after successful connection to MongoDB
connectToMongoDB().then(() => {
  server.listen(PORT, () => console.log(`Server is listening on port ${PORT}`));
  ViteExpress.bind(app, server);
});
