import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema(
  {
    conversationId: String,
    senderId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    senderName: String,
    receiverId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    receiverName: String,
    message: { type: String, required: true },
    read: { type: Boolean, default: false },
    propertyId: mongoose.Schema.Types.ObjectId,
  },
  { timestamps: true }
);

export default mongoose.models.Message || mongoose.model('Message', messageSchema);
