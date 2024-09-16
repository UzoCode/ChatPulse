from flask import Blueprint, jsonify, request
from flask_jwt_extended import jwt_required, get_jwt_identity
from .models import User, ChatRoom, Message
from app import db
from werkzeug.security import generate_password_hash, check_password_hash
from flask_jwt_extended import create_access_token

# Create a single blueprint for all routes
app_bp = Blueprint('app', __name__)

# Public Routes (no JWT required)
@app_bp.route('/')
def index():
    return jsonify({"message": "Welcome to ChatPulse!"})

@app_bp.route('/status')
def status():
    return jsonify({"status": "OK", "message": "Service is running"})

# Registration and Login
@app_bp.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    hashed_password = generate_password_hash(data['password'], method='sha256')
    new_user = User(username=data['username'], password=hashed_password, email=data['email'])
    db.session.add(new_user)
    db.session.commit()
    access_token = create_access_token(identity=new_user.id)
    return jsonify(access_token=access_token)

@app_bp.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    user = User.query.filter_by(username=data['username']).first()
    if user and check_password_hash(user.password_hash, data['password']):
        access_token = create_access_token(identity=user.id)
        return jsonify(access_token=access_token)
    return jsonify(message='Invalid credentials'), 401

# Protected Routes (require JWT)
@app_bp.route('/messages', methods=['GET'])
@jwt_required()
def get_messages():
    current_user = get_jwt_identity()
    # Fetch messages for the authenticated user
    messages = []  # Replace with your message fetching logic
    return jsonify(messages=messages)

@app_bp.route('/chat-rooms', methods=['POST'])
@jwt_required()
def create_chat_room():
    current_user = get_jwt_identity()
    # Create a new chat room instance
    new_chat_room = ChatRoom(creator_id=current_user)
    db.session.add(new_chat_room)
    db.session.commit()

    return jsonify({"message": "Chat room created successfully", "chat_room_id": new_chat_room.id})

# Chat Messages Endpoint (fetch messages for a specific chat room)
@app_bp.route('/chat-rooms/<int:room_id>/messages', methods=['GET'])
@jwt_required()
def get_chat_messages(room_id):
    # Fetch messages for the specified chat room
    messages = Message.query.filter_by(chat_room_id=room_id).all()
    return jsonify([message.to_dict() for message in messages])  # Assuming `to_dict()` is defined in the Message model

# Error Handler for Unauthorized Access
@app_bp.errorhandler(401)
def unauthorized_error(e):
    return jsonify(error="Unauthorized access"), 401

# Add more routes as needed
@app_bp.route('/api/health', methods=['GET'])
def health_check():
    return jsonify({"status": "healthy", "message": "Backend is running"}), 200
