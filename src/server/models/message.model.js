import mongoose from 'mongoose';

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const messageSchema = new Schema({
  id: ObjectId,
  sender: String,
  receipient: String,
  content: String,
  timestamp: Date,
});

const Message = mongoose.model('Message', messageSchema);

export default Message;
