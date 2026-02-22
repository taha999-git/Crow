// Real-time meeting updates (simulated)
// Settings Page Functionality
function initSettingsPage() {
    console.log('Settings page initialized');
    
    // Auto-save indicator
    const form = document.getElementById('settings-form');
    if (form) {
        let isDirty = false;
        const inputs = form.querySelectorAll('input, textarea, select');
        
        inputs.forEach(input => {
            input.addEventListener('input', () => {
                isDirty = true;
                showAutoSaveIndicator();
            });
        });
        
        form.addEventListener('submit', () => {
            isDirty = false;
            hideAutoSaveIndicator();
        });
    }
    
    // Initialize tooltips
    const tooltips = document.querySelectorAll('[data-tooltip]');
    tooltips.forEach(el => {
        el.addEventListener('mouseenter', (e) => {
            const tooltip = document.createElement('div');
            tooltip.className = 'tooltip';
            tooltip.textContent = e.target.dataset.tooltip;
            document.body.appendChild(tooltip);
            
            const rect = e.target.getBoundingClientRect();
            tooltip.style.left = `${rect.left + rect.width/2}px`;
            tooltip.style.top = `${rect.top - 40}px`;
            tooltip.style.transform = 'translateX(-50%)';
            
            e.target._tooltip = tooltip;
        });
        
        el.addEventListener('mouseleave', (e) => {
            if (e.target._tooltip) {
                e.target._tooltip.remove();
            }
        });
    });
}

function showAutoSaveIndicator() {
    let indicator = document.getElementById('auto-save-indicator');
    if (!indicator) {
        indicator = document.createElement('div');
        indicator.id = 'auto-save-indicator';
        indicator.className = 'auto-save-indicator';
        indicator.textContent = 'Changes not saved';
        document.querySelector('.settings-header').appendChild(indicator);
    }
}

function hideAutoSaveIndicator() {
    const indicator = document.getElementById('auto-save-indicator');
    if (indicator) {
        indicator.remove();
    }
}

// Load settings page functionality when DOM is ready
if (document.querySelector('.settings-container')) {
    document.addEventListener('DOMContentLoaded', initSettingsPage);
}
// Appearance Settings JavaScript
function initAppearanceSettings() {
    // Theme selection
    const themeOptions = document.querySelectorAll('.theme-option');
    const themeInput = document.getElementById('theme-preference');
    
    themeOptions.forEach(option => {
        option.addEventListener('click', function() {
            const value = this.getAttribute('data-value');
            themeInput.value = value;
            
            // Update UI
            themeOptions.forEach(opt => opt.classList.remove('selected'));
            this.classList.add('selected');
            
            // Show live preview
            updateThemePreview(value);
        });
    });
    
    // Color theme selection
    const colorThemeOptions = document.querySelectorAll('.color-theme-option');
    const colorThemeInput = document.getElementById('color-theme');
    
    colorThemeOptions.forEach(option => {
        option.addEventListener('click', function() {
            const value = this.getAttribute('data-value');
            colorThemeInput.value = value;
            
            // Update UI
            colorThemeOptions.forEach(opt => opt.classList.remove('selected'));
            this.classList.add('selected');
            
            // Update color pickers with theme colors
            updateColorPickers(value);
        });
    });
    
    // Color picker synchronization
    const primaryColorPicker = document.getElementById('primary-color');
    const primaryColorHex = document.getElementById('primary-color-hex');
    const secondaryColorPicker = document.getElementById('secondary-color');
    const secondaryColorHex = document.getElementById('secondary-color-hex');
    
    // Sync color picker with hex input
    if (primaryColorPicker && primaryColorHex) {
        primaryColorPicker.addEventListener('input', function() {
            primaryColorHex.value = this.value;
        });
        
        primaryColorHex.addEventListener('input', function() {
            if (this.value.match(/^#[0-9A-F]{6}$/i)) {
                primaryColorPicker.value = this.value;
            }
        });
    }
    
    if (secondaryColorPicker && secondaryColorHex) {
        secondaryColorPicker.addEventListener('input', function() {
            secondaryColorHex.value = this.value;
        });
        
        secondaryColorHex.addEventListener('input', function() {
            if (this.value.match(/^#[0-9A-F]{6}$/i)) {
                secondaryColorPicker.value = this.value;
            }
        });
    }
    
    // Initialize theme preview
    if (themeInput.value) {
        updateThemePreview(themeInput.value);
    }
}

// Theme preview mapping
const themePreviews = {
    'light': {
        primary: '#2563eb',
        background: '#ffffff',
        sidebar: '#f1f5f9',
        text: '#1e293b'
    },
    'dark': {
        primary: '#3b82f6',
        background: '#0f172a',
        sidebar: '#1e293b',
        text: '#f8fafc'
    },
    'auto': {
        primary: '#2563eb',
        background: 'linear-gradient(to right, #ffffff 50%, #0f172a 50%)',
        sidebar: 'linear-gradient(to right, #f1f5f9 50%, #1e293b 50%)',
        text: '#1e293b'
    }
};

// Color theme mapping
const colorThemes = {
    'blue': { primary: '#2563eb', secondary: '#7c3aed' },
    'purple': { primary: '#7c3aed', secondary: '#8b5cf6' },
    'green': { primary: '#10b981', secondary: '#34d399' },
    'red': { primary: '#ef4444', secondary: '#f87171' },
    'dark-blue': { primary: '#1e40af', secondary: '#1d4ed8' },
    'dark-purple': { primary: '#5b21b6', secondary: '#6d28d9' },
    'dark-green': { primary: '#047857', secondary: '#059669' },
    'dark-red': { primary: '#b91c1c', secondary: '#dc2626' }
};

function updateThemePreview(theme) {
    const preview = document.querySelector('.theme-preview-live');
    if (!preview) return;
    
    const themeColors = themePreviews[theme] || themePreviews.light;
    
    // Apply theme colors to preview
    document.documentElement.style.setProperty('--preview-primary', themeColors.primary);
    document.documentElement.style.setProperty('--preview-bg', themeColors.background);
    document.documentElement.style.setProperty('--preview-sidebar', themeColors.sidebar);
    document.documentElement.style.setProperty('--preview-text', themeColors.text);
}

function updateColorPickers(theme) {
    const colors = colorThemes[theme];
    if (!colors) return;
    
    const primaryColorPicker = document.getElementById('primary-color');
    const primaryColorHex = document.getElementById('primary-color-hex');
    const secondaryColorPicker = document.getElementById('secondary-color');
    const secondaryColorHex = document.getElementById('secondary-color-hex');
    
    if (primaryColorPicker && primaryColorHex) {
        primaryColorPicker.value = colors.primary;
        primaryColorHex.value = colors.primary;
    }
    
    if (secondaryColorPicker && secondaryColorHex) {
        secondaryColorPicker.value = colors.secondary;
        secondaryColorHex.value = colors.secondary;
    }
}

// Initialize when document is ready
document.addEventListener('DOMContentLoaded', function() {
    if (document.getElementById('appearance-tab')) {
        initAppearanceSettings();
    }
});
// Theme Manager
class ThemeManager {
    constructor() {
        this.init();
    }
    
    init() {
        this.applyTheme();
        this.setupEventListeners();
        this.watchSystemTheme();
    }
    
    applyTheme() {
        const theme = this.getCurrentTheme();
        const colorTheme = this.getCurrentColorTheme();
        
        // Apply theme mode
        document.documentElement.setAttribute('data-theme', theme);
        
        // Apply color theme
        this.applyColorTheme(colorTheme);
        
        // Apply other preferences
        this.applyCompactMode();
        this.applyAnimations();
        this.applyFontSize();
    }
    
    getCurrentTheme() {
        // Check localStorage first, then HTML attribute, then default to light
        return localStorage.getItem('crow_theme') || 
               document.documentElement.getAttribute('data-theme') || 
               'light';
    }
    
    getCurrentColorTheme() {
        return localStorage.getItem('crow_color_theme') || 
               document.documentElement.getAttribute('data-color-theme') || 
               'blue';
    }
    
    applyColorTheme(theme) {
        const colorThemes = {
            'blue': { primary: '#2563eb', secondary: '#7c3aed' },
            'purple': { primary: '#7c3aed', secondary: '#8b5cf6' },
            'green': { primary: '#10b981', secondary: '#34d399' },
            'red': { primary: '#ef4444', secondary: '#f87171' },
            'dark-blue': { primary: '#1e40af', secondary: '#1d4ed8' },
            'dark-purple': { primary: '#5b21b6', secondary: '#6d28d9' },
            'dark-green': { primary: '#047857', secondary: '#059669' },
            'dark-red': { primary: '#b91c1c', secondary: '#dc2626' }
        };
        
        const colors = colorThemes[theme] || colorThemes.blue;
        
        // Update CSS variables
        document.documentElement.style.setProperty('--primary', colors.primary);
        document.documentElement.style.setProperty('--primary-light', this.hexToRgba(colors.primary, 0.5));
        document.documentElement.style.setProperty('--primary-dark', this.darkenColor(colors.primary, 20));
        document.documentElement.style.setProperty('--secondary', colors.secondary);
        document.documentElement.style.setProperty('--secondary-light', this.hexToRgba(colors.secondary, 0.5));
        
        // Save to localStorage for persistence
        localStorage.setItem('crow_color_theme', theme);
    }
    
    applyCompactMode() {
        const compactMode = localStorage.getItem('crow_compact_mode') === 'true' ||
                           document.documentElement.getAttribute('data-compact-mode') === 'true';
        
        if (compactMode) {
            document.documentElement.setAttribute('data-compact-mode', 'true');
        } else {
            document.documentElement.removeAttribute('data-compact-mode');
        }
    }
    
    applyAnimations() {
        const animationsEnabled = localStorage.getItem('crow_animations') !== 'false' &&
                                 document.documentElement.getAttribute('data-animations-disabled') !== 'true';
        
        if (!animationsEnabled) {
            document.documentElement.setAttribute('data-animations-disabled', 'true');
        } else {
            document.documentElement.removeAttribute('data-animations-disabled');
        }
    }
    
    applyFontSize() {
        const fontSize = localStorage.getItem('crow_font_size') || 'medium';
        
        // Remove existing font size classes
        document.documentElement.classList.remove('font-small', 'font-medium', 'font-large', 'font-xlarge');
        
        // Add new font size class
        document.documentElement.classList.add(`font-${fontSize}`);
    }
    
    setupEventListeners() {
        // Listen for theme changes from settings page
        window.addEventListener('themeChanged', (e) => {
            this.applyTheme();
        });
        
        // Listen for system theme changes (for auto theme)
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
            const currentTheme = this.getCurrentTheme();
            if (currentTheme === 'auto') {
                this.applyTheme();
            }
        });
    }
    
    watchSystemTheme() {
        // If theme is auto, watch for system changes
        const currentTheme = this.getCurrentTheme();
        if (currentTheme === 'auto') {
            const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
            document.documentElement.setAttribute('data-theme', prefersDark ? 'dark' : 'light');
        }
    }
    
    hexToRgba(hex, alpha) {
        const r = parseInt(hex.slice(1, 3), 16);
        const g = parseInt(hex.slice(3, 5), 16);
        const b = parseInt(hex.slice(5, 7), 16);
        return `rgba(${r}, ${g}, ${b}, ${alpha})`;
    }
    
    darkenColor(hex, percent) {
        const num = parseInt(hex.slice(1), 16);
        const amt = Math.round(2.55 * percent);
        const R = (num >> 16) - amt;
        const G = (num >> 8 & 0x00FF) - amt;
        const B = (num & 0x0000FF) - amt;
        return `#${(0x1000000 + (R < 255 ? R < 1 ? 0 : R : 255) * 0x10000 +
                (G < 255 ? G < 1 ? 0 : G : 255) * 0x100 +
                (B < 255 ? B < 1 ? 0 : B : 255)).toString(16).slice(1)}`;
    }
    
    // Public methods to change theme
    setTheme(theme) {
        localStorage.setItem('crow_theme', theme);
        document.documentElement.setAttribute('data-theme', theme);
        this.watchSystemTheme();
        window.dispatchEvent(new Event('themeChanged'));
    }
    
    setColorTheme(theme) {
        localStorage.setItem('crow_color_theme', theme);
        this.applyColorTheme(theme);
        window.dispatchEvent(new Event('themeChanged'));
    }
    
    setCompactMode(enabled) {
        localStorage.setItem('crow_compact_mode', enabled);
        this.applyCompactMode();
    }
    
    setAnimationsEnabled(enabled) {
        localStorage.setItem('crow_animations', enabled);
        this.applyAnimations();
    }
    
    setFontSize(size) {
        localStorage.setItem('crow_font_size', size);
        this.applyFontSize();
    }
}

// Initialize theme manager when page loads
document.addEventListener('DOMContentLoaded', () => {
    window.themeManager = new ThemeManager();
    
    // If we're on the settings page, initialize appearance settings
    if (document.querySelector('#appearance-tab')) {
        initAppearanceSettings();
    }
});