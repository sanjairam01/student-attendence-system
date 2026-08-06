/* Smart Attendance System - Theme Switcher (Dark / Light Mode) */

(function() {
  const THEME_KEY = 'smart_attendance_theme';

  function getStoredTheme() {
    return localStorage.getItem(THEME_KEY) || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  }

  function setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem(THEME_KEY, theme);
    const event = new CustomEvent('themeChanged', { detail: { theme } });
    window.dispatchEvent(event);
  }

  // Initialize theme on load
  document.addEventListener('DOMContentLoaded', () => {
    setTheme(getStoredTheme());

    const toggleBtns = document.querySelectorAll('[data-theme-toggle]');
    toggleBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const current = document.documentElement.getAttribute('data-theme');
        setTheme(current === 'dark' ? 'light' : 'dark');
      });
    });
  });

  window.SmartTheme = {
    setTheme,
    getTheme: getStoredTheme
  };
})();
