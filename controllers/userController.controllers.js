const User = require('../models/userModel.models');
const catchAsync = require('../utils/catchAsync.utils');
const AppError = require('../utils/AppError.utils');
const handlerFactory = require('./handlerFactoryController.controllers');

const filterObject = (obj, ...allowedFields) => {
  const newObj = {};
  Object.keys(obj).forEach((el) => {
    if (allowedFields.includes(el)) newObj[el] = obj[el];
  });
  return newObj;
};

exports.getAllUsers = handlerFactory.getAll(User);
exports.getUser = handlerFactory.getOne(User);
exports.createUser = handlerFactory.createOne(User);
exports.updateUser = handlerFactory.updateOne(User);
exports.deleteUser = handlerFactory.deleteOne(User);
exports.getUserProfile = (req, res, next) => {
  req.params.id = req.user.id;
  next();
};
exports.updateUserProfile = catchAsync(async (req, res, next) => {
  // Create error if user posts password data
  if (req.body.password || req.body.passwordConfirm) {
    return next(
      new AppError(
        'This route is not for password updates. Please use /updatePassword',
        400
      )
    );
  }
  // Filtered out unwanted fields names that are not allowed to be updated
  const filteredBody = filterObject(req.body, 'name', 'email');
  // Update user document
  const updatedUser = await User.findByIdAndUpdate(req.user.id, filteredBody, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    status: 'success',
    data: updatedUser,
  });
});
exports.deleteUserProfile = catchAsync(async (req, res, next) => {
  await User.findByIdAndUpdate(req.user.id, { active: false });

  res.status(204).json({
    status: 'success',
    data: null,
  });
});
