/**
 * INTERACTIVE BACKGROUND HOVER EFFECTS (CRISP, RAZOR-SHARP, ZERO BLUR)
 * - High-DPI Retina-sharp interactive tech coordinate matrix
 * - Dynamic chromatic hover reaction on grid intersections
 * - Razor-sharp 1px laser vector connections (No shadowBlur, No diffuse radial glow)
 * - Card-level crisp coordinate tracking
 */

(function () {
  'use strict';

  // Check for reduced motion preference
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // --------------------------------------------------------------------------
  // 1. Mouse Coordinate Tracking
  // --------------------------------------------------------------------------
  let targetX = window.innerWidth / 2;
  let targetY = window.innerHeight / 2;
  let currentX = targetX;
  let currentY = targetY;
  let isMoving = false;

  function updateGlobalMousePosition() {
    currentX += (targetX - currentX) * 0.18;
    currentY += (targetY - currentY) * 0.18;

    document.documentElement.style.setProperty('--mouse-x', `${currentX.toFixed(1)}px`);
    document.documentElement.style.setProperty('--mouse-y', `${currentY.toFixed(1)}px`);

    if (Math.abs(targetX - currentX) > 0.15 || Math.abs(targetY - currentY) > 0.15) {
      requestAnimationFrame(updateGlobalMousePosition);
    } else {
      isMoving = false;
    }
  }

  window.addEventListener('mousemove', (e) => {
    targetX = e.clientX;
    targetY = e.clientY;

    if (!isMoving) {
      isMoving = true;
      requestAnimationFrame(updateGlobalMousePosition);
    }
  }, { passive: true });

  // --------------------------------------------------------------------------
  // 2. Card Hover Tracking (Crisp 1px Accents)
  // --------------------------------------------------------------------------
  function setupCardSpotlights() {
    const cards = document.querySelectorAll(
      '.project-spotlight-card, .skill-category-card, .timeline-card, .contact-info-card, .hero-avatar-wrapper'
    );

    cards.forEach(card => {
      card.classList.add('has-spotlight');

      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        card.style.setProperty('--card-mouse-x', `${x.toFixed(1)}px`);
        card.style.setProperty('--card-mouse-y', `${y.toFixed(1)}px`);
      }, { passive: true });
    });
  }

  // --------------------------------------------------------------------------
  // 3. High-DPI Sharp Interactive Grid & Vector Canvas (Zero Blur)
  // --------------------------------------------------------------------------
  function initSharpCanvas() {
    if (prefersReducedMotion) return;

    const canvas = document.getElementById('bg-canvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    let dpr = window.devicePixelRatio || 1;

    function resizeCanvas() {
      width = window.innerWidth;
      height = window.innerHeight;
      dpr = window.devicePixelRatio || 1;

      // HiDPI pixel-perfect buffer
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);
      ctx.imageSmoothingEnabled = false; // Maximum crispness
    }

    window.addEventListener('resize', resizeCanvas, { passive: true });
    resizeCanvas();

    // Mouse tracking for canvas
    const mouse = { x: -1000, y: -1000, active: false };

    window.addEventListener('mousemove', (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      mouse.active = true;
    }, { passive: true });

    window.addEventListener('mouseleave', () => {
      mouse.active = false;
      mouse.x = -1000;
      mouse.y = -1000;
    });

    // Dynamic Warm Luxury Palette based on Major Colors (#5B4632, #f4d9a0, #c8792c)
    const chromaticColors = [
      '#c8792c', // Rich Amber
      '#f4d9a0', // Warm Champagne
      '#5B4632', // Deep Espresso
      '#e0923f', // Radiant Amber
      '#ecd39b', // Golden Sand
      '#7a5839'  // Warm Walnut
    ];

    // Sharp Geometric Nodes
    const nodeCount = Math.min(Math.floor((width * height) / 38000), 40);
    const nodes = [];

    class SharpNode {
      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.vx = (Math.random() - 0.5) * 0.4;
        this.vy = (Math.random() - 0.5) * 0.4;
        this.color = chromaticColors[Math.floor(Math.random() * chromaticColors.length)];
        this.size = Math.floor(Math.random() * 2) + 2; // Exact 2px or 3px solid square
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;

        if (this.x < 0) this.x = width;
        if (this.x > width) this.x = 0;
        if (this.y < 0) this.y = height;
        if (this.y > height) this.y = 0;

        // Mouse repulsion with crisp response
        if (mouse.active) {
          const dx = mouse.x - this.x;
          const dy = mouse.y - this.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120 && dist > 0) {
            const force = (120 - dist) / 120;
            this.x -= (dx / dist) * force * 3;
            this.y -= (dy / dist) * force * 3;
          }
        }
      }

      draw() {
        // Draw crisp solid square pixel (zero blur, zero anti-alias smudge)
        const px = Math.round(this.x);
        const py = Math.round(this.y);
        ctx.fillStyle = this.color;
        ctx.fillRect(px, py, this.size, this.size);
      }
    }

    for (let i = 0; i < nodeCount; i++) {
      nodes.push(new SharpNode());
    }

    const gridSize = 48; // Spacing for tech coordinate grid
    let tick = 0;
    let animationFrameId = null;

    function render() {
      ctx.clearRect(0, 0, width, height);

      const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
      const defaultDotColor = isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.06)';
      const activeRadius = 150;
      const activeRadiusSq = activeRadius * activeRadius;

      // 1. Draw Crisp Technical Coordinate Grid Intersections
      const startX = Math.floor(0 / gridSize) * gridSize;
      const endX = width + gridSize;
      const startY = Math.floor(0 / gridSize) * gridSize;
      const endY = height + gridSize;

      for (let gx = startX; gx < endX; gx += gridSize) {
        for (let gy = startY; gy < endY; gy += gridSize) {
          const dx = mouse.x - gx;
          const dy = mouse.y - gy;
          const distSq = dx * dx + dy * dy;

          if (mouse.active && distSq < activeRadiusSq) {
            // Near cursor: Sharp dynamic chromatic illumination
            const ratio = 1 - Math.sqrt(distSq) / activeRadius;
            const colorIdx = Math.floor((gx + gy + tick * 2) / 60) % chromaticColors.length;
            const chosenColor = chromaticColors[Math.abs(colorIdx)];

            const ix = Math.floor(gx) + 0.5;
            const iy = Math.floor(gy) + 0.5;

            // Draw crisp 1px crosshair '+' (Zero blur!)
            const armLen = Math.round(2 + ratio * 4);
            ctx.strokeStyle = chosenColor;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(ix - armLen, iy);
            ctx.lineTo(ix + armLen, iy);
            ctx.moveTo(ix, iy - armLen);
            ctx.lineTo(ix, iy + armLen);
            ctx.stroke();
          } else {
            // Neutral crisp 1px micro-dot
            ctx.fillStyle = defaultDotColor;
            ctx.fillRect(gx, gy, 1, 1);
          }
        }
      }

      // 2. Draw Interactive Laser Reticle at Mouse Position (Crisp, High-Tech HUD)
      if (mouse.active) {
        const mx = Math.floor(mouse.x) + 0.5;
        const my = Math.floor(mouse.y) + 0.5;

        // Subtle 1px crosshair hairlines snapping around cursor (60px length)
        ctx.strokeStyle = isDark ? 'rgba(244, 217, 160, 0.4)' : 'rgba(200, 121, 44, 0.4)';
        ctx.lineWidth = 1;

        ctx.beginPath();
        // Left & Right hairlines
        ctx.moveTo(mx - 32, my);
        ctx.lineTo(mx - 8, my);
        ctx.moveTo(mx + 8, my);
        ctx.lineTo(mx + 32, my);
        // Top & Bottom hairlines
        ctx.moveTo(mx, my - 32);
        ctx.lineTo(mx, my - 8);
        ctx.moveTo(mx, my + 8);
        ctx.lineTo(mx, my + 32);
        ctx.stroke();

        // Crisp central diamond reticle (12px, zero blur)
        ctx.strokeStyle = '#c8792c';
        ctx.beginPath();
        ctx.moveTo(mx, my - 5);
        ctx.lineTo(mx + 5, my);
        ctx.lineTo(mx, my + 5);
        ctx.lineTo(mx - 5, my);
        ctx.closePath();
        ctx.stroke();
      }

      // 3. Draw Sharp 1px Vector Connecting Lines Between Nodes Near Cursor
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const distSq = dx * dx + dy * dy;

          if (distSq < 8100) { // ~90px
            // Also check proximity to mouse for dynamic activation
            const midX = (nodes[i].x + nodes[j].x) / 2;
            const midY = (nodes[i].y + nodes[j].y) / 2;
            const mdx = mouse.x - midX;
            const mdy = mouse.y - midY;
            const mouseDistSq = mdx * mdx + mdy * mdy;

            if (mouse.active && mouseDistSq < 40000) { // 200px
              const x1 = Math.floor(nodes[i].x) + 0.5;
              const y1 = Math.floor(nodes[i].y) + 0.5;
              const x2 = Math.floor(nodes[j].x) + 0.5;
              const y2 = Math.floor(nodes[j].y) + 0.5;

              ctx.strokeStyle = isDark ? 'rgba(244, 217, 160, 0.3)' : 'rgba(200, 121, 44, 0.25)';
              ctx.lineWidth = 1;
              ctx.beginPath();
              ctx.moveTo(x1, y1);
              ctx.lineTo(x2, y2);
              ctx.stroke();
            }
          }
        }
      }

      // 4. Update and Draw Sharp Nodes
      nodes.forEach(node => {
        node.update();
        node.draw();
      });

      tick++;
      animationFrameId = requestAnimationFrame(render);
    }

    render();

    // Pause animation when page tab is hidden
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        cancelAnimationFrame(animationFrameId);
      } else {
        animationFrameId = requestAnimationFrame(render);
      }
    });
  }

  // --------------------------------------------------------------------------
  // Initialize on DOM Ready
  // --------------------------------------------------------------------------
  document.addEventListener('DOMContentLoaded', () => {
    setupCardSpotlights();
    initSharpCanvas();

    // Re-bind card spotlights if dynamic elements change
    const observer = new MutationObserver(() => {
      setupCardSpotlights();
    });
    const grid = document.getElementById('projects-grid');
    if (grid) {
      observer.observe(grid, { childList: true });
    }
  });

})();
