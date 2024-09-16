import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getCurrentUser } from '../services/auth';
import { initializeSocket, disconnectSocket, sendMessage, joinRoom, leaveRoom, onNewMessage, onUserJoined, onUserLeft } from '../services/chat';

function ChatRoom() {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const { roomId } = useParams();
  const navigate = useNavigate();
  const user = getCurrentUser();

  useEffect(() => {
    const socket = initializeSocket();
    if (!socket) {
      navigate('/login');
      return;
    }

    joinRoom(roomId);

    onNewMessage((message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    onUserJoined((username) => {
      setMessages((prevMessages) => [...prevMessages, { type: 'system', content: `${username} has joined the room.` }]);
    });

    onUserLeft((username) => {
      setMessages((prevMessages) => [...prevMessages, { type: 'system', content: `${username} has left the room.` }]);
    });

    return () => {
      leaveRoom(roomId);
      disconnectSocket();
    };
  }, [roomId, navigate]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (inputMessage.trim() !== '') {
      sendMessage(roomId, inputMessage);
      setInputMessage('');
    }
  };

  return (
    <div className="chat-room">
      <h2>Chat Room: {roomId}</h2>
      <div className="message-container">
        {messages.map((msg, index) => (
          <div key={index} className={`message ${msg.type === 'system' ? 'system-message' : msg.user === user.username ? 'own-message' : ''}`}>
            {msg.type === 'system' ? (
              <em>{msg.content}</em>
            ) : (
              <>
                <strong>{msg.user}:</strong> {msg.content}
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

export default ChatRoom;