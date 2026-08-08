/**
 * Infinity Automation & Engineering — main.js
 * Vanilla ES6+ | WCAG 2.2 AA friendly
 */

(function () {
  'use strict';

  /* ---------- Mobile Navigation ---------- */
  const toggle = document.querySelector('.nav-toggle');
  const mobileNav = document.querySelector('.nav-mobile');
  const body = document.body;

  if (toggle && mobileNav) {
    toggle.addEventListener('click', () => {
      const isOpen = mobileNav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', isOpen);
      body.style.overflow = isOpen ? 'hidden' : '';
    });

    // Close on Escape
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && mobileNav.classList.contains('open')) {
        mobileNav.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
        body.style.overflow = '';
        toggle.focus();
      }
    });

    // Close when a link is clicked
    mobileNav.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        mobileNav.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
        body.style.overflow = '';
      });
    });
  }

  /* ---------- Sticky Header scroll class ---------- */
  const header = document.querySelector('.site-header');
  if (header) {
    const onScroll = () => {
      if (window.scrollY > 20) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* ---------- Stats Counter (Intersection Observer) ---------- */
  const counters = document.querySelectorAll('[data-counter]');
  if (counters.length) {
    const animateCounter = (el) => {
      const target = parseInt(el.getAttribute('data-counter'), 10);
      const duration = 1800;
      const start = performance.now();
      const isPercent = el.textContent.includes('%');
      const suffix = el.getAttribute('data-suffix') || (isPercent ? '%' : '+');

      const step = (now) => {
        const progress = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
        const value = Math.floor(eased * target);
        el.textContent = value + suffix;
        if (progress < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animateCounter(entry.target);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.4 }
    );

    counters.forEach((c) => observer.observe(c));
  }

  /* ---------- Contact Form Validation + Google Forms submit handling ---------- */
  const form = document.getElementById('contact-form');
  if (form) {
    const statusEl = document.getElementById('form-status');
    const submitBtn = document.getElementById('submit-btn');
    const iframe = document.getElementById('hidden_iframe');
    let formSubmitting = false;
    let submitTimeout = null;

    function showStatus(type, message) {
      if (!statusEl) return;
      statusEl.style.display = 'block';
      if (type === 'error') {
        statusEl.style.background = '#FDECEA';
        statusEl.style.color = '#C0392B';
        statusEl.style.border = '1px solid #F5C6CB';
      } else if (type === 'loading') {
        statusEl.style.background = '#EBF5FB';
        statusEl.style.color = '#1A5276';
        statusEl.style.border = '1px solid #AED6F1';
      } else {
        statusEl.style.background = '#E8F8F5';
        statusEl.style.color = '#1E8449';
        statusEl.style.border = '1px solid #A9DFBF';
      }
      statusEl.textContent = message;
    }

    function clearStatus() {
      if (statusEl) {
        statusEl.style.display = 'none';
        statusEl.textContent = '';
      }
    }

    function setLoading(isLoading) {
      formSubmitting = isLoading;
      if (submitBtn) {
        submitBtn.disabled = isLoading;
        submitBtn.textContent = isLoading ? 'Sending…' : 'Send Message';
        submitBtn.style.opacity = isLoading ? '0.7' : '1';
        submitBtn.style.cursor = isLoading ? 'not-allowed' : 'pointer';
      }
    }

    function validateForm() {
      let valid = true;
      const fields = [
        { id: 'name', required: true },
        { id: 'email', required: true, type: 'email' },
        { id: 'phone', required: false },
        { id: 'subject', required: true },
        { id: 'message', required: true },
        { id: 'consent', required: true, type: 'checkbox' }
      ];

      fields.forEach((f) => {
        const el = document.getElementById(f.id);
        if (!el) return;
        const group = el.closest('.form-group') || (el.closest('.checkbox-group') && el.closest('.checkbox-group').parentElement);
        let error = false;

        if (f.type === 'checkbox') {
          error = f.required && !el.checked;
        } else if (f.type === 'email') {
          error = f.required && (!el.value.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(el.value));
        } else {
          error = f.required && !el.value.trim();
        }

        if (error) {
          valid = false;
          if (group) group.classList.add('has-error');
        } else {
          if (group) group.classList.remove('has-error');
        }
      });
      return valid;
    }

    // iframe load = Google accepted the POST (best-effort success signal)
    if (iframe) {
      iframe.addEventListener('load', () => {
        if (!formSubmitting) return;
        clearTimeout(submitTimeout);
        // Success path
        setLoading(false);
        showStatus('success', 'Message sent successfully! Redirecting…');
        window.setTimeout(() => {
          window.location.href = 'thank-you.html';
        }, 600);
      });
    }

    form.addEventListener('submit', (e) => {
      clearStatus();

      if (!validateForm()) {
        e.preventDefault();
        showStatus('error', 'Please correct the highlighted fields and try again.');
        return;
      }

      // Valid — allow native submit to Google Forms via hidden iframe
      setLoading(true);
      showStatus('loading', 'Sending your message…');

      // Timeout fallback if iframe never fires load (network/adblock/Google issue)
      clearTimeout(submitTimeout);
      submitTimeout = window.setTimeout(() => {
        if (!formSubmitting) return;
        setLoading(false);
        showStatus(
          'error',
          'We could not confirm delivery. Please check your internet connection and try again, or email us directly at info@infinityautomationeng.com.'
        );
        formSubmitting = false;
      }, 12000);
    });

    // Clear field errors while typing
    form.querySelectorAll('input, textarea').forEach((el) => {
      el.addEventListener('input', () => {
        const group = el.closest('.form-group');
        if (group) group.classList.remove('has-error');
      });
    });
  }

/* ---------- Set active nav link ---------- */
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-desktop a, .nav-mobile a').forEach((link) => {
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.classList.add('active');
      link.setAttribute('aria-current', 'page');
    }
  });

})();
