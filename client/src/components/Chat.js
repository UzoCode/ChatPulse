import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCurrentUser } from '../services/auth';
import {
  initializeSocket,
  disconnectSocket,
  sendMessage,
  joinChat,
  leaveChat,
  onNewMessage,
  onUserJoined,
  onUserLeft
} from '../services/chat';

function Chat() {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const navigate = useNavigate();
  const user = getCurrentUser();

  useEffect(() => {
    const socket = initializeSocket();
    if (!socket) {
      navigate('/login');
      return;
    }

    joinChat(user.username);

    onNewMessage((message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    onUserJoined((data) => {
      setMessages((prevMessages) => [...prevMessages, { type: 'status', content: data.msg }]);
    });

    onUserLeft((data) => {
      setMessages((prevMessages) => [...prevMessages, { type: 'status', content: data.msg }]);
    });

    return () => {
      leaveChat(user.username);
      disconnectSocket();
    };
  }, [navigate, user.username]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (inputMessage.trim() !== '') {
      sendMessage(inputMessage);
      setInputMessage('');
    }
  };

  return (
    <div className="chat">
      <h2>Chat Room</h2>
      <div className="message-container">
        {messages.map((msg, index) => (
          <div key={index} className={`message ${msg.type === 'status' ? 'status-message' : msg.user_id === user.id ? 'own-message' : ''}`}>
            {msg.type === 'status' ? (
              <em>{msg.content}</em>
            ) : (
              <>
                <strong>{msg.username}:</strong> {msg.content}
              </>
            )}
          </div>
        ))}
      </div>
      <form onSubmit={handleSendMessage}>
        <input
          type="text"
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          placeholder="Type a message..."
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
}

export default Chat;