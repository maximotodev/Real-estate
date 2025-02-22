# Real Estate Platform - Architecture Documentation

## System Overview

This is a full-stack, self-service real estate rental platform built with Next.js. It enables property owners (landlords) to list properties, renters to book properties, and both to interact through messaging and reviews.

## Technology Stack

### Frontend
- **Framework:** Next.js 14+ (React)
- **Styling:** Tailwind CSS, Chakra UI
- **State Management:** React Hooks, localStorage
- **HTTP Client:** Axios
- **Form Handling:** React Hook Form, Yup validation
- **UI Components:** Custom components, React Toastify

### Backend
- **Runtime:** Node.js
- **Framework:** Next.js API Routes
- **Database:** MongoDB with Mongoose ODM
- **Authentication:** JWT (JSON Web Tokens)
- **Password Hashing:** bcryptjs
- **Email:** SendGrid (optional)

### DevOps
- **Containerization:** Docker
- **Container Registry:** Docker Hub
- **Environment:** Node 20 Alpine

---

## Project Structure

```
real-estate/
├── src/
│   ├── pages/
│   │   ├── api/                    # Backend API routes
│   │   │   ├── config/
│   │   │   │   ├── auth.js         # JWT utilities
│   │   │   │   └── database.js     # MongoDB connection
│   │   │   ├── middleware/
│   │   │   │   ├── errorHandler.js
│   │   │   │   ├── cors.js
│   │   │   │   ├── rateLimit.js
│   │   │   │   └── logging.js
│   │   │   ├── models/             # Mongoose schemas
│   │   │   │   ├── User.js
│   │   │   │   ├── Property.js
│   │   │   │   ├── Booking.js
│   │   │   │   ├── Review.js
│   │   │   │   ├── Wishlist.js
│   │   │   │   ├── Message.js
│   │   │   │   ├── Notification.js
│   │   │   │   └── ...
│   │   │   ├── auth/               # Authentication endpoints
│   │   │   │   ├── login.js
│   │   │   │   └── register.js
│   │   │   ├── properties/         # Property CRUD endpoints
│   │   │   ├── bookings/           # Booking management
│   │   │   ├── reviews/            # Review endpoints
│   │   │   ├── search/             # Search functionality
│   │   │   ├── stats/              # Statistics
│   │   │   └── ...
│   │   ├── auth/                   # Frontend auth pages
│   │   │   ├── login.js
│   │   └── signup.js
│   │   ├── dashboard.js            # User dashboard
│   │   ├── properties.js           # Property listing
│   │   ├── messages.js             # Messaging UI
│   │   ├── notifications.js        # Notifications UI
│   │   ├── landlord/               # Landlord features
│   │   ├── admin/                  # Admin features
│   │   └── _app.js
│   ├── components/
│   │   └── header.jsx              # Navigation header
│   ├── hooks/                      # React hooks
│   │   ├── useApi.js
│   │   ├── useAuth.js
│   │   └── useForm.js
│   ├── services/                   # Business logic
│   │   ├── PropertyService.js
│   │   ├── BookingService.js
│   │   └── UserService.js
│   ├── lib/                        # Utilities
│   │   ├── constants.js
│   │   ├── validators.js
│   │   └── utils.js
│   ├── config/
│   │   └── apiClient.js            # Axios config
│   └── __tests__/                  # Test files
├── public/
├── .vscode/
├── docker/
├── .dockerignore
├── Dockerfile
├── docker-compose.yml
├── jest.config.js
├── jest.setup.js
├── package.json
├── next.config.js
├── .env.example
├── API_DOCUMENTATION.md
├── ARCHITECTURE.md
└── README.md
```

---

## Data Models

### User
```javascript
{
  _id: ObjectId,
  name: String,
  email: String (unique),
  password: String (hashed),
  phone: String,
  role: Enum['renter', 'landlord', 'admin'],
  profileImage: String,
  bio: String,
  averageRating: Number,
  totalReviews: Number,
  totalBookings: Number,
  createdAt: Date,
  updatedAt: Date
}
```

### Property
```javascript
{
  _id: ObjectId,
  landlordId: ObjectId (ref: User),
  title: String,
  description: String,
  address: String,
  city: String,
  state: String,
  zipCode: String,
  price: Number,
  pricePerMonth: Boolean,
  bedrooms: Number,
  bathrooms: Number,
  squareFeet: Number,
  propertyType: String,
  amenities: [String],
  images: [String],
  averageRating: Number,
  totalReviews: Number,
  totalBookings: Number,
  viewCount: Number,
  createdAt: Date,
  updatedAt: Date
}
```

### Booking
```javascript
{
  _id: ObjectId,
  propertyId: ObjectId (ref: Property),
  landlordId: ObjectId (ref: User),
  renterId: ObjectId (ref: User),
  renterName: String,
  renterEmail: String,
  renterPhone: String,
  checkInDate: Date,
  checkOutDate: Date,
  guests: Number,
  totalPrice: Number,
  status: Enum['pending', 'confirmed', 'active', 'completed', 'cancelled', 'rejected'],
  specialRequests: String,
  createdAt: Date,
  updatedAt: Date
}
```

### Review
```javascript
{
  _id: ObjectId,
  propertyId: ObjectId (ref: Property),
  renterId: ObjectId (ref: User),
  rating: Number (1-5),
  title: String,
  comment: String,
  isVerified: Boolean,
  createdAt: Date,
  updatedAt: Date
}
```

### Message
```javascript
{
  _id: ObjectId,
  conversationId: String,
  senderId: ObjectId (ref: User),
  receiverId: ObjectId (ref: User),
  message: String,
  read: Boolean,
  createdAt: Date
}
```

### Notification
```javascript
{
  _id: ObjectId,
  userId: ObjectId (ref: User),
  type: Enum['booking', 'message', 'review', 'payment', 'property', 'system'],
  title: String,
  message: String,
  actionUrl: String,
  read: Boolean,
  createdAt: Date
}
```

---

## API Architecture

### Request/Response Pattern
```javascript
// Success Response
{
  "success": true,
  "data": {...},
  "pagination": {...}  // Optional
}

// Error Response
{
  "success": false,
  "error": "Error message"
}
```

### Authentication Flow
1. User registers/logs in
2. API returns JWT token
3. Token stored in localStorage
4. Token sent in Authorization header for protected routes
5. Server verifies token
6. If expired/invalid, user redirected to login

### Authorization Levels
- **Public:** No authentication required (browse properties)
- **Authenticated:** User must be logged in (book property, post review)
- **Role-based:** Specific roles required (landlord can manage properties, admin can moderate)

---

## Service Layer

Services encapsulate business logic and are reused across API routes.

### PropertyService
- Search and filter properties
- Calculate property statistics
- Format property responses
- Validate property data

### BookingService
- Calculate nights between dates
- Calculate pricing with fees
- Validate booking data
- Get booking status colors

### UserService
- Hash passwords
- Validate user data
- Format user responses
- Check user roles

---

## Middleware Stack

### Error Handler
Catches errors from all API routes and returns consistent error responses.

### CORS
Handles cross-origin requests from frontend.

### Rate Limiting
Prevents abuse by limiting requests per IP.

### Request Logging
Logs all API requests with method, path, status, duration.

---

## Frontend Architecture

### Component Hierarchy
```
_app.js
├── header.jsx (global navigation)
└── Page Component
    ├── Page-specific components
    └── Hooks for data fetching
```

### State Management
- **Local Component State:** React useState for UI state
- **Session State:** localStorage for auth tokens
- **Server State:** Fetched via API calls using custom hooks

### Custom Hooks
- `useApi()` - Generic API calls
- `useGet()` - GET requests with auto-fetch
- `usePost()` - POST requests
- `useAuth()` - Authentication state
- `useForm()` - Form state management

---

## Authentication & Security

### Password Security
- Passwords hashed with bcryptjs (10 salt rounds)
- Never stored in plain text
- Hashed passwords compared using secure comparison

### JWT Tokens
- Generated on login/register
- Includes user ID, email, role
- Expires after 7 days (configurable)
- Validated on protected endpoints
- Verified signature prevents tampering

### CORS Protection
- Frontend origin validated
- Credentials allowed only for trusted origins
- Preflight requests handled

### Rate Limiting
- 100 requests per minute per IP
- Returns 429 (Too Many Requests) when exceeded
- Resets after time window

---

## Database Schema Relationships

```
User (1) ---> (Many) Property
           ---> (Many) Booking (as landlord)
           ---> (Many) Booking (as renter)
           ---> (Many) Review
           ---> (Many) Wishlist
           ---> (Many) Message (sent)
           ---> (Many) Message (received)
           ---> (Many) Notification

Property (1) ---> (Many) Booking
             ---> (Many) Review
             ---> (Many) Wishlist
             ---> (Many) Message (about property)

Booking (1) ---> (Many) Notification
```

---

## Deployment Architecture

### Docker Container
- Base: Node 20 Alpine (minimal, secure)
- Build: `npm ci` for lockfile-driven installs
- Run: `npm start` (Next.js production server)
- Port: 3000
- Health Check: HTTP GET to / every 30s

### Environment Variables
```
MONGODB_URI          # MongoDB connection string
JWT_SECRET           # JWT signing secret
SENDGRID_API_KEY     # Email service (optional)
CLOUDINARY_URL       # Image hosting (optional)
```

### Scaling Considerations
- Stateless API (no session storage on server)
- Database: MongoDB Atlas for managed hosting
- CDN: Cloudinary for image caching
- Load balancer: Can run multiple containers

---

## Performance Optimizations

### Frontend
- Next.js code splitting (pages loaded on demand)
- Image optimization via Next.js Image component
- CSS minification with Tailwind
- Lazy loading for lists

### Backend
- MongoDB indexes on frequently queried fields
- Lean queries (exclude unnecessary fields)
- Pagination for large result sets
- Rate limiting to prevent overload

### Caching
- Browser caching via HTTP headers
- localStorage for auth tokens
- Axios instance reused

---

## Testing Strategy

### Unit Tests
- Validators (email, phone, password)
- Utilities (formatters, calculations, helpers)
- Services (PropertyService, BookingService, UserService)

### Integration Tests
- API endpoints with database
- Authentication flow
- Booking workflow

### Test Structure
- Tests colocated with source (`__tests__` folder)
- Jest + Supertest for API testing
- Mock localStorage for browser APIs

---

## Error Handling

### API Errors
- Standard HTTP status codes
- Consistent error message format
- Stack traces in development mode

### Client Errors
- Form validation with error messages
- Toast notifications for user feedback
- Redirect to login on auth errors

### Server Errors
- Logged to console
- Generic message to client (prevents info leak)
- Includes error ID for debugging

---

## Future Enhancements

1. **Payment Integration** - Stripe/PayPal for bookings
2. **Email Notifications** - SendGrid integration
3. **Image Upload** - Cloudinary for property photos
4. **Real-time Chat** - WebSocket for live messaging
5. **Advanced Analytics** - Property performance metrics
6. **Search Optimization** - Elasticsearch for faster search
7. **Mobile App** - React Native version
8. **API Rate Limiting** - Per-user/API-key limits
9. **Caching Layer** - Redis for session/data caching
10. **CI/CD Pipeline** - GitHub Actions for automated testing/deployment
