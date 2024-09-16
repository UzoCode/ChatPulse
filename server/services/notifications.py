from flask_socketio import emit
from app import socketio

def send_notification(user_id, message):
    emit('notification', {'user_id': user_id, 'message': message}, room=user_id)

# You'll need to implement email sending functionality as well