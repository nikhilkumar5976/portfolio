/**
 * MAIN INTERACTIVITY & UTILITIES
 * Timeline switcher, clipboard copy, contact form handling, and toast alerts.
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
  // Contact Form Submission Handling
  // --------------------------------------------------------------------------
  const contactForm = document.getElementById('contact-form');
  const formSubmitBtn = document.getElementById('form-submit-btn');

  if (contactForm && formSubmitBtn) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const nameInput = document.getElementById('contact-name');
      const emailInput = document.getElementById('contact-email');
      const messageInput = document.getElementById('contact-message');

      if (!nameInput?.value.trim() || !emailInput?.value.trim() || !messageInput?.value.trim()) {
        showToast('Please fill out all required fields.');
        return;
      }

      // Basic email regex
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(emailInput.value.trim())) {
        showToast('Please provide a valid email address.');
        emailInput.focus();
        return;
      }

      // Simulated sending state
      const originalBtnText = formSubmitBtn.innerHTML;
      formSubmitBtn.disabled = true;
      formSubmitBtn.innerHTML = `
        <svg class="spin-animation" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="2" x2="12" y2="6"></line><line x1="12" y1="18" x2="12" y2="22"></line><line x1="4.93" y1="4.93" x2="7.76" y2="7.76"></line><line x1="16.24" y1="16.24" x2="19.07" y2="19.07"></line><line x1="2" y1="12" x2="6" y2="12"></line><line x1="18" y1="12" x2="22" y2="12"></line><line x1="4.93" y1="19.07" x2="7.76" y2="16.24"></line><line x1="16.24" y1="7.76" x2="19.07" y2="4.93"></line></svg>
        <span>Sending Message...</span>
      `;

      setTimeout(() => {
        formSubmitBtn.disabled = false;
        formSubmitBtn.innerHTML = originalBtnText;
        contactForm.reset();
        showToast('Message sent successfully! I will reply shortly.');
      }, 1200);
    });
  }

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
