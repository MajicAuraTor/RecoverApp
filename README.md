# InDashboard - Healthcare Content Management System

A comprehensive healthcare content management system with separate frontend and backend applications.

## Project Structure

```
project/
├── frontend/          # React + TypeScript frontend
│   ├── src/
│   │   ├── components/
│   │   │   ├── admin/     # Admin dashboard components
│   │   │   ├── user/      # User dashboard components  
│   │   │   └── shared/    # Shared components
│   │   ├── types/
│   │   └── utils/
│   ├── package.json
│   ├── vite.config.ts
│   └── tailwind.config.js
│
├── backend/           # Node.js + Express + MongoDB backend
│   ├── src/
│   │   ├── config/        # Database & app configuration
│   │   ├── controllers/   # Route controllers
│   │   ├── middleware/    # Custom middleware
│   │   ├── models/        # Database models
│   │   ├── routes/        # API routes
│   │   └── server.ts      # Main server file
│   ├── uploads/           # File uploads
│   └── package.json
│
└── README.md          # This file
```

## Quick Start

### Prerequisites
- Node.js (v18+)
- MongoDB (local or cloud)
- npm or yarn

### Development Setup

1. **Install all dependencies:**
   ```bash
   npm run install:all
   ```

2. **Setup backend environment:**
   ```bash
   cd backend
   cp .env.example .env
   # Edit .env with your configuration
   cd ..
   ```

3. **Start both servers concurrently:**
   ```bash
   npm run dev
   ```

This will start:
- Backend API server at `http://localhost:5000`
- Frontend React app at `http://localhost:5173`

### Alternative: Individual Server Setup

#### Backend Only
```bash
npm run dev:backend
```

#### Frontend Only  
```bash
npm run dev:frontend
```

### VS Code Tasks
Use `Ctrl+Shift+P` → "Tasks: Run Task" → "Start Full Stack Application"

## Available Scripts

### Root Level (Concurrent)
- `npm run dev` - Start both frontend and backend
- `npm run build` - Build both for production  
- `npm run start` - Start production servers
- `npm run install:all` - Install all dependencies
- `npm run clean` - Clean all node_modules and dist folders
- `npm run lint` - Lint both projects
- `npm run test` - Test both projects

### Individual Projects
- `npm run dev:backend` - Start backend only
- `npm run dev:frontend` - Start frontend only
- `npm run build:backend` - Build backend only
- `npm run build:frontend` - Build frontend only

See [DEVELOPMENT.md](DEVELOPMENT.md) for detailed development guide.

## Features

### Frontend
- 🎨 Modern React + TypeScript + Vite
- 🎯 Tailwind CSS for styling
- 👥 Role-based UI (Admin/User)
- 📱 Responsive design
- 🔄 Real-time updates
- 📋 Dashboard analytics
- 📚 Content management
- 📁 File upload support

### Backend
- 🚀 Express.js REST API
- 🔐 JWT Authentication
- 👤 User management
- 📝 Content CRUD operations
- 📊 Dashboard analytics
- 📁 File upload handling
- 🛡️ Security middleware
- 📝 Request logging
- 🔧 Environment configuration

## API Endpoints

### Authentication
- `POST /api/v1/auth/register` - Register user
- `POST /api/v1/auth/login` - Login user  
- `GET /api/v1/auth/me` - Get current user

### Dashboard
- `GET /api/v1/dashboard/stats` - Get statistics
- `GET /api/v1/dashboard/recent-activity` - Get recent activity

### Content Management
- `GET /api/v1/content` - Get all content
- `POST /api/v1/content` - Create content (Admin)
- `PUT /api/v1/content/:id` - Update content (Admin)
- `DELETE /api/v1/content/:id` - Delete content (Admin)

### File Upload
- `POST /api/v1/upload/single` - Upload file

## Demo Credentials

**Admin Account:**
- Email: `admin@healthcare.com`
- Password: `admin123`

## Development

### Running Both Servers

You can run both frontend and backend simultaneously:

```bash
# Terminal 1 - Backend
cd backend && npm run dev

# Terminal 2 - Frontend  
cd frontend && npm run dev
```

### Building for Production

```bash
# Build backend
cd backend && npm run build

# Build frontend
cd frontend && npm run build
```

## Environment Configuration

### Backend (.env)
```env
NODE_ENV=development
PORT=5000
MONGODB_URI=mongodb://localhost:27017/indashboard
JWT_SECRET=your_secret_key
CORS_ORIGIN=http://localhost:5173
```

### Frontend
Vite automatically loads environment variables from `.env` files.

## Technology Stack

### Frontend
- **React 18** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **Lucide React** - Icons

### Backend
- **Node.js** - Runtime
- **Express.js** - Web framework
- **TypeScript** - Type safety
- **MongoDB** - Database
- **Mongoose** - ODM
- **JWT** - Authentication
- **bcryptjs** - Password hashing
- **Multer** - File uploads

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

MIT License - see LICENSE file for details
