from server.app import socketio, db
from flask_socketio import emit
from server.models.message import Message

@socketio.on('message')
def handle_message(data):
    # Your existing code here
    # ...