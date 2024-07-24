# backend/app/routes.py
from flask import Blueprint, jsonify

routes_bp = Blueprint('routes', __name__)  # Use a unique name for the blueprint

@routes_bp.route('/')
def index():
    return jsonify({"message": "Welcome to ChatPulse!"})

@routes_bp.route('/status')
def status():
    return jsonify({"status": "OK", "message": "Service is running"})
