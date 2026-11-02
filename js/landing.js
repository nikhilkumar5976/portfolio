/**
 * LANDING INTRO CONTROLLER
 * Full-viewport interactive intro screen featuring a realistic human typewriter effect,
 * seamless canvas background continuity, and intuitive entry interactions.
 */

(function () {
  'use strict';

  const landingScreen = document.getElementById('landing-screen');
  const typewriterText = document.getElementById('landing-typewriter');
  const cursor = document.getElementById('landing-cursor');
  const enterBtn = document.getElementById('landing-enter-btn');

  if (!landingScreen || !typewriterText) return;

  // Phrases describing Nikhil Kumar, written as if typed live
  const phrases = [
    "Hi, I'm Nikhil Kumar — Full-Stack & Web Developer.",
    "I craft scalable web applications with Python & Django.",
    "I build responsive, modern interfaces using HTML, CSS & JavaScript.",
    "Turning complex software ideas into clean, high-performance code."
  ];

  let phraseIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let isExiting = false;
  let typingTimer = null;

  // Check prefers-reduced-motion
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // --------------------------------------------------------------------------
  // Typewriter Engine
  // --------------------------------------------------------------------------
  function typeWriter() {
    if (isExiting) return;

    const currentPhrase = phrases[phraseIndex];

    if (prefersReducedMotion) {
      typewriterText.textContent = phrases[0];
      return;
    }

    if (!isDeleting) {
      // Typing phase
      typewriterText.textContent = currentPhrase.substring(0, charIndex + 1);
      charIndex++;

      if (cursor) cursor.classList.add('typing');

      // Natural typing timing with slight human variability
      let delay = 45 + Math.random() * 40; // 45ms to 85ms base

      const lastChar = currentPhrase.charAt(charIndex - 1);
      if (lastChar === ',' || lastChar === '—' || lastChar === '-') {
        delay = 240; // Slight breath at punctuation
      } else if (lastChar === '.') {
        delay = 420; // Full pause at end of sentence
      }

      // Reached end of current phrase
      if (charIndex === currentPhrase.length) {
        if (cursor) cursor.classList.remove('typing');
        isDeleting = true;
        delay = 2400; // Comfortable reading pause
      }

      typingTimer = setTimeout(typeWriter, delay);
    } else {
      // Deleting phase
      typewriterText.textContent = currentPhrase.substring(0, charIndex - 1);
      charIndex--;

      if (cursor) cursor.classList.add('typing');

      let deleteSpeed = 26;

      // Finished deleting current phrase
      if (charIndex === 0) {
        if (cursor) cursor.classList.remove('typing');
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        typingTimer = setTimeout(typeWriter, 380);
        return;
      }

      typingTimer = setTimeout(typeWriter, deleteSpeed);
    }
  }

  // --------------------------------------------------------------------------
  // Enter Portfolio Transition
  // --------------------------------------------------------------------------
  function enterPortfolio() {
    if (isExiting) return;
    isExiting = true;

    clearTimeout(typingTimer);

    landingScreen.classList.add('landing-hidden');
    document.body.classList.remove('landing-active');

    // Clean up DOM after transition
    setTimeout(() => {
      landingScreen.style.display = 'none';
    }, 600);
  }

  // --------------------------------------------------------------------------
  // Event Listeners for Entry
  // --------------------------------------------------------------------------
  // 1. Click on enter button
  if (enterBtn) {
    enterBtn.addEventListener('click', enterPortfolio);
  }

  // 2. Keyboard shortcut: Enter, Space, or Down Arrow
  window.addEventListener('keydown', (e) => {
    if (!isExiting && document.body.classList.contains('landing-active')) {
      if (e.key === 'Enter' || e.key === ' ' || e.key === 'ArrowDown') {
        e.preventDefault();
        enterPortfolio();
      }
    }
  });

  // 3. Mouse Wheel / Trackpad scroll down
  let wheelAccumulator = 0;
  window.addEventListener('wheel', (e) => {
    if (!isExiting && document.body.classList.contains('landing-active')) {
      wheelAccumulator += e.deltaY;
      if (wheelAccumulator > 30) {
        enterPortfolio();
      }
    }
  }, { passive: true });

  // 4. Touch swipe up on mobile
  let touchStartY = 0;
  window.addEventListener('touchstart', (e) => {
    if (e.touches && e.touches.length > 0) {
      touchStartY = e.touches[0].clientY;
    }
  }, { passive: true });

  window.addEventListener('touchend', (e) => {
    if (!isExiting && document.body.classList.contains('landing-active')) {
      if (e.changedTouches && e.changedTouches.length > 0) {
        const touchEndY = e.changedTouches[0].clientY;
        if (touchStartY - touchEndY > 35) {
          enterPortfolio();
        }
      }
    }
  }, { passive: true });

  // Expose global method if user wants to trigger it again
  window.reopenLandingIntro = function () {
    landingScreen.style.display = 'flex';
    requestAnimationFrame(() => {
      landingScreen.classList.remove('landing-hidden');
      document.body.classList.add('landing-active');
      isExiting = false;
      charIndex = 0;
      isDeleting = false;
      typeWriter();
    });
  };

  // Start typewriter engine immediately on load
  typeWriter();
})();

