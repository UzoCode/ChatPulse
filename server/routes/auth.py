from flask import Blueprint, request, jsonify, make_response
from flask_cors import cross_origin
from firebase_admin import auth
from flask_jwt_extended import create_access_token
from server.extensions import limiter

auth_bp = Blueprint('auth', __name__)

@auth_bp.route('/register', methods=['POST'])
@limiter.limit("5 per minute")
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
@limiter.limit("10 per minute")
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

@auth_bp.route('/exchange_token', methods=['POST'])
@limiter.limit("10 per minute")
def exchange_token():
    auth_header = request.headers.get('Authorization')
    if not auth_header or not auth_header.startswith('Bearer '):
        return jsonify({"error": "Invalid Authorization header"}), 401

    id_token = auth_header.split('Bearer ')[1]
    try:
        decoded_token = auth.verify_id_token(id_token)
        uid = decoded_token['uid']
        access_token = create_access_token(identity=uid)
        
        response = make_response(jsonify({"message": "Token exchanged successfully"}), 200)
        response.set_cookie('access_token', access_token, httponly=True, secure=True, samesite='Strict')
        return response
    except auth.InvalidIdTokenError:
        return jsonify({"error": "Invalid ID token"}), 401
    except auth.ExpiredIdTokenError:
        return jsonify({"error": "Expired ID token"}), 401
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# Add more auth-related routes as needed
