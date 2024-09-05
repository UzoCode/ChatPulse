// // src/components/LandingPage.js
import 'animate.css/animate.min.css';
import React from 'react';
import { Container, Typography, Box, Button, Grid, Card, CardMedia, CardContent } from '@mui/material';
import LoginButton from './LoginButton';
import RegisterButton from './RegisterButton';

const LandingPage = () => {
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
  document.body.style.overflow = 'auto';  // Allow scrolling

  return (
    <>
      {/* Intro Section */}
      <Container maxWidth="sm" style={containerStyle}>
        <Typography variant="h2" component="h1" gutterBottom className="animate__animated animate__fadeInDown">
          ChatPulse
        </Typography>
        <Typography variant="h5" component="h2" gutterBottom className="animate__animated animate__fadeInUp">
          Real-time User Support and Engagement
        </Typography>
        <Box mt={4} className="animate__animated animate__fadeInUp">
          <Box display="flex" justifyContent="center" gap={2}>
            <LoginButton />
            <RegisterButton />
          </Box>
          <Box mt={2}>
            <Button
              variant="contained"
              color="primary"
              href="https://chatpulse-74e6ab89a903.herokuapp.com/" // Update with your deployed project URL
              target="_blank"
            >
              View App
            </Button>
          </Box>
        </Box>
      </Container>

      {/* Key Features Section */}
      <Container maxWidth="lg" style={{ marginTop: '4em' }}>
        <Typography variant="h4" component="h2" gutterBottom>
          Key Features
        </Typography>
        <Grid container spacing={4}>
          {/* Feature 1 */}
          <Grid item xs={12} sm={4}>
            <Card>
              <CardMedia
                component="img"
                alt="Real-time Chat"
                height="140"
                image="/images/chat_feature.jpg"  // Replace with your actual image path
              />
              <CardContent>
                <Typography variant="h6" component="div">
                  Real-time Chat
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Engage with users instantly through real-time messaging.
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          {/* Feature 2 */}
          <Grid item xs={12} sm={4}>
            <Card>
              <CardMedia
                component="img"
                alt="Support Ticket System"
                height="140"
                image="/images/ticket-feature.jpg"  // Replace with your actual image path
              />
              <CardContent>
                <Typography variant="h6" component="div">
                  Support Ticket Management
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Manage user issues efficiently with a ticketing system.
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          {/* Feature 3 */}
          <Grid item xs={12} sm={4}>
            <Card>
              <CardMedia
                component="img"
                alt="User Engagement Metrics"
                height="140"
                image="/images/metrics_feature.jpg"  // Replace with your actual image path
              />
              <CardContent>
                <Typography variant="h6" component="div">
                  User Engagement Metrics
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Analyze user engagement with detailed metrics.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default LandingPage;
