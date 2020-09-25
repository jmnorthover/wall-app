import React from 'react';
import '../ComponentStyles/Post.css';

const Post = ({ post }) => {
  return (
    <div className="post">
      <div className="author">Post by {post.author.username}</div>
      <div className="content">{post.content}</div>
    </div>
  );
};

export default Post;
