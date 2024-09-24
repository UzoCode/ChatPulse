import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword, signInWithRedirect, GoogleAuthProvider, getRedirectResult } from 'firebase/auth';
import { auth } from '../firebase'; // Ensure this is the correct path to your firebase config

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const idToken = await userCredential.user.getIdToken();
      localStorage.setItem('id_token', idToken);
      navigate('/meeting');
    } catch (error) {
      console.error('Login failed:', error);
      setError('Login failed. Please check your credentials and try again.');
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      const provider = new GoogleAuthProvider();
      // Use signInWithRedirect instead of signInWithPopup
      await signInWithRedirect(auth, provider);
      // The result will be handled in useEffect
    } catch (error) {
      console.error('Google Sign-In error:', error);
      setError('Google Sign-In failed. Please try again.');
    }
  };

  useEffect(() => {
    const handleRedirectResult = async () => {
      try {
        const result = await getRedirectResult(auth);
        if (result) {
          const idToken = await result.user.getIdToken();
          localStorage.setItem('id_token', idToken);
          navigate('/meeting');
        }
      } catch (error) {
        console.error('Redirect result error:', error);
        setError('Google Sign-In failed. Please try again.');
      }
    };

    handleRedirectResult();
  }, [navigate]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-custom">
        <h1 className="text-3xl font-bold text-primary mb-6 text-center">Sign In</h1>
        {error && <p className="text-error mb-4 text-center">{error}</p>}
        <form className="space-y-4" onSubmit={handleLogin}>
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
            Sign In
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
      </div>
    </div>
  );
};

export default LoginPage;