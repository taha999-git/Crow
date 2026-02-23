#!/usr/bin/env python
"""
Compile messages for translation.
"""
import os
import subprocess
import django
from django.conf import settings
from django.core.management import call_command

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'crow_project.settings')
django.setup()

# Add gettext to PATH
gettext_path = r'C:\Program Files\gettext-iconv\bin'
if os.path.exists(gettext_path):
    os.environ['PATH'] = gettext_path + os.pathsep + os.environ['PATH']

# Compile messages
try:
    print("Compiling translation messages...")
    call_command('compilemessages', verbosity=2)
    print("\nMessages compiled successfully!")
    print("Binary message file created at: locale/fr/LC_MESSAGES/django.mo")
except Exception as e:
    print(f"Error: {e}")
    import sys
    sys.exit(1)
