#!/usr/bin/env bash
# exit on error
set -o errexit

# Install Python dependencies
pip install -r requirements.txt

# Install additional required packages
pip install gunicorn psycopg2-binary dj-database-url whitenoise

# Make sure backend directory is in PYTHONPATH
export PYTHONPATH=$PYTHONPATH:$(pwd)/backend

# Run migrations from the correct directory
cd backend
python manage.py collectstatic --no-input
python manage.py migrate 