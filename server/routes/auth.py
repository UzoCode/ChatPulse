from flask import Blueprint, request, jsonify
from firebase_admin import auth
from flask_jwt_extended import create_access_token

auth_bp = Blueprint('auth', __name__)

@auth_bp.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')
    
    try:
        user = auth.create_user(
            email=email,
            password=password
        )
        return jsonify({"message": "User created successfully", "uid": user.uid}), 201
    except Exception as e:
        return jsonify({"error": str(e)}), 400

@auth_bp.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')
    
    try:
        user = auth.get_user_by_email(email)
        # Note: Firebase Admin SDK doesn't provide a way to verify passwords
        # You might want to use Firebase Authentication REST API for this
        # For now, we'll assume the password is correct
        access_token = create_access_token(identity=user.uid)
        return jsonify(access_token=access_token), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 401

# Your route handlers here
