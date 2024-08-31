require('dotenv').config();
const cookieParser = require('cookie-parser');
const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');

const connectDB = require('./config/dbConn');
const corsOptions = require('./config/corsOptions');

const errorHandler = require('./middleware/error_handler');
const verifyJWT = require('./middleware/verify_jwt');
const credentials = require('./middleware/credentials');
const { logger } = require('./middleware/log_events');

const PORT = process.env.PORT || 3500;

// Connect to MongoDB
connectDB();

const app = express();

// Custom middleware logger
app.use(logger);

// Handle options credentials check - before CORS!
// and fetch cookies credentials requirement
app.use(credentials);

// Cross Origin Resource Sharing
app.use(cors(corsOptions));

// built-in middleware to handle urlencoded form data
// 'content-type: application/x-www-form-urlencoded'
app.use(express.urlencoded({ extended: false }));

// built-in middleware for json
app.use(express.json());

// middleware for cookies
app.use(cookieParser());

// Routing

app.use('/register', require('./routes/register'));
app.use('/auth', require('./routes/auth'));
app.use('/refresh', require('./routes/refresh'));
app.use('/logout', require('./routes/logout'));

app.use(verifyJWT);
app.use('/profile', require('./routes/api/profile'));

app.all('*', (req, res) => {
  res.status(404);
  if (req.accepts('json')) {
    res.json({ message: '404 Not Found' });
  } else {
    res.type('txt').send('404 Not Found');
  }
});

app.use(errorHandler);

mongoose.connection.once('open', () => {
  console.log(`Connected to MongoDB - ${mongoose.connection.db.databaseName}`);
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});
