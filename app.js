import { config } from 'dotenv';
if (process.env.NODE_ENV !== 'production') {
  config();
}

import path from 'path';
import express from 'express';
import rateLimit from 'express-rate-limit';
import { fileURLToPath } from 'url';
import csrf from 'csrf';
import mongoose from 'mongoose';
import flash from 'connect-flash';
import session from 'express-session';
import connectMongoDBSession from 'connect-mongodb-session';
import { registerValidation, globalErrorHandler } from './utils/errorHandlers.js';
import Multer from './routes/multerRoutes.js';

// Initialize MongoDB store
const MongoDBStore = connectMongoDBSession(session);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Create Express app
const app = express();

// Redirect to the proper domain and enforce HTTPS
app.use((req, res, next) => {
  const isLocalhost = req.headers.host.includes('localhost');
  if (!isLocalhost && req.headers.host !== 'www.website.com') {
    const secureUrl = `https://www.website.com${req.originalUrl}`;
    return res.redirect(301, secureUrl);
  } else if (req.headers['x-forwarded-proto'] !== 'https' && process.env.NODE_ENV === 'production') {
    const secureUrl = `https://${req.headers.host}${req.originalUrl}`;
    return res.redirect(301, secureUrl);
  }
  next();
});

// MongoDB connection string
const DB = process.env.MONGODB_URI;

// EJS setup
app.set('view engine', 'ejs');

// Middleware setup
app.use(flash());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static('public'));

// Rate limiting
app.use(rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
}));

// CSRF protection
const tokens = new csrf();

app.use((req, res, next) => {
  if (!req.session.csrfSecret) {
    req.session.csrfSecret = tokens.secretSync();
  }
  res.locals.csrfToken = tokens.create(req.session.csrfSecret);
  next();
});

app.use((req, res, next) => {
  if (['POST', 'PUT', 'DELETE'].includes(req.method)) {
    const token = req.body._csrf || req.query._csrf || req.headers['x-csrf-token'];
    if (!tokens.verify(req.session.csrfSecret, token)) {
      const error = new Error('Invalid CSRF token');
      error.status = 403;
      return next(error);
    }
  }
  next();
});

app.use((req, res, next) => {
  res.locals.isUserActive = req.session.userIsActive;
  next();
});

// Logging incoming requests for debugging
app.use((req, res, next) => {
  console.log(`Incoming request: ${req.method} ${req.url}`);
  next();
});

// Session store setup
const store = new MongoDBStore({
  uri: DB,
  collection: 'sessions',
  expires: 3 * 24 * 60 * 60 * 1000, // 3 days in milliseconds
});

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  store: store,
  cookie: {
    maxAge: 3 * 24 * 60 * 60 * 1000, // Same value as expires for the cookie
  },
}));

// Multer middleware
app.use(Multer);

// 404 error handler
app.use((req, res, next) => {
  console.log(`404 error: ${req.method} ${req.url}`);
  const error = new Error('Page not found');
  error.status = 404;
  next(error);
});

// Global error handler
app.use(globalErrorHandler);

// Start server
const PORT = process.env.PORT || 3001;

const db_connect = async () => {
  try {
    await mongoose.connect(DB);
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB', error);
    throw error;
  }
};

db_connect().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}).catch(err => {
  console.error('Failed to connect to MongoDB', err);
});
