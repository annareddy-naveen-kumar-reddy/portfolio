/**
 * Visual Animations, Scroll Reveals, Typewriter & Interactive Micro-Interactions
 * Portfolio of ANNAREDDY NAVEEN KUMAR REDDY
 */

document.addEventListener('DOMContentLoaded', () => {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // =========================================================================
  // 1. Scroll Progress Bar & Back-to-Top Circular Progress Ring
  // =========================================================================
  const progressBar = document.getElementById('scrollProgressBar');
  const progressCircle = document.getElementById('scrollProgressCircle');
  const circumference = 2 * Math.PI * 13; // ~81.68px for r=13

  function updateScrollProgress() {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progressPercent = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;
    const clampedProgress = Math.min(100, Math.max(0, progressPercent));

    // Update linear top bar
    if (progressBar) {
      progressBar.style.width = `${clampedProgress}%`;
    }

    // Update circular progress in footer back-to-top button
    if (progressCircle) {
      const offset = circumference - (clampedProgress / 100) * circumference;
      progressCircle.style.strokeDashoffset = `${offset}`;
    }
  }

  window.addEventListener('scroll', updateScrollProgress, { passive: true });
  updateScrollProgress();

  // =========================================================================
  // 2. Intersection Observer for Scroll Reveals
  // =========================================================================
  if (!prefersReducedMotion && 'IntersectionObserver' in window) {
    const revealElements = document.querySelectorAll('.reveal-on-scroll');
    
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-revealed');
          observer.unobserve(entry.target);
        }
      });
    }, {
      root: null,
      threshold: 0.1,
      rootMargin: '0px 0px -40px 0px'
    });

    revealElements.forEach(el => revealObserver.observe(el));
  } else {
    document.querySelectorAll('.reveal-on-scroll').forEach(el => {
      el.classList.add('is-revealed');
    });
  }

  // =========================================================================
  // 3. Dynamic Typewriter Role Cycler in Hero Section
  // =========================================================================
  const typewriterElement = document.getElementById('typewriterText');
  const roles = [
    'Aspiring Software Engineer',
    'AI & Computer Vision Builder',
    'IoT & Embedded Systems Engineer',
    'Python & Problem Solving Enthusiast'
  ];

  if (typewriterElement && !prefersReducedMotion) {
    let roleIndex = 0;
    let charIndex = roles[0].length;
    let isDeleting = true;
    let isPaused = true;

    // Initial pause before beginning deletion of initial HTML text
    setTimeout(() => {
      isPaused = false;
      typeLoop();
    }, 2200);

    function typeLoop() {
      const currentRole = roles[roleIndex];

      if (isDeleting) {
        charIndex--;
        typewriterElement.textContent = currentRole.substring(0, charIndex);
      } else {
        charIndex++;
        typewriterElement.textContent = currentRole.substring(0, charIndex);
      }

      let typeSpeed = isDeleting ? 38 : 75;

      if (!isDeleting && charIndex === currentRole.length) {
        // Finished typing current role: pause before deleting
        typeSpeed = 2200;
        isDeleting = true;
      } else if (isDeleting && charIndex === 0) {
        // Finished deleting: switch to next role
        isDeleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
        typeSpeed = 450;
      }

      setTimeout(typeLoop, typeSpeed);
    }
  }

  // =========================================================================
  // 4. Animated Numerical Stat Counters (e.g. 2+, 8.7, 8.2, 100%)
  // =========================================================================
  const counters = document.querySelectorAll('.counter');
  
  if (counters.length > 0) {
    function startCounterAnimation(counterEl) {
      const target = parseFloat(counterEl.getAttribute('data-target') || '0');
      const isDecimal = counterEl.getAttribute('data-decimal') === '1';
      const duration = 1800; // ms
      const startTime = performance.now();

      function updateCounter(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Easing: easeOutExpo
        const ease = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
        const currentVal = target * ease;

        if (isDecimal) {
          counterEl.textContent = currentVal.toFixed(1);
        } else {
          counterEl.textContent = Math.floor(currentVal).toString();
        }

        if (progress < 1) {
          requestAnimationFrame(updateCounter);
        } else {
          counterEl.textContent = isDecimal ? target.toFixed(1) : target.toString();
        }
      }

      requestAnimationFrame(updateCounter);
    }

    if (!prefersReducedMotion && 'IntersectionObserver' in window) {
      const counterObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            startCounterAnimation(entry.target);
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.3 });

      counters.forEach(c => counterObserver.observe(c));
    } else {
      counters.forEach(c => {
        const target = c.getAttribute('data-target') || '0';
        c.textContent = target;
      });
    }
  }

  // =========================================================================
  // 5. Interactive Project Category Filtering Tabs
  // =========================================================================
  const projectFilterBtns = document.querySelectorAll('[data-project-filter]');
  const projectCards = document.querySelectorAll('.project-card');

  if (projectFilterBtns.length > 0 && projectCards.length > 0) {
    projectFilterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const filter = btn.getAttribute('data-project-filter');

        // Update active tab button state & aria
        projectFilterBtns.forEach(b => {
          b.classList.remove('active');
          b.setAttribute('aria-selected', 'false');
        });
        btn.classList.add('active');
        btn.setAttribute('aria-selected', 'true');

        // Filter project cards with smooth stagger transitions
        projectCards.forEach(card => {
          const category = card.getAttribute('data-project-category');
          if (filter === 'all' || category === filter) {
            card.style.display = 'flex';
            setTimeout(() => {
              card.style.opacity = '1';
              card.style.transform = 'translateY(0) scale(1)';
            }, 10);
          } else {
            card.style.opacity = '0';
            card.style.transform = 'translateY(15px) scale(0.98)';
            setTimeout(() => {
              card.style.display = 'none';
            }, 250);
          }
        });
      });
    });
  }

  // =========================================================================
  // 6. Interactive Card Mouse Glow Spotlight & 3D Tilt
  // =========================================================================
  const interactiveCards = document.querySelectorAll('.glass-card, .skill-category-card, .project-card, .card-interactive');
  
  if (!prefersReducedMotion && window.innerWidth > 768) {
    interactiveCards.forEach(card => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        card.style.setProperty('--mouse-x', `${x}px`);
        card.style.setProperty('--mouse-y', `${y}px`);

        // Subtle 3D perspective tilt on hover
        if (card.classList.contains('card-interactive')) {
          const centerX = rect.width / 2;
          const centerY = rect.height / 2;
          const rotateX = ((y - centerY) / centerY) * -5;
          const rotateY = ((x - centerX) / centerX) * 5;
          card.style.transform = `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translateY(-4px)`;
        }
      });

      card.addEventListener('mouseleave', () => {
        if (card.classList.contains('card-interactive')) {
          card.style.transform = '';
        }
      });
    });
  }

  // Subtle ambient parallax on hero visual
  const heroFrame = document.querySelector('.hero-portrait-frame');
  if (heroFrame && !prefersReducedMotion && window.innerWidth > 1024) {
    window.addEventListener('mousemove', (e) => {
      const { clientX, clientY } = e;
      const xPos = (clientX / window.innerWidth - 0.5) * 12;
      const yPos = (clientY / window.innerHeight - 0.5) * 12;
      heroFrame.style.transform = `perspective(1000px) rotateY(${xPos.toFixed(2)}deg) rotateX(${-yPos.toFixed(2)}deg)`;
    });
  }

  // =========================================================================
  // 7. Keyboard Navigation Shortcuts Modal & Hotkeys
  // =========================================================================
  const shortcutsModal = document.getElementById('shortcutsModal');
  const shortcutsBadge = document.getElementById('keyboardShortcutsBadge');

  if (shortcutsBadge && shortcutsModal) {
    shortcutsBadge.addEventListener('click', () => {
      shortcutsModal.classList.add('active');
      shortcutsModal.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
    });
  }

  document.addEventListener('keydown', (e) => {
    // Ignore hotkeys when typing in input, textarea or when modal is open
    const targetTag = e.target.tagName.toLowerCase();
    if (targetTag === 'input' || targetTag === 'textarea' || targetTag === 'select') return;

    const activeModal = document.querySelector('.modal-overlay.active');
    if (activeModal && e.key !== 'Escape') return;

    switch (e.key.toLowerCase()) {
      case '?':
        if (shortcutsModal) {
          if (shortcutsModal.classList.contains('active')) {
            shortcutsModal.classList.remove('active');
            shortcutsModal.setAttribute('aria-hidden', 'true');
            document.body.style.overflow = '';
          } else {
            shortcutsModal.classList.add('active');
            shortcutsModal.setAttribute('aria-hidden', 'false');
            document.body.style.overflow = 'hidden';
          }
        }
        break;
      case 'h':
        document.getElementById('home')?.scrollIntoView({ behavior: 'smooth' });
        break;
      case 'a':
        document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
        break;
      case 's':
        document.getElementById('skills')?.scrollIntoView({ behavior: 'smooth' });
        break;
      case 'e':
        document.getElementById('education')?.scrollIntoView({ behavior: 'smooth' });
        break;
      case 'p':
        document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
        break;
      case 'c':
        document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
        break;
      case 'r':
        document.getElementById('resume')?.scrollIntoView({ behavior: 'smooth' });
        break;
    }
  });
});
