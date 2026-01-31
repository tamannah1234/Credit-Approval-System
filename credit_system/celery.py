import os
from celery import Celery

# set default Django settings
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'credit_system.settings')

app = Celery('credit_system')

# Load settings from Django settings, CELERY_ prefix
app.config_from_object('django.conf:settings', namespace='CELERY')

# Auto-discover tasks.py in all apps
app.autodiscover_tasks()
