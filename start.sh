#!/usr/bin/env bash
# exit on error
set -o errexit

# Ensure correct Python path
export PYTHONPATH=$PYTHONPATH:$(pwd):$(pwd)/backend

# Start Gunicorn with our app
gunicorn app:app --log-file - --bind 0.0.0.0:$PORT 