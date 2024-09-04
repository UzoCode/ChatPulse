// src/pages/About.js
import React, { useState } from 'react';
import { FaLinkedin, FaGithub, FaTwitter, FaExternalLinkAlt } from 'react-icons/fa';
import './About.css';  // Import the CSS file

const About = () => {
  const [isImageFullScreen, setIsImageFullScreen] = useState(false);

  const handleImageClick = () => {
    setIsImageFullScreen(!isImageFullScreen);
  };

  return (
    <div className="about-container">
      <h1>About ChatPulse</h1>
      <p className="justified-text">
        ChatPulse is a chat application designed to provide smooth conversation between customer service representatives and their customers.
      </p>
      <h2>Inspiration</h2>
      <p className="justified-text">
        ChatPulse was born out of a personal need to create an effective, real-time communication platform that enhances the connection between users and support teams. As someone who has always valued responsive and personalized customer service, I wanted to build something that would make that experience seamless and engaging. The inspiration came from a moment when I experienced a significant delay in customer support for a crucial service. This frustration fueled my desire to create a tool that would eliminate such delays and enhance the overall user experience.
      </p>
      <h2>Portfolio Project at ALX</h2>
      <p className="justified-text">
        This project is also a portfolio piece carried out as part of my journey at ALX, a tech training institute dedicated to empowering Africans with the skills to thrive in the tech industry. The skills I gained during this training played a crucial role in bringing ChatPulse to life.
      </p>
      <h2>Connect with Me</h2>
      <ul className="social-links">
        <li>
          <a href="https://www.linkedin.com/in/akosa-benedict" target="_blank" rel="noopener noreferrer">
            <FaLinkedin /> LinkedIn
          </a>
        </li>
        <li>
          <a href="https://github.com/UzoCode" target="_blank" rel="noopener noreferrer">
            <FaGithub /> GitHub
          </a>
        </li>
        <li>
          <a href="https://x.com/AkosaBenedict/" target="_blank" rel="noopener noreferrer">
            <FaTwitter /> Twitter
          </a>
        </li>
        <li>
          <a href="https://github.com/UzoCode/ChatPulse/tree/main" target="_blank" rel="noopener noreferrer">
            <FaExternalLinkAlt /> Project Repository
          </a>
        </li>
      </ul>
      <div className={`image-container ${isImageFullScreen ? 'full-screen' : ''}`}>
        <img 
          src="./about_backgrounds.jpg" 
          alt="About Image" 
          className={`about-image ${isImageFullScreen ? 'full-screen' : ''}`}
          onClick={handleImageClick}
        />
      </div>
    </div>
  );
};

export default About;
