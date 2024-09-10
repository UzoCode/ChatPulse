from app import socketio, db
from flask_socketio import emit
from app.models import Message

# Event handler for receiving and processing messages via WebSockets
@socketio.on('message')
def handle_message(data):
    """
    This function is triggered when a 'message' event is received via Socket.IO.
    It processes the incoming data, saves the message to the database, 
    and broadcasts the message to all connected clients.
    """
    # Extract conversation ID and content from the received data
    conversation_id = data.get('conversation_id')
    content = data.get('content')

    # Save the message to the database
    message = Message(conversation_id=conversation_id, content=content)
    db.session.add(message)
    db.session.commit()

    # Broadcast the message to all clients connected via WebSocket
    emit('message', {
        'conversation_id': conversation_id, 
        'content': content, 
        'timestamp': message.timestamp
    }, broadcast=True)
