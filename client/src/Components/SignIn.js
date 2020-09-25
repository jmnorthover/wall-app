import React, { useState } from 'react';
import { signInUser } from '../Services/users';
import '../ComponentStyles/SignIn.css';

// Sign in component for existing users
const SignIn = ({ setSelection, setUser }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const submit = (e) => {
    e.preventDefault();
    signInUser(username, password)
      .then((user) => setUser(user))
      .catch((error) => setErrorMessage(error.message));
  };

  return (
    <div className="sign_in">
      <h2>Sign In</h2>
      {errorMessage && <div className="error">{errorMessage}</div>}
      <form onSubmit={submit}>
        <input
          required
          minLength="6"
          maxLength="30"
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          required
          minLength="6"
          maxLength="30"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Submit</button>
      </form>
      <button onClick={() => setSelection(0)}>Go Back</button>
    </div>
  );
};

export default SignIn;
