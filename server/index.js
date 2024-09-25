const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"]
  }
});

const PORT = process.env.PORT || 5000;

io.on('connection', (socket) => {
  console.log('A user connected');

  socket.on('join-room', (roomId, userId) => {
    socket.join(roomId);
    socket.to(roomId).emit('user-connected', userId);

    socket.on('disconnect', () => {
      socket.to(roomId).emit('user-disconnected', userId);
    });
  });

  socket.on('offer', (offer, roomId, fromUserId, toUserId) => {
    socket.to(roomId).emit('offer', offer, fromUserId, toUserId);
  });

  socket.on('answer', (answer, roomId, fromUserId, toUserId) => {
    socket.to(roomId).emit('answer', answer, fromUserId, toUserId);
  });

  socket.on('ice-candidate', (candidate, roomId, fromUserId, toUserId) => {
    socket.to(roomId).emit('ice-candidate', candidate, fromUserId, toUserId);
  });
});

server.listen(PORT, () => console.log(`Server is running on port ${PORT}`));