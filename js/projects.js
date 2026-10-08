/**
 * PROJECTS CONTROLLER
 * Handles project card generation and accessible modal views.
 * Supports spotlight presentation for featured flagship projects.
 */

(function () {
  'use strict';

  const grid = document.getElementById('projects-grid');
  const modalBackdrop = document.getElementById('project-modal');
  const modalCloseBtn = document.getElementById('modal-close-btn');

  if (!grid || !window.PORTFOLIO_PROJECTS) return;

  // Render Projects
  function renderProjects() {
    const projects = window.PORTFOLIO_PROJECTS;
    grid.innerHTML = '';

    if (projects.length === 0) {
      grid.innerHTML = '<p class="text-muted">No projects found.</p>';
      return;
    }

    // If there is a single project, present it as a featured spotlight showcase
    if (projects.length === 1) {
      const project = projects[0];
      const card = document.createElement('article');
      card.className = 'project-spotlight-card';
      card.setAttribute('data-id', project.id);

      card.innerHTML = `
        <div class="spotlight-media" tabindex="0" role="button" aria-label="Open case study for ${project.title}">
          <img src="${project.image}" alt="${project.title} Interface Screenshot" class="spotlight-img" />
          <div class="spotlight-overlay-badge">
            <span class="status-dot"></span>
            <span>Live System</span>
          </div>
        </div>
        <div class="spotlight-content">
          <div class="spotlight-tags">
            <span class="badge" style="background: var(--accent-subtle); color: var(--accent); border-color: rgba(37,99,235,0.2); font-weight: 700;">${project.badge || 'Flagship'}</span>
            ${project.techStack.map(t => `<span class="badge badge-tag">${t}</span>`).join('')}
          </div>

          <h3 class="spotlight-title">${project.title}</h3>
          <p class="spotlight-subtitle font-mono">${project.subtitle}</p>
          <p class="spotlight-desc">${project.description}</p>

          <!-- Key Metrics -->
          <div class="spotlight-metrics-row">
            ${project.metrics.map(m => `
              <div class="spotlight-metric-item">
                <span class="spotlight-metric-val">${m.value}</span>
                <span class="spotlight-metric-lbl">${m.label}</span>
              </div>
            `).join('')}
          </div>

          <!-- Feature Highlights -->
          <ul class="spotlight-features">
            ${project.features.slice(0, 3).map(f => `<li>${f}</li>`).join('')}
          </ul>

          <div class="spotlight-actions">
            <button type="button" class="btn btn-primary view-details-btn" data-project-id="${project.id}">
              <span>View Architecture &amp; Case Study</span>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </button>
            <a href="${project.githubUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-secondary" aria-label="GitHub Repository">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
              <span>GitHub</span>
            </a>
            <a href="${project.demoUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-outline" aria-label="Launch Portal">
              <span>Live Portal</span>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="7" y1="17" x2="17" y2="7"></line><polyline points="7 7 17 7 17 17"></polyline></svg>
            </a>
          </div>
        </div>
      `;

      // Open modal when clicking the media or details button
      card.querySelector('.spotlight-media').addEventListener('click', () => openProjectModal(project.id));
      card.querySelector('.spotlight-media').addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          openProjectModal(project.id);
        }
      });

      card.querySelector('.view-details-btn').addEventListener('click', () => openProjectModal(project.id));

      grid.appendChild(card);
      return;
    }

    // Default multi-project fallback rendering
    projects.forEach(project => {
      const card = document.createElement('article');
      card.className = 'project-card';
      card.setAttribute('data-id', project.id);
      card.setAttribute('tabindex', '0');
      card.setAttribute('role', 'button');
      card.setAttribute('aria-label', `View details for ${project.title}`);

      card.innerHTML = `
        <div class="project-thumb">
          <img src="${project.image}" alt="${project.title} screenshot" loading="lazy" />
        </div>
        <div class="project-content">
          <div class="project-tags">
            <span class="badge badge-tag">${project.badge || project.category}</span>
            ${project.techStack.slice(0, 2).map(tech => `<span class="badge badge-tag">${tech}</span>`).join('')}
          </div>
          <h3 class="project-title">${project.title}</h3>
          <p class="project-desc">${project.description}</p>
          <div class="project-footer">
            <button type="button" class="btn btn-sm btn-secondary view-details-btn" data-project-id="${project.id}">
              Case Study
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </button>
            <div class="project-links">
              <a href="${project.githubUrl}" target="_blank" rel="noopener noreferrer" class="btn-icon" aria-label="GitHub Repository" onclick="event.stopPropagation()">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
              </a>
              <a href="${project.demoUrl}" target="_blank" rel="noopener noreferrer" class="btn-icon" aria-label="Live Demo" onclick="event.stopPropagation()">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
              </a>
            </div>
          </div>
        </div>
      `;

      card.addEventListener('click', () => openProjectModal(project.id));
      card.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          openProjectModal(project.id);
        }
      });

      grid.appendChild(card);
    });
  }

  // Open Project Details Modal
  function openProjectModal(projectId) {
    const project = window.PORTFOLIO_PROJECTS.find(p => p.id === projectId);
    if (!project || !modalBackdrop) return;

    const modalTitle = document.getElementById('modal-title');
    const modalSubtitle = document.getElementById('modal-subtitle');
    const modalImage = document.getElementById('modal-img');
    const modalDescription = document.getElementById('modal-description');
    const modalMetrics = document.getElementById('modal-metrics');
    const modalFeatures = document.getElementById('modal-features');
    const modalTags = document.getElementById('modal-tags');
    const modalDemoLink = document.getElementById('modal-demo-link');
    const modalRepoLink = document.getElementById('modal-repo-link');

    if (modalTitle) modalTitle.textContent = project.title;
    if (modalSubtitle) modalSubtitle.textContent = project.subtitle;
    if (modalImage) {
      modalImage.src = project.image;
      modalImage.alt = `${project.title} Preview`;
    }
    if (modalDescription) modalDescription.textContent = project.longDescription || project.description;

    // Render Metrics
    if (modalMetrics) {
      modalMetrics.innerHTML = project.metrics.map(m => `
        <div class="modal-metric-card">
          <div class="modal-metric-value">${m.value}</div>
          <div class="modal-metric-label">${m.label}</div>
        </div>
      `).join('');
    }

    // Render Features
    if (modalFeatures) {
      modalFeatures.innerHTML = project.features.map(f => `
        <li>${f}</li>
      `).join('');
    }

    // Render Tech Stack
    if (modalTags) {
      modalTags.innerHTML = project.techStack.map(t => `
        <span class="badge badge-tag">${t}</span>
      `).join('');
    }

    // Update Links
    if (modalDemoLink) modalDemoLink.href = project.demoUrl;
    if (modalRepoLink) modalRepoLink.href = project.githubUrl;

    // Show modal & prevent background scroll
    modalBackdrop.classList.add('active');
    document.body.style.overflow = 'hidden';
    modalCloseBtn?.focus();
  }

  // Close Project Modal
  function closeProjectModal() {
    if (!modalBackdrop) return;
    modalBackdrop.classList.remove('active');
    document.body.style.overflow = '';
  }

  // Modal Close Handlers
  if (modalCloseBtn) {
    modalCloseBtn.addEventListener('click', closeProjectModal);
  }

  if (modalBackdrop) {
    modalBackdrop.addEventListener('click', (e) => {
      if (e.target === modalBackdrop) {
        closeProjectModal();
      }
    });
  }

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalBackdrop?.classList.contains('active')) {
      closeProjectModal();
    }
  });

  // Initial Render
  renderProjects();
})();
