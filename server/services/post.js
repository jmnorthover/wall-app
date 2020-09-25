const Post = require('../schema/postSchema');

// Retrieves all existing posts on the wall
const getAllPosts = async () => {
  const posts = await Post.find({})
    .select('-__v')
    .populate('author', 'username -_id');
  return { statusCode: 200, body: { posts: posts.reverse() } };
};

// Adds a new post to the wall
// Post document references the user who created it
const addNewPost = async (user, postContent) => {
  try {
    const newPost = new Post({ author: user._id, content: postContent });
    const addedPost = await newPost.save();

    return {
      statusCode: 200,
      body: {
        _id: addedPost._id,
        author: { username: user.username },
        content: postContent,
      },
    };
  } catch (error) {
    return { statusCode: 400, body: { error } };
  }
};

module.exports = { getAllPosts, addNewPost };
