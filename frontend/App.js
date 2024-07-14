import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import { Button, TextField, Container } from '@material-ui/core';

const socket = io('http://localhost:5000');

function App() {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    socket.on('message', msg => {
      setMessages(prevMessages => [...prevMessages, msg]);
    });
  }, []);

  const sendMessage = () => {
    socket.emit('message', { conversation_id: 1, content: message });
    setMessage('');
  };

  return (
    <Container>
      <div>
        {messages.map((msg, index) => (
          <p key={index}>{msg.content}</p>
        ))}
      </div>
      <TextField value={message} onChange={e => setMessage(e.target.value)} />
      <Button onClick={sendMessage}>Send</Button>
    </Container>
  );
}

export default App;
