import os
import sys

# Add the path to the backend directory
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), "backend")))

# Set the Django settings module
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "backend.settings")

# Import Django's WSGI application
from django.core.wsgi import get_wsgi_application
application = get_wsgi_application() 