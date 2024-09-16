import unittest
from flask_socketio import SocketIOTestClient
from server.app import create_app
from server.extensions import socketio, db
from server.models import User, ChatRoom

class TestWebSocket(unittest.TestCase):
    def setUp(self):
        self.app = create_app('testing')
        self.app_context = self.app.app_context()
        self.app_context.push()
        db.create_all()
        self.client = SocketIOTestClient(self.app, socketio)

    def tearDown(self):
        db.session.remove()
        db.drop_all()
        self.app_context.pop()

    def test_connect(self):
        # Create a user and get a valid JWT token
        user = User(username='testuser', email='test@example.com', password_hash='hashed_password')
        db.session.add(user)
        db.session.commit()
        with self.app.test_request_context():
            from flask_jwt_extended import create_access_token
            access_token = create_access_token(identity=user.id)

        # Connect with the token
        self.client.connect(headers={'Authorization': f'Bearer {access_token}'})
        received = self.client.get_received()
        self.assertEqual(len(received), 1)
        self.assertEqual(received[0]['name'], 'connect')
        self.assertIn('user', received[0]['args'][0])

    def test_join_room(self):
        # Create a user and a room
        user = User(username='testuser', email='test@example.com', password_hash='hashed_password')
        room = ChatRoom(name='Test Room')
        db.session.add_all([user, room])
        db.session.commit()

        with self.app.test_request_context():
            from flask_jwt_extended import create_access_token
            access_token = create_access_token(identity=user.id)

        self.client.connect(headers={'Authorization': f'Bearer {access_token}'})
        self.client.emit('join_room', {'room': room.id})
        received = self.client.get_received()
        self.assertEqual(len(received), 2)  # connect event + user_joined event
        self.assertEqual(received[1]['name'], 'user_joined')
        self.assertIn('user', received[1]['args'][0])

    def test_send_message(self):
        # Create a user and a room
        user = User(username='testuser', email='test@example.com', password_hash='hashed_password')
        room = ChatRoom(name='Test Room')
        db.session.add_all([user, room])
        db.session.commit()

        with self.app.test_request_context():
            from flask_jwt_extended import create_access_token
            access_token = create_access_token(identity=user.id)

        self.client.connect(headers={'Authorization': f'Bearer {access_token}'})
        self.client.emit('join_room', {'room': room.id})
        self.client.emit('send_message', {'room': room.id, 'message': 'Test message'})
        received = self.client.get_received()
        self.assertEqual(len(received), 3)  # connect event + user_joined event + new_message event
        self.assertEqual(received[2]['name'], 'new_message')
        self.assertIn('content', received[2]['args'][0])
        self.assertEqual(received[2]['args'][0]['content'], 'Test message')

    # Add more WebSocket tests as needed...