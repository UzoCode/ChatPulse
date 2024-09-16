# backend/app/admin.py
from flask import Blueprint, jsonify, request
from flask_jwt_extended import jwt_required, get_jwt_identity
from server.extensions import db  # Change this line
from server.models import User  # Add this line if you're using the User model

admin_bp = Blueprint('admin', __name__)  # Use a unique name for the blueprint

@admin_bp.route('/conversations', methods=['GET'])
@jwt_required()  # Ensure the route is protected and requires authentication
def get_all_conversations():
    """
    Retrieve all conversations for the authenticated user.
    """
    user_id = get_jwt_identity()  # Get the ID of the currently authenticated user
    conversations = Conversation.query.filter_by(user_id=user_id).all()  # Filter conversations by user ID
    return jsonify([c.serialize() for c in conversations])  # Serialize and return the list of conversations

@admin_bp.route('/conversations/<int:conversation_id>', methods=['DELETE'])
@jwt_required()  # Ensure the route is protected and requires authentication
def delete_conversation(conversation_id):
    """
    Delete a specific conversation.
    """
    conversation = Conversation.query.get(conversation_id)  # Get the conversation by ID
    if conversation:
        db.session.delete(conversation)  # Remove the conversation from the database
        db.session.commit()  # Commit the session to apply changes
        return jsonify({"msg": "Conversation deleted"}), 200  # Return success message
    return jsonify({"msg": "Conversation not found"}), 404  # Return error message if conversation not found

@admin_bp.route('/responses', methods=['POST'])
@jwt_required()  # Ensure the route is protected and requires authentication
def send_response():
    """
    Send a response message to a conversation.
    """
    data = request.get_json()  # Get the JSON data from the request
    message = Message(
        conversation_id=data['conversation_id'],
        sender_id=data['admin_id'],
        body=data['body']
    )
    db.session.add(message)  # Add the message to the database session
    db.session.commit()  # Commit the session to save the message
    return jsonify(message.serialize())  # Serialize and return the message
