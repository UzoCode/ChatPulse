from server.extensions import db

class User(db.Model):
    __tablename__ = 'users'
    id = db.Column(db.String(128), primary_key=True)  # Use Firebase UID
    username = db.Column(db.String(64), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    role = db.Column(db.String(20), default='customer')

    created_chat_rooms = db.relationship('ChatRoom', back_populates='creator', lazy='dynamic')

    def serialize(self):
        return {
            'id': self.id,
            'username': self.username,
            'email': self.email,
            'role': self.role
        }

