# backend/app/routes.py
from flask import Blueprint, jsonify

bp = Blueprint('routes', __name__)  # Use a unique name for the blueprint

@bp.route('/')
def index():
    return jsonify({"message": "Welcome to ChatPulse!"})
