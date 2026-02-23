#!/usr/bin/env python
"""
Extract messages for translation using Django's i18n system.
This script handles French translation extraction.
"""
import os
import sys
import django
from django.conf import settings
from django.core.management import call_command

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'crow_project.settings')
django.setup()

# Add gettext to PATH
import subprocess
gettext_path = r'C:\Program Files\gettext-iconv\bin'
if os.path.exists(gettext_path):
    os.environ['PATH'] = gettext_path + os.pathsep + os.environ['PATH']

# Extract messages for French using direct command
try:
    print("Extracting messages for French translation...")
    # Use the direct command approach instead of call_command
    result = subprocess.run(['python', 'manage.py', 'makemessages', '--locale=fr'], 
                          capture_output=True, text=True, cwd=os.getcwd())
    print(result.stdout)
    if result.returncode == 0:
        print("\nMessages extracted successfully!")
        print("French translation file created at: locale/fr/LC_MESSAGES/django.po")
    else:
        print(f"Error: {result.stderr}")
        sys.exit(1)
except Exception as e:
    print(f"Error: {e}")
    sys.exit(1)
