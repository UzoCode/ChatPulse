import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // For navigation
import authService from '../services/authService'; // Assuming authService handles login

const LoginForm = () => {
  const [usernameOrEmail, setUsernameOrEmail] = useState(''); // Allow both username and email
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const credentials = { usernameOrEmail, password }; // Pass both username/email and password

      // Use either authService or axios based on your preference
      // Option 1: Using authService (assuming it handles login logic)
      await authService.login(credentials); // Call login function from authService

      // Option 2: Using axios (direct API call)
      // const response = await axios.post('http://localhost:5000/api/login', credentials);
      // localStorage.setItem('token', response.data.token);
      // localStorage.setItem('username', response.data.username);

      setError(''); // Clear error message on successful login
      navigate('/chat'); // Redirect to chat after successful login
    } catch (err) {
      setError('Invalid credentials');
    }
  };

  // Add your desired styling here

  return (
    <form onSubmit={handleLogin}>
      <h2>Login</h2>
      <input
        type="text"
        value={usernameOrEmail}
        onChange={(e) => setUsernameOrEmail(e.target.value)}
        placeholder="Username or Email"
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
      {error && <p>{error}</p>}
    </form>
  );
};

export default LoginForm;