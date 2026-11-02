/**
 * MAIN INTERACTIVITY & UTILITIES
 * Timeline switcher, clipboard copy, and toast alerts.
 */

(function () {
  'use strict';

  // --------------------------------------------------------------------------
  // Toast Notification Utility
  // --------------------------------------------------------------------------
  const toastElement = document.getElementById('toast');
  let toastTimer = null;

  function showToast(message) {
    if (!toastElement) return;

    toastElement.textContent = message;
    toastElement.classList.add('show');

    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      toastElement.classList.remove('show');
    }, 3200);
  }

  // --------------------------------------------------------------------------
  // Timeline Tab Switcher (Experience vs Education)
  // --------------------------------------------------------------------------
  const timelineTabs = document.querySelectorAll('.timeline-tab-btn');
  const experienceContent = document.getElementById('timeline-experience');
  const educationContent = document.getElementById('timeline-education');

  if (timelineTabs.length > 0 && experienceContent && educationContent) {
    timelineTabs.forEach(tab => {
      tab.addEventListener('click', () => {
        timelineTabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');

        const target = tab.getAttribute('data-tab');
        if (target === 'education') {
          experienceContent.style.display = 'none';
          educationContent.style.display = 'block';
        } else {
          experienceContent.style.display = 'block';
          educationContent.style.display = 'none';
        }
      });
    });
  }

  // --------------------------------------------------------------------------
  // Quick Copy to Clipboard (Email & Handles)
  // --------------------------------------------------------------------------
  const copyButtons = document.querySelectorAll('[data-copy-text]');

  copyButtons.forEach(button => {
    button.addEventListener('click', async () => {
      const textToCopy = button.getAttribute('data-copy-text');
      if (!textToCopy) return;

      try {
        if (navigator.clipboard && navigator.clipboard.writeText) {
          await navigator.clipboard.writeText(textToCopy);
        } else {
          // Fallback for older environments
          const textArea = document.createElement('textarea');
          textArea.value = textToCopy;
          document.body.appendChild(textArea);
          textArea.select();
          document.execCommand('copy');
          document.body.removeChild(textArea);
        }

        const originalHtml = button.innerHTML;
        button.innerHTML = `
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="color:var(--status-available);"><polyline points="20 6 9 17 4 12"></polyline></svg>
          <span>Copied!</span>
        `;
        showToast(`Copied "${textToCopy}" to clipboard!`);

        setTimeout(() => {
          button.innerHTML = originalHtml;
        }, 2200);
      } catch (err) {
        showToast('Failed to copy to clipboard.');
      }
    });
  });


  // --------------------------------------------------------------------------
  // Dynamic Local Time in Footer
  // --------------------------------------------------------------------------
  const localTimeElement = document.getElementById('local-time-clock');

  function updateLocalTime() {
    if (!localTimeElement) return;
    const now = new Date();
    const timeString = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    localTimeElement.textContent = `${timeString} (${timeZone})`;
  }

  if (localTimeElement) {
    updateLocalTime();
    setInterval(updateLocalTime, 1000);
  }
})();
