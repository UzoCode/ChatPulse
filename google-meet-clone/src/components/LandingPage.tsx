import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerUser, loginUser, signInWithGoogle } from '../services/auth';
import { exchangeToken } from '../services/api';

const LandingPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    try {
      if (isLogin) {
        await loginUser(email, password);
      } else {
        await registerUser(email, password);
      }
      // After successful Firebase authentication, exchange the token with your Flask server
      const accessToken = await exchangeToken();
      // Store the access token securely (e.g., in localStorage or a secure cookie)
      localStorage.setItem('accessToken', accessToken);
      navigate('/meeting');
    } catch (error) {
      console.error('Authentication error:', error);
      setError('Authentication failed. Please check your credentials and try again.');
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      const user = await signInWithGoogle();
      console.log("Successfully signed in with Google:", user);
      // After successful Google Sign-In, exchange the token with your Flask server
      const accessToken = await exchangeToken();
      console.log("Received access token:", accessToken);
      // Store the access token securely (e.g., in localStorage or a secure cookie)
      localStorage.setItem('accessToken', accessToken);
      // Force navigation to the meeting page
      window.location.href = '/meeting';
    } catch (error) {
      console.error('Google Sign-In error:', error);
      setError('Google Sign-In failed. Please try again.');
    }
  };

  const handleToggleMode = () => {
    setIsLogin(!isLogin);
    setError(null);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-custom">
        <h1 className="text-3xl font-bold text-primary mb-6 text-center">
          {isLogin ? 'Sign In' : 'Register'}
        </h1>
        {error && <p className="text-error mb-4 text-center">{error}</p>}
        <form className="space-y-4" onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border border-secondary rounded"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border border-secondary rounded"
            required
          />
          <button
            type="submit"
            className="w-full py-2 px-4 bg-primary text-white rounded hover:bg-primary-dark"
          >
            {isLogin ? 'Sign In' : 'Register'}
          </button>
        </form>
        <div className="mt-4">
          <button
            onClick={handleGoogleSignIn}
            className="w-full py-2 px-4 bg-red-500 text-white rounded hover:bg-red-600 flex items-center justify-center"
          >
            <img src="/google-icon.png" alt="Google" className="w-5 h-5 mr-2" />
            Sign in with Google
          </button>
        </div>
        <p className="mt-4 text-center">
          {isLogin ? "Don't have an account? " : "Already have an account? "}
          <button
            onClick={handleToggleMode}
            className="text-primary hover:underline"
          >
            {isLogin ? 'Register' : 'Sign In'}
          </button>
        </p>
      </div>
    </div>
  );
};

export default LandingPage;