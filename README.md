# Recover – A patient-centered app for surgery prep and recovery

![Node.js](https://img.shields.io/badge/Node.js-18+-green)
![React](https://img.shields.io/badge/React-18-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5+-blue)
![MySQL](https://img.shields.io/badge/MySQL-8.0+-orange)

Recover helps patients follow personalized care plans by delivering clear instructions, timely reminders, and automated access to medical supplies. Built for all ages and tech skill levels, the app bridges the gap between medical advice and real-world recovery through education, task tracking, and support tools — all in one easy-to-use platform.

## 📋 Table of Contents

- [Project Structure](#project-structure)
- [Quick Start](#quick-start)
- [Available Scripts](#available-scripts)
- [Database Setup](#database-setup)
- [Features](#features)
- [API Endpoints](#api-endpoints)
- [Demo Credentials](#demo-credentials)
- [Development](#development)
- [Environment Configuration](#environment-configuration)
- [Technology Stack](#technology-stack)
- [Contributing](#contributing)

## 🏗️ Project Structure

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
├── backend/           # Node.js + Express + MySQL backend
│   ├── src/
│   │   ├── config/        # Database & app configuration
│   │   ├── controllers/   # Route controllers
│   │   ├── middleware/    # Custom middleware
│   │   ├── models/        # Database models (MySQL)
│   │   ├── routes/        # API routes
│   │   └── server.ts      # Main server file
│   ├── uploads/           # File uploads
│   └── package.json
│
└── README.md          # This file
```

## 🚀 Quick Start

### Prerequisites

- Node.js (v18+)
- MySQL Server (8.0+) or MySQL Workbench
- npm or yarn

### Development Setup

1. **Install all dependencies:**

   ```bash
   npm run install:all
   ```

2. **Setup MySQL database:**

   - Install MySQL Server or use MySQL Workbench
   - Create database `your_database_name`
   - Run the schema from `backend/comprehensive_schema.sql`
   - See [MYSQL_SETUP.md](MYSQL_SETUP.md) for detailed instructions

3. **Setup backend environment:**

   ```bash
   cd backend
   cp .env.example .env
   # Edit .env with your MySQL configuration
   cd ..
   ```

4. **Start both servers concurrently:**
   ```bash
   npm run dev
   ```

This will start:

- Backend API server at `http://localhost:5000`
- Frontend React app at `http://localhost:5175`

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

## 📜 Available Scripts

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

## 🗄️ Database Setup

### MySQL Installation & Configuration

1. **Install MySQL:**

   - Download MySQL Server 8.0+ from [MySQL Official Site](https://dev.mysql.com/downloads/mysql/)
   - Or install MySQL Workbench for GUI management

2. **Create Database:**

   ```sql
   CREATE DATABASE your_database_name;
   USE your_database_name;
   ```

3. **Run Schema:**

   - Execute `backend/comprehensive_schema.sql` in MySQL Workbench
   - Or use command line: `mysql -u root -p your_database_name < backend/comprehensive_schema.sql`

4. **Verify Setup:**
   - Check that all tables are created
   - Admin user should be automatically created
   - Test connection with your application

For detailed instructions, see [MYSQL_SETUP.md](MYSQL_SETUP.md)

## ✨ Features

### Frontend

- 🎨 Modern React + TypeScript + Vite
- 🎯 Tailwind CSS for styling
- 👥 Role-based UI (Admin/User)
- 📱 Responsive design
- 🔄 Real-time updates
- 📚 Content management
- 📁 File upload support

### Backend

- 🚀 Express.js REST API
- 🔐 JWT Authentication
- 🗄️ MySQL Database with comprehensive schema
- 👤 User management with role-based access
- 📝 Content CRUD operations
- ⏰ User reminders and milestone tracking
- 📈 Daily health reports (mood, pain, activity)
- 📁 File upload handling with Multer
- 🛡️ Security middleware
- 📝 Request logging
- 🔧 Environment configuration

## 🔌 API Endpoints

### Authentication

- `POST /api/v1/auth/register` - Register user
- `POST /api/v1/auth/login` - Login user
- `POST /api/v1/auth/logout` - Logout user
- `GET /api/v1/auth/me` - Get current user
- `POST /api/v1/auth/forgotpassword` - Forgot password
- `PUT /api/v1/auth/resetpassword/:token` - Reset password
- `PUT /api/v1/auth/updatepassword` - Update password

### Dashboard & Analytics

- `GET /api/v1/dashboard/stats` - Get dashboard statistics
- `GET /api/v1/dashboard/recent-activity` - Get recent activity
- `GET /api/v1/data/analytics` - Get analytics data

### Content Management

- `GET /api/v1/content` - Get all content
- `POST /api/v1/content` - Create content (Admin)
- `PUT /api/v1/content/:id` - Update content (Admin)
- `DELETE /api/v1/content/:id` - Delete content (Admin)

### User Management

- `GET /api/v1/users` - Get all users (Admin)
- `GET /api/v1/users/:id` - Get user by ID
- `PUT /api/v1/users/:id` - Update user
- `DELETE /api/v1/users/:id` - Delete user (Admin)

### File Upload

- `POST /api/v1/upload/single` - Upload file

## 🔑 Demo Credentials

| Role | Email | Password |
|------|-------|----------|
| **Admin** | `admin@example.com` | `demo123` |
| **User** | `user@example.com` | `demo123` |

> ⚠️ **Note**: These are demo credentials for testing purposes only. Change these in production!

## 💻 Development

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

## ⚙️ Environment Configuration

### Backend (.env)

```env
NODE_ENV=development
PORT=5000

# MySQL Database Configuration
DB_HOST=localhost
DB_PORT=3306
DB_NAME=your_database_name
DB_USER=your_database_user
DB_PASSWORD=your_database_password

# JWT Configuration
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRE=30d

# CORS Configuration
CORS_ORIGIN=http://localhost:5175

# File Upload Configuration
MAX_FILE_SIZE=10485760
ALLOWED_FILE_TYPES=image/jpeg,image/png,image/gif,video/mp4,application/pdf
```

### Frontend

Vite automatically loads environment variables from `.env` files.

## 🛠️ Technology Stack

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
- **MySQL** - Relational database
- **mysql2** - MySQL driver
- **JWT** - Authentication
- **bcryptjs** - Password hashing
- **Multer** - File uploads
- **CORS** - Cross-origin resource sharing

### Database Schema

- **Users** - Authentication and user management
- **Content Items** - Tutorials, exercises, articles, videos
- **User Reminders** - Personal reminders system
- **User Milestones** - Goal tracking and progress
- **Daily Reports** - Health tracking (mood, pain, activity)
- **User Activities** - Activity logging and analytics

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request
