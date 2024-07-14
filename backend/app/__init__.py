from flask import Flask, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_jwt_extended import JWTManager
from flask_socketio import SocketIO
from flask_cors import CORS  # Import CORS
from config import Config

db = SQLAlchemy()
migrate = Migrate()
jwt = JWTManager()
socketio = SocketIO()

def create_app(config_class=Config):
    app = Flask(__name__)
    app.config.from_object(config_class)

    db.init_app(app)
    migrate.init_app(app, db)
    jwt.init_app(app)
    socketio.init_app(app, cors_allowed_origins="http://localhost:3000")  # SocketIO initialization with CORS support

    # CORS configuration
    CORS(app, resources={r"/api/*": {"origins": "http://localhost:3000"}})

    # Import and register blueprints
    from .auth import bp as auth_bp
    app.register_blueprint(auth_bp, url_prefix='/api/auth')

    from .chat import bp as chat_bp
    app.register_blueprint(chat_bp, url_prefix='/api/chat')

    from .admin import bp as admin_bp
    app.register_blueprint(admin_bp, url_prefix='/api/admin')

    from .settings import bp as settings_bp
    app.register_blueprint(settings_bp, url_prefix='/api/settings')

    # Root route
    @app.route('/')
    def index():
        return jsonify({"message": "Welcome to ChatPulse!"})

    return app
