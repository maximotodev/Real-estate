# Real Estate Platform - Complete Setup Guide

This is a full-stack real estate rental platform with user authentication, property management, booking system, wishlist, and reviews.

## 🎯 Features Implemented

### User Features
- ✅ User Registration & Login (with JWT auth)
- ✅ User Dashboard (profile, bookings, wishlist)
- ✅ Property Search with Advanced Filters (price, location, bedrooms, type)
- ✅ Property Browsing & Details
- ✅ Booking System (date selection, confirmation)
- ✅ Wishlist/Saved Properties
- ✅ Reviews & Ratings System

### Landlord Features
- ✅ Self-serve Property Management (create, edit, delete)
- ✅ View Property Details & Ratings
- ✅ Track Bookings
- ✅ Monitor Reviews

### Technology Stack
- **Frontend:** Next.js, React, Tailwind CSS, Chakra UI
- **Backend:** Next.js API Routes
- **Database:** MongoDB with Mongoose
- **Authentication:** JWT
- **Validation:** Yup, React Hook Form

---

## 🚀 Quick Start

### Prerequisites
- Node.js 14+ and npm/yarn
- MongoDB (local or Atlas)

### Installation

1. **Clone and install dependencies:**
   ```bash
   cd Real-estate
   npm install
   ```

2. **Create environment file:**
   ```bash
   cp .env.example .env.local
   ```

3. **Configure MongoDB:**
   - Local: `mongodb://localhost:27017/realestate`
   - Or use MongoDB Atlas connection string
   
   Update `MONGODB_URI` in `.env.local`

4. **Set JWT Secret:**
   ```bash
   # In .env.local, change:
   JWT_SECRET=your-secure-random-string-here
   ```

5. **Start development server:**
   ```bash
   npm run dev
   ```

6. **Access the app:**
   - Homepage: http://localhost:3000
   - Browse Properties: http://localhost:3000/properties
   - Sign Up: http://localhost:3000/auth/signup
   - Login: http://localhost:3000/auth/login

---

## 📁 Project Structure

```
src/
├── pages/
│   ├── api/                    # API Routes
│   │   ├── auth/
│   │   │   ├── login.js
│   │   │   └── register.js
│   │   ├── bookings/          # Booking APIs
│   │   ├── properties/        # Property APIs
│   │   ├── reviews/           # Review APIs
│   │   ├── wishlist/          # Wishlist APIs
│   │   ├── users/             # User Profile API
│   │   ├── models/            # Database Models
│   │   │   ├── User.js
│   │   │   ├── Property.js
│   │   │   ├── Booking.js
│   │   │   ├── Review.js
│   │   │   └── Wishlist.js
│   │   └── config/            # Configuration
│   │       ├── database.js
│   │       └── auth.js
│   ├── auth/                  # Auth Pages
│   │   ├── login.js
│   │   └── signup.js
│   ├── properties/            # Property Pages
│   │   └── [id].js           # Property Detail
│   ├── properties.js          # Properties Listing
│   ├── dashboard.js           # User Dashboard
│   ├── landlord/
│   │   └── properties.js      # Landlord Property Management
│   ├── home.js                # Landing Page
│   ├── _app.js
│   └── _document.js
├── components/                # React Components
├── styles/                    # CSS
├── assets/                    # Images & Icons
└── package.json
```

---

## 🔑 API Endpoints

### Authentication
- `POST /api/auth/register` - Create new account
- `POST /api/auth/login` - Login user

### Properties
- `GET /api/properties` - Get all properties (with filters)
- `POST /api/properties` - Create property (landlord only)
- `GET /api/properties/[id]` - Get property details
- `PUT /api/properties/[id]` - Update property (landlord only)
- `DELETE /api/properties/[id]` - Delete property (landlord only)

### Bookings
- `GET /api/bookings` - Get user bookings
- `POST /api/bookings` - Create booking
- `GET /api/bookings/[id]` - Get booking details
- `PUT /api/bookings/[id]` - Update booking status
- `DELETE /api/bookings/[id]` - Cancel booking

### Reviews
- `GET /api/reviews` - Get reviews for property
- `POST /api/reviews` - Create review

### Wishlist
- `GET /api/wishlist` - Get user wishlist
- `POST /api/wishlist` - Add to wishlist
- `DELETE /api/wishlist/[id]` - Remove from wishlist

### User Profile
- `GET /api/users/profile` - Get user profile
- `PUT /api/users/profile` - Update user profile

---

## 🔐 Authentication Flow

1. User registers → Password hashed with bcryptjs
2. Login → JWT token generated (valid 7 days)
3. Token stored in localStorage
4. All protected routes use Bearer token in Authorization header
5. Backend validates token before allowing access

---

## 🎨 User Workflows

### Renter
1. Sign up as "Renter"
2. Browse properties with search & filters
3. View property details
4. Leave reviews & ratings
5. Book properties (with dates)
6. Manage bookings in dashboard
7. Save favorite properties to wishlist

### Landlord
1. Sign up as "Landlord"
2. Add properties via landlord dashboard
3. Edit property details anytime
4. View property ratings & reviews
5. Track property bookings
6. Delete properties when needed

---

## 📝 Database Models

### User
- name, email, password (hashed), phone
- role (renter/landlord/admin)
- profile info: bio, address, city, state, zipCode
- timestamps

### Property
- title, description, address, city, state, zipCode
- landlordId (reference to User)
- price, bedrooms, bathrooms, squareFeet
- propertyType (apartment/house/condo/studio)
- amenities (array), images (array)
- rating, totalReviews, views
- timestamps

### Booking
- propertyId, renterId, landlordId
- checkInDate, checkOutDate, numberOfNights
- totalPrice, status, paymentStatus
- renter contact info
- timestamps

### Review
- propertyId, userId
- rating (1-5), title, comment
- verified flag
- timestamps

### Wishlist
- userId, propertyId
- propertyTitle, propertyImage, propertyPrice
- timestamps

---

## 🧪 Testing the App

### Test User Flow
1. Go to `/auth/signup` and create account
2. Visit `/properties` to see property listings
3. Try filters (city, price, bedrooms)
4. Click "View Details" on a property
5. Leave a review if logged in
6. Click heart icon to save to wishlist
7. Visit `/dashboard` to see bookings and wishlist

### Test Landlord Flow
1. Sign up as "Landlord"
2. Go to `/landlord/properties`
3. Click "+ Add Property"
4. Fill in details and create
5. View created properties
6. Edit or delete properties as needed

---

## ⚠️ Important Notes

- This uses MongoDB. Make sure it's running before starting the app
- All API routes require proper headers for authentication
- Form validation happens on both frontend and backend
- Passwords are hashed using bcryptjs (10 salt rounds)
- Images are stored as URLs (ready for Cloudinary integration)

---

## 🔧 Future Enhancements

- Image upload to Cloudinary
- Payment integration with Paytm
- Email notifications with SendGrid
- Google Maps integration
- Admin dashboard
- Message/chat system between users
- Advanced analytics
- Mobile app with React Native

---

## 📧 Support

For questions or issues, check the code comments or create an issue.

Happy coding! 🚀
