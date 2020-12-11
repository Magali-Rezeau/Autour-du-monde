const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const schema = mongoose.Schema;

const userSchema = schema({
  name: {
    type: String,
    required: [true, 'Please tell us your name'],
    unique: true,
    trim: true,
    maxlength: [20, 'A user name must have less or equal then 20 characters'],
    minlength: [2, 'A user name must have more or equal then 2 characters'],
    validate: [validator.isAlpha, 'User name must only contain characters'],
  },
  email: {
    type: String,
    required: [true, 'Please provide your email'],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, 'Please provide a valid email'],
  },
  photo: {
    type: String,
  },
  password: {
    type: String,
    required: [true, 'Please provide a password'],
    minlength: [8, 'A password must have more or equal then 8 characters'],
  },
  passwordConfirm: {
    type: String,
    required: [true, 'Please confirm your password'],
    validate: {
      // Only works on Create and Save
      validator: function (el) {
        return el === this.password;
      },
    },
  },
});

userSchema.pre('save', async function (next) {
  // Only run if password was actually modified
  if (!this.isModified('password')) return next();
  // Hash the password with cost of 12
  this.password = await bcrypt.hash(this.password, 12);
  // Delete passwordConfirm field
  this.passwordConfirm = undefined;

  next();
});

const User = mongoose.model('User', userSchema);

module.exports = User;