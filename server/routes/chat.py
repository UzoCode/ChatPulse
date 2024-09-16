from flask import Blueprint, jsonify, request
from flask_jwt_extended import jwt_required, get_jwt_identity
from server.models import Message
from server.extensions import db

chat_bp = Blueprint('chat', __name__)

@chat_bp.route('/messages', methods=['GET'])
@jwt_required()
def get_messages():
    messages = Message.query.all()
    return jsonify([message.serialize() for message in messages]), 200

@chat_bp.route('/messages', methods=['POST'])
@jwt_required()
def post_message():
    data = request.get_json()
    content = data.get('content')
    user_id = get_jwt_identity()
    
    new_message = Message(content=content, user_id=user_id)
    db.session.add(new_message)
    db.session.commit()
    
    return jsonify(new_message.serialize()), 201

# Make sure other route definitions use unique names
@chat_bp.route('/send', methods=['POST'])
def send_message():
    # Your implementation here
    pass

@chat_bp.route('/create_room', methods=['POST'])
@jwt_required()
def create_chat_room():
    data = request.get_json()
    room_name = data.get('room_name')
    
    if not room_name:
        return jsonify({'message': 'Room name is required'}), 400

    new_room = ChatRoom(name=room_name)
    db.session.add(new_room)
    db.session.commit()

    return jsonify({'message': 'Room created successfully', 'room': new_room.serialize()}), 201

@chat_bp.route('/rooms', methods=['GET'])
@jwt_required()
def get_chat_rooms():
    rooms = ChatRoom.query.all()
    return jsonify({'rooms': [room.serialize() for room in rooms]}), 200

@chat_bp.route('/messages/<int:room_id>', methods=['GET'])
@jwt_required()
def get_room_messages(room_id):
    messages = Message.query.filter_by(room_id=room_id).order_by(Message.timestamp).all()
    return jsonify({'messages': [message.serialize() for message in messages]}), 200

@chat_bp.route('/send_message', methods=['POST'])
@jwt_required()
def send_new_message():
    user_id = get_jwt_identity()
    data = request.get_json()
    content = data.get('content')
    room_id = data.get('room_id')

    if not content or not room_id:
        return jsonify({'message': 'Content and room_id are required'}), 400

    new_message = Message(content=content, user_id=user_id, room_id=room_id)
    db.session.add(new_message)
    db.session.commit()

    return jsonify({'message': 'Message sent successfully', 'message': new_message.serialize()}), 201
