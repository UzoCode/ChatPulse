import os
import sys

# Add the parent directory to the Python path
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from server.app import create_app, socketio

app = create_app()

if __name__ == '__main__':
    print("Starting server...")
    socketio.run(app, debug=True)