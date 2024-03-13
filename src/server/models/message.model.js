import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const messageSchema = new Schema(
  {
    senderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    receipientId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    content: {type: String, required: true},
  },
  {timestamps: true}, // Automatically create timestamps for createdAt and updatedAt
);

const Message = mongoose.model('Message', messageSchema);

export default Message;
