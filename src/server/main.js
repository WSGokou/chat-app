import express from 'express';
import {config} from 'dotenv';
import cookieParser from 'cookie-parser';
import ViteExpress from 'vite-express';
import cors from 'cors';
import {createServer} from 'http';
import {Server} from 'socket.io';

import authRouter from './routes/auth.routes.js';
import messageRouter from './routes/message.routes.js';
import userRouter from './routes/user.routes.js';

import connectToMongoDB from './db/connectToMongoDB.js';

import MessageModel from './models/message.model.js';

const app = express();
const PORT = process.env.PORT || 3000;

config();

app.use(express.json()); // for parsing application/json from the request body
app.use(cookieParser()); // for parsing cookies from the request headers

// const httpServer = createServer(app);
// const io = new Server(httpServer, {
//   cors: {
//     origin: '*',
//   },
// });

// app.use(cors);

// app.get('/hello', (req, res) => {
//   res.send('Hello Vite + Reactjj!');
// });

app.use('/api/auth', authRouter);
app.use('/api/messages', messageRouter);
app.use('/api/users', userRouter);

app.delete('/api/messages/:id', async (req, res) => {
  const messageId = req.params.id;

  const deletedMessage = await MessageModel.findByIdAndDelete(messageId);

  res.json(deletedMessage);
});

connectToMongoDB().then(() => {
  ViteExpress.listen(app, PORT, () =>
    console.log(`Server is listening on port ${PORT}`),
  );
});
