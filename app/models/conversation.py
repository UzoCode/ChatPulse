from datetime import datetime
from app import db

class Conversation(db.Model):
    __tablename__ = 'conversations'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    timestamp = db.Column(db.DateTime, index=True, default=datetime.utcnow)
    name = db.Column(db.String(255))  # Add this if conversation has a name field

    messages = db.relationship('Message', back_populates='conversation', lazy='dynamic')

    def serialize(self):
        """Serialize the Conversation object."""
        return {
            'id': self.id,
            'user_id': self.user_id,
            'timestamp': self.timestamp.isoformat(),
            'name': self.name
        }
