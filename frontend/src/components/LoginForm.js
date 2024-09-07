// src/components/LoginForm.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // For navigation
import axios from 'axios'; // For API requests

const LoginForm = () => {
  const [emailOrUsername, setEmailOrUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); // Hook for navigation

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/login', { emailOrUsername, password });
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('username', response.data.username); // Store username in localStorage
      navigate('/chat'); // Redirect to real-time chat after successful login
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  const formStyle = {
    width: '300px', // Smaller form
    margin: '0 auto',
    padding: '20px',
    border: '1px solid lightgray',
    borderRadius: '5px',
  };

  return (
    <form onSubmit={handleLogin} style={formStyle}>
      <h2>Login</h2>
      <input
        type="text"
        value={emailOrUsername}
        onChange={(e) => setEmailOrUsername(e.target.value)}
        placeholder="Email or Username"
        required
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        required
      />
      <button type="submit">Login</button>
    </form>
  );
};

export default LoginForm;
