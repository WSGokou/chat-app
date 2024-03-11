import mongoose from 'mongoose';

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const Message = new Schema({
  id: ObjectId,
  sender: String,
  receipient: String,
  content: String,
  timestamp: Date,
});

const MessageModel = mongoose.model('Message', Message);

export default MessageModel;
