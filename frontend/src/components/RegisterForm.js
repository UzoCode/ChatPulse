// src/components/RegisterForm.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // For navigation

const RegisterForm = () => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); // Hook for navigation

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/register', { email, username, password });
      navigate('/login'); // Redirect to login after registration
    } catch (error) {
      console.error('Registration failed:', error);
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
    <form onSubmit={handleRegister} style={formStyle}>
      <h2>Register</h2>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        required
      />
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Username"
        required
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        required
      />
      <button type="submit">Register</button>
    </form>
  );
};

export default RegisterForm;
