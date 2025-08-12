import dotenv from 'dotenv';
import path from 'path';

// Load environment variables FIRST - before any other imports
dotenv.config({ path: path.join(__dirname, '../../.env') });

import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import rateLimit from 'express-rate-limit';
import fs from 'fs';
import https from 'https';

// Import routes
import authRoutes from './routes/auth';
import userRoutes from './routes/users';
import contentRoutes from './routes/content';
import dashboardRoutes from './routes/dashboard';
import uploadRoutes from './routes/upload';
import dataRoutes from './routes/data'; // 🆕 New data routes for MySQL

// Import middleware
import { errorHandler } from './middleware/errorHandler';
import { notFound } from './middleware/notFound';
import { connectDB } from './config/database';

const app = express();
const PORT = process.env.PORT || 5000;
const HTTPS_PORT = process.env.HTTPS_PORT || 5443;

// Connect to database
connectDB();

// Security middleware
app.use(helmet());

// Rate limiting
const limiter = rateLimit({
  windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS || '900000'), // 15 minutes
  max: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS || '100'), // limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again later.',
});
app.use(limiter);

// CORS configuration
const corsOptions = {
  origin: process.env.CORS_ORIGIN || 'http://localhost:5173',
  credentials: true,
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));

// Logging middleware
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
} else {
  app.use(morgan('combined'));
}

// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Static files
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: process.env.NODE_ENV,
  });
});

// API routes
const apiPrefix = process.env.API_PREFIX || '/api';
const apiVersion = process.env.API_VERSION || 'v1';

app.use(`${apiPrefix}/${apiVersion}/auth`, authRoutes);
app.use(`${apiPrefix}/${apiVersion}/users`, userRoutes);
app.use(`${apiPrefix}/${apiVersion}/content`, contentRoutes);
app.use(`${apiPrefix}/${apiVersion}/dashboard`, dashboardRoutes);
app.use(`${apiPrefix}/${apiVersion}/upload`, uploadRoutes);
app.use(`${apiPrefix}/${apiVersion}/data`, dataRoutes); // 🆕 MySQL data endpoints

// Error handling middleware
app.use(notFound);
app.use(errorHandler);

// HTTPS Configuration for PHI/PII Protection
const startSecureServer = () => {
  try {
    // Check if SSL certificates exist
    const keyPath = path.join(__dirname, '../localhost+2-key.pem');
    const certPath = path.join(__dirname, '../localhost+2.pem');
    
    if (fs.existsSync(keyPath) && fs.existsSync(certPath)) {
      const httpsOptions = {
        key: fs.readFileSync(keyPath),
        cert: fs.readFileSync(certPath)
      };
      
      // Start HTTPS server for PHI protection
      https.createServer(httpsOptions, app).listen(HTTPS_PORT, () => {
        console.log(`🔒 HTTPS Server running on port ${HTTPS_PORT} (PHI/PII Protected)`);
        console.log(`🔗 Secure API: https://localhost:${HTTPS_PORT}${apiPrefix}/${apiVersion}`);
        console.log(`📊 Secure Health check: https://localhost:${HTTPS_PORT}/health`);
      });
    } else {
      console.log(`⚠️  SSL certificates not found. HTTPS disabled.`);
      console.log(`📝 To enable HTTPS for PHI protection:`);
      console.log(`   1. Install mkcert: https://github.com/FiloSottile/mkcert`);
      console.log(`   2. Run: mkcert localhost 127.0.0.1 ::1`);
      console.log(`   3. Move certificates to backend/ directory`);
    }
  } catch (error) {
    console.log(`⚠️  Could not start HTTPS server:`, error instanceof Error ? error.message : error);
  }
};

// Start HTTP server (for development)
app.listen(PORT, () => {
  console.log(`🚀 HTTP Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
  console.log(`📊 Health check available at http://localhost:${PORT}/health`);
  console.log(`🔗 API endpoints available at http://localhost:${PORT}${apiPrefix}/${apiVersion}`);
  
  // Start HTTPS server for PHI protection
  startSecureServer();
});

export default app;
