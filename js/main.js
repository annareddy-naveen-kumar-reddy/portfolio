/**
 * Main Application Logic, Navigation, Modals & User Interactions
 * Portfolio of ANNAREDDY NAVEEN KUMAR REDDY
 */

document.addEventListener('DOMContentLoaded', () => {
  const data = window.PORTFOLIO_DATA || {};

  // =========================================================================
  // 1. Sticky Header & Active Navigation Spy
  // =========================================================================
  const siteHeader = document.querySelector('.site-header');
  const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');
  const sections = document.querySelectorAll('section[id]');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      siteHeader?.classList.add('scrolled');
    } else {
      siteHeader?.classList.remove('scrolled');
    }
  }, { passive: true });

  // Active section indicator via IntersectionObserver
  if ('IntersectionObserver' in window) {
    const sectionObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const currentId = entry.target.getAttribute('id');
          navLinks.forEach(link => {
            if (link.getAttribute('href') === `#${currentId}`) {
              link.classList.add('active');
            } else {
              link.classList.remove('active');
            }
          });
        }
      });
    }, {
      rootMargin: '-30% 0px -70% 0px'
    });

    sections.forEach(sec => sectionObserver.observe(sec));
  }

  // =========================================================================
  // 2. Mobile Navigation Drawer
  // =========================================================================
  const navToggle = document.getElementById('navToggle');
  const mobileDrawer = document.getElementById('mobileDrawer');
  const mobileLinks = document.querySelectorAll('.mobile-nav-link');

  function toggleMobileMenu(open) {
    const isOpen = open !== undefined ? open : !mobileDrawer.classList.contains('open');
    if (isOpen) {
      navToggle?.classList.add('open');
      mobileDrawer?.classList.add('open');
      navToggle?.setAttribute('aria-expanded', 'true');
      document.body.style.overflow = 'hidden';
    } else {
      navToggle?.classList.remove('open');
      mobileDrawer?.classList.remove('open');
      navToggle?.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    }
  }

  navToggle?.addEventListener('click', () => toggleMobileMenu());

  // Close drawer on link click
  mobileLinks.forEach(link => {
    link.addEventListener('click', () => toggleMobileMenu(false));
  });

  // Close drawer when clicking outside
  document.addEventListener('click', (e) => {
    if (mobileDrawer?.classList.contains('open') && 
        !mobileDrawer.contains(e.target) && 
        !navToggle.contains(e.target)) {
      toggleMobileMenu(false);
    }
  });

  // =========================================================================
  // 3. Toast Notification System
  // =========================================================================
  const toastContainer = document.getElementById('toastContainer');

  function showToast(message, type = 'info') {
    if (!toastContainer) return;

    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    
    // Checkmark icon
    toast.innerHTML = `
      <svg class="toast-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
        <polyline points="22 4 12 14.01 9 11.01"></polyline>
      </svg>
      <span>${message}</span>
    `;

    toastContainer.appendChild(toast);

    // Trigger entrance animation
    setTimeout(() => toast.classList.add('show'), 10);

    // Auto dismiss after 3.5s
    setTimeout(() => {
      toast.classList.remove('show');
      setTimeout(() => toast.remove(), 400);
    }, 3500);
  }

  // =========================================================================
  // 4. One-Click Copy-to-Clipboard Buttons
  // =========================================================================
  const copyButtons = document.querySelectorAll('.copy-btn');
  
  copyButtons.forEach(btn => {
    btn.addEventListener('click', async (e) => {
      e.preventDefault();
      const textToCopy = btn.getAttribute('data-copy');
      const label = btn.getAttribute('data-label') || 'Copied to clipboard!';
      
      if (!textToCopy) return;

      try {
        await navigator.clipboard.writeText(textToCopy);
        btn.classList.add('copied');
        const originalText = btn.innerHTML;
        btn.innerHTML = `
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg> Copied!
        `;

        showToast(`${label} copied to clipboard!`);

        setTimeout(() => {
          btn.classList.remove('copied');
          btn.innerHTML = originalText;
        }, 2000);
      } catch (err) {
        showToast('Unable to copy automatically. Please copy manually.', 'error');
      }
    });
  });

  // =========================================================================
  // 5. Accessible Modal System (Project & Resume Modals)
  // =========================================================================
  const projectModal = document.getElementById('projectModal');
  const projectModalContent = document.getElementById('projectModalBody');
  const projectModalTitle = document.getElementById('projectModalTitle');
  const resumeModal = document.getElementById('resumeModal');
  const allModals = document.querySelectorAll('.modal-overlay');

  function openModal(modal) {
    if (!modal) return;
    modal.classList.add('active');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';

    // Focus on close button for accessibility
    const closeBtn = modal.querySelector('.modal-close');
    closeBtn?.focus();
  }

  function closeModal(modal) {
    if (!modal) return;
    modal.classList.remove('active');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  // Close triggers
  document.querySelectorAll('.modal-close, [data-modal-close]').forEach(btn => {
    btn.addEventListener('click', () => {
      const parentModal = btn.closest('.modal-overlay');
      closeModal(parentModal);
    });
  });

  // Close on backdrop click
  allModals.forEach(modal => {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        closeModal(modal);
      }
    });
  });

  // Close on ESC key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      allModals.forEach(modal => {
        if (modal.classList.contains('active')) {
          closeModal(modal);
        }
      });
    }
  });

  // Project details trigger
  const viewProjectBtns = document.querySelectorAll('[data-view-project]');
  viewProjectBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const projectId = btn.getAttribute('data-view-project');
      const project = data.projects?.[projectId];

      if (!project || !projectModal || !projectModalContent) return;

      if (projectModalTitle) {
        projectModalTitle.textContent = project.name;
      }

      // Populate rich project detail modal
      projectModalContent.innerHTML = `
        <div style="margin-bottom: 20px;">
          <span class="badge badge-cyan" style="margin-bottom: 8px;">${project.badge}</span>
          <span class="badge badge-indigo" style="margin-bottom: 8px; margin-left: 6px;">● ${project.status}</span>
          <h3 style="font-size: 1.25rem; color: var(--text-primary); margin-top: 10px; line-height: 1.4;">${project.fullTitle}</h3>
        </div>

        <div style="margin-bottom: 24px; background: rgba(255,255,255,0.02); padding: 18px; border-radius: var(--border-radius-md); border: 1px solid var(--border-subtle);">
          <h4 style="color: var(--accent-cyan); margin-bottom: 8px; font-size: 1rem;">Overview & Objective</h4>
          <p style="font-size: 0.95rem; line-height: 1.7; color: var(--text-secondary);">${project.summary}</p>
        </div>

        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-bottom: 24px;">
          <div style="background: rgba(239, 68, 68, 0.05); border: 1px solid rgba(239, 68, 68, 0.2); padding: 16px; border-radius: var(--border-radius-md);">
            <h4 style="color: #f87171; font-size: 0.95rem; margin-bottom: 6px;">The Problem</h4>
            <p style="font-size: 0.88rem; color: var(--text-muted); line-height: 1.6;">${project.problem}</p>
          </div>
          <div style="background: rgba(16, 185, 129, 0.05); border: 1px solid rgba(16, 185, 129, 0.2); padding: 16px; border-radius: var(--border-radius-md);">
            <h4 style="color: #34d399; font-size: 0.95rem; margin-bottom: 6px;">The Solution</h4>
            <p style="font-size: 0.88rem; color: var(--text-muted); line-height: 1.6;">${project.solution}</p>
          </div>
        </div>

        <div style="margin-bottom: 24px;">
          <h4 style="color: var(--text-primary); margin-bottom: 12px; font-size: 1rem;">Technologies & Architecture Stack</h4>
          <div style="display: flex; flex-wrap: wrap; gap: 8px;">
            ${project.technologies.map(t => `<span class="tech-tag">${t}</span>`).join('')}
          </div>
        </div>

        <div>
          <h4 style="color: var(--text-primary); margin-bottom: 12px; font-size: 1rem;">Key Engineering Features</h4>
          <ul style="list-style: none; display: flex; flex-direction: column; gap: 10px;">
            ${project.keyFeatures.map(f => `
              <li style="display: flex; align-items: flex-start; gap: 10px; font-size: 0.92rem; color: var(--text-secondary);">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#38bdf8" stroke-width="2" style="flex-shrink: 0; margin-top: 2px;">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
                <span>${f}</span>
              </li>
            `).join('')}
          </ul>
        </div>
      `;

      openModal(projectModal);
    });
  });

  // Resume Modal trigger
  const viewResumeBtns = document.querySelectorAll('[data-view-resume]');
  viewResumeBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      openModal(resumeModal);
    });
  });

  // =========================================================================
  // 6. Secure Contact Form Validation & Asynchronous Email Transmission
  // =========================================================================
  const contactForm = document.getElementById('contactForm');
  const formSuccessAlert = document.getElementById('formSuccessAlert');
  const formErrorAlert = document.getElementById('formErrorAlert');
  const submitBtn = document.getElementById('contactSubmitBtn');
  const submitBtnText = document.getElementById('submitBtnText');

  // Contact Service Configuration (Zero private API secrets exposed)
  const CONTACT_CONFIG = {
    recipientEmail: 'naveenkumarreddyannareddy@gmail.com',
    // Optional: paste a Formspree ID here if preferred (e.g. "xpzgkqwe"), otherwise FormSubmit is used directly
    formspreeId: '',
    getEndpoint() {
      if (this.formspreeId && this.formspreeId.trim() !== '') {
        return `https://formspree.io/f/${this.formspreeId.trim()}`;
      }
      return `https://formsubmit.co/ajax/${this.recipientEmail}`;
    }
  };

  // Real-time error clearance on input
  ['senderName', 'senderEmail', 'senderPhone', 'messageSubject', 'senderMessage'].forEach(id => {
    const el = document.getElementById(id);
    el?.addEventListener('input', () => {
      el.closest('.form-group')?.classList.remove('has-error');
      formErrorAlert?.classList.remove('show');
    });
  });

  contactForm?.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Anti-bot honeypot check
    const honeypot = document.getElementById('formHoneypot')?.value;
    if (honeypot) {
      console.warn('Bot submission detected and discarded.');
      return;
    }

    const nameInput = document.getElementById('senderName');
    const emailInput = document.getElementById('senderEmail');
    const phoneInput = document.getElementById('senderPhone');
    const subjectInput = document.getElementById('messageSubject');
    const messageInput = document.getElementById('senderMessage');

    const name = nameInput?.value.trim() || '';
    const email = emailInput?.value.trim() || '';
    const phone = phoneInput?.value.trim() || '';
    const subject = subjectInput?.value.trim() || '';
    const message = messageInput?.value.trim() || '';

    // Clear previous alerts & errors
    formSuccessAlert?.classList.remove('show');
    formErrorAlert?.classList.remove('show');
    document.querySelectorAll('.form-group').forEach(g => g.classList.remove('has-error'));

    // Validation
    let isValid = true;
    let firstInvalidElement = null;

    // 1. Validate Full Name
    if (name.length < 2) {
      document.getElementById('groupName')?.classList.add('has-error');
      if (!firstInvalidElement) firstInvalidElement = nameInput;
      isValid = false;
    }

    // 2. Validate Email Address
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      document.getElementById('groupEmail')?.classList.add('has-error');
      if (!firstInvalidElement) firstInvalidElement = emailInput;
      isValid = false;
    }

    // 3. Validate Phone Number (Optional, but validate if entered)
    if (phone.length > 0) {
      const phoneRegex = /^[+]?[(]?[0-9]{1,4}[)]?[-\s./0-9]{6,15}$/;
      if (!phoneRegex.test(phone) || phone.replace(/\D/g, '').length < 7) {
        document.getElementById('groupPhone')?.classList.add('has-error');
        if (!firstInvalidElement) firstInvalidElement = phoneInput;
        isValid = false;
      }
    }

    // 4. Validate Subject
    if (subject.length < 3) {
      document.getElementById('groupSubject')?.classList.add('has-error');
      if (!firstInvalidElement) firstInvalidElement = subjectInput;
      isValid = false;
    }

    // 5. Validate Message
    if (message.length < 10) {
      document.getElementById('groupMessage')?.classList.add('has-error');
      if (!firstInvalidElement) firstInvalidElement = messageInput;
      isValid = false;
    }

    if (!isValid) {
      firstInvalidElement?.focus();
      showToast('Please check the highlighted form fields and correct errors.', 'error');
      return;
    }

    // Lock Form & Set Processing State to prevent duplicates
    submitBtn.disabled = true;
    submitBtn.classList.add('is-loading');
    if (submitBtnText) submitBtnText.textContent = 'Sending Message...';

    const hiddenSubject = document.getElementById('hiddenSubject');
    if (hiddenSubject) {
      hiddenSubject.value = `[Portfolio Inquiry] ${subject} (from ${name})`;
    }

    const payload = {
      name: name,
      email: email,
      phone: phone || 'Not provided',
      _subject: `[Portfolio Inquiry] ${subject} (from ${name})`,
      subject: subject,
      message: message,
      _template: 'table',
      _captcha: 'false'
    };

    try {
      const endpoint = CONTACT_CONFIG.getEndpoint();
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      const result = await response.json().catch(() => ({}));

      if (response.ok || result.success === 'true' || result.success === true) {
        // Success state
        formSuccessAlert?.classList.add('show');
        showToast('Thank you! Your message has been sent successfully.');
        contactForm.reset();

        // Scroll smoothly to alert if out of view
        formSuccessAlert?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      } else {
        // Check if activation is pending
        if (result.message && (result.message.toLowerCase().includes('activate') || result.message.toLowerCase().includes('activation'))) {
          formSuccessAlert?.classList.add('show');
          showToast('Form submitted! Please check your email to activate the form.', 'info');
          contactForm.reset();
        } else {
          throw new Error(result.message || 'Server rejected submission');
        }
      }
    } catch (error) {
      console.warn('AJAX submission note:', error.message);
      
      // If browsing directly via file:// protocol or fetch blocked by CORS, fallback to standard form POST
      if (window.location.protocol === 'file:') {
        contactForm.submit();
        return;
      }

      // Failed state
      formErrorAlert?.classList.add('show');
      showToast('Unable to send your message. Please try again or contact me directly by email.', 'error');
      formErrorAlert?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    } finally {
      // Restore Button State
      submitBtn.disabled = false;
      submitBtn.classList.remove('is-loading');
      if (submitBtnText) submitBtnText.textContent = 'Send Message';
    }
  });

  // =========================================================================
  // 7. Dynamic Footer Year & Back to Top
  // =========================================================================
  const yearEl = document.getElementById('currentYear');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  const backToTopBtn = document.getElementById('backToTopBtn');
  backToTopBtn?.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
});
