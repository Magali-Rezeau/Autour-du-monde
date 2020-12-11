const express = require('express');
const morgan = require('morgan');
const AppError = require('./utils/AppError.utils');
const errorHandler = require('./controllers/errorController.controllers');
const tourRouter = require('./routes/tourRoutes.routes');
const userRouter = require('./routes/userRoutes.routes');

const app = express();

// Middlewares
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}
app.use(morgan('dev'));
app.use(express.json());

// Routes
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);
app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});
app.use(errorHandler);

module.exports = app;
