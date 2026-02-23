# Django Website Translation Guide (English & French)

## **Overview**
This guide explains how to translate your Crow video conferencing website into English and French using Django's internationalization (i18n) system.

---

## **What We've Already Done:**

✅ **Settings Updated:**
- Enabled `USE_I18N = True`
- Added `LANGUAGES = [('en', 'English'), ('fr', 'Français')]`
- Created `LOCALE_PATHS` pointing to `/locale` directory
- Added `LocaleMiddleware` to detect user's language preference

✅ **URLs Updated:**
- Added language prefix patterns (e.g., `/en/`, `/fr/`)
- Enabled `i18n_patterns()` for automatic language routing

✅ **Created `/locale` directory** for translation files

---

## **Step 1: Mark Text for Translation in Python Code (Views)**

### **In views.py - Use gettext:**

```python
from django.utils.translation import gettext as _

def home(request):
    message = _("Welcome to Crow!")  # This text will be translated
    context = {'message': message}
    return render(request, 'home.html', context)
```

### **For lazy translation (recommended):**

```python
from django.utils.translation import gettext_lazy as _

ACTIVITY_TYPES = [
    ('login', _('Login')),
    ('logout', _('Logout')),
    ('meeting_created', _('Meeting Created')),
]
```

---

## **Step 2: Mark Text for Translation in Templates**

### **In .html templates - Use {% trans %} tag:**

```html
{% load i18n %}

<h1>{% trans "Welcome to Crow" %}</h1>
<p>{% trans "Schedule a meeting" %}</p>

<!-- For variables, use blocktrans -->
{% blocktrans with name=user.username %}
Hello {{ name }}, welcome back!
{% endblocktrans %}
```

---

## **Step 3: Extract Translatable Strings (Create .pot file)**

Run this command in your project root:

```bash
python manage.py makemessages -l en -l fr --all
```

This creates translation files:
- `locale/en/LC_MESSAGES/django.po` (English - usually empty as it's default)
- `locale/fr/LC_MESSAGES/django.po` (French - needs translation)

---

## **Step 4: Edit Translation Files (.po files)**

Open `locale/fr/LC_MESSAGES/django.po` and translate:

```
#: crow_app/views.py:123
msgid "Welcome to Crow"
msgstr "Bienvenue à Crow"

#: crow_app/templates/home.html:5
msgid "Schedule a meeting"
msgstr "Planifier une réunion"

#: crow_app/models.py:45
msgid "Login"
msgstr "Connexion"

#: crow_app/models.py:46
msgid "Logout"
msgstr "Déconnexion"
```

---

## **Step 5: Compile Translations (.po to .mo)**

After translating, compile the files:

```bash
python manage.py compilemessages
```

This creates `.mo` files that Django uses at runtime.

---

## **Step 6: Add Language Switcher to Base Template**

Edit `base.html`:

```html
{% load i18n %}

<div class="language-switcher">
    <form action="{% url 'set_language' %}" method="post">
        {% csrf_token %}
        <input name="next" type="hidden" value="{{ request.path }}" />
        <select name="language" onchange="this.form.submit()">
            {% get_current_language as LANGUAGE_CODE %}
            <option value="en" {% if LANGUAGE_CODE == "en" %}selected{% endif %}>English</option>
            <option value="fr" {% if LANGUAGE_CODE == "fr" %}selected{% endif %}>Français</option>
        </select>
    </form>
</div>
```

---

## **Complete Command Summary:**

```bash
# 1. Mark strings in your code (as shown above)

# 2. Extract all translatable strings
python manage.py makemessages -l en -l fr --all

# 3. Edit the .po files in locale/fr/LC_MESSAGES/django.po

# 4. Compile translations
python manage.py compilemessages

# 5. Test in browser:
# - English: http://localhost:8000/home
# - French: http://localhost:8000/fr/home
```

---

## **Potential Problems & Solutions:**

### **Problem 1: Translations Not Appearing**
**Solution:**
- Make sure `USE_I18N = True` in settings
- Run `compilemessages` after editing .po files
- Restart Django server
- Check browser language settings

### **Problem 2: Missing Locale Directory**
**Solution:**
```bash
mkdir -p locale
python manage.py makemessages -l en -l fr --all
```

### **Problem 3: Template Tags Not Working**
**Solution:**
- Add `{% load i18n %}` at the top of every template
- Use `{% trans %}` for simple strings
- Use `{% blocktrans %}` for strings with variables

### **Problem 4: gettext Not Found**
**Solution:**
```bash
# Install gettext (required for makemessages)
# Windows: Download from https://mlocati.github.io/articles/gettext-iconv-windows.html
# Mac: brew install gettext
# Linux: apt-get install gettext
```

### **Problem 5: Language Not Switching**
**Solution:**
- Make sure `LocaleMiddleware` is in MIDDLEWARE
- Make sure `i18n_patterns()` is in urls.py
- Clear browser cookies
- Check if `set_language` view exists (built-in Django)

---

## **Files Changed:**

1. ✅ `crow_project/settings.py` - Added i18n configuration
2. ✅ `crow_project/urls.py` - Added language routing
3. ✅ Created `/locale` directory
4. 📝 `crow_app/views.py` - Need to add `_()` for translatable strings
5. 📝 `crow_app/templates/*.html` - Need to add `{% load i18n %}` and `{% trans %}`

---

## **Next Steps:**

1. **Mark all text** in views.py and templates for translation
2. **Run makemessages** to extract strings
3. **Translate** the .po files
4. **Compile messages**
5. **Test** language switching
6. **Deploy** with translations

---

## **Translation Examples for Your App:**

### **Models (crow_app/models.py):**
```python
from django.utils.translation import gettext_lazy as _

class Room(models.Model):
    ROOM_TYPES = [
        ('public', _('Public Room')),
        ('private', _('Private Room'))
    ]
    name = models.CharField(max_length=200)
    # ... rest of fields
```

### **Views (crow_app/views.py):**
```python
from django.utils.translation import gettext as _

@login_required
def home(request):
    messages.success(request, _('Welcome back!'))
    return render(request, 'home.html')
```

### **Templates (crow_app/templates/home.html):**
```html
{% load i18n %}

<h1>{% trans "Crow Video Conferencing" %}</h1>
<button>{% trans "Create Room" %}</button>
<button>{% trans "Schedule Meeting" %}</button>
```

---

## **Useful Django i18n Documentation:**
- https://docs.djangoproject.com/en/4.2/topics/i18n/
- https://docs.djangoproject.com/en/4.2/ref/django-admin/#makemessages

Good luck with your translations! 🌍
