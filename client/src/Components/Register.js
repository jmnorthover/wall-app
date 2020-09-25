import React, { useState } from 'react';
import { registerUser } from '../Services/users';
import '../ComponentStyles/Register.css';

// Register component for new users
const Register = ({ setSelection, setUser }) => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const submit = (e) => {
    e.preventDefault();
    registerUser(email, username, password)
      .then((user) => setUser(user))
      .catch((error) => setErrorMessage(error.message));
  };

  return (
    <div className="register">
      <h2>Register</h2>
      {errorMessage && <div className="error">{errorMessage}</div>}
      <form onSubmit={submit}>
        <input
          required
          type="text"
          placeholder="E-Mail Address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
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

export default Register;
