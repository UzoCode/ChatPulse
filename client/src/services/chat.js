import io from 'socket.io-client';
import { getCurrentUser } from './auth';

const SOCKET_URL = 'http://localhost:5000';

let socket;

export const initializeSocket = () => {
  const user = getCurrentUser();
  if (user && user.access_token) {
    socket = io(SOCKET_URL, {
      auth: {
        token: user.access_token
      }
    });
    return socket;
  }
  return null;
};

export const disconnectSocket = () => {
  if (socket) socket.disconnect();
};

export const sendMessage = (message) => {
  if (socket) socket.emit('send_message', { message });
};

export const joinChat = (username) => {
  if (socket) socket.emit('join', { username });
};

export const leaveChat = (username) => {
  if (socket) socket.emit('leave', { username });
};

export const onNewMessage = (callback) => {
  if (socket) socket.on('new_message', callback);
};

export const onUserJoined = (callback) => {
  if (socket) socket.on('status', callback);
};

export const onUserLeft = (callback) => {
  if (socket) socket.on('status', callback);
};