import React, { useState } from 'react';

const ChatBox: React.FC = () => {
  const [messages, setMessages] = useState<string[]>([]);
  const [newMessage, setNewMessage] = useState('');

  const sendMessage = () => {
    if (newMessage.trim()) {
      setMessages([...messages, newMessage]);
      setNewMessage('');
      // Implement sending message to other participants
    }
  };

  return (
    <div className="w-64 h-full bg-gray-800 p-4">
      <div className="h-3/4 overflow-y-auto">
        {messages.map((msg, index) => (
          <div key={index} className="mb-2">{msg}</div>
        ))}
      </div>
      <input 
        type="text" 
        value={newMessage} 
        onChange={(e) => setNewMessage(e.target.value)}
        className="w-full p-2 bg-gray-700 text-white"
      />
      <button onClick={sendMessage} className="mt-2 bg-blue-500 text-white p-2 rounded">Send</button>
    </div>
  );
};

export default ChatBox;