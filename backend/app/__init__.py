import os
from flask import Flask, jsonify, send_from_directory, abort
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_jwt_extended import JWTManager
from flask_socketio import SocketIO
from flask_cors import CORS
import pymysql
from config import Config

# Install pymysql as MySQLdb
pymysql.install_as_MySQLdb()

db = SQLAlchemy()
migrate = Migrate()
jwt = JWTManager()
socketio = SocketIO()

def create_app(config_class=Config):
    app = Flask(__name__, static_folder=os.path.abspath("frontend/build"), static_url_path="/backend")
    app.config.from_object(config_class)

    db.init_app(app)
    migrate.init_app(app, db)
    jwt.init_app(app)
    socketio.init_app(app, cors_allowed_origins="*")

    CORS(app, resources={r"/api/*": {"origins": "*"}})

    from .auth import auth_bp
    app.register_blueprint(auth_bp, url_prefix='/api/auth')

    from .chat import chat_bp
    app.register_blueprint(chat_bp, url_prefix='/api/chat')

    from .admin import admin_bp
    app.register_blueprint(admin_bp, url_prefix='/api/admin')

    from .settings import settings_bp
    app.register_blueprint(settings_bp, url_prefix='/api/settings')

    
    # Serve the downloaded landing page
    @app.route('/')
    def serve_index():
        landing_page_path = os.path.abspath('landing-page')
        index_path = os.path.join(landing_page_path, 'index.html')
        print(f"Landing page path: {landing_page_path}")
        print(f"Index path: {index_path}")
        if os.path.exists(index_path):
            return send_from_directory(landing_page_path, 'index.html')
        else:
            return abort(404, description="Landing page index.html not found")

    @app.route('/assets/<path:filename>')
    def serve_assets(filename):
        assets_path = os.path.join(os.path.abspath('landing-page'), 'assets')
        if os.path.exists(os.path.join(assets_path, filename)):
            print(f"Serving asset file: {filename}")  # Debugging statement
            return send_from_directory(assets_path, filename)
        else:
            print(f"Asset file not found: {filename}")  # Debugging statement
            return abort(404, description="Asset file not found")

    @app.route('/css/<path:filename>')
    def serve_css(filename):
        css_path = os.path.join(os.path.abspath('landing-page'), 'css')
        if os.path.exists(os.path.join(css_path, filename)):
            print(f"Serving css file: {filename}")  # Debugging statement
            return send_from_directory(css_path, filename)
        else:
            print(f"CSS file not found: {filename}")  # Debugging statement
            return abort(404, description="CSS file not found")

    @app.route('/js/<path:filename>')
    def serve_js(filename):
        js_path = os.path.join(os.path.abspath('landing-page'), 'js')
        if os.path.exists(os.path.join(js_path, filename)):
            print(f"Serving js file: {filename}")  # Debugging statement
            return send_from_directory(js_path, filename)
        else:
            print(f"JS file not found: {filename}")  # Debugging statement
            return abort(404, description="JS file not found")

    @app.route('/images/<path:filename>')
    def serve_images(filename):
        images_path = os.path.join(os.path.abspath('landing-page'), 'images')
        if os.path.exists(os.path.join(images_path, filename)):
            print(f"Serving image file: {filename}")  # Debugging statement
            return send_from_directory(images_path, filename)
        else:
            print(f"Image file not found: {filename}")  # Debugging statement
            return abort(404, description="Image file not found")
    @app.route('/', defaults={'path': ''})
    @app.route('/<path:path>')
    def serve_react_app(path):
        full_path = os.path.abspath(os.path.join(app.static_folder, path))
        print(f"Serving path: {path}")
        print(f"Full path: {full_path}")
        if path != "" and os.path.exists(full_path):
            print(f"Serving static file: {full_path}")
            return send_from_directory(app.static_folder, path)
        else:
            index_path = os.path.abspath(os.path.join(app.static_folder, 'index.html'))
            print(f"Serving index.html from: {index_path}")
            if os.path.exists(index_path):
                return send_from_directory(app.static_folder, 'index.html')
            else:
                print("index.html not found")
                return abort(404, description="index.html not found in build directory")

    @app.route('/static/js/<path:path>')
    def serve_static_js(path):
        full_path = os.path.abspath(os.path.join(app.static_folder, 'static', 'js', path))
        print(f"Serving static JS file: {full_path}")
        if os.path.exists(full_path):
            return send_from_directory(os.path.join(app.static_folder, 'static', 'js'), path)
        else:
            print(f"Static JS file not found: {full_path}")
            return abort(404, description="Static JS file not found")

    return app
