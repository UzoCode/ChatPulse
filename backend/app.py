from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_restful import Api
from flask_jwt_extended import JWTManager, create_access_token
from flask_socketio import SocketIO, emit
from werkzeug.security import generate_password_hash, check_password_hash
from datetime import datetime

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql://username:password@localhost/chatpulse'
app.config['SECRET_KEY'] = 'your_secret_key'
api = Api(app)
db = SQLAlchemy(app)
jwt = JWTManager(app)
socketio = SocketIO(app, cors_allowed_origins="*") 

# Models
class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    password = db.Column(db.String(120), nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)

class Conversation(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    messages = db.relationship('Message', backref='conversation', lazy=True)

class Message(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    conversation_id = db.Column(db.Integer, db.ForeignKey('conversation.id'), nullable=False)
    content = db.Column(db.Text, nullable=False)
    timestamp = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)

# API Endpoints
@app.route('/api/auth/login', methods=['POST'])
def login():
    data = request.get_json()
    user = User.query.filter_by(username=data['username']).first()
    if user and check_password_hash(user.password, data['password']):
        access_token = create_access_token(identity=user.id)
        return jsonify(access_token=access_token)
    return jsonify(message='Invalid credentials'), 401

@app.route('/api/auth/register', methods=['POST'])
def register():
    data = request.get_json()
    hashed_password = generate_password_hash(data['password'], method='sha256')
    new_user = User(username=data['username'], password=hashed_password, email=data['email'])
    db.session.add(new_user)
    db.session.commit()
    access_token = create_access_token(identity=new_user.id)
    return jsonify(access_token=access_token)

@app.route('/api/chat/conversations', methods=['GET', 'POST'])
def handle_conversations():
    if request.method == 'GET':
        # Retrieve conversations logic
        pass
    elif request.method == 'POST':
        # Create a new conversation logic
        pass

@app.route('/api/chat/messages', methods=['GET', 'POST'])
def handle_messages():
    if request.method == 'GET':
        # Retrieve messages logic
        pass
    elif request.method == 'POST':
        # Send a new message logic
        pass

# Socket.io Events
@socketio.on('message')
def handle_message(data):
    conversation_id = data.get('conversation_id')
    content = data.get('content')

    # Save message to the database
    message = Message(conversation_id=conversation_id, content=content)
    db.session.add(message)
    db.session.commit()

    # Broadcast message to all clients
    emit('message', {'conversation_id': conversation_id, 'content': content, 'timestamp': message.timestamp}, broadcast=True)

if __name__ == '__main__':
    socketio.run(app, debug=True)
