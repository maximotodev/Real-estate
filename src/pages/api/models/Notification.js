import mongoose from 'mongoose';

const notificationSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    type: {
      type: String,
      enum: ['booking', 'message', 'review', 'payment', 'property', 'system'],
      required: true
    },
    title: String,
    message: { type: String, required: true },
    read: { type: Boolean, default: false },
    relatedId: mongoose.Schema.Types.ObjectId,
    relatedModel: String,
    actionUrl: String,
  },
  { timestamps: true }
);

export default mongoose.models.Notification || mongoose.model('Notification', notificationSchema);
