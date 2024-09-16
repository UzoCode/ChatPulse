import os
import sys

sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from server.app import create_app, db
# Import all models
from server.models.user import User
from server.models.chatroom import ChatRoom
from server.models.message import Message
from server.models.conversation import Conversation
from server.models.ticket import Ticket

app = create_app()

def init_db():
    with app.app_context():
        db.create_all()
        print("Database tables created.")

if __name__ == "__main__":
    init_db()