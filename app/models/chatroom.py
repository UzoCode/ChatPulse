from app import db
from werkzeug.security import generate_password_hash, check_password_hash

class ChatRoom(db.Model):
    __tablename__ = 'chat_rooms'

    id = db.Column(db.Integer, primary_key=True)
    creator_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    name = db.Column(db.String(100), nullable=False)  # Ensure the name is always provided

    creator = db.relationship('User', backref='created_chat_rooms')

