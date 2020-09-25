const express = require('express');
const { registerUser, loginUser } = require('../services/user');

const router = express.Router();

// Register a new user with a username and password
router.post('/register', async (req, res) => {
  const { email, username, password } = req.body;

  const resData = await registerUser(email, username, password);

  res.status(resData.statusCode).json(resData.body);
});

// Attempt to login a user
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  const resData = await loginUser(username, password);

  res.status(resData.statusCode).json(resData.body);
});

module.exports = router;
