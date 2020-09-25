import React, { useState } from 'react';
import Wall from './Wall';
import Home from './Home';
import '../ComponentStyles/App.css';

function App() {
  const [user, setUser] = useState('');

  /*
    If a user is signed in or continued as guest, render the Wall component
    Otherwise, show the Home component so that they can log in, register, or choose guest
  */
  const content = user ? (
    <Wall user={user} setUser={setUser} />
  ) : (
    <Home setUser={setUser} />
  );

  return <div className="App">{content}</div>;
}

export default App;
