import React, { useState, useEffect } from 'react';
import socketService from '../services/socketService';
import authService from '../services/authService';
import axios from 'axios';

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [conversationId, setConversationId] = useState(null);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      axios.get('/api/chat/conversations', {
        headers: {
          Authorization: `Bearer ${user.access_token}`
        }
      }).then(response => {
        if (response.data.length > 0) {
          const conversation = response.data[0];
          setConversationId(conversation.id);
          socketService.joinRoom(conversation.id);
          setMessages(conversation.messages);
        }
      });
    }
  }, []);

  useEffect(() => {
    socketService.onMessage((message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });
  }, []);

  const handleSendMessage = (e) => {
    e.preventDefault();
    const user = JSON.parse(localStorage.getItem('user'));
    if (user && conversationId) {
      axios.post('/api/chat/messages', {
        conversation_id: conversationId,
        body: newMessage,
      }, {
        headers: {
          Authorization: `Bearer ${user.access_token}`
        }
      }).then(response => {
        setNewMessage('');
        socketService.sendMessage(conversationId, response.data);
      });
    }
  };

  return (
    <div>
      <ul>
        {messages.map((msg, index) => (
          <li key={index}>{msg.body}</li>
        ))}
      </ul>
      <form onSubmit={handleSendMessage}>
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
};

export default Chat;