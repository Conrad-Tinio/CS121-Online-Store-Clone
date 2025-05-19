import os
import sys

# Add the path to the backend directory
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), "backend")))

# Set the Django settings module
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "backend.settings")

# Import Django WSGI application 
from django.core.wsgi import get_wsgi_application

# This is the variable Render looks for with default 'gunicorn app:app'
app = get_wsgi_application() 