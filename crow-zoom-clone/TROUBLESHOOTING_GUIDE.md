# 🆘 DARK MODE TROUBLESHOOTING GUIDE

## ❓ Common Issues & Solutions

---

## 1️⃣ Toggle Button Not Showing

### Problem
You don't see the ☀️/🌙 button in the header

### Solutions

**Solution A: Hard Refresh Browser**
```
Windows: Ctrl + Shift + R
Mac: Cmd + Shift + R
```

**Solution B: Clear Browser Cache**
```
Chrome: Settings → Clear Browsing Data → Clear All
Firefox: Settings → Privacy → Clear All
Safari: Develop → Empty Caches
```

**Solution C: Check HTML Includes**
Verify `base.html` has:
```html
<link rel="stylesheet" href="{% static 'css/dark-mode.css' %}">
```

**Solution D: Check Console**
Press F12, go to Console tab:
- Any red errors?
- Check Network tab for 404 errors
- Make sure dark-mode.css loaded

---

## 2️⃣ Dark Mode Not Activating

### Problem
Button exists but clicking doesn't change colors

### Solutions

**Solution A: Check JavaScript**
```javascript
// Press F12 → Console → Paste this:
console.log(document.body.classList.contains('dark-mode'));
// Should print: true or false
```

**Solution B: Check localStorage**
```javascript
// Press F12 → Console → Paste this:
console.log(localStorage.getItem('darkMode'));
// Should print: 'true' or 'false'
```

**Solution C: Verify dark-mode.css Loaded**
```javascript
// Press F12 → Console → Paste this:
const style = document.querySelector('link[href*="dark-mode.css"]');
console.log(style ? 'Loaded' : 'NOT LOADED');
```

**Solution D: Check CSS Variables**
```javascript
// Press F12 → Console → Paste this:
const root = getComputedStyle(document.documentElement);
console.log(root.getPropertyValue('--dark-bg'));
// Should print: #1a1a2e
```

---

## 3️⃣ Colors Look Wrong or Different

### Problem
Dark mode colors don't match expectations

### Solutions

**Solution A: Check Color Definition**
Edit `style.css` and verify colors:
```css
:root {
    --dark-bg: #1a1a2e;
    --dark-card: #16213e;
    --dark-text: #e8e8e8;
    --dark-border: #3d4d64;
    --accent-orange: #ff8c42;
}
```

**Solution B: Check CSS Cascade**
Make sure dark-mode.css is loaded AFTER style.css:
```html
<link rel="stylesheet" href="{% static 'css/style.css' %}">
<link rel="stylesheet" href="{% static 'css/dark-mode.css' %}">
<!-- dark-mode.css must come second! -->
```

**Solution C: Clear Browser Cache Again**
Sometimes CSS is cached aggressively:
```
Ctrl + Shift + Delete → Check "Cached images and files"
```

**Solution D: Check Settings**
If in Settings page, also verify `settings-modern.css`:
```html
<link rel="stylesheet" href="{% static 'css/settings-modern.css' %}">
```

---

## 4️⃣ Text Not Readable in Dark Mode

### Problem
Text color is too light or too dark to read

### Solutions

**Solution A: Check Text Color Variable**
In `style.css`, verify:
```css
body.dark-mode {
    color: #e8e8e8;  /* Should be light! */
}
```

**Solution B: Check Element-Specific Styles**
Some elements might have hardcoded colors:
```css
/* WRONG - hardcoded color */
body.dark-mode .my-text {
    color: #1e293b;  /* This is dark! */
}

/* RIGHT - use variable */
body.dark-mode .my-text {
    color: var(--dark-text);  /* This is light! */
}
```

**Solution C: Check Parent Styles**
Make sure parent elements don't override:
```css
/* Check if parent has: */
body.dark-mode .parent {
    color: #1e293b;  /* Dark color */
}

/* Should be: */
body.dark-mode .parent {
    color: var(--dark-text);  /* Light color */
}
```

---

## 5️⃣ Preference Not Saving (Always Resets)

### Problem
Close browser and dark mode preference is lost

### Solutions

**Solution A: Check localStorage is Enabled**
```javascript
// Press F12 → Console → Paste this:
try {
    localStorage.setItem('test', 'test');
    console.log('localStorage is enabled');
    localStorage.removeItem('test');
} catch(e) {
    console.log('localStorage is DISABLED!');
}
```

**Solution B: Check JavaScript Runs**
```javascript
// Press F12 → Console → Paste this:
console.log(document.getElementById('global-dark-mode-toggle'));
// Should show button element, not null
```

**Solution C: Verify Script Location**
In `base.html`, JavaScript should be inside:
```html
<script>
    (function() {
        const body = document.body;
        const darkModeToggle = document.getElementById('global-dark-mode-toggle');
        
        // Initialize and add event listener
        // ...
    })();
</script>
```

**Solution D: Check for Errors**
Press F12 → Console tab:
- Any red errors?
- Read error messages carefully
- Note any line numbers

---

## 6️⃣ Toggle Button Styling Broken

### Problem
Button looks weird or doesn't fit in header

### Solutions

**Solution A: Check Button CSS**
In `style.css`, verify:
```css
.global-dark-mode-btn {
    background: transparent;
    border: none;
    padding: var(--space-sm);
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
}
```

**Solution B: Check Header Layout**
Make sure header uses flexbox:
```css
.header-content {
    display: flex;
    justify-content: space-between;  /* Important! */
    align-items: center;
}
```

**Solution C: Check Icon Size**
SVG icons should be 20x20:
```css
.global-dark-mode-btn svg {
    width: 20px;
    height: 20px;
}
```

**Solution D: Inspect in Developer Tools**
```
Right-click button → Inspect
Check computed styles in DevTools
Look for conflicting CSS rules
```

---

## 7️⃣ Hover Effects Not Working

### Problem
Buttons or elements don't change color on hover

### Solutions

**Solution A: Check Hover CSS**
In `style.css`, verify hover rules exist:
```css
button:hover {
    background-color: var(--accent-orange-light);
    transform: translateY(-2px);
}

body.dark-mode button:hover {
    background-color: var(--accent-orange-light);
}
```

**Solution B: Check Specificity**
Make sure dark mode hover rule has correct specificity:
```css
/* Too weak */
.button:hover { }

/* Better */
body.dark-mode .button:hover { }

/* Even better */
body.dark-mode button:hover { }
```

**Solution C: Check for !important**
Remove overriding !important rules:
```css
/* WRONG */
button {
    background: blue !important;
}

button:hover {
    background: orange;  /* Ignored! */
}

/* RIGHT */
button {
    background: blue;
}

button:hover {
    background: orange;  /* Works! */
}
```

---

## 8️⃣ Animation/Transition Not Smooth

### Problem
Colors change abruptly instead of smoothly

### Solutions

**Solution A: Check Transition CSS**
In `style.css` or `dark-mode.css`, verify:
```css
* {
    transition: 
        background-color 0.3s ease,
        color 0.3s ease,
        border-color 0.3s ease,
        box-shadow 0.3s ease;
}
```

**Solution B: Check Timing Function**
Make sure using `ease` not `linear`:
```css
/* Smooth */
transition: all 0.3s ease;

/* Jerky */
transition: all 0.3s linear;

/* Very jerky */
transition: all 0s;  /* Instant! */
```

**Solution C: Adjust Speed**
If too slow (>1s) or too fast (<0.1s):
```css
/* Current */
transition: all 0.3s ease;

/* Faster */
transition: all 0.15s ease;

/* Slower */
transition: all 0.5s ease;
```

---

## 9️⃣ Orange Color Not Showing

### Problem
Buttons/accents stay blue instead of orange in dark mode

### Solutions

**Solution A: Check Orange Variable**
In `style.css`, verify:
```css
:root {
    --accent-orange: #ff8c42;  /* Should exist! */
}
```

**Solution B: Check Dark Mode Button Style**
In `style.css`, verify:
```css
body.dark-mode button {
    background-color: var(--accent-orange);
}
```

**Solution C: Check Specificity**
Light mode button style might be too specific:
```css
/* Wrong - this overrides dark mode! */
button {
    background-color: #2563eb;
}

body.dark-mode button {
    background-color: #ff8c42;
}

/* Better */
button {
    background-color: var(--primary);  /* Uses CSS variable */
}

body.dark-mode {
    --primary: #ff8c42;
}
```

**Solution D: Inspect Element**
```
Right-click orange button → Inspect
Look at Styles panel
Find what color is applied
```

---

## 🔟 Multiple Dark Mode Buttons Appearing

### Problem
Several ☀️/🌙 buttons visible instead of one

### Solutions

**Solution A: Check for Duplicates**
Search `base.html` for:
```html
<!-- Should only appear ONCE -->
<button id="global-dark-mode-toggle" class="global-dark-mode-btn">
```

If appears multiple times, delete duplicates.

**Solution B: Check Settings Page**
`settings.html` might have its own button:
```html
<!-- Remove if duplicate -->
<button id="dark-mode-toggle" class="dark-mode-btn">
```

**Solution C: Use ID Selector**
Make sure JavaScript targets correct ID:
```javascript
const darkModeToggle = document.getElementById('global-dark-mode-toggle');
// Should only be ONE element with this ID!
```

---

## ❌ Nothing Works - Complete Reset

If all else fails, try complete reset:

### Step 1: Clear Everything
```bash
# Clear browser cache
# Settings → Clear browsing data → All time → All data types

# Or hard refresh:
Ctrl + Shift + R
```

### Step 2: Verify Files
Check these files exist:
- ✓ `crow_app/templates/base.html`
- ✓ `static/css/style.css`
- ✓ `static/css/settings-modern.css`
- ✓ `static/css/dark-mode.css` ← NEW FILE!

### Step 3: Verify Imports
In `base.html`, check these lines exist:
```html
<link rel="stylesheet" href="{% static 'css/style.css' %}">
<link rel="stylesheet" href="{% static 'css/dark-mode.css' %}">
```

### Step 4: Restart Server
```bash
# Stop server (Ctrl + C)
# Start fresh:
py manage.py runserver
```

### Step 5: Test Again
```
Visit: http://localhost:8000
Press: F12 (developer tools)
Check: Console tab for errors
Look for: ☀️/🌙 button in top right
```

---

## 📝 Still Having Issues?

### Collect Debug Info
When reporting issues, include:

1. **Browser & Version**
   ```
   Chrome 120, Firefox 121, Safari 17, Edge 120
   ```

2. **Error Messages**
   - Press F12
   - Go to Console
   - Copy any red error text

3. **What You Expected**
   - Dark mode should activate
   - Text should be readable
   - Preference should save

4. **What Actually Happened**
   - Button didn't appear
   - Colors didn't change
   - Error message shown

5. **Steps to Reproduce**
   - Click button
   - Check console
   - Refresh page
   - etc.

---

## 💡 Pro Tips

### Tip 1: Use Developer Tools
```
F12 → Elements tab → Find .dark-mode in <body class>
F12 → Console → Check for JavaScript errors
F12 → Network → Make sure CSS files loaded
F12 → Application → Check localStorage
```

### Tip 2: Test in Fresh Browser Tab
```
Open new private/incognito window
Visit website
Test dark mode (fresh localStorage)
Helps identify cache issues
```

### Tip 3: Check Mobile Browser
```
Same troubleshooting steps
But on phone/tablet
Different viewport might reveal issues
```

### Tip 4: Read Console Messages
```
Errors in red = JavaScript problem
Warnings in yellow = Style conflict
This helps identify root cause
```

---

## ✅ Quick Checklist

Before reporting issue, verify:

- [ ] Restarted Django server
- [ ] Hard refreshed browser (Ctrl+Shift+R)
- [ ] Checked browser console (F12)
- [ ] Cleared browser cache
- [ ] Verified all files exist
- [ ] Verified CSS files linked in base.html
- [ ] Tested in different browser
- [ ] Tested in private/incognito mode
- [ ] Checked localStorage is enabled
- [ ] Looked for JavaScript errors

---

## 🎯 Most Common Fixes

| Issue | Fix | Success Rate |
|-------|-----|--------------|
| Button not showing | Hard refresh (Ctrl+Shift+R) | 90% |
| Dark mode not activating | Clear cache + refresh | 85% |
| Colors wrong | Restart Django server | 80% |
| Preference not saving | Check localStorage enabled | 75% |
| Text not readable | Check CSS variables | 95% |

---

**Still stuck? Create an issue with debug info above!** 🆘

Good luck! 🚀
