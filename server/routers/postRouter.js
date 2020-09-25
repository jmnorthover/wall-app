const express = require('express');
const auth = require('../middleware/auth');
const { getAllPosts, addNewPost } = require('../services/post');

const router = express.Router();

// Get all existing wall posts
router.get('/', async (req, res) => {
  const resData = await getAllPosts();

  return res.status(resData.statusCode).json(resData.body);
});

// Add a new wall post
router.post('/', auth, async (req, res) => {
  const { postContent } = req.body;
  const { user } = req;

  const resData = await addNewPost(user, postContent);

  return res.status(resData.statusCode).json(resData.body);
});

module.exports = router;
