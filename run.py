from app import create_app, socketio

app = create_app()

if __name__ == "__main__":
    # Import socketio_handler after the app has been created
    import app.socketio_handler
    socketio.run(app, host='0.0.0.0', port=5000, allow_cross_origin=True) #debug=True)
