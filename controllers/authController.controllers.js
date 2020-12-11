const User = require('../models/userModel.models');
const catchAsync = require('../utils/catchAsync.utils');

exports.signup = catchAsync(async (req, res) => {
  const newUser = await User.create(req.body);
  res.status(201).json({
    status: 'success',
    data: {
      user: newUser,
    },
  });
});