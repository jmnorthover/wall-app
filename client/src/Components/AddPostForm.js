import React, { useState } from 'react';
import { addNewPost } from '../Services/posts';
import '../ComponentStyles/AddPostForm.css';

const AddPostForm = ({ posts, setPosts }) => {
  const [postContent, setPostContent] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    addNewPost(postContent)
      .then((resBody) => {
        const newPostArray = [resBody, ...posts];
        setPosts(newPostArray);
      })
      .catch((error) => console.log(error.message));
  };

  return (
    <div className="add_post_form">
      <form onSubmit={handleSubmit}>
        <textarea
          required
          value={postContent}
          onChange={(e) => setPostContent(e.target.value)}
        ></textarea>
        <button type="submit">Add Post</button>
      </form>
    </div>
  );
};

export default AddPostForm;
