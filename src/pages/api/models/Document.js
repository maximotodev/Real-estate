import mongoose from 'mongoose';

const documentSchema = new mongoose.Schema(
  {
    bookingId: { type: mongoose.Schema.Types.ObjectId, ref: 'Booking', required: true },
    propertyId: { type: mongoose.Schema.Types.ObjectId, ref: 'Property', required: true },
    uploadedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    documentType: {
      type: String,
      enum: ['lease', 'agreement', 'receipt', 'contract', 'other'],
      required: true
    },
    fileName: String,
    fileUrl: String,
    fileSize: Number,
    verified: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export default mongoose.models.Document || mongoose.model('Document', documentSchema);
