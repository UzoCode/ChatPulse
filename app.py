from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_restful import Api
from flask_jwt_extended import JWTManager
from flask_socketio import SocketIO
from routes import app_bp  # Import the blueprint from routes.py
from socket import socketio  # Import SocketIO events from socket.py

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql://username:password@localhost/chatpulse'
app.config['SECRET_KEY'] = 'your_secret_key'

# Initialize extensions
api = Api(app)
db = SQLAlchemy(app)
jwt = JWTManager(app)
socketio = SocketIO(app, cors_allowed_origins="*")

# Register the routes blueprint
app.register_blueprint(app_bp)

@socketio.on('connect')
def handle_connect():
    print('Client connected')
    emit('message', {'data': 'Connected to server'}, broadcast=True)

@socketio.on('send_message')
def handle_message(data):
    print(f"Received message: {data}")
    emit('message', data, broadcast=True)

@socketio.on('disconnect')
def handle_disconnect():
    print('Client disconnected')

if __name__ == '__main__':
    # Run the app with SocketIO support
    socketio.run(app, debug=True)
    