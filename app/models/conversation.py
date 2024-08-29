# backend/app/models/conversation.py
from datetime import datetime
from app import db

class Conversation(db.Model):
    __tablename__ = 'conversations'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    timestamp = db.Column(db.DateTime, index=True, default=datetime.utcnow)

    messages = db.relationship('Message', back_populates='conversation', lazy='dynamic')
