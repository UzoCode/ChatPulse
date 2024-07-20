import 'animate.css/animate.min.css';
import React from 'react';
import { Container, Typography, Box, Avatar } from '@mui/material';
import LoginButton from './LoginButton';
import RegisterButton from './RegisterButton';
import GitHubIcon from '@mui/icons-material/GitHub';

const LandingPage = () => {
  const githubUrl = 'https://github.com/your-username'; // Update with your GitHub URL

  const containerStyle = {
    textAlign: 'center',
    marginTop: '2em',
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    color: 'white',
  };

  // Apply background image to the body
  document.body.style.backgroundImage = `url('/images/background.jpg')`;
  document.body.style.backgroundSize = 'cover';
  document.body.style.backgroundPosition = 'center';
  document.body.style.margin = '0';
  document.body.style.height = '100vh';
  document.body.style.overflow = 'hidden';

  return (
    <Container maxWidth="sm" style={containerStyle}>
      <Box position="absolute" top={16} right={16}>
        <Avatar 
          component="a" 
          href={githubUrl} 
          target="_blank"
          style={{ backgroundColor: 'transparent' }}
        >
          <GitHubIcon style={{ color: 'black' }} /> {/* Set icon color to black */}
        </Avatar>
      </Box>
      <Typography variant="h2" component="h1" gutterBottom className="animate__animated animate__fadeInDown">
        Welcome to ChatPulse
      </Typography>
      <Box mt={4} className="animate__animated animate__fadeInUp">
        <Box mt={2}>
          <LoginButton />
        </Box>
        <Box mt={2}>
          <RegisterButton />
        </Box>
      </Box>
    </Container>
  );
};

export default LandingPage;