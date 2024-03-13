import Conversation from '../models/conversation.model.js';
import Message from '../models/message.model.js';

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

    // TODO Socket IO funcinality here

    // this will run in parallel
    await Promise.all([conversation.save(), newMessage.save()]);

    res.status(201).json(newMessage);
  } catch (error) {
    console.log('SendMessage controller error: ', error);
    res.status(500).json({error: 'Internal server error'});
  }
};
