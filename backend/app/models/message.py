# backend/app/models/message.py
from datetime import datetime  # Add this line to import datetime

from app import db  # Import db from the main application package

class Message(db.Model):
    __tablename__ = 'messages'

    id = db.Column(db.Integer, primary_key=True)
    conversation_id = db.Column(db.Integer, db.ForeignKey('conversations.id'), nullable=False)
    sender_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    body = db.Column(db.Text, nullable=False)
    timestamp = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)

    user = db.relationship('User', back_populates='messages', lazy=True)
    conversation = db.relationship('Conversation', back_populates='messages', lazy=True)

    def serialize(self):
        return {
            'id': self.id,
            'conversation_id': self.conversation_id,
            'sender_id': self.sender_id,
            'body': self.body,
            'timestamp': self.timestamp.isoformat()
        }
