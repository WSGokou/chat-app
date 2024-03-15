import express from 'express';
import {config} from 'dotenv';
import path from 'path';
import cookieParser from 'cookie-parser';
import cors from 'cors';

import authRouter from './routes/auth.routes.js';
import messageRouter from './routes/message.routes.js';
import userRouter from './routes/user.routes.js';

import connectToMongoDB from './db/connectToMongoDB.js';
import {app, server} from './socket/socket.js';

import MessageModel from './models/message.model.js';

const PORT = process.env.PORT || 5001;

const __dirname = path.resolve();

config();

app.use(express.json()); // for parsing application/json from the request body
app.use(cookieParser()); // for parsing cookies from the request headers
app.use(cors({origin: 'http://localhost:3000', credentials: true}));

// routes
app.use('/api/auth', authRouter);
app.use('/api/messages', messageRouter);
app.use('/api/users', userRouter);

app.use(express.static(path.join(__dirname, '/frontend/dist')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'frontend', 'dist', 'index.html'));
});

// Start server after successful connection to MongoDB
connectToMongoDB().then(() => {
  server.listen(PORT, () => console.log(`Server is listening on port ${PORT}`));
});
