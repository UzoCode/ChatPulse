from flask import Blueprint, request, jsonify
from app import db
from app.models import User  # Updated import
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
from werkzeug.security import generate_password_hash, check_password_hash

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
    hashed_password = generate_password_hash(data['password'], method='sha256')
    new_user = User(email=data['email'], username=data['username'], password=hashed_password)
    db.session.add(new_user)
    db.session.commit()

    return jsonify(message="User registered successfully"), 201

@auth_bp.route('/api/login', methods=['POST'])
def login():
    data = request.get_json()
    user = User.query.filter((User.email == data['emailOrUsername']) | (User.username == data['emailOrUsername'])).first()
    
    # Validate user credentials
    if user and check_password_hash(user.password, data['password']):
        access_token = create_access_token(identity=user.username)
        return jsonify(token=access_token, username=user.username), 200
    return jsonify(message="Login failed"), 401

@auth_bp.route('/api/logout', methods=['POST'])
@jwt_required()
def logout():
    # Placeholder for logout functionality, if needed
    return jsonify(message="Logout successful"), 200

@auth_bp.route('/protected', methods=['GET'])
@jwt_required()
def protected():
    current_user = get_jwt_identity()
    return jsonify(logged_in_as=current_user), 200
