import mongoose from 'mongoose';

const userRatingSchema = new mongoose.Schema(
  {
    raterId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    raterName: String,
    ratedUserId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    comment: String,
    category: { type: String, enum: ['communication', 'cleanliness', 'reliability', 'overall'] },
    bookingId: mongoose.Schema.Types.ObjectId,
  },
  { timestamps: true }
);

export default mongoose.models.UserRating || mongoose.model('UserRating', userRatingSchema);
