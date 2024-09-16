from flask_socketio import emit, join_room, leave_room
from server.extensions import socketio, db
from server.models import Message, ChatRoom, User

# Event handler for receiving and processing messages via WebSockets
@socketio.on('message')
def handle_message(data):
    """
    This function is triggered when a 'message' event is received via Socket.IO.
    It processes the incoming data, saves the message to the database, 
    and broadcasts the message to all connected clients.
    """
    content = data['message']
    room_id = data['room']
    user_id = data['user_id']
    
    message = Message(content=content, user_id=user_id, chat_room_id=room_id)
    db.session.add(message)
    db.session.commit()
    
    emit('message', {
        'user_id': user_id,
        'content': content,
        'timestamp': message.timestamp.isoformat()
    }, room=room_id)

@socketio.on('join')
def on_join(data):
    username = data['username']
    room = data['room']
    join_room(room)
    emit('status', {'msg': f'{username} has entered the room.'}, room=room)

@socketio.on('leave')
def on_leave(data):
    username = data['username']
    room = data['room']
    leave_room(room)
    emit('status', {'msg': f'{username} has left the room.'}, room=room)
