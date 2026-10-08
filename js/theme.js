/**
 * THEME CONTROLLER
 * Manages Dark/Light mode state with localStorage persistence
 * and OS system preference synchronization.
 */

(function () {
  'use strict';

  const STORAGE_KEY = 'portfolio_theme';
  const root = document.documentElement;

  // Retrieve saved preference or calculate system default
  function getPreferredTheme() {
    const savedTheme = localStorage.getItem(STORAGE_KEY);
    if (savedTheme === 'light' || savedTheme === 'dark') {
      return savedTheme;
    }
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }

  // Apply theme to document element
  function setTheme(theme) {
    root.setAttribute('data-theme', theme);
    localStorage.setItem(STORAGE_KEY, theme);

    // Update aria labels if button exists
    const toggleBtn = document.getElementById('theme-toggle');
    if (toggleBtn) {
      toggleBtn.setAttribute('aria-label', `Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`);
    }
  }

  // Toggle current theme
  function toggleTheme() {
    const currentTheme = root.getAttribute('data-theme') || getPreferredTheme();
    const nextTheme = currentTheme === 'dark' ? 'light' : 'dark';
    setTheme(nextTheme);
  }

  // Initialize immediately to prevent flash
  const initialTheme = getPreferredTheme();
  setTheme(initialTheme);

  // Bind to DOM when loaded
  document.addEventListener('DOMContentLoaded', () => {
    const toggleBtn = document.getElementById('theme-toggle');
    if (toggleBtn) {
      toggleBtn.addEventListener('click', toggleTheme);
    }

    // Optional keyboard shortcut: press 'T' to toggle theme when not typing in inputs
    window.addEventListener('keydown', (e) => {
      const activeTag = document.activeElement ? document.activeElement.tagName.toLowerCase() : '';
      if (e.key === 't' || e.key === 'T') {
        if (activeTag !== 'input' && activeTag !== 'textarea') {
          toggleTheme();
        }
      }
    });

    // Listen to OS theme changes if user hasn't explicitly set a preference
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
      if (!localStorage.getItem(STORAGE_KEY)) {
        setTheme(e.matches ? 'dark' : 'light');
      }
    });
  });

  // Expose toggle to global scope if needed
  window.PortfolioTheme = {
    toggle: toggleTheme,
    set: setTheme,
    get: () => root.getAttribute('data-theme') || getPreferredTheme()
  };
})();
