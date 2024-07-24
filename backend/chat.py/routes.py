from flask import Blueprint, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity

chat_bp = Blueprint('chat', __name__)

@chat_bp.route('/messages', methods=['GET'])
@jwt_required()
def get_messages():
    current_user = get_jwt_identity()
    # Fetch messages for the authenticated user
    messages = []  # Replace with your message fetching logic
    return jsonify(messages=messages)