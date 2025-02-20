# Quick Start Guide 🚀

Get the Real Estate Platform running in 5 minutes!

## Step 1: Install Dependencies
```bash
npm install
```

## Step 2: Setup Database
Create `.env.local` file:
```bash
cp .env.example .env.local
```

Edit `.env.local` and set:
```
MONGODB_URI=mongodb://localhost:27017/realestate
JWT_SECRET=your-super-secret-key-123
```

Make sure MongoDB is running on your machine or use MongoDB Atlas.

## Step 3: Start the App
```bash
npm run dev
```

## Step 4: Open in Browser
Visit http://localhost:3000

---

## 🎯 What to Try First

### 1. Browse Properties
- Go to http://localhost:3000/properties
- Use filters to search (price, location, bedrooms)
- Click "View Details" on any property

### 2. Create an Account
- Click "Sign Up" in header
- Choose "Renter" or "Landlord" role
- Fill in details and create account

### 3. As a Renter
- Browse properties with advanced filters
- Add properties to wishlist ❤️
- Make a booking with dates
- Leave reviews and ratings
- View all bookings in dashboard

### 4. As a Landlord
- Go to `/landlord/properties`
- Add your first property
- Edit/delete properties
- View bookings and reviews
- Track property ratings

### 5. Leave Reviews
- Click "View Details" on a property
- Scroll to "Reviews" section
- Click "Write a Review"
- Rate and comment

---

## 📊 Database Collections

The app automatically creates these in MongoDB:

- **users** - All user accounts
- **properties** - Rental properties
- **bookings** - Property bookings
- **reviews** - Property reviews
- **wishlists** - Saved properties

---

## 🔑 Key URLs

| Page | URL |
|------|-----|
| Home | `/` |
| Browse Properties | `/properties` |
| Property Details | `/properties/:id` |
| Login | `/auth/login` |
| Sign Up | `/auth/signup` |
| Dashboard | `/dashboard` |
| Manage Properties | `/landlord/properties` |

---

## 💡 Test Data

Create test accounts:

**Renter Account:**
- Email: renter@test.com
- Password: password123
- Role: Renter

**Landlord Account:**
- Email: landlord@test.com
- Password: password123
- Role: Landlord

Then:
1. Landlord adds a property
2. Renter finds and books it
3. Renter leaves a review

---

## 🐛 Troubleshooting

**MongoDB Connection Error:**
- Make sure MongoDB is running
- Check `MONGODB_URI` in `.env.local`
- Use MongoDB Atlas if local DB not available

**Login/Auth Issues:**
- Check JWT_SECRET is set in `.env.local`
- Clear browser cookies and try again
- Check browser console for errors

**Properties Not Loading:**
- Check MongoDB connection
- Make sure API routes are working
- Check `/api/properties` in browser

---

## 📚 Full Documentation

See [SETUP.md](./SETUP.md) for:
- Complete installation guide
- API endpoint reference
- Database schema details
- Architecture overview
- Future enhancement ideas

---

## 🎉 You're All Set!

The platform is ready to use. Start by:
1. Creating a landlord account
2. Adding a property
3. Creating a renter account
4. Booking the property
5. Leaving a review

Happy real estate renting! 🏠
