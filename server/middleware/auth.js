const jwt = require('jsonwebtoken');
const User = require('../schema/userSchema');
const { JWT_KEY } = require('../config/keys');

// authorization middleware for actions that require the user to be logged in
const auth = async (req, res, next) => {
  try {
    const token = req.header('Authorization').replace('Bearer ', '');
    const data = jwt.verify(token, JWT_KEY);
    const user = await User.findOne({ _id: data._id });
    if (!user) {
      throw new Error();
    }
    req.user = user;
    req.token = token;
    next();
  } catch (error) {
    res.status(401).send({ error: 'Not authorized to perform this action' });
  }
};

module.exports = auth;
