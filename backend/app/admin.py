# backend/app/admin.py
from flask import Blueprint, request, jsonify
from app.models import Conversation, db

admin_bp = Blueprint('admin', __name__)  # Use a unique name for the blueprint

@admin_bp.route('/conversations', methods=['GET'])
def get_all_conversations():
    conversations = Conversation.query.all()
    return jsonify([c.serialize() for c in conversations])

@admin_bp.route('/responses', methods=['POST'])
def send_response():
    data = request.get_json()
    message = Message(conversation_id=data['conversation_id'], sender_id=data['admin_id'], body=data['body'])
    db.session.add(message)
    db.session.commit()
    return jsonify(message.serialize())
