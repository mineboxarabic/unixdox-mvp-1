import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import { connectDatabase, disconnectDatabase } from './config/prisma';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(helmet());
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});
app.use('/api/', limiter);

// Routes
app.get('/health', (req, res) => {
  res.json({ status: 'OK', message: 'Unidox API is running' });
});

// Start Server
const startServer = async () => {
  await connectDatabase();
  
  const server = app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
    console.log(`📦 Environment: ${process.env.NODE_ENV || 'development'}`);
  });

  // Graceful shutdown
  process.on('SIGINT', async () => {
    console.log('\n⏳ Shutting down gracefully...');
    await disconnectDatabase();
    server.close(() => {
      console.log('✅ Server closed');
      process.exit(0);
    });
  });
};

startServer();

export default app;
