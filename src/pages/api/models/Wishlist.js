import mongoose from 'mongoose';

const wishlistSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    propertyId: { type: mongoose.Schema.Types.ObjectId, ref: 'Property', required: true },
    propertyTitle: String,
    propertyImage: String,
    propertyPrice: Number,
  },
  { timestamps: true }
);

export default mongoose.models.Wishlist || mongoose.model('Wishlist', wishlistSchema);
