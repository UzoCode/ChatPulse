# backend/app/models/message.py
from datetime import datetime  # Add this line to import datetime

from server.extensions import db  # Import db from the main application package

class Message(db.Model):
    __tablename__ = 'messages'
    id = db.Column(db.Integer, primary_key=True)
    content = db.Column(db.Text, nullable=False)
    timestamp = db.Column(db.DateTime, default=datetime.utcnow)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    room_id = db.Column(db.Integer, db.ForeignKey('chat_rooms.id'), nullable=False)
    attachment_url = db.Column(db.String(255))

    user = db.relationship('User', backref='messages')
    chat_room = db.relationship('ChatRoom', backref='messages')