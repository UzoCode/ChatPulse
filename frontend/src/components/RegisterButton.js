import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';

const RegisterButton = () => {
  const navigate = useNavigate();

  const handleRegisterClick = () => {
    navigate('/register');
  };

  return (
    <Button 
      variant="outlined" 
      color="secondary" 
      fullWidth 
      style={{ marginTop: '1em' }}
      className="animate__animated animate__pulse"
      onMouseEnter={(e) => e.currentTarget.classList.add('animate__infinite')}
      onMouseLeave={(e) => e.currentTarget.classList.remove('animate__infinite')}
      onClick={handleRegisterClick}
    >
      Register
    </Button>
  );
};

export default RegisterButton;
