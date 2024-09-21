from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_socketio import SocketIO
from flask_caching import Cache
from flask_limiter import Limiter
from flask_limiter.util import get_remote_address
from flask_restx import Api
from flask_jwt_extended import JWTManager
import firebase_admin
from firebase_admin import credentials
import os

db = SQLAlchemy()
migrate = Migrate()
socketio = SocketIO()
cache = Cache()
limiter = Limiter(key_func=get_remote_address)
api = Api()
jwt = JWTManager()

# Initialize Firebase Admin SDK
cred_path = os.path.join(os.path.dirname(__file__), 'admin_services_key.json')
if os.path.exists(cred_path):
    cred = credentials.Certificate(cred_path)
    firebase_admin.initialize_app(cred)
else:
    print("Warning: Firebase credentials file not found. Some features may not work.")