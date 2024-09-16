import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { isAuthenticated } from '../services/auth';

function Home() {
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    setAuthenticated(isAuthenticated());
  }, []);

  return (
    <div className="home">
      <h1>Welcome to ChatPulse</h1>
      {authenticated ? (
        <div>
          <p>You are logged in. Start chatting!</p>
          <Link to="/chat">Go to Chat Rooms</Link>
        </div>
      ) : (
        <div>
          <p>Please log in or register to start chatting.</p>
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
        </div>
      )}
    </div>
  );
}

export default Home;