export let token = '';

// updates token when user registers, signs in, or signs out
export const setToken = (newToken) => {
  token = newToken;
};

// sends a request to register a new user
export const registerUser = async (email, username, password) => {
  const reqBody = JSON.stringify({ email, username, password });

  const response = await fetch('/api/users/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: reqBody,
  });

  if (response.ok) {
    const body = await response.json();
    setToken(body.token);
    return body.username;
  } else {
    const errorBody = await response.json();
    throw new Error(errorBody.error);
  }
};

// sends a request to sign in an existing user
export const signInUser = async (username, password) => {
  const reqBody = JSON.stringify({ username, password });

  const response = await fetch('/api/users/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: reqBody,
  });

  if (response.ok) {
    const body = await response.json();
    setToken(body.token);
    return body.username;
  } else {
    const errorBody = await response.json();
    throw new Error(errorBody.error);
  }
};
