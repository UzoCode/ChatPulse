import os
from flask import Flask, send_from_directory, abort, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_jwt_extended import JWTManager
from flask_socketio import SocketIO
from flask_cors import CORS
import pymysql
from config import Config
from werkzeug.exceptions import HTTPException

# Install pymysql as MySQLdb
pymysql.install_as_MySQLdb()

# Initialize extensions
db = SQLAlchemy()
migrate = Migrate()
jwt = JWTManager()
socketio = SocketIO(cors_allowed_origins="*")  # Initialize SocketIO with CORS settings

def create_app(config_class=Config):
    app = Flask(__name__, static_folder=os.path.abspath("frontend/build"), static_url_path="/")
    app.config.from_object(config_class)

    # Initialize extensions with the app
    db.init_app(app)
    migrate.init_app(app, db)
    jwt.init_app(app)
    socketio.init_app(app)  # Initialize SocketIO

    # Setup CORS for API routes
    CORS(app, resources={r"/api/*": {"origins": "*"}})

    # Register blueprints
    from .routes import app_bp
    app.register_blueprint(app_bp)

    from .auth import auth_bp
    app.register_blueprint(auth_bp, url_prefix='/api/auth')

    from .chat import chat_bp
    app.register_blueprint(chat_bp, url_prefix='/api/chat')

    from .admin import admin_bp
    app.register_blueprint(admin_bp, url_prefix='/api/admin')

    from .settings import settings_bp
    app.register_blueprint(settings_bp, url_prefix='/api/settings')

    # Serve React application
    @app.route('/', defaults={'path': ''})
    @app.route('/<path:path>')
    def serve_react_app(path):
        """
        Serve React application from the static folder.
        If the requested path exists, return the corresponding file;
        otherwise, serve the index.html for all other routes.
        """
        if path != "" and os.path.exists(os.path.join(app.static_folder, path)):
            return send_from_directory(app.static_folder, path)
        else:
            return send_from_directory(app.static_folder, 'index.html')

    # Serve static assets (JS, CSS, images) from the React build
    @app.route('/static/<path:filename>')
    def serve_static_files(filename):
        """
        Serve static files (JS, CSS, images) from the 'static' folder in the React build.
        """
        return send_from_directory(os.path.join(app.static_folder, 'static'), filename)

    # Serve other public assets from the public directory
    @app.route('/public/<path:filename>')
    def serve_public_files(filename):
        """
        Serve public assets from the 'public' directory.
        """
        public_path = os.path.join('frontend/public')
        if os.path.exists(os.path.join(public_path, filename)):
            return send_from_directory(public_path, filename)
        else:
            return abort(404, description="File not found")

    # Catch-all route to handle any unrecognized routes by sending index.html
    @app.route('/<path:path>')
    def catch_all(path):
        """
        Serve the React application or static files if they exist.
        """
        if os.path.exists(os.path.join(app.static_folder, path)):
            return send_from_directory(app.static_folder, path)
        return app.send_static_file('index.html')

    # Global error handler for exceptions
    @app.errorhandler(Exception)
    def handle_exception(e):
        """
        Handle exceptions and return appropriate error responses.
        """
        if isinstance(e, HTTPException):
            return jsonify(error=str(e.description)), e.code
        return jsonify(error="Internal Server Error"), 500

    return app
