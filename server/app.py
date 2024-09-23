import os
from flask import Flask, send_from_directory, jsonify
from flask_cors import CORS
from werkzeug.exceptions import HTTPException
from server.config import Config  # Change this line
from server.extensions import db, migrate, jwt, cache, limiter, api
from server.routes import auth, chat
# from server.routes import admin, settings  # Uncomment these when implemented
from server.routes.chat import chat_bp
from server.routes.auth import auth_bp
from flask_limiter.util import get_remote_address
from flask_socketio import SocketIO
import traceback

socketio = SocketIO()

def create_app(config_class=Config):
    app = Flask(__name__, static_folder=os.path.abspath("../client/build"), static_url_path="/")
    
    # Configure CORS
    CORS(app, resources={r"/api/*": {"origins": "http://localhost:3000", "supports_credentials": True}})
    
    app.config.from_object(config_class)

    # Initialize extensions with the app
    db.init_app(app)
    migrate.init_app(app, db)
    jwt.init_app(app)
    cache.init_app(app)
    limiter.init_app(app)
    api.init_app(app)
    socketio.init_app(app, cors_allowed_origins="http://localhost:3000")

    with app.app_context():
        # Import all models here
        from server.models.user import User
        from server.models.chatroom import ChatRoom
        from server.models.message import Message
        from server.models.conversation import Conversation
        from server.models.ticket import Ticket
        
        # ... rest of your app setup ...
    
    # Register blueprints
    app.register_blueprint(auth_bp, url_prefix='/api/auth')
    app.register_blueprint(chat.chat_bp, url_prefix='/api/chat')
    # app.register_blueprint(admin.admin_bp, url_prefix='/api/admin')  # Uncomment when implemented
    # app.register_blueprint(settings.settings_bp, url_prefix='/api/settings')  # Uncomment when implemented

    # Serve React application
    @app.route('/', defaults={'path': ''})
    @app.route('/<path:path>')
    def serve(path):
        if path != "" and os.path.exists(os.path.join(app.static_folder, path)):
            return send_from_directory(app.static_folder, path)
        return send_from_directory(app.static_folder, 'index.html')

    # Global error handler for exceptions
    @app.errorhandler(Exception)
    def handle_exception(e):
        if isinstance(e, HTTPException):
            return jsonify(error=str(e)), e.code
        app.logger.error(f"Unhandled exception: {str(e)}")
        app.logger.error(traceback.format_exc())
        return jsonify(error="An unexpected error occurred", details=str(e)), 500

    limiter.key_func = get_remote_address

    return app