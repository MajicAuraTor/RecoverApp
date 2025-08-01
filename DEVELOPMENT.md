# Development Guide

This guide explains how to run and develop the InDashboard full-stack application.

## Prerequisites

- Node.js (v18+)
- MongoDB (local or cloud)
- npm or yarn

## Quick Start (Recommended)

### Option 1: Run Everything Concurrently

From the root directory:

```bash
# Install all dependencies (root, frontend, and backend)
npm run install:all

# Start both frontend and backend servers
npm run dev
```

This will start:
- Backend API server on `http://localhost:5000`
- Frontend React app on `http://localhost:5173`

### Option 2: Run Servers Individually

```bash
# Terminal 1 - Backend
npm run dev:backend

# Terminal 2 - Frontend
npm run dev:frontend
```

### Option 3: Use VS Code Tasks

Press `Ctrl+Shift+P` → "Tasks: Run Task" → Choose:
- "Start Full Stack Application" (runs both)
- "Start Backend Server" (backend only)
- "Start Frontend Server" (frontend only)

## Available Scripts

### Root Level Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start both frontend and backend |
| `npm run dev:backend` | Start backend only |
| `npm run dev:frontend` | Start frontend only |
| `npm run build` | Build both for production |
| `npm run start` | Start production servers |
| `npm run install:all` | Install all dependencies |
| `npm run clean` | Clean all node_modules and dist |
| `npm run lint` | Lint both projects |
| `npm run test` | Test both projects |

### Backend Scripts (cd backend)

| Script | Description |
|--------|-------------|
| `npm run dev` | Start dev server with hot reload |
| `npm run build` | Build TypeScript to JavaScript |
| `npm start` | Start production server |
| `npm test` | Run tests |
| `npm run lint` | Run ESLint |

### Frontend Scripts (cd frontend)

| Script | Description |
|--------|-------------|
| `npm run dev` | Start Vite dev server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint |

## Environment Setup

### Backend Environment

1. Copy environment template:
   ```bash
   cd backend
   cp .env.example .env
   ```

2. Update `.env` with your settings:
   ```env
   NODE_ENV=development
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/indashboard
   JWT_SECRET=your_super_secret_jwt_key_here
   CORS_ORIGIN=http://localhost:5173
   ```

### Frontend Environment

Frontend uses Vite's built-in environment variable support. Create `.env` files in the frontend directory if needed:

```env
VITE_API_URL=http://localhost:5000/api/v1
```

## Development Workflow

### 1. First Time Setup

```bash
# Clone/navigate to project
cd project

# Install all dependencies
npm run install:all

# Setup backend environment
cd backend && cp .env.example .env
# Edit .env file with your configuration

# Start development servers
cd .. && npm run dev
```

### 2. Daily Development

```bash
# Start both servers
npm run dev

# Or use VS Code task: Ctrl+Shift+P → "Tasks: Run Task" → "Start Full Stack Application"
```

### 3. Making Changes

- **Frontend changes**: Hot reload automatically updates browser
- **Backend changes**: nodemon restarts server automatically
- **Database changes**: Update models in `backend/src/models/`
- **API changes**: Update routes in `backend/src/routes/`

## API Testing

### Using the Health Check

```bash
curl http://localhost:5000/health
```

### Authentication Flow

1. Register or login to get JWT token:
   ```bash
   curl -X POST http://localhost:5000/api/v1/auth/login \
     -H "Content-Type: application/json" \
     -d '{"email":"admin@healthcare.com","password":"admin123"}'
   ```

2. Use token in subsequent requests:
   ```bash
   curl http://localhost:5000/api/v1/auth/me \
     -H "Authorization: Bearer YOUR_JWT_TOKEN"
   ```

## Troubleshooting

### Common Issues

1. **Port already in use**:
   ```bash
   # Find and kill process using port 5000 or 5173
   netstat -ano | findstr :5000
   taskkill /PID <PID> /F
   ```

2. **MongoDB connection failed**:
   - Ensure MongoDB is running
   - Check MONGODB_URI in backend/.env
   - Verify network connectivity

3. **CORS errors**:
   - Ensure CORS_ORIGIN in backend/.env matches frontend URL
   - Check if both servers are running

4. **Dependencies issues**:
   ```bash
   # Clean and reinstall
   npm run clean
   npm run install:all
   ```

### VS Code Setup

1. **Extensions** (recommended):
   - ES7+ React/Redux/React-Native snippets
   - TypeScript Importer
   - Tailwind CSS IntelliSense
   - ESLint
   - Prettier

2. **Settings**: Workspace settings are in `.vscode/settings.json`

3. **Tasks**: Available in VS Code Command Palette (`Ctrl+Shift+P`)

## Project Structure

```
project/
├── package.json          # Root package.json with concurrent scripts
├── package-lock.json     # Root lock file
├── .vscode/
│   └── tasks.json        # VS Code tasks configuration
├── frontend/             # React application
│   ├── src/
│   ├── package.json
│   └── ...
└── backend/              # Node.js API
    ├── src/
    ├── package.json
    └── ...
```

## Building for Production

```bash
# Build both frontend and backend
npm run build

# Start production servers
npm start
```

This will:
1. Build backend TypeScript to JavaScript in `backend/dist/`
2. Build frontend React app to `frontend/dist/`
3. Start both production servers

## Contributing

1. Make changes in respective directories
2. Test locally with `npm run dev`
3. Build and test production with `npm run build && npm start`
4. Submit pull request

Happy coding! 🚀
