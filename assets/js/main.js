/**
 * El-Houcine Oussi - Portfolio & Academic Profile
 * Interactive Engine
 */

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initNavbar();
  initPerspectiveSwitcher();
  initProjectFilters();
  initProjectModals();
  initClipboardButtons();
  initContactForm();
  initMobileDrawer();
  initActiveNavSpy();
});

/* ==========================================================================
   1. Theme Management (Dark / Light)
   ========================================================================== */
function initTheme() {
  const themeToggle = document.getElementById('theme-toggle');
  const themeIcon = document.getElementById('theme-icon');
  
  // Check saved theme or system preference
  const savedTheme = localStorage.getItem('site-theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const currentTheme = savedTheme || (prefersDark ? 'dark' : 'dark'); // default dark

  document.documentElement.setAttribute('data-theme', currentTheme);
  updateThemeIcon(currentTheme);

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const activeTheme = document.documentElement.getAttribute('data-theme');
      const newTheme = activeTheme === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', newTheme);
      localStorage.setItem('site-theme', newTheme);
      updateThemeIcon(newTheme);
      showToast(`Switched to ${newTheme} mode`);
    });
  }

  function updateThemeIcon(theme) {
    if (!themeIcon) return;
    if (theme === 'light') {
      themeIcon.className = 'fas fa-sun';
      themeIcon.style.color = '#f59e0b';
    } else {
      themeIcon.className = 'fas fa-moon';
      themeIcon.style.color = '';
    }
  }
}

/* ==========================================================================
   2. Navbar Scroll State & Mobile Drawer
   ========================================================================== */
function initNavbar() {
  const navbar = document.getElementById('site-navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      navbar?.classList.add('scrolled');
    } else {
      navbar?.classList.remove('scrolled');
    }
  }, { passive: true });
}

function initMobileDrawer() {
  const toggleBtn = document.getElementById('mobile-menu-toggle');
  const drawer = document.getElementById('mobile-drawer');
  const backdrop = document.getElementById('mobile-drawer-backdrop');
  const closeBtn = document.getElementById('mobile-drawer-close');
  const links = drawer?.querySelectorAll('a');

  function openDrawer() {
    drawer?.classList.add('open');
    backdrop?.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeDrawer() {
    drawer?.classList.remove('open');
    backdrop?.classList.remove('active');
    document.body.style.overflow = '';
  }

  toggleBtn?.addEventListener('click', openDrawer);
  closeBtn?.addEventListener('click', closeDrawer);
  backdrop?.addEventListener('click', closeDrawer);

  links?.forEach(link => {
    link.addEventListener('click', closeDrawer);
  });
}

function initActiveNavSpy() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links .nav-item a');

  window.addEventListener('scroll', () => {
    let currentId = '';
    const scrollY = window.pageYOffset;

    sections.forEach(section => {
      const sectionHeight = section.offsetHeight;
      const sectionTop = section.offsetTop - 120;
      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        currentId = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentId}`) {
        link.classList.add('active');
      }
    });
  }, { passive: true });
}

/* ==========================================================================
   3. Dual-Perspective Switcher (All / Industry / Academic)
   ========================================================================== */
function initPerspectiveSwitcher() {
  const buttons = document.querySelectorAll('.perspective-btn');
  const focusPill = document.getElementById('active-focus-pill');
  const focusDesc = document.getElementById('active-focus-desc');
  const allCards = document.querySelectorAll('[data-perspective]');

  const perspectiveDescriptions = {
    all: 'Showing full comprehensive profile: engineering accomplishments & academic research foundations.',
    industry: 'Spotlighting production-grade development, Flutter & .NET systems, Play Store apps, and enterprise engineering internships.',
    academic: 'Spotlighting Information Systems Engineering, Distributed Systems, Compilers & Languages, AI Solar datasets, and Graduate Research readiness.'
  };

  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      const mode = btn.getAttribute('data-mode');
      
      buttons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      if (focusPill) {
        focusPill.textContent = mode.charAt(0).toUpperCase() + mode.slice(1) + ' View';
      }
      if (focusDesc && perspectiveDescriptions[mode]) {
        focusDesc.textContent = perspectiveDescriptions[mode];
      }

      // Filter and dim non-matching cards smoothly
      allCards.forEach(card => {
        const cardPerspective = card.getAttribute('data-perspective');
        if (mode === 'all') {
          card.style.display = '';
          card.style.opacity = '1';
          card.style.transform = 'none';
        } else if (cardPerspective === 'both' || cardPerspective === mode) {
          card.style.display = '';
          card.style.opacity = '1';
          card.style.transform = 'scale(1)';
        } else {
          // In selective mode, gracefully hide or soften
          card.style.display = 'none';
        }
      });

      showToast(`View updated to: ${mode.toUpperCase()}`);
    });
  });
}

/* ==========================================================================
   4. Project Filters
   ========================================================================== */
function initProjectFilters() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const filter = btn.getAttribute('data-filter');
      
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      projectCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filter === 'all' || category.includes(filter)) {
          card.style.display = 'flex';
          card.style.opacity = '0';
          setTimeout(() => {
            card.style.opacity = '1';
          }, 50);
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

/* ==========================================================================
   5. Project Detail Modals & Architecture Deep Dive
   ========================================================================== */
const projectDetails = {
  lovecheck: {
    title: 'Love Check App - Real-Time Relationship Platform',
    category: 'Mobile & Cloud Application',
    image: 'assets/imgs/lovecheck.png',
    badge: 'Production Web & Mobile',
    liveUrl: 'https://lovecheckapp.web.app/',
    githubUrl: null,
    overview: 'A synchronized real-time multi-user interactive game platform where couples answer questions, make predictions, and review shared relationship metrics with real-time room synchronization.',
    architecture: [
      'Engineered with Flutter & Riverpod for scalable, predictable MVVM state management.',
      'Firebase Realtime Database & Cloud Firestore for low-latency live state updates and matchmaking.',
      'Firebase Authentication & Cloud Messaging (FCM) for push notifications and account synchronization.',
      'Dynamic multi-language localization with internationalization (i18n) support.',
      'SQLite offline fallback ensuring smooth performance in disconnected environments.'
    ],
    techStack: ['Flutter', 'Riverpod', 'Firebase Auth', 'Firestore', 'Cloud Messaging', 'SQLite', 'MVVM']
  },
  mystoguess: {
    title: 'MystoGuess - Category Guessing Game',
    category: 'Published Mobile App (Google Play Store)',
    image: 'assets/imgs/mystroguess.png',
    badge: 'Google Play Store',
    liveUrl: 'https://play.google.com/store/apps/details?id=com.systemx.mystoguess',
    githubUrl: null,
    overview: 'A published interactive mobile guessing game featuring categorized word and emoji challenges, solo adventure modes, and local/online turn-based multiplayer.',
    architecture: [
      'Published on Google Play Store under SystemX publisher account.',
      'Offline-first architecture leveraging SQLite and structured JSON dictionaries for sub-second query speeds.',
      'Clean Architecture with separation between Domain, Presentation, and Data layers.',
      'Responsive design adapting across smartphones, foldables, and Android tablets with smooth animations.',
      'Dynamic multi-language translations and sound effects engine.'
    ],
    techStack: ['Flutter', 'Dart', 'Google Play SDK', 'SQLite', 'Clean Architecture', 'Riverpod']
  },
  ecobeach: {
    title: 'EcoBeach - Environmental IoT & Coastal Monitoring',
    category: 'Smart City & Environmental Engineering',
    image: 'assets/imgs/Ecobeach.png',
    archImage: 'assets/imgs/architect.png',
    badge: 'Research & Systems',
    liveUrl: null,
    pdfUrl: 'assets/docs/ecobeach.pdf',
    githubUrl: null,
    overview: 'An environmental data management and coastal health monitoring platform developed to track beach cleanliness, sensor metrics, and water quality for municipal sustainability.',
    architecture: [
      'Comprehensive system architecture featuring IoT ingestion layers, backend processing, and mobile monitoring.',
      'Built with .NET RESTful APIs handling telemetry ingestion and environmental metric aggregation.',
      'Relational and time-series data storage modeling coastal sensor readings and status indicators.',
      'Flutter mobile client offering real-time status visualization for field operators and citizens.',
      'Full technical documentation and system design report available in PDF.'
    ],
    techStack: ['.NET Core', 'C#', 'IoT Architecture', 'Flutter', 'Time-Series Data', 'System Design']
  },
  homerealm: {
    title: 'HomeRealm - Vacation Rental Marketplace',
    category: 'Full-Stack Web Platform',
    image: 'assets/imgs/Todo.png',
    badge: 'Enterprise Web',
    liveUrl: null,
    githubUrl: 'https://github.com/Oussi108/HomeRealm',
    overview: 'A comprehensive property rental marketplace inspired by Airbnb, built with ASP.NET MVC and MySQL, featuring property listings, booking calendars, and advanced relational filters.',
    architecture: [
      'Architected on ASP.NET MVC with Entity Framework ORM for optimized database queries.',
      'Complex query filter engine supporting geo-location, amenities, price tiers, and date availability.',
      'Role-based access control (RBAC) differentiating hosts, guests, and administrative operators.',
      'Bootstrap-powered responsive frontend with responsive checkout and reservation forms.'
    ],
    techStack: ['ASP.NET MVC', 'C#', 'Entity Framework', 'MySQL', 'Bootstrap', 'RBAC']
  },
  taskdotnet: {
    title: 'Task Management Microservice with JWT Auth',
    category: 'Backend & Cloud API',
    image: 'assets/imgs/Todo.png',
    badge: 'Clean Architecture',
    liveUrl: null,
    githubUrl: 'https://github.com/Oussi108/taskwithauthdotnet',
    overview: 'A secure, scalable task and organization management RESTful API engineered with ASP.NET Core and Clean Architecture principles.',
    architecture: [
      'Domain-Driven Design (DDD) with clear decoupling: Core, Application, Infrastructure, and API layers.',
      'Stateless JWT (JSON Web Token) authentication with refresh tokens and role claims.',
      'Entity Framework Core with SQL Server migrations, indexing, and repository pattern.',
      'Swagger / OpenAPI integration with comprehensive request-response schema documentation.'
    ],
    techStack: ['ASP.NET Core', 'C#', 'JWT Auth', 'Entity Framework Core', 'SQL Server', 'Swagger']
  },
  mapauth: {
    title: 'MapWithAuth - Geolocation & Spatial Mapping App',
    category: 'Hybrid Mobile & Web',
    image: 'assets/imgs/mapapp.png',
    badge: 'Spatial & Geolocation',
    liveUrl: null,
    githubUrl: 'https://github.com/Oussi108/mapwithauth',
    overview: 'A cross-platform mobile and web application combining Angular, Ionic, and Capacitor for live user positioning, spatial marker clustering, and authenticated user profiles.',
    architecture: [
      'Engineered with Angular and Ionic UI components for native look and feel on iOS and Android.',
      'Integrated Capacitor Geolocation and device sensor APIs with fallback web APIs.',
      'Custom authentication pipeline managing authenticated map bookmarks and coordinate pins.'
    ],
    techStack: ['Ionic', 'Angular', 'Capacitor', 'TypeScript', 'Geolocation APIs', 'JWT']
  },
  compiler: {
    title: 'Mathematical Expression Compiler & AST Evaluator',
    category: 'Compilers & Formal Languages',
    image: 'assets/imgs/gym.png',
    badge: 'Academic Research',
    liveUrl: null,
    githubUrl: 'https://github.com/Oussi108/Complier_EXP_math',
    overview: 'A custom mathematical compiler implementing lexical scanning (tokenizer), recursive-descent grammar parsing, abstract syntax tree (AST) construction, and evaluation.',
    architecture: [
      'Lexical analyzer converting character streams into validated language tokens.',
      'Syntax analysis handling operator precedence, associativity, and parenthesized expressions.',
      'Abstract Syntax Tree (AST) node generation and post-order traversal interpreter.',
      'Exploration into formal languages, grammar theory, and compiler backend generation.'
    ],
    techStack: ['C#', 'Compiler Construction', 'Lexer / Parser', 'AST', 'Formal Grammars']
  },
  novels: {
    title: 'Novels - Android Reader & Library Management',
    category: 'Native Mobile Application',
    image: 'assets/imgs/novel.png',
    badge: 'Android Native',
    liveUrl: null,
    githubUrl: 'https://github.com/oussi108/novels',
    overview: 'A native Android application built in Java for cataloging, categorizing, and reading literature with localized SQLite storage and reading-mode customizers.',
    architecture: [
      'Native Android development with Java and Android SDK components (RecyclerView, Room/SQLite).',
      'Customized reading interface with font scaling, dark reading mode, and bookmark persistence.',
      'Offline library synchronization and file import capabilities.'
    ],
    techStack: ['Java', 'Android SDK', 'SQLite', 'XML Layouts', 'Material Design']
  },
  gymmanager: {
    title: 'Desktop Gym Manager',
    category: 'Desktop Enterprise Software',
    image: 'assets/imgs/gym.png',
    badge: 'Enterprise Desktop',
    liveUrl: null,
    githubUrl: 'https://github.com/oussi108/DesktopGymManger',
    overview: 'A full-featured desktop management system developed for gym centers, covering member subscriptions, attendance logging, locker allocation, and financial reports.',
    architecture: [
      'Developed with C# .NET and Windows Forms with modern custom UI controls.',
      'Relational database design in Microsoft SQL Server enforcing referential integrity and audit trails.',
      'Automated invoice generation, payment tracking, and expiry notifications.'
    ],
    techStack: ['C#', '.NET', 'SQL Server', 'ADO.NET', 'Enterprise Architecture']
  },
  hotelmgmt: {
    title: 'Hotel Management Enterprise System',
    category: 'Enterprise Management System',
    image: 'assets/imgs/hotel.png',
    badge: 'Enterprise Desktop',
    liveUrl: null,
    githubUrl: 'https://github.com/Oussi108/HotelManagment_2year',
    overview: 'An enterprise desktop management solution for hotel operations, including room booking schedules, guest registration, billing workflows, and housekeeping status tracking.',
    architecture: [
      'Built using C# and .NET with multi-tier architecture separating business logic from data access.',
      'Normalized SQL database modeling room types, guest records, reservations, and billing transactions.',
      'Advanced reporting modules generating operational occupancy statistics.'
    ],
    techStack: ['C#', '.NET', 'SQL Server', 'Multi-Tier Architecture', 'Reporting']
  }
};

function initProjectModals() {
  const modalBackdrop = document.getElementById('project-modal-backdrop');
  const modalDialog = document.getElementById('project-modal-content');
  const closeBtn = document.getElementById('modal-close-btn');
  const triggerBtns = document.querySelectorAll('.open-project-modal');

  triggerBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const projectId = btn.getAttribute('data-project');
      const data = projectDetails[projectId];
      if (!data) return;

      renderProjectModal(data);
      modalBackdrop?.classList.add('open');
      document.body.style.overflow = 'hidden';
    });
  });

  function closeModal() {
    modalBackdrop?.classList.remove('open');
    document.body.style.overflow = '';
  }

  closeBtn?.addEventListener('click', closeModal);
  modalBackdrop?.addEventListener('click', (e) => {
    if (e.target === modalBackdrop) closeModal();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalBackdrop?.classList.contains('open')) {
      closeModal();
    }
  });

  function renderProjectModal(data) {
    if (!modalDialog) return;

    let linksHtml = '';
    if (data.liveUrl) {
      linksHtml += `<a href="${data.liveUrl}" target="_blank" class="btn-primary-gradient"><i class="fas fa-external-link-alt"></i> Visit Live App</a>`;
    }
    if (data.githubUrl) {
      linksHtml += `<a href="${data.githubUrl}" target="_blank" class="btn-secondary"><i class="fab fa-github"></i> View GitHub Repo</a>`;
    }
    if (data.pdfUrl) {
      linksHtml += `<a href="${data.pdfUrl}" target="_blank" class="btn-secondary"><i class="fas fa-file-pdf text-danger"></i> View System Report (PDF)</a>`;
    }

    const techBadges = data.techStack.map(t => `<span class="tech-tag">${t}</span>`).join('');
    const archBullets = data.architecture.map(a => `<li>${a}</li>`).join('');

    modalDialog.innerHTML = `
      <div style="display:flex; justify-content:space-between; align-items:flex-start; margin-bottom: 1.25rem;">
        <div>
          <span class="section-tag">${data.badge}</span>
          <h2 style="font-size:1.6rem; font-weight:800; margin-top:0.35rem;">${data.title}</h2>
          <p style="color:var(--text-secondary); font-size:0.9rem;">${data.category}</p>
        </div>
      </div>

      <div style="border-radius:var(--radius-md); overflow:hidden; margin-bottom:1.5rem; max-height:280px; border:1px solid var(--border-subtle); background:var(--bg-surface);">
        <img src="${data.image}" alt="${data.title}" style="width:100%; height:100%; object-fit:cover; display:block;">
      </div>

      <div style="margin-bottom:1.5rem;">
        <h4 style="font-size:1.05rem; font-weight:700; margin-bottom:0.5rem; color:var(--brand-primary);"><i class="fas fa-info-circle"></i> Project Overview</h4>
        <p style="color:var(--text-secondary); font-size:0.95rem; line-height:1.65;">${data.overview}</p>
      </div>

      <div style="margin-bottom:1.5rem;">
        <h4 style="font-size:1.05rem; font-weight:700; margin-bottom:0.5rem; color:var(--brand-primary);"><i class="fas fa-layer-group"></i> Architecture & Engineering Highlights</h4>
        <ul class="timeline-body" style="list-style:none; padding-left:0;">
          ${archBullets}
        </ul>
      </div>

      <div style="margin-bottom:1.75rem;">
        <h4 style="font-size:0.95rem; font-weight:700; margin-bottom:0.6rem; color:var(--text-main);">Technologies & Tools</h4>
        <div style="display:flex; flex-wrap:wrap; gap:0.4rem;">
          ${techBadges}
        </div>
      </div>

      <div style="display:flex; flex-wrap:wrap; gap:0.75rem; padding-top:1.25rem; border-top:1px solid var(--border-subtle);">
        ${linksHtml}
      </div>
    `;
  }
}

/* ==========================================================================
   6. Clipboard & Quick Copy Buttons
   ========================================================================== */
function initClipboardButtons() {
  const copyButtons = document.querySelectorAll('[data-copy]');

  copyButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const textToCopy = btn.getAttribute('data-copy');
      if (!textToCopy) return;

      navigator.clipboard.writeText(textToCopy).then(() => {
        showToast(`Copied: ${textToCopy} ✨`);
      }).catch(() => {
        // Fallback
        const textarea = document.createElement('textarea');
        textarea.value = textToCopy;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
        showToast(`Copied: ${textToCopy} ✨`);
      });
    });
  });
}

/* ==========================================================================
   7. Contact Form Handler (mailto generator)
   ========================================================================== */
function initContactForm() {
  const form = document.getElementById('portfolio-contact-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('contact-name')?.value || '';
    const email = document.getElementById('contact-email')?.value || '';
    const subject = document.getElementById('contact-subject')?.value || 'Inquiry / Opportunity for El-Houcine Oussi';
    const message = document.getElementById('contact-message')?.value || '';

    const mailtoBody = `Hello El-Houcine,\n\n${message}\n\nFrom: ${name} (${email})`;
    const mailtoUrl = `mailto:oussi.elhoucine0@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(mailtoBody)}`;

    window.location.href = mailtoUrl;
    showToast('Opening your email client... ✉️');
  });
}

/* ==========================================================================
   8. Toast Notification Utility
   ========================================================================== */
function showToast(message) {
  let toast = document.getElementById('site-toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'site-toast';
    toast.className = 'toast-notice';
    document.body.appendChild(toast);
  }

  toast.innerHTML = `<i class="fas fa-check-circle"></i> <span>${message}</span>`;
  toast.classList.add('show');

  setTimeout(() => {
    toast.classList.remove('show');
  }, 3200);
}
