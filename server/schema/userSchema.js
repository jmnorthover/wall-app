const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { JWT_KEY } = require('../config/keys');

const { Schema } = mongoose;

// User schema contains validation for registration info
const userSchema = new Schema({
  email: {
    type: String,
    required: [true, 'E-mail required'],
    unique: true,
    validate: {
      validator: (email) => {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email); // regex to ensure email is formatted correctly
      },
      message: 'E-mail is not valid',
    },
  },
  username: {
    type: String,
    required: [true, 'Username required'],
    unique: true,
    minlength: [6, 'Username must be longer than 6 characters'],
    maxlength: [30, 'Username must be shorter than 30 characters'],
  },
  password: {
    type: String,
    required: [true, 'Password required'],
    minlength: [6, 'Password must be longer than 6 characters'],
    maxlength: [30, 'Password must be shorter than 30 characters'],
  },
});

// Hash the user's password before saving it
userSchema.pre('save', async function (next) {
  const user = this;
  if (user.isNew || user.isModified('password')) {
    user.password = await bcrypt.hash(user.password, 10);
  }
  next();
});

// Generate an auth token for the user
userSchema.methods.generateAuthToken = function () {
  const user = this;
  const token = jwt.sign({ _id: user._id }, JWT_KEY);
  return token;
};

module.exports = mongoose.models.User || mongoose.model('User', userSchema);
