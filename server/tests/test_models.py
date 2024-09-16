import unittest
from server.models import User, ChatRoom, Message
from server.extensions import db
from server.app import create_app
from datetime import datetime

class TestModels(unittest.TestCase):
    def setUp(self):
        self.app = create_app('testing')
        self.app_context = self.app.app_context()
        self.app_context.push()
        db.create_all()

    def tearDown(self):
        db.session.remove()
        db.drop_all()
        self.app_context.pop()

    def test_user_model(self):
        user = User(username='testuser', email='test@example.com', password_hash='hashed_password')
        db.session.add(user)
        db.session.commit()

        retrieved_user = User.query.filter_by(username='testuser').first()
        self.assertIsNotNone(retrieved_user)
        self.assertEqual(retrieved_user.email, 'test@example.com')

        serialized_user = user.serialize()
        self.assertIn('id', serialized_user)
        self.assertIn('username', serialized_user)
        self.assertIn('email', serialized_user)
        self.assertIn('created_at', serialized_user)

    def test_chat_room_model(self):
        room = ChatRoom(name='Test Room')
        db.session.add(room)
        db.session.commit()

        retrieved_room = ChatRoom.query.filter_by(name='Test Room').first()
        self.assertIsNotNone(retrieved_room)

        serialized_room = room.serialize()
        self.assertIn('id', serialized_room)
        self.assertIn('name', serialized_room)
        self.assertIn('created_at', serialized_room)

    def test_message_model(self):
        user = User(username='testuser', email='test@example.com', password_hash='hashed_password')
        room = ChatRoom(name='Test Room')
        db.session.add_all([user, room])
        db.session.commit()

        message = Message(content='Test message', user_id=user.id, room_id=room.id)
        db.session.add(message)
        db.session.commit()

        retrieved_message = Message.query.filter_by(content='Test message').first()
        self.assertIsNotNone(retrieved_message)

        serialized_message = message.serialize()
        self.assertIn('id', serialized_message)
        self.assertIn('content', serialized_message)
        self.assertIn('timestamp', serialized_message)
        self.assertIn('user_id', serialized_message)
        self.assertIn('room_id', serialized_message)
        self.assertIn('username', serialized_message)