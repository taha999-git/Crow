#!/usr/bin/env python
"""
Add French translations to the django.po file.
"""
import os

# French translation dictionary
translations = {
    "Settings": "Paramètres",
    "Collapse sidebar": "Réduire la barre latérale",
    "Online": "En ligne",
    "User Settings": "Paramètres utilisateur",
    "My Account": "Mon compte",
    "Preferences": "Préférences",
    "Appearance": "Apparence",
    "Privacy & Security": "Confidentialité et sécurité",
    "Privacy": "Confidentialité",
    "Notifications": "Notifications",
    "More": "Plus",
    "Subscription": "Abonnement",
    "Advanced": "Avancé",
    "Back to Home": "Retour à l'accueil",
    "Manage your account settings and preferences": "Gérez vos paramètres et préférences de compte",
    "Save Changes": "Enregistrer les modifications",
    "Profile": "Profil",
    "Customize how you appear to others": "Personnalisez comment vous apparaissez aux autres",
    "Profile Picture": "Photo de profil",
    "JPG, PNG or GIF • Max 5MB": "JPG, PNG ou GIF • Max 5 Mo",
    "Remove Avatar": "Supprimer l'avatar",
    "Personal Information": "Informations personnelles",
    "Username": "Nom d'utilisateur",
    "This cannot be changed": "Ceci ne peut pas être modifié",
    "First Name": "Prénom",
    "Enter your first name": "Entrez votre prénom",
    "Last Name": "Nom de famille",
    "Enter your last name": "Entrez votre nom de famille",
    "Email Address": "Adresse e-mail",
    "Used for account notifications and password recovery": "Utilisé pour les notifications de compte et la récupération de mot de passe",
    "About Me": "À propos de moi",
    "Tell others about yourself...": "Parlez de vous aux autres...",
    "Security": "Sécurité",
    "Change Password": "Changer le mot de passe",
    "Update your password regularly to keep your account secure": "Mettez à jour régulièrement votre mot de passe pour sécuriser votre compte",
    "Change": "Modifier",
    "Two-Factor Authentication": "Authentification à deux facteurs",
    "Add an extra layer of security to your account": "Ajouter une couche de sécurité supplémentaire à votre compte",
    "Meeting Preferences": "Préférences de réunion",
    "Customize your default meeting settings": "Personnalisez vos paramètres de réunion par défaut",
    "Join with video": "Rejoindre avec la vidéo",
    "Automatically enable your video when joining meetings": "Activer automatiquement votre vidéo lors de la participation aux réunions",
    "Mute on join": "Activer la sourdine à la connexion",
    "Automatically mute your microphone when joining meetings": "Mettre automatiquement votre microphone en sourdine lors de la participation aux réunions",
    "Show meeting controls": "Afficher les contrôles de réunion",
    "Always show meeting controls panel": "Toujours afficher le panneau de contrôle de réunion",
    "Enable noise cancellation": "Activer la suppression du bruit",
    "Reduce background noise automatically": "Réduire automatiquement le bruit de fond",
    "Audio & Video": "Audio et vidéo",
    "Default Microphone": "Microphone par défaut",
    "Default System Microphone": "Microphone système par défaut",
    "External Microphone": "Microphone externe",
    "Default Camera": "Caméra par défaut",
    "Default System Camera": "Caméra système par défaut",
    "External Webcam": "Webcam externe",
    "Customize the look and feel": "Personnalisez l'apparence et la convivialité",
    "Light": "Clair",
    "Dark": "Sombre",
    "Auto": "Automatique",
    "Privacy Settings": "Paramètres de confidentialité",
    "Profile Visibility": "Visibilité du profil",
    "Control who can see your profile": "Contrôlez qui peut voir votre profil",
    "Everyone": "Tous",
    "Friends Only": "Amis uniquement",
    "Private": "Privé",
    "Show Online Status": "Afficher l'état en ligne",
    "Let others know when you're online": "Informez les autres quand vous êtes en ligne",
    "Allow Meeting Invitations": "Autoriser les invitations à des réunions",
    "Allow anyone to invite you to meetings": "Autoriser n'importe qui à vous inviter à des réunions",
    "Notification Preferences": "Préférences de notification",
    "Meeting Invitations": "Invitations aux réunions",
    "Get notified when someone invites you to a meeting": "Recevez une notification quand quelqu'un vous invite à une réunion",
    "Meeting Reminders": "Rappels de réunion",
    "Get reminders before meetings start": "Recevez des rappels avant le début des réunions",
    "Messages": "Messages",
    "Get notified about new messages": "Recevez des notifications sur les nouveaux messages",
    "Save All Changes": "Enregistrer toutes les modifications",
    "Cancel": "Annuler",
    "Delete Account": "Supprimer le compte",
    "Toggle Dark Mode": "Basculer le mode sombre",
}

# Read the PO file
po_path = 'locale/fr/LC_MESSAGES/django.po'
with open(po_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Process the content and add translations
lines = content.split('\n')
new_content = []
i = 0

while i < len(lines):
    line = lines[i]
    new_content.append(line)
    
    # If this is a msgid line with text (not empty), check the next line
    if line.startswith('msgid "') and not line.startswith('msgid ""'):
        # Extract the msgid text
        msgid_text = line[7:-1]  # Remove 'msgid "' and '"'
        
        # Check if next line is msgstr
        if i + 1 < len(lines) and lines[i + 1].startswith('msgstr ""'):
            i += 1
            # Get the translation
            translation = translations.get(msgid_text, "")
            new_content.append(f'msgstr "{translation}"')
        else:
            # Move to next line normally
            i += 1
            continue
    
    i += 1

# Write the updated content
with open(po_path, 'w', encoding='utf-8') as f:
    f.write('\n'.join(new_content))

print(f"Added French translations to {po_path}")
print(f"Total translations added: {len(translations)}")
