import io from 'socket.io-client';

const socket = io('http://localhost:5000'); // Adjust the URL as needed

const joinRoom = (roomId) => {
  socket.emit('join', roomId);
};

const sendMessage = (roomId, message) => {
  socket.emit('message', { roomId, message });
};

const onMessage = (callback) => {
  socket.on('message', callback);
};

const socketService = {
  joinRoom,
  sendMessage,
  onMessage,
};

export default socketService;
