const express = require('express');
const fs = require('fs');
const app = express();
const morgan = require('morgan');
const { getAllTours, getTour, updateTour, deleteTour } = require('./controllers/tourController.controllers');
const { getAllUsers, getUser, updateUser, deleteUser } = require('./controllers/userController.controllers');
const tourRouter = require('./routes/tourRoutes.routes');
const userRouter = require('./routes/userRoutes.routes');

// Middlewares
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}
app.use(morgan('dev'));
app.use(express.json());

// Routes
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

module.exports = app;
