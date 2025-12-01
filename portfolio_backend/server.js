// server.js (ES Modules, MongoDB only)

import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { connectDB } from './db.js'; // You will request this file later
import contactController from './contactControlller.js';

const app = express();
const PORT = Number(process.env.PORT) || 5000;

// Security middleware
app.use(helmet());

// Logging middleware (disabled in production)
if (process.env.NODE_ENV !== 'production') {
  app.use(morgan('dev'));
}

// CORS setup
const corsOptions = {
  origin: process.env.CORS_ORIGINS
    ? process.env.CORS_ORIGINS.split(',')
    : ['http://localhost:3000', 'http://localhost:3001'],
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  credentials: true,
};

app.use(cors(corsOptions));

// JSON & form parser
app.use(express.json({ limit: '5mb' }));
app.use(express.urlencoded({ extended: true }));

// Health check route
app.get('/', (req, res) => {
  res.json({ status: 'ok', server: 'running', uptime: process.uptime() });
});

// 404 route
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

app.post("/api/contact",contactController.addContact)
// Error handler
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  console.error('ERROR:', err);
  res.status(err.status || 500).json({ error: err.message || 'Internal Server Error' });
});

// Start server after DB connection
async function startServer() {
  try {
    await connectDB(); // Will work when db.js is added
    console.log('✔ MongoDB connected');

    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error('❌ Failed to start server:', error);
    process.exit(1);
  }
}

startServer();
