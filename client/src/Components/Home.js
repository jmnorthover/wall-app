import React, { useState } from 'react';
import HomeSelect from './HomeSelect';
import SignIn from './SignIn';
import Register from './Register';
import '../ComponentStyles/Home.css';

// Home component gives users the options to sign in, register, or choose guest
const Home = ({ setUser }) => {
  const [selection, setSelection] = useState(0);

  let content;

  if (selection === 0) {
    content = <HomeSelect setSelection={setSelection} setUser={setUser} />;
  } else if (selection === 1) {
    content = <SignIn setSelection={setSelection} setUser={setUser} />;
  } else if (selection === 2) {
    content = <Register setSelection={setSelection} setUser={setUser} />;
  }

  return (
    <div className="home">
      <h1>Wall App</h1>
      <div>{content}</div>
    </div>
  );
};

export default Home;
