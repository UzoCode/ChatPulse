from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from app import db, socketio
from app.models import ChatRoom, Conversation, Message

chat_bp = Blueprint('chat', __name__)

@chat_bp.route('/create_chat_room', methods=['POST'])
@jwt_required()
def create_chat_room():
    """Create a new chat room for the authenticated user."""
    data = request.get_json()
    room_name = data.get('room_name')
    
    # Ensure room name is provided
    if not room_name:
        return jsonify({'message': 'Chat room name is required'}), 400

    # Create and save the chat room
    chat_room = ChatRoom(name=room_name)
    db.session.add(chat_room)
    db.session.commit()
    return jsonify({"msg": "Chat room created", "chat_room": chat_room.serialize()}), 201

@chat_bp.route('/delete_chat_room/<int:room_id>', methods=['DELETE'])
@jwt_required()
def delete_chat_room(room_id):
    """Delete a chat room."""
    chat_room = ChatRoom.query.get(room_id)
    if chat_room:
        db.session.delete(chat_room)
        db.session.commit()
        return jsonify({"msg": "Chat room deleted"}), 200
    return jsonify({"msg": "Chat room not found"}), 404

@chat_bp.route('/conversations', methods=['GET'])
@jwt_required()
def get_conversations():
    """Retrieve all conversations for the authenticated user."""
    user_id = get_jwt_identity()
    conversations = Conversation.query.filter_by(user_id=user_id).all()
    return jsonify([c.serialize() for c in conversations])

@chat_bp.route('/conversations', methods=['POST'])
@jwt_required()
def create_conversation():
    """Create a new conversation for the authenticated user."""
    user_id = get_jwt_identity()
    data = request.get_json()
    
    # Ensure all required fields are provided
    if not data.get('name'):
        return jsonify({'message': 'Conversation name is required'}), 400

    # Create and save the conversation
    conversation = Conversation(user_id=user_id, name=data['name'])
    db.session.add(conversation)
    db.session.commit()
    return jsonify(conversation.serialize()), 201

@chat_bp.route('/messages', methods=['POST'])
@jwt_required()
def send_message():
    """Send a new message to a specified conversation."""
    user_id = get_jwt_identity()
    data = request.get_json()
    
    # Ensure all required fields are provided
    if not data.get('conversation_id') or not data.get('body'):
        return jsonify({'message': 'Conversation ID and message body are required'}), 400

    # Create and save the message
    message = Message(conversation_id=data['conversation_id'], sender_id=user_id, body=data['body'])
    db.session.add(message)
    db.session.commit()
    
    # Emit the message to the specified room
    socketio.emit('message', message.serialize(), room=data['conversation_id'])
    return jsonify(message.serialize()), 201
