const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const passport = require('passport');
const cors = require('cors');
const RedisStore = require('connect-redis')(session);
const redis = require('redis');
require('dotenv').config();
require('./config/passport');
const authRoutes = require('./routes/auth');
const chatRoutes = require('./routes/chat');
const automationRoutes = require('./routes/automation');

const app = express();

// Middleware
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));
app.use(express.json());
app.use(session({
  store: new RedisStore({ client: redis.createClient({ url: process.env.REDIS_URL }) }),
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false }
}));
app.use(passport.initialize());
app.use(passport.session());

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error(err));

// Routes
app.use('/auth', authRoutes);
app.use('/chat', chatRoutes);
app.use('/automation', automationRoutes);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));