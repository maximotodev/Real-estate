# Real Estate Platform 🏠

A complete full-stack real estate rental platform with user authentication, property management, booking system, wishlists, and reviews.

## ✨ Features

### 🔐 Authentication & User Management
- User registration & login with JWT
- Role-based access (Renter/Landlord)
- Profile management
- Secure password hashing

### 🏘️ Property Management
- **Renters:** Browse, search, filter properties
- **Landlords:** Create, edit, delete properties (self-service)
- Property listings with images and details
- Advanced search with filters (price, location, bedrooms, type)

### 📅 Booking System
- Date selection and booking confirmation
- Track booking status
- View booking history in dashboard

### ❤️ Wishlist/Saved Properties
- Save favorite properties
- Quick access from dashboard
- Remove from wishlist anytime

### ⭐ Reviews & Ratings
- Leave reviews and ratings
- View average property rating
- Property rating updates automatically

### 📊 User Dashboard
- View profile information
- See all bookings
- Access saved properties
- Manage bookings

## 🚀 Quick Start

See [SETUP.md](./SETUP.md) for complete installation and setup instructions.

```bash
npm install
cp .env.example .env.local
# Configure MONGODB_URI in .env.local
npm run dev
```

Visit http://localhost:3000 to get started!

## 📁 Project Structure

- `/src/pages/api/` - Backend API routes
- `/src/pages/auth/` - Authentication pages
- `/src/pages/properties/` - Property pages
- `/src/pages/landlord/` - Landlord management
- `/src/components/` - Reusable React components

## 🎯 User Workflows

**Renters:**
1. Sign up as Renter
2. Browse & filter properties
3. View property details & reviews
4. Book properties with dates
5. Leave reviews
6. Save to wishlist

**Landlords:**
1. Sign up as Landlord
2. Add properties with details
3. Edit/delete properties
4. View bookings & reviews
5. Track property performance

## 🛠️ Tech Stack

- **Frontend:** Next.js, React, Tailwind CSS
- **Backend:** Next.js API Routes
- **Database:** MongoDB + Mongoose
- **Auth:** JWT + bcryptjs
- **Forms:** React Hook Form + Yup

## 📚 API Reference

See [SETUP.md](./SETUP.md#-api-endpoints) for complete API documentation.

## 🔑 Key Pages

- `/` - Homepage
- `/properties` - Browse all properties
- `/properties/[id]` - Property details
- `/auth/login` - Login
- `/auth/signup` - Register
- `/dashboard` - User dashboard
- `/landlord/properties` - Manage properties

## 📝 Real Estate
