const util = require('util');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel.models');
const catchAsync = require('../utils/catchAsync.utils');
const AppError = require('../utils/AppError.utils');

const signToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

exports.signup = catchAsync(async (req, res) => {
  const newUser = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm,
  });

  const token = signToken(newUser._id);

  res.status(201).json({
    status: 'success',
    token,
    data: {
      user: newUser,
    },
  });
});
exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  // Check if email and password exists
  if (!email || !password) {
    return next(new AppError('Please provide email and password', 400));
  }
  // Check if user exist and password is correct
  const user = await User.findOne({ email }).select('+password');
  const correctPassword = await user.correctPassword(password, user.password);
  if (!user || !correctPassword) {
    return next(new AppError('Incorrect email or password', 400));
  }

  // If everything is ok, send token to client
  const token = signToken(user._id);
  res.status(200).json({
    status: 'success',
    token,
  });
});
exports.protectRoute = catchAsync(async (req, res, next) => {
  // Getting a token and check of it is therefore
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split('')[1];
  }
  if (!token) {
    return next(
      new AppError('You are not logged in! Please log in to get access.', 401)
    );
  }
  // Verification token
  const decoded = await util.promisify(jwt.verify)(
    token,
    process.env.JWT_SECRET
  );
  // Check if user still exists
  const currentUser = await User.findById(decoded.id);
  if (!currentUser) {
    return new AppError(
      'The user belonging to this token does not longer exist',
      401
    );
  }
  // Check if user change password after the token was issues
  if (currentUser.changePasswordAfter(decoded.iat)) {
    return new AppError(
      'User recently changed password! Please log in again',
      401
    );
  }
  // Grant access to protected route
  req.user = currentUser;
  next();
});
