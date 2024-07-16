#!/bin/sh

if [ "$1" = "flask" ]; then
    export FLASK_APP=run.py
    export FLASK_ENV=development
    flask run
else
    python run.py
fi
