// src/components/Chat.js
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { io } from 'socket.io-client';

const Chat = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(true); // Replace with actual authentication check logic
  const [username, setUsername] = useState('');
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');
  const [socket, setSocket] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Check authentication status
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    // Retrieve username from localStorage after login/registration
    const storedUsername = localStorage.getItem('username');
    if (storedUsername) {
      setUsername(storedUsername);
    }

    // Establish the socket connection for real-time chat
    const newSocket = io('http://localhost:5000');
    setSocket(newSocket);

    // Listen for incoming messages
    newSocket.on('message', (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    // Cleanup: Disconnect socket on component unmount
    return () => {
      newSocket.disconnect();
    };
  }, []);

  const sendMessage = () => {
    if (socket) {
      socket.emit('message', message);
      setMessage(''); // Clear input after sending
    }
  };

  return (
    <div>
      {/* Welcome message */}
      {username && <h2>Welcome, {username}! You are now in the chat space.</h2>}

      {/* Real-time chat interface */}
      <div>
        <ul>
          {messages.map((msg, index) => (
            <li key={index}>{msg}</li>
          ))}
        </ul>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
};

export default Chat;