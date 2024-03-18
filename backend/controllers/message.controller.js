import Conversation from '../models/conversation.model.js';
import Message from '../models/message.model.js';
import {getReceipientSocketId, io} from '../socket/socket.js';

export const sendMessage = async (req, res) => {
  try {
    // Get senderId, receipientId, and message from the request
    const {content} = req.body;
    const {id: receipientId} = req.params;
    const senderId = req.user._id;

    // Find conversation between sender and receipient
    let conversation = await Conversation.findOne({
      participants: {
        $all: [senderId, receipientId],
      },
    });

    // If no conversation, create new conversation
    if (!conversation) {
      conversation = await Conversation.create({
        participants: [senderId, receipientId],
      });
    }

    const newMessage = new Message({
      senderId,
      receipientId,
      content,
    });

    if (newMessage) {
      conversation.messages.push(newMessage._id);
    }

    // this will run in parallel
    await Promise.all([conversation.save(), newMessage.save()]);

    // TODO Socket IO funcinality here
    const receipientSocketId = getReceipientSocketId(receipientId);
    if (receipientSocketId) {
      // io.to to send message to specific socket
      io.to(receipientSocketId).emit('newMessage', newMessage);
    }

    res.status(201).json(newMessage);
  } catch (error) {
    console.log('SendMessage controller error: ', error);
    res.status(500).json({error: 'Internal server error'});
  }
};

export const getMessages = async (req, res) => {
  try {
    const {id: userToChatId} = req.params;
    const senderId = req.user._id;

    const conversation = await Conversation.findOne({
      participants: {
        $all: [senderId, userToChatId],
      },
    }).populate('messages'); // populate the messages field with the actual messages

    if (!conversation) {
      return res.status(200).json([]);
    }

    const messages = conversation.messages;

    res.status(200).json(messages);
  } catch (error) {
    console.log('GetMessages controller error: ', error);
    res.status(500).json({error: 'Internal server error'});
  }
};

export const deleteMessage = async (req, res) => {
  try {
    const {id: messageId} = req.params;
    const senderId = req.user._id;

    const message = await Message.findOne({_id: messageId, senderId});

    if (!message) {
      return res.status(404).json({error: 'Unable to delete message'});
    }

    await message.deleteOne();

    // TODO Socket IO funcinality here
    const receipientSocketId = getReceipientSocketId(message.receipientId);
    if (receipientSocketId) {
      io.to(receipientSocketId).emit('deleteMessage', messageId);
    }

    res.status(200).json('Message deleted');
  } catch (error) {
    console.log('DeleteMessage controller error: ', error);
    res.status(500).json({error: 'Internal server error'});
  }
};

export const editMessage = async (req, res) => {
  try {
    const {id: messageId} = req.params;
    const {content} = req.body;
    const senderId = req.user._id;

    const message = await Message.findOne({_id: messageId, senderId});

    if (!message) {
      return res.status(404).json({error: 'Unable to edit message'});
    }

    await message.updateOne({content});

    const updatedMessage = await Message.findById(messageId);

    console.log('updatedMessage: ', updatedMessage);

    // TODO Socket IO funcinality here
    const receipientSocketId = getReceipientSocketId(message.receipientId);
    if (receipientSocketId) {
      io.to(receipientSocketId).emit('editMessage', updatedMessage);
    }

    res.status(200).json(updatedMessage);
  } catch (error) {
    console.log('DeleteMessage controller error: ', error);
    res.status(500).json({error: 'Internal server error'});
  }
};
