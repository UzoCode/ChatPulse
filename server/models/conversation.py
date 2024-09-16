from datetime import datetime
from server.extensions import db

class Conversation(db.Model):
    __tablename__ = 'conversations'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    timestamp = db.Column(db.DateTime, index=True, default=datetime.utcnow)
    name = db.Column(db.String(255))

    user = db.relationship('User', backref='conversations')
    messages = db.relationship('Message', back_populates='conversation', lazy='dynamic')

    def serialize(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'timestamp': self.timestamp.isoformat(),
            'name': self.name
        }
