const bcrypt = require('bcrypt');
const User = require('../schema/userSchema');
const sendWelcomeEmail = require('../nodemailer/sendWelcomeEmail');

// Register a new user with the given e-mail, username, and password
const registerUser = async (email, username, password) => {
  try {
    const existingUser = await User.findOne({
      $or: [{ username }, { email }], // check if username or e-mail are already in use
    });
    if (existingUser) {
      throw new Error('Username or e-mail already in use');
    }
    const newUser = new User({ email, username, password });

    await newUser.save(); // save new user document to database

    await sendWelcomeEmail(email, username); // send welcome email

    const token = newUser.generateAuthToken(); // create JWT token for response

    return { statusCode: 201, body: { token: `Bearer ${token}`, username } };
  } catch (error) {
    return { statusCode: 400, body: { error: error.message } };
  }
};

// Log in an existing user
const loginUser = async (username, password) => {
  try {
    const user = await User.findOne({ username }); // check if the user exists
    if (!user) {
      throw new Error('User not found');
    }
    const isCorrectPassword = await bcrypt.compare(password, user.password); // check if the password is correct
    if (!isCorrectPassword) {
      throw new Error('Incorrect password');
    }
    const token = user.generateAuthToken(); // create JWT token for response

    return { statusCode: 200, body: { token: `Bearer ${token}`, username } };
  } catch (error) {
    return { statusCode: 400, body: { error: error.message } };
  }
};

module.exports = { registerUser, loginUser };
