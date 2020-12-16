const express = require('express');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');
const AppError = require('./utils/AppError.utils');
const errorHandler = require('./controllers/errorController.controllers');
const tourRouter = require('./routes/tourRoutes.routes');
const userRouter = require('./routes/userRoutes.routes');
const reviewRouter = require('./routes/reviewRoutes.routes');

const app = express();

// Global Middlewares
// Set security HTTP headers, set various HTTP headers.
app.use(helmet());

// Development logging
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}
// Use to limit repeated requests
const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000, // One hour
  message: 'Too many requests from this IP, please try again in an hour',
});
app.use('/api', limiter);

// Body parser, reading data from body into req.body
app.use(express.json({ limit: '10kb' }));

// Data sanitization against query injection
app.use(mongoSanitize());
// Data sanitization against XSS
app.use(xss());
// Prevent parameters pollution
app.use(
  hpp({
    whitelist: [
      'duration',
      'ratingsQuantity',
      'ratingsAverage',
      'mawGroupSize',
      'difficulty',
      'price',
    ],
  })
);

// Routes
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/reviews', reviewRouter);

app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});
app.use(errorHandler);

module.exports = app;
