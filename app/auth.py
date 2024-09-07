from flask import Blueprint, request, jsonify
from app import db
from app.models import User
from flask_jwt_extended import create_access_token

# Create a blueprint for auth
auth_bp = Blueprint('auth', __name__)

@auth_bp.route('/api/register', methods=['POST'])
def register():
    data = request.get_json()

    # Check if email or username already exists
    existing_user = User.query.filter((User.email == data['email']) | (User.username == data['username'])).first()
    if existing_user:
        return jsonify(message="User with that email or username already exists"), 409  # Conflict status code

    # Register the new user
    new_user = User(email=data['email'], username=data['username'], password=data['password'])
    new_user.set_password(data['password'])
    db.session.add(new_user)
    db.session.commit()

    return jsonify(message="User registered successfully"), 201

@auth_bp.route('/api/login', methods=['POST'])
def login():
    data = request.get_json()
    user = User.query.filter((User.email == data['emailOrUsername']) | (User.username == data['emailOrUsername'])).first()
    if user and user.check_password(data['password']):
        access_token = create_access_token(identity=user.username)
        return jsonify(token=access_token, username=user.username), 200
    return jsonify(message="Login failed"), 401
