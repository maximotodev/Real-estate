# Development Guide

## Getting Started

### Prerequisites
- Node.js 18+ (preferably 20)
- MongoDB 4.4+
- npm or yarn
- Git

### Installation Steps

1. **Clone repository**
```bash
git clone <repository-url>
cd real-estate
```

2. **Install dependencies**
```bash
npm install
# or
yarn install
```

3. **Setup environment variables**
```bash
cp .env.example .env.local
```

Edit `.env.local`:
```
MONGODB_URI=mongodb://localhost:27017/realestate
JWT_SECRET=your-secret-key-here
NEXT_PUBLIC_API_URL=http://localhost:3000/api
```

4. **Start MongoDB**
```bash
# Using Docker
docker run -d -p 27017:27017 --name mongodb mongo:latest

# Or if installed locally
mongod
```

5. **Run development server**
```bash
npm run dev
# or
yarn dev
```

Visit `http://localhost:3000`

---

## Development Workflow

### Adding a New Feature

#### 1. Create Database Model (if needed)
```javascript
// src/pages/api/models/NewModel.js
import mongoose from 'mongoose';

const NewModelSchema = new mongoose.Schema({
  field1: { type: String, required: true },
  field2: { type: Number },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model('NewModel', NewModelSchema);
```

#### 2. Create Service Layer (if needed)
```javascript
// src/services/NewService.js
export class NewService {
  static validateData(data) {
    const errors = {};
    if (!data.field1) errors.field1 = 'Field1 is required';
    return {
      isValid: Object.keys(errors).length === 0,
      errors,
    };
  }
}
```

#### 3. Create API Endpoint
```javascript
// src/pages/api/newfeature/index.js
import dbConnect from '../config/database';
import { authenticateUser } from '../config/auth';
import NewModel from '../models/NewModel';
import { NewService } from '../../../services/NewService';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      await dbConnect();
      const data = await NewModel.find();
      res.status(200).json({ success: true, data });
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch' });
    }
  }

  if (req.method === 'POST') {
    try {
      await dbConnect();
      const user = await authenticateUser(req);
      
      if (!user) {
        return res.status(401).json({ error: 'Unauthorized' });
      }

      const validation = NewService.validateData(req.body);
      if (!validation.isValid) {
        return res.status(400).json({ errors: validation.errors });
      }

      const newItem = await NewModel.create(req.body);
      res.status(201).json({ success: true, data: newItem });
    } catch (error) {
      res.status(500).json({ error: 'Failed to create' });
    }
  }
}
```

#### 4. Create Frontend Component/Page
```javascript
// src/pages/newfeature.js
import { useState, useEffect } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import { useAuth } from '../hooks/useAuth';

const NewFeature = () => {
  const { user } = useAuth();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('/api/newfeature');
      setData(response.data.data);
    } catch (error) {
      toast.error('Failed to load data');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      {/* Component JSX */}
    </div>
  );
};

export default NewFeature;
```

---

## Code Style & Conventions

### JavaScript/JSX
- Use ES6+ features (const, arrow functions, template literals)
- Single quotes for strings
- Semicolons required
- 2-space indentation

### Component Structure
```javascript
import Head from 'next/head';
import { useState, useEffect } from 'react';
import axios from 'axios';

const ComponentName = () => {
  // State declarations
  const [state, setState] = useState();

  // Effects
  useEffect(() => {
    // Logic
  }, []);

  // Event handlers
  const handleEvent = () => {
    // Handler logic
  };

  // Render
  return (
    <>
      <Head>
        <title>Page Title</title>
      </Head>
      {/* JSX */}
    </>
  );
};

export default ComponentName;
```

### API Route Structure
```javascript
export default async function handler(req, res) {
  // Method check
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // DB connection
    await dbConnect();

    // Authentication
    const user = await authenticateUser(req);
    if (!user) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    // Validation
    const validation = validateInput(req.query);
    if (!validation.isValid) {
      return res.status(400).json({ errors: validation.errors });
    }

    // Logic
    const result = await Model.find();

    // Response
    return res.status(200).json({ success: true, data: result });
  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
```

---

## Database Operations

### Using MongoDB with Mongoose

#### Create
```javascript
const user = await User.create({
  name: 'John',
  email: 'john@example.com',
  password: hashedPassword,
});
```

#### Read
```javascript
// Find one
const user = await User.findById(id);

// Find multiple
const users = await User.find({ role: 'renter' });

// With pagination
const users = await User.find()
  .skip((page - 1) * limit)
  .limit(limit)
  .lean();
```

#### Update
```javascript
const user = await User.findByIdAndUpdate(
  id,
  { name: 'Updated Name' },
  { new: true } // Return updated document
);
```

#### Delete
```javascript
await User.findByIdAndDelete(id);
```

#### Aggregation
```javascript
const stats = await Booking.aggregate([
  { $match: { status: 'completed' } },
  { $group: { _id: '$status', count: { $sum: 1 } } },
]);
```

---

## Testing

### Running Tests
```bash
# Run all tests
npm test

# Run tests in watch mode
npm test -- --watch

# Run tests with coverage
npm test -- --coverage

# Run specific test file
npm test -- validators.test.js
```

### Writing Tests
```javascript
describe('ComponentName', () => {
  it('should do something', () => {
    const result = doSomething();
    expect(result).toBe(expectedValue);
  });

  it('should handle errors', () => {
    expect(() => doSomething()).toThrow();
  });
});
```

### Mocking
```javascript
// Mock function
jest.fn()

// Mock module
jest.mock('../lib/utils');

// Mock localStorage
localStorage.getItem = jest.fn(() => 'mock-token');
```

---

## Debugging

### Console Logging
```javascript
console.log('Debug info:', variable);
console.error('Error message:', error);
console.warn('Warning message');
```

### Browser DevTools
- Open DevTools (F12)
- Go to Network tab to see API calls
- Check Console for JavaScript errors
- Use Storage tab to inspect localStorage

### VS Code Debugging
Create `.vscode/launch.json`:
```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "name": "Next.js",
      "type": "node",
      "request": "launch",
      "skipFiles": ["<node_internals>/**"],
      "program": "${workspaceFolder}/node_modules/.bin/next",
      "args": ["dev"]
    }
  ]
}
```

---

## Common Tasks

### Adding a New API Endpoint
1. Create route file in `src/pages/api/`
2. Add endpoint logic
3. Update `API_DOCUMENTATION.md`
4. Add to frontend if needed

### Adding a New Page
1. Create `.js` file in `src/pages/`
2. Add Head component for SEO
3. Add authentication if needed
4. Style with Tailwind CSS

### Adding Validation
1. Add to `src/lib/validators.js`
2. Use in API routes
3. Use in frontend components

### Adding Database Field
1. Update Mongoose schema
2. Write migration (if production)
3. Update validation
4. Update API responses

---

## Performance Tips

### Frontend
- Use React.memo for components that rarely change
- Implement lazy loading for images
- Code split with dynamic imports
- Avoid inline functions in render

### Backend
- Use `.lean()` for read-only queries
- Index frequently queried fields
- Paginate large result sets
- Cache computed values

### Database
- Create indexes on `_id`, foreign keys, frequently sorted fields
- Use projection to exclude unnecessary fields
- Monitor slow queries

---

## Troubleshooting

### MongoDB Connection Error
```
Error: connect ECONNREFUSED 127.0.0.1:27017
```
Solution: Start MongoDB or check connection string

### Authentication Error
```
Error: Invalid token
```
Solution: Clear localStorage and login again

### Module Not Found
```
Error: Cannot find module
```
Solution: Install dependencies with `npm install`

### Port Already in Use
```
Error: EADDRINUSE: address already in use :::3000
```
Solution: Kill process or use different port: `PORT=3001 npm run dev`

---

## Useful Commands

```bash
# Development
npm run dev              # Start dev server
npm run build            # Build for production
npm start                # Start production server
npm test                 # Run tests
npm run lint             # Run ESLint

# Database
npm run db:seed          # Seed sample data
npm run db:migrate       # Run migrations

# Docker
docker build -t realestate:latest .
docker run -p 3000:3000 realestate:latest

# Git
git status               # Check changes
git add .                # Stage all changes
git commit -m "message"  # Commit changes
git push                 # Push to remote
```

---

## Learning Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [MongoDB/Mongoose](https://mongoosejs.com)
- [JWT.io](https://jwt.io)
- [Tailwind CSS](https://tailwindcss.com)
- [React Documentation](https://react.dev)
- [Express/HTTP Status Codes](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status)
