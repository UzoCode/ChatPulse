import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';

const LoginButton = () => {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate('/login');
  };

  return (
    <Button 
      variant="contained" 
      color="primary" 
      fullWidth 
      style={{ marginTop: '1em' }} 
      className="animate__animated animate__pulse"
      onMouseEnter={(e) => e.currentTarget.classList.add('animate__infinite')}
      onMouseLeave={(e) => e.currentTarget.classList.remove('animate__infinite')}
      onClick={handleLoginClick}
    >
      Login
    </Button>
  );
};

export default LoginButton;
