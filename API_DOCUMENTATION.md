# Real Estate Platform - API Documentation

## Overview
This is a comprehensive REST API for a real estate property rental platform built with Next.js and MongoDB.

## Base URL
```
http://localhost:3000/api
```

## Authentication
All protected endpoints require a JWT token in the Authorization header:
```
Authorization: Bearer <token>
```

---

## Authentication Endpoints

### POST /auth/register
Register a new user account.

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "phone": "1234567890",
  "role": "renter"
}
```

**Response (201):**
```json
{
  "success": true,
  "token": "eyJhbGc...",
  "user": {
    "_id": "...",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "renter"
  }
}
```

### POST /auth/login
Login with email and password.

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

**Response (200):**
```json
{
  "success": true,
  "token": "eyJhbGc...",
  "user": {
    "_id": "...",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "renter"
  }
}
```

---

## Properties Endpoints

### GET /properties
Get all properties with filtering and pagination.

**Query Parameters:**
- `page` - Page number (default: 1)
- `limit` - Items per page (default: 12)
- `city` - Filter by city
- `minPrice` - Filter by minimum price
- `maxPrice` - Filter by maximum price
- `bedrooms` - Filter by minimum bedrooms
- `propertyType` - Filter by property type
- `search` - Search in title, description, address

**Response (200):**
```json
{
  "success": true,
  "properties": [
    {
      "_id": "...",
      "title": "Cozy Apartment",
      "address": "123 Main St",
      "city": "New York",
      "price": 1500,
      "bedrooms": 2,
      "bathrooms": 1,
      "rating": 4.5,
      "totalReviews": 12
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 12,
    "total": 100,
    "pages": 9
  }
}
```

### GET /properties/[id]
Get a specific property details.

**Response (200):**
```json
{
  "success": true,
  "property": {
    "_id": "...",
    "title": "Cozy Apartment",
    "description": "Beautiful apartment with modern amenities",
    "address": "123 Main St",
    "city": "New York",
    "price": 1500,
    "bedrooms": 2,
    "bathrooms": 1,
    "squareFeet": 800,
    "amenities": ["WiFi", "Pool", "Gym"],
    "images": ["..."],
    "rating": 4.5,
    "totalReviews": 12
  }
}
```

### POST /properties
Create a new property (Landlord only).

**Authentication Required:** Yes

**Request Body:**
```json
{
  "title": "Modern Apartment",
  "description": "Fully furnished apartment",
  "address": "456 Oak Ave",
  "city": "Los Angeles",
  "state": "CA",
  "zipCode": "90001",
  "price": 2000,
  "bedrooms": 3,
  "bathrooms": 2,
  "squareFeet": 1200,
  "propertyType": "apartment",
  "amenities": ["WiFi", "Parking", "Laundry"]
}
```

**Response (201):**
```json
{
  "success": true,
  "property": {
    "_id": "...",
    "title": "Modern Apartment",
    ...
  }
}
```

### PUT /properties/[id]
Update property details (Landlord only).

**Authentication Required:** Yes

**Response (200):**
```json
{
  "success": true,
  "property": { ... }
}
```

### DELETE /properties/[id]
Delete a property (Landlord only).

**Authentication Required:** Yes

**Response (200):**
```json
{
  "success": true,
  "message": "Property deleted successfully"
}
```

---

## Bookings Endpoints

### POST /bookings
Create a new booking.

**Authentication Required:** Yes

**Request Body:**
```json
{
  "propertyId": "...",
  "checkInDate": "2026-06-15",
  "checkOutDate": "2026-06-20",
  "guests": 2,
  "renterName": "John Doe",
  "renterEmail": "john@example.com",
  "renterPhone": "1234567890",
  "specialRequests": "Early check-in if possible"
}
```

**Response (201):**
```json
{
  "success": true,
  "booking": {
    "_id": "...",
    "propertyId": "...",
    "checkInDate": "2026-06-15",
    "checkOutDate": "2026-06-20",
    "status": "pending",
    "totalPrice": 7500
  }
}
```

### GET /bookings
Get user's bookings.

**Authentication Required:** Yes

**Response (200):**
```json
{
  "success": true,
  "bookings": [
    {
      "_id": "...",
      "propertyId": "...",
      "status": "confirmed",
      "totalPrice": 7500
    }
  ]
}
```

### GET /bookings/[id]
Get a specific booking.

**Authentication Required:** Yes

**Response (200):**
```json
{
  "success": true,
  "booking": { ... }
}
```

### PUT /bookings/[id]
Update booking status (Landlord only).

**Authentication Required:** Yes

**Request Body:**
```json
{
  "status": "confirmed"
}
```

**Response (200):**
```json
{
  "success": true,
  "booking": { ... }
}
```

### DELETE /bookings/[id]
Cancel a booking.

**Authentication Required:** Yes

**Response (200):**
```json
{
  "success": true,
  "message": "Booking cancelled successfully"
}
```

---

## Reviews Endpoints

### GET /reviews
Get reviews for a property.

**Query Parameters:**
- `propertyId` - Property ID (required)
- `page` - Page number
- `limit` - Items per page

**Response (200):**
```json
{
  "success": true,
  "reviews": [
    {
      "_id": "...",
      "propertyId": "...",
      "rating": 5,
      "title": "Great place!",
      "comment": "Beautiful apartment, highly recommended",
      "createdAt": "2026-05-15T10:00:00Z"
    }
  ]
}
```

### POST /reviews
Submit a property review.

**Authentication Required:** Yes

**Request Body:**
```json
{
  "propertyId": "...",
  "rating": 5,
  "title": "Excellent property",
  "comment": "Amazing location and great landlord"
}
```

**Response (201):**
```json
{
  "success": true,
  "review": { ... }
}
```

---

## Wishlist Endpoints

### GET /wishlist
Get user's wishlist.

**Authentication Required:** Yes

**Response (200):**
```json
{
  "success": true,
  "wishlist": [
    {
      "_id": "...",
      "propertyId": {
        "_id": "...",
        "title": "Cozy Apartment",
        "price": 1500
      }
    }
  ]
}
```

### POST /wishlist
Add property to wishlist.

**Authentication Required:** Yes

**Request Body:**
```json
{
  "propertyId": "..."
}
```

**Response (201):**
```json
{
  "success": true,
  "wishlist": { ... }
}
```

### DELETE /wishlist/[id]
Remove property from wishlist.

**Authentication Required:** Yes

**Response (200):**
```json
{
  "success": true,
  "message": "Removed from wishlist"
}
```

---

## Messages Endpoints

### GET /messages
Get all conversations.

**Authentication Required:** Yes

**Query Parameters:**
- `conversationId` - Get messages in a specific conversation

**Response (200):**
```json
{
  "success": true,
  "messages": [
    {
      "_id": "...",
      "senderId": "...",
      "receiverId": "...",
      "message": "Hello, is this property available?",
      "createdAt": "2026-05-15T10:00:00Z"
    }
  ]
}
```

### POST /messages
Send a message.

**Authentication Required:** Yes

**Request Body:**
```json
{
  "receiverId": "...",
  "message": "Is this property available for the summer?"
}
```

**Response (201):**
```json
{
  "success": true,
  "message": { ... }
}
```

---

## Notifications Endpoints

### GET /notifications
Get user notifications.

**Authentication Required:** Yes

**Response (200):**
```json
{
  "success": true,
  "notifications": [
    {
      "_id": "...",
      "type": "booking",
      "title": "Booking Confirmed",
      "message": "Your booking has been confirmed",
      "read": false,
      "createdAt": "2026-05-15T10:00:00Z"
    }
  ],
  "unreadCount": 3
}
```

### PUT /notifications/[id]
Mark notification as read.

**Authentication Required:** Yes

**Response (200):**
```json
{
  "success": true,
  "notification": { ... }
}
```

### DELETE /notifications/[id]
Delete a notification.

**Authentication Required:** Yes

**Response (200):**
```json
{
  "success": true,
  "message": "Notification deleted"
}
```

---

## Search Endpoint

### GET /search
Advanced property search.

**Query Parameters:**
- `q` - Search query
- `city` - Filter by city
- `minPrice` - Minimum price
- `maxPrice` - Maximum price
- `bedrooms` - Minimum bedrooms
- `propertyType` - Property type
- `page` - Page number
- `limit` - Items per page

**Response (200):**
```json
{
  "success": true,
  "properties": [ ... ],
  "pagination": { ... }
}
```

---

## Stats Endpoint

### GET /stats
Get platform statistics.

**Response (200):**
```json
{
  "success": true,
  "stats": {
    "users": 150,
    "properties": 45,
    "bookings": 320,
    "reviews": 280,
    "bookingStatusBreakdown": {
      "pending": 10,
      "confirmed": 50,
      "completed": 250,
      "cancelled": 10
    },
    "userRoles": {
      "renter": 120,
      "landlord": 25,
      "admin": 5
    }
  }
}
```

---

## Error Responses

All endpoints follow standard HTTP status codes:

- `200` - OK
- `201` - Created
- `400` - Bad Request
- `401` - Unauthorized
- `403` - Forbidden
- `404` - Not Found
- `409` - Conflict
- `500` - Server Error

**Error Response Format:**
```json
{
  "success": false,
  "error": "Error message describing what went wrong"
}
```

---

## Rate Limiting
API requests are rate limited to 100 requests per minute per IP address.

---

## User Roles & Permissions

| Action | Renter | Landlord | Admin |
|--------|--------|----------|-------|
| Browse Properties | ✓ | ✓ | ✓ |
| Create Property | ✗ | ✓ | ✓ |
| Create Booking | ✓ | ✗ | ✓ |
| Post Review | ✓ | ✓ | ✓ |
| Manage Admin Panel | ✗ | ✗ | ✓ |
| View Analytics | ✗ | ✓ | ✓ |

