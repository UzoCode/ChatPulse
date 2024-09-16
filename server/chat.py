from flask import Blueprint
from flask_socketio import emit, join_room, leave_room
from flask_jwt_extended import jwt_required, get_jwt_identity
from server.extensions import socketio, db
from server.models import Message, User

chat_bp = Blueprint('chat', __name__)

@socketio.on('connect')
@jwt_required()
def handle_connect():
    user_id = get_jwt_identity()
    user = User.query.get(user_id)
    emit('connect', {'user': user.serialize()})

@socketio.on('join')
def on_join(data):
    username = data['username']
    room = 'main_room'  # We're using a single room for now
    join_room(room)
    emit('status', {'msg': f'{username} has entered the chat.'}, room=room)

@socketio.on('leave')
def on_leave(data):
    username = data['username']
    room = 'main_room'
    leave_room(room)
    emit('status', {'msg': f'{username} has left the chat.'}, room=room)

@socketio.on('send_message')
def handle_message(data):
    user_id = get_jwt_identity()
    content = data['message']
    new_message = Message(content=content, user_id=user_id)
    db.session.add(new_message)
    db.session.commit()
    emit('new_message', new_message.serialize(), room='main_room')