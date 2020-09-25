// token is needed to add new post
import { token } from './users';

// fetches existing wall posts and returns an array of post objects
export const getWallPosts = async () => {
  const response = await fetch('/api/posts');
  const resData = await response.json();
  return resData.posts;
};

/* sends a request to add a new post and returns the details of the new post
   if successful */
export const addNewPost = async (postContent) => {
  const reqBody = JSON.stringify({ postContent });

  const response = await fetch('/api/posts', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: token,
    },
    body: reqBody,
  });

  if (response.ok) {
    const resBody = await response.json();
    return resBody;
  } else {
    throw new Error('Failed to add post');
  }
};
