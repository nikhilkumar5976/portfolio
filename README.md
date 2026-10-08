# Nikhil Kumar — Full-Stack Developer & Portfolio

An ultra-clean, high-performance developer portfolio built for **Nikhil Kumar**, highlighting skills in **HTML5, CSS3, JavaScript, and Django**, with **TravelMate AI** as the flagship project. Featuring modern typography, crisp borders, responsive layouts, and an instant dark/light mode toggle.

---

## 📁 Project Architecture & File Structure

```text
portfolio/
├── index.html                  # Accessible, semantic HTML5 structure with SEO meta & schema
├── css/
│   ├── variables.css          # Design tokens: font scales, light/dark color palettes, spacing & radii
│   ├── base.css               # Modern resets, typography defaults, section utilities & custom scrollbar
│   ├── components.css         # UI components: buttons, badges, project cards, pills, modal & toasts
│   └── sections.css           # Layout modules: navbar, hero, projects grid, skills, timeline & footer
├── js/
│   ├── theme.js               # Dark/Light mode manager with localStorage caching & OS sync (Key: 'T')
│   ├── projects-data.js       # Central data repository for projects, metrics, tags & case study details
│   ├── projects.js            # Dynamic category filtering & accessible modal case study viewer
│   ├── navigation.js          # Sticky header, smooth scrolling & IntersectionObserver scrollspy
│   └── main.js                # Timeline toggle (Work/Edu), quick email copy, contact form validator & clock
├── assets/
│   ├── images/                # Screenshots and profile avatar
│   │   ├── avatar.jpg         # Nikhil Kumar's portrait
│   │   └── project-travelmate.png # TravelMate AI flagship project screenshot
│   ├── icons/                 # SVG icon assets
│   └── docs/                  # Resumes, CVs, and credentials
└── README.md                  # Project documentation & customization guide
```

---

## ⚡ Features & Engineering Highlights

1. **Light / Dark Mode System**:
   - Persists user preference via `localStorage`.
   - Automatically synchronizes with system preference (`prefers-color-scheme`).
   - Smooth CSS color transitions without any flash of unstyled theme (FOIT).
   - Global keyboard shortcut: Press <kbd>T</kbd> to toggle themes anytime.

2. **Interactive Project Showcase**:
   - Filter projects instantly by category (*All*, *Creative UI & WebGL*, *Web Apps*, *Design Systems*).
   - Click any card or "Case Study" to launch an accessible detail modal displaying metrics, problem statement, key engineering highlights, and live links.
   - Accessible keyboard support (Press <kbd>ESC</kbd> to close).

3. **Skills & Capabilities Matrix**:
   - Categorized across 4 engineering domains: Frontend Core, Creative & Motion, Architecture & a11y, and Tools & APIs.

4. **Dual Career Timeline**:
   - Toggle seamlessly between **Professional Experience** and **Education & Credentials**.
   - Includes bulleted impact metrics, company location, and technology tags.

5. **Contact Section with Feedback Loop**:
   - 1-click **Copy Email** button with instant clipboard integration and toast notification.
   - Validated interactive contact form with loading state feedback and reset actions.

6. **SEO & Accessibility**:
   - Semantic HTML5 elements (`<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<footer>`).
   - Single `<h1>` per page, complete Open Graph tags, and descriptive ARIA landmarks.

---

## 🛠️ How to Customize

### 1. Update Personal Info & Headline
Open [`index.html`](file:///c:/Users/mayan/OneDrive/Desktop/portfolio/index.html):
- Update `<title>`, `<meta name="description">`, and Open Graph tags.
- Modify the hero headline, bio, and contact information.

### 2. Add or Edit Projects
Open [`js/projects-data.js`](file:///c:/Users/mayan/OneDrive/Desktop/portfolio/js/projects-data.js):
- Add your own project objects or modify existing ones.
- Place new screenshots in `assets/images/` and update the `image` path.

### 3. Replace the Avatar
Place your photo in [`assets/images/avatar.jpg`](file:///c:/Users/mayan/OneDrive/Desktop/portfolio/assets/images/avatar.jpg).

### 4. Add your Resume
Place your PDF resume into [`assets/docs/resume.pdf`](file:///c:/Users/mayan/OneDrive/Desktop/portfolio/assets/docs/resume.pdf).

---

## 🚀 Running Locally

Because this project uses vanilla web standards, you can view it directly:

### Option A: Using Any Local Static Server
In PowerShell:
```powershell
# Using Python:
python -m http.server 3000

# Or using Node / npx:
npx serve .
```
Then visit `http://localhost:3000` in your browser.

### Option B: Directly Open in Browser
Double-click [`index.html`](file:///c:/Users/mayan/OneDrive/Desktop/portfolio/index.html) to open in Chrome, Edge, or Firefox.

---

## 🌐 Free Instant Deployment

- **GitHub Pages**: Push this repository to GitHub and enable Pages in repository settings.
- **Vercel**: Run `npx vercel` or link your GitHub repo.
- **Netlify**: Drag and drop the `portfolio` folder directly into Netlify Drop.
