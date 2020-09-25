import React, { useState, useEffect } from 'react';
import Post from './Post';
import AddPostForm from './AddPostForm';
import { getWallPosts } from '../Services/posts';
import { setToken } from '../Services/users';
import '../ComponentStyles/Wall.css';

/*
  Displays existing wall posts and gives the user the ability to add a new post
  if they are signed in
*/
const Wall = ({ user, setUser }) => {
  const [posts, setPosts] = useState([]);

  /* 
    fetch existing wall posts from server when component renders for the
    first time 
  */
  useEffect(() => {
    getWallPosts().then((fetchedPosts) => setPosts(fetchedPosts));
  }, []);

  const signOut = () => {
    setToken('');
    setUser('');
  };

  // only display add post form if user is signed in and not a guest
  const addPost =
    user === 'Guest' ? (
      false
    ) : (
      <AddPostForm posts={posts} setPosts={setPosts} />
    );

  // create post component for each post
  const postComponents = posts.map((post) => (
    <Post post={post} key={post._id} />
  ));

  return (
    <div className="wall">
      <h1>Wall App</h1>
      <div>Signed in as {user}</div>
      <button className="sign_out_button" onClick={signOut}>
        Sign Out
      </button>
      {addPost}
      <div className="post_count">There are currently {posts.length} posts</div>
      <div className="posts">{postComponents}</div>
    </div>
  );
};

export default Wall;
