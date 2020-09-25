import React from 'react';
import '../ComponentStyles/HomeSelect.css';

// Presents options for sign in, register, or guest
const HomeSelect = ({ setSelection, setUser }) => {
  return (
    <div className="select_buttons">
      <button onClick={() => setSelection(1)}>Sign In</button>
      <button onClick={() => setSelection(2)}>Register</button>
      <button onClick={() => setUser('Guest')}>Continue as Guest</button>
    </div>
  );
};

export default HomeSelect;
