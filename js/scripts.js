/* ============================================================
   HEADER — transparent over hero, solid on scroll
   ============================================================ */
const siteHeader = document.getElementById('site-header');
const hero = document.getElementById('hero');

if (siteHeader) {
  if (hero) {
    // Homepage: transparent until hero scrolls out
    const heroObserver = new IntersectionObserver(
      (entries) => {
        siteHeader.classList.toggle('scrolled', !entries[0].isIntersecting);
      },
      { threshold: 0 }
    );
    heroObserver.observe(hero);
  } else {
    // Inner pages: always solid
    siteHeader.classList.add('scrolled');
  }
}

/* ============================================================
   MOBILE NAV TOGGLE
   ============================================================ */
const navToggle = document.querySelector('.nav-toggle');
const navList   = document.querySelector('.navigation');

if (navToggle && navList) {
  navToggle.addEventListener('click', () => {
    const isOpen = navList.classList.toggle('open');
    navToggle.classList.toggle('open', isOpen);
    document.body.style.overflow = isOpen ? 'hidden' : '';
  });

  // Close on nav link click
  navList.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      navList.classList.remove('open');
      navToggle.classList.remove('open');
      document.body.style.overflow = '';
    });
  });
}

/* ============================================================
   FADE-UP ANIMATION (IntersectionObserver)
   ============================================================ */
const fadeEls = document.querySelectorAll('.fade-up');
if (fadeEls.length) {
  const fadeObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          fadeObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );
  fadeEls.forEach((el) => fadeObserver.observe(el));
}

/* ============================================================
   SCROLL-TO-TOP BUTTON
   ============================================================ */
const scrollBtn = document.querySelector('.scrollToTop');

if (scrollBtn) {
  window.addEventListener('scroll', () => {
    const scrolled = window.scrollY;
    scrollBtn.style.display = scrolled > 500 ? 'flex' : 'none';
    const nearBottom = scrolled + window.innerHeight > document.body.scrollHeight - 400;
    scrollBtn.classList.toggle('fix-to-bottom', nearBottom);
  });

  scrollBtn.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

/* ============================================================
   SMOOTH SCROLL — hash links
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
   ANIMATED STATS COUNTER
   ============================================================ */
const statsGrid = document.querySelector('.stats-grid');

if (statsGrid) {
  const counters = statsGrid.querySelectorAll('.stat-number');
  const DURATION = 1600;

  function animateCounter(el) {
    const target   = parseFloat(el.dataset.target);
    const prefix   = el.dataset.prefix  || '';
    const suffix   = el.dataset.suffix  || '';
    const decimals = parseInt(el.dataset.decimals || '0', 10);
    const start    = performance.now();

    function step(now) {
      const elapsed  = now - start;
      const progress = Math.min(elapsed / DURATION, 1);
      const eased    = 1 - Math.pow(1 - progress, 3);
      el.textContent = prefix + (target * eased).toFixed(decimals) + suffix;
      if (progress < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }

  const statsObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          counters.forEach(animateCounter);
          statsObserver.disconnect();
        }
      });
    },
    { threshold: 0.3 }
  );
  statsObserver.observe(statsGrid);
}

/* ============================================================
   SKILL BAR ANIMATION
   ============================================================ */
const firstSkillset = document.querySelector('.skillset');

if (firstSkillset) {
  const bars = document.querySelectorAll('.skill-unit .bar .progress');

  // Store target widths then reset to 0
  bars.forEach((bar) => {
    bar.dataset.width = bar.style.width || '0%';
    bar.style.width = '0%';
  });

  const skillObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          bars.forEach((bar) => { bar.style.width = bar.dataset.width; });
          skillObserver.disconnect();
        }
      });
    },
    { threshold: 0.2 }
  );
  skillObserver.observe(firstSkillset);
}

/* ============================================================
   CHARACTER COUNTER (contact form)
   ============================================================ */
const messageField  = document.getElementById('message');
const characterLeft = document.getElementById('characterLeft');
const submitBtn     = document.getElementById('btnContactUs');

if (messageField && characterLeft) {
  const MAX = 250;
  characterLeft.textContent = `${MAX} characters left`;

  messageField.addEventListener('input', () => {
    const remaining = MAX - messageField.value.length;
    if (remaining <= 0) {
      characterLeft.textContent = 'Character limit reached';
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
   PORTFOLIO MODALS
   ============================================================ */
function openModal(modal) {
  modal.classList.add('is-open');
  document.body.style.overflow = 'hidden';
}

function closeModal(modal) {
  modal.classList.remove('is-open');
  document.body.style.overflow = '';
}

document.querySelectorAll('[data-modal]').forEach((trigger) => {
  trigger.addEventListener('click', (e) => {
    e.preventDefault();
    const modal = document.getElementById(trigger.dataset.modal);
    if (modal) openModal(modal);
  });
});

document.querySelectorAll('.close-modal').forEach((btn) => {
  btn.addEventListener('click', () => {
    const modal = btn.closest('.portfolio-modal');
    if (modal) closeModal(modal);
  });
});

document.querySelectorAll('.portfolio-modal').forEach((modal) => {
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal(modal);
  });
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    document.querySelectorAll('.portfolio-modal.is-open').forEach(closeModal);
  }
});

/* ============================================================
   PRO GALLERY — cycling image gallery for professional cards
   ============================================================ */
document.querySelectorAll('.pro-gallery').forEach((gallery) => {
  const imgs = gallery.dataset.images.split(',');
  const imgEl = gallery.querySelector('.pro-gallery-img');
  const counter = gallery.querySelector('.pro-gallery-counter');
  let current = 0;

  gallery.querySelector('.pro-gallery-prev').addEventListener('click', () => {
    current = (current - 1 + imgs.length) % imgs.length;
    imgEl.src = imgs[current];
    counter.textContent = `${current + 1} / ${imgs.length}`;
  });

  gallery.querySelector('.pro-gallery-next').addEventListener('click', () => {
    current = (current + 1) % imgs.length;
    imgEl.src = imgs[current];
    counter.textContent = `${current + 1} / ${imgs.length}`;
  });
});
