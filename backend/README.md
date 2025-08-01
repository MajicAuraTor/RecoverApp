# InDashboard Backend API

Backend API server for the InDashboard healthcare content management system.

## Features

- 🔐 JWT Authentication & Authorization
- 👥 User Management (Admin/User roles)
- 📝 Content Management System
- 📊 Dashboard Analytics
- 📁 File Upload Support
- 🛡️ Security Middleware (Helmet, CORS, Rate Limiting)
- 📝 Request Logging
- 🔧 Environment Configuration
- 📦 MongoDB Integration

## Tech Stack

- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **TypeScript** - Type safety
- **MongoDB** - Database
- **Mongoose** - ODM
- **JWT** - Authentication
- **bcryptjs** - Password hashing
- **Multer** - File uploads

## Quick Start

### Prerequisites

- Node.js (v18+)
- MongoDB (local or cloud)
- npm or yarn

### Installation

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create environment file:
   ```bash
   cp .env.example .env
   ```

4. Update the `.env` file with your configuration:
   ```env
   NODE_ENV=development
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/indashboard
   JWT_SECRET=your_super_secret_jwt_key_here
   ```

5. Create uploads directory:
   ```bash
   mkdir uploads
   ```

6. Start the development server:
   ```bash
   npm run dev
   ```

The server will start on `http://localhost:5000`

## API Endpoints

### Authentication
- `POST /api/v1/auth/register` - Register new user
- `POST /api/v1/auth/login` - Login user
- `POST /api/v1/auth/logout` - Logout user
- `GET /api/v1/auth/me` - Get current user
- `PUT /api/v1/auth/profile` - Update user profile

### Users (Admin only)
- `GET /api/v1/users` - Get all users
- `GET /api/v1/users/:id` - Get user by ID
- `PUT /api/v1/users/:id` - Update user
- `DELETE /api/v1/users/:id` - Delete user

### Content
- `GET /api/v1/content` - Get all content
- `POST /api/v1/content` - Create content (Admin only)
- `GET /api/v1/content/:id` - Get content by ID
- `PUT /api/v1/content/:id` - Update content (Admin only)
- `DELETE /api/v1/content/:id` - Delete content (Admin only)

### Dashboard
- `GET /api/v1/dashboard/stats` - Get dashboard statistics
- `GET /api/v1/dashboard/recent-activity` - Get recent activity

### File Upload
- `POST /api/v1/upload/single` - Upload single file

### Health Check
- `GET /health` - Server health status

## Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm test` - Run tests
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Fix ESLint issues

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `NODE_ENV` | Environment mode | `development` |
| `PORT` | Server port | `5000` |
| `MONGODB_URI` | MongoDB connection string | `mongodb://localhost:27017/indashboard` |
| `JWT_SECRET` | JWT secret key | Required |
| `JWT_EXPIRE` | JWT expiration time | `7d` |
| `BCRYPT_ROUNDS` | bcrypt salt rounds | `12` |
| `CORS_ORIGIN` | Allowed CORS origin | `http://localhost:5173` |
| `MAX_FILE_SIZE` | Max upload file size | `10485760` (10MB) |

## Project Structure

```
backend/
├── src/
│   ├── config/         # Configuration files
│   ├── controllers/    # Route controllers
│   ├── middleware/     # Custom middleware
│   ├── models/         # Database models
│   ├── routes/         # API routes
│   ├── services/       # Business logic
│   ├── types/          # TypeScript types
│   ├── utils/          # Utility functions
│   └── server.ts       # Main server file
├── uploads/            # File uploads directory
├── dist/              # Compiled JavaScript
├── .env.example       # Environment template
├── package.json       # Dependencies
└── tsconfig.json      # TypeScript config
```

## Authentication

The API uses JWT (JSON Web Tokens) for authentication. Include the token in the Authorization header:

```
Authorization: Bearer <your_jwt_token>
```

## Error Handling

All API responses follow a consistent format:

```json
{
  "success": true|false,
  "message": "Response message",
  "data": {}, // Only on success
  "error": "Error message" // Only on failure
}
```

## Development

### Adding New Routes

1. Create controller in `src/controllers/`
2. Create route file in `src/routes/`
3. Import and use in `src/server.ts`

### Adding New Models

1. Create model in `src/models/`
2. Define TypeScript interfaces
3. Add validation and middleware

## License

MIT
