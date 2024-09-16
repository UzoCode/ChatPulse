import unittest
import json
from server.app import create_app
from server.extensions import db
from server.models import User, ChatRoom

class TestAPI(unittest.TestCase):
    def setUp(self):
        self.app = create_app('testing')
        self.client = self.app.test_client()
        self.app_context = self.app.app_context()
        self.app_context.push()
        db.create_all()

    def tearDown(self):
        db.session.remove()
        db.drop_all()
        self.app_context.pop()

    def test_user_registration(self):
        response = self.client.post('/api/auth/register',
                                    data=json.dumps({'username': 'testuser', 'email': 'test@example.com', 'password': 'testpassword'}),
                                    content_type='application/json')
        self.assertEqual(response.status_code, 201)
        data = json.loads(response.data)
        self.assertIn('message', data)
        self.assertIn('user', data)

    def test_user_login(self):
        # First, register a user
        self.client.post('/api/auth/register',
                         data=json.dumps({'username': 'testuser', 'email': 'test@example.com', 'password': 'testpassword'}),
                         content_type='application/json')
        
        # Then, try to login
        response = self.client.post('/api/auth/login',
                                    data=json.dumps({'username': 'testuser', 'password': 'testpassword'}),
                                    content_type='application/json')
        self.assertEqual(response.status_code, 200)
        data = json.loads(response.data)
        self.assertIn('access_token', data)
        self.assertIn('user', data)

    def test_create_chat_room(self):
        # First, register and login a user
        self.client.post('/api/auth/register',
                         data=json.dumps({'username': 'testuser', 'email': 'test@example.com', 'password': 'testpassword'}),
                         content_type='application/json')
        login_response = self.client.post('/api/auth/login',
                                          data=json.dumps({'username': 'testuser', 'password': 'testpassword'}),
                                          content_type='application/json')
        access_token = json.loads(login_response.data)['access_token']

        # Then, create a chat room
        response = self.client.post('/api/chat/create_room',
                                    data=json.dumps({'room_name': 'Test Room'}),
                                    content_type='application/json',
                                    headers={'Authorization': f'Bearer {access_token}'})
        self.assertEqual(response.status_code, 201)
        data = json.loads(response.data)
        self.assertIn('message', data)
        self.assertIn('room', data)

    # Add more tests for other endpoints...