/* ============================================================
   SCROLL-TO-TOP BUTTON
   ============================================================ */
const scrollBtn = document.querySelector('.scrollToTop');

if (scrollBtn) {
  window.addEventListener('scroll', () => {
    const scrolled = window.scrollY;

    scrollBtn.style.display = scrolled > 500 ? 'block' : 'none';

    const nearBottom = scrolled + window.innerHeight > document.body.scrollHeight - 400;
    scrollBtn.classList.toggle('fix-to-bottom', nearBottom);
  });

  scrollBtn.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

/* ============================================================
   SMOOTH SCROLL FOR IN-PAGE HASH LINKS
   (handles portfolio page section nav: #FEA, #PT, etc.)
   ============================================================ */
document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener('click', (e) => {
    const target = document.querySelector(link.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

/* ============================================================
   CHARACTER COUNTER  (contact form)
   ============================================================ */
const messageField = document.getElementById('message');
const characterLeft = document.getElementById('characterLeft');
const submitBtn = document.getElementById('btnContactUs');

if (messageField && characterLeft) {
  const MAX = 250;
  characterLeft.textContent = `${MAX} characters left`;

  messageField.addEventListener('input', () => {
    const remaining = MAX - messageField.value.length;

    if (remaining <= 0) {
      characterLeft.textContent = 'You have reached the limit';
      characterLeft.classList.add('red');
      if (submitBtn) submitBtn.disabled = true;
    } else {
      characterLeft.textContent = `${remaining} characters left`;
      characterLeft.classList.remove('red');
      if (submitBtn) submitBtn.disabled = false;
    }
  });
}

/* ============================================================
   ANIMATED STATS COUNTER
   Triggers once when .stats-grid scrolls into view.
   Reads data-target, data-prefix, data-suffix, data-decimals
   from each .stat-number span.
   ============================================================ */
const statsGrid = document.querySelector('.stats-grid');

if (statsGrid) {
  const counters = statsGrid.querySelectorAll('.stat-number');
  const DURATION = 1600; // ms

  function animateCounter(el) {
    const target = parseFloat(el.dataset.target);
    const prefix = el.dataset.prefix || '';
    const suffix = el.dataset.suffix || '';
    const decimals = parseInt(el.dataset.decimals || '0', 10);
    const start = performance.now();

    function step(now) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / DURATION, 1);
      // ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      const value = (target * eased).toFixed(decimals);
      el.textContent = prefix + value + suffix;
      if (progress < 1) requestAnimationFrame(step);
    }

    requestAnimationFrame(step);
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        counters.forEach(animateCounter);
        observer.disconnect();
      }
    });
  }, { threshold: 0.3 });

  observer.observe(statsGrid);
}

/* ============================================================
   PORTFOLIO MODALS
   Opens/closes .portfolio-modal elements.
   Trigger: <a data-modal="portfolioModal1"> on portfolio.html
   ============================================================ */
function openModal(modal) {
  modal.classList.add('is-open');
  document.body.style.overflow = 'hidden';
}

function closeModal(modal) {
  modal.classList.remove('is-open');
  document.body.style.overflow = '';
}

// Open on portfolio item click
document.querySelectorAll('[data-modal]').forEach((trigger) => {
  trigger.addEventListener('click', (e) => {
    e.preventDefault();
    const modal = document.getElementById(trigger.dataset.modal);
    if (modal) openModal(modal);
  });
});

// Close via the × button inside the modal
document.querySelectorAll('.close-modal').forEach((btn) => {
  btn.addEventListener('click', () => {
    const modal = btn.closest('.portfolio-modal');
    if (modal) closeModal(modal);
  });
});

// Close by clicking the backdrop
document.querySelectorAll('.portfolio-modal').forEach((modal) => {
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal(modal);
  });
});

// Close on Escape key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    document.querySelectorAll('.portfolio-modal.is-open').forEach(closeModal);
  }
});
