const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const mongoose = require('mongoose');

const authRoutes = require('./routes/auth');
const usersRoutes = require('./routes/users');
const hotelsRoutes = require('./routes/hotels');
const roomsRoutes = require('./routes/rooms');
const transactionsRoutes = require('./routes/transactions');
const dashboardRoutes = require('./routes/dashboard');
const subscribeRoutes = require('./routes/subscribe');
const headersMiddleware = require('./middleware/headers');

const app = express();
const PORT = process.env.PORT || 5000;
const MONGODB = process.env.MONGODB;
dotenv.config();

// một đối tượng body chứa dữ liệu mà đã được parsed sẽ được đưa vào request (có thể hiểu là req.body)
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Add headers before the routes are defined (support for cors)
app.use(headersMiddleware.headers);

app.use(cors());

//middleware
app.use('/api/auth', authRoutes);
app.use('/api/users', usersRoutes);
app.use('/api/hotels', hotelsRoutes);
app.use('/api/rooms', roomsRoutes);
app.use('/api/transactions', transactionsRoutes);
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/subscribe', subscribeRoutes);

mongoose
  .connect(MONGODB)
  .then(() => {
    console.log('Connected to mongoDB!');
  })
  .then(result => {
    app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
  })
  .catch(err => {
    console.log(err);
  });
