import mongoose from 'mongoose';

const propertySchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: String,
    landlordId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    landlordName: String,
    address: { type: String, required: true },
    city: { type: String, required: true },
    state: String,
    zipCode: String,
    country: String,
    latitude: Number,
    longitude: Number,
    price: { type: Number, required: true },
    pricePerMonth: Boolean,
    bedrooms: { type: Number, required: true },
    bathrooms: Number,
    squareFeet: Number,
    propertyType: { type: String, enum: ['apartment', 'house', 'condo', 'studio', 'other'], required: true },
    amenities: [String],
    images: [String],
    featured: Boolean,
    available: { type: Boolean, default: true },
    rating: { type: Number, default: 0 },
    totalReviews: { type: Number, default: 0 },
    views: { type: Number, default: 0 },
    maxGuests: Number,
  },
  { timestamps: true }
);

export default mongoose.models.Property || mongoose.model('Property', propertySchema);
