# backend/app/chat.py
from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from app.models import Conversation, Message, db
from app import socketio

bp = Blueprint('chat', __name__)  # Use a unique name for the blueprint

@bp.route('/conversations', methods=['GET'])
@jwt_required()
def get_conversations():
    user_id = get_jwt_identity()
    conversations = Conversation.query.filter_by(user_id=user_id).all()
    return jsonify([c.serialize() for c in conversations])

@bp.route('/conversations', methods=['POST'])
@jwt_required()
def create_conversation():
    user_id = get_jwt_identity()
    conversation = Conversation(user_id=user_id)
    db.session.add(conversation)
    db.session.commit()
    return jsonify(conversation.serialize())

@bp.route('/messages', methods=['POST'])
@jwt_required()
def send_message():
    user_id = get_jwt_identity()
    data = request.get_json()
    message = Message(conversation_id=data['conversation_id'], sender_id=user_id, body=data['body'])
    db.session.add(message)
    db.session.commit()
    socketio.emit('message', message.serialize(), room=data['conversation_id'])
    return jsonify(message.serialize())
