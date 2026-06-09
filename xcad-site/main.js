/* ═══════════════════════════════════════════════════════
   XCAD USA — Enhanced Website JavaScript
   main.js
═══════════════════════════════════════════════════════ */

'use strict';

/* ─────────────────────────────────────────
   1. LOADER
───────────────────────────────────────── */
(function initLoader() {
  const loader    = document.getElementById('loader');
  const fill      = document.getElementById('loaderFill');
  if (!loader || !fill) return;

  let progress = 0;
  const interval = setInterval(() => {
    progress += Math.random() * 18 + 6;
    if (progress >= 100) {
      progress = 100;
      clearInterval(interval);
      fill.style.width = '100%';
      setTimeout(() => {
        loader.classList.add('hidden');
        // kick off hero animations after loader
        triggerHeroAnimations();
      }, 300);
    }
    fill.style.width = Math.min(progress, 100) + '%';
  }, 80);

  // Safety: hide loader after 2.5s no matter what
  setTimeout(() => {
    clearInterval(interval);
    loader.classList.add('hidden');
    triggerHeroAnimations();
  }, 2500);
})();


/* ─────────────────────────────────────────
   2. HERO ANIMATIONS
───────────────────────────────────────── */
function triggerHeroAnimations() {
  // Eyebrow
  const eyebrow = document.querySelector('.hero-eyebrow');
  if (eyebrow) {
    setTimeout(() => eyebrow.classList.add('visible'), 0);
  }

  // Logo
  const logoWrap = document.querySelector('.hero-logo-wrap');
  if (logoWrap) {
    setTimeout(() => logoWrap.classList.add('visible'), 100);
  }

  // Headline lines
  const lines = document.querySelectorAll('.hero-headline .line');
  lines.forEach((line, i) => {
    setTimeout(() => line.classList.add('visible'), 150 + i * 60);
  });

  // Sub
  const sub = document.querySelector('.hero-sub');
  if (sub) setTimeout(() => sub.classList.add('visible'), 350);

  // CTAs
  const ctas = document.querySelector('.hero-ctas');
  if (ctas) setTimeout(() => ctas.classList.add('visible'), 450);

  // Stats
  const stats = document.querySelector('.hero-stats');
  if (stats) {
    setTimeout(() => {
      stats.classList.add('visible');
      // Trigger counter animation
      animateCounters();
    }, 550);
  }
}


/* ─────────────────────────────────────────
   3. COUNTER ANIMATION
───────────────────────────────────────── */
function animateCounters() {
  const counters = document.querySelectorAll('.stat-n[data-count]');
  counters.forEach(el => {
    const target   = parseInt(el.getAttribute('data-count'), 10);
    const duration = 1600;
    const start    = performance.now();

    function step(now) {
      const elapsed  = now - start;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out quart
      const eased    = 1 - Math.pow(1 - progress, 4);
      el.textContent = Math.round(eased * target);
      if (progress < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  });
}


/* ─────────────────────────────────────────
   4. STICKY HEADER
───────────────────────────────────────── */
(function initStickyHeader() {
  const header = document.getElementById('siteHeader');
  if (!header) return;

  let ticking = false;
  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        header.classList.toggle('solid', window.scrollY > 60);
        ticking = false;
      });
      ticking = true;
    }
  }, { passive: true });
})();


/* ─────────────────────────────────────────
   5. MOBILE MENU
───────────────────────────────────────── */
(function initMobileMenu() {
  const hamburger    = document.getElementById('hamburger');
  const mobileNav    = document.getElementById('mobileNav');
  const mobileOverlay= document.getElementById('mobileOverlay');
  const mobileClose  = document.getElementById('mobileClose');
  if (!hamburger || !mobileNav) return;

  function openMenu() {
    mobileNav.classList.add('open');
    mobileOverlay.classList.add('open');
    hamburger.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeMenu() {
    mobileNav.classList.remove('open');
    mobileOverlay.classList.remove('open');
    hamburger.classList.remove('open');
    document.body.style.overflow = '';
  }

  hamburger.addEventListener('click', () => {
    mobileNav.classList.contains('open') ? closeMenu() : openMenu();
  });

  mobileOverlay.addEventListener('click', closeMenu);
  if (mobileClose) mobileClose.addEventListener('click', closeMenu);

  // Sub-menu toggle
  const subToggles = document.querySelectorAll('.mobile-sub-toggle');
  subToggles.forEach(btn => {
    btn.addEventListener('click', () => {
      const sub = btn.nextElementSibling;
      const isOpen = sub.classList.contains('open');
      // Close all
      document.querySelectorAll('.mobile-sub').forEach(s => s.classList.remove('open'));
      document.querySelectorAll('.mobile-sub-toggle').forEach(b => b.classList.remove('open'));
      // Toggle current
      if (!isOpen) {
        sub.classList.add('open');
        btn.classList.add('open');
      }
    });
  });

  // Close on escape
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeMenu();
  });
})();


/* ─────────────────────────────────────────
   6. SCROLL REVEAL (IntersectionObserver)
───────────────────────────────────────── */
(function initScrollReveal() {
  const elements = document.querySelectorAll('.reveal');
  if (!elements.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;

      const el    = entry.target;
      const delay = parseInt(el.getAttribute('data-reveal-delay') || '0', 10);

      setTimeout(() => {
        el.classList.add('visible');
      }, delay);

      observer.unobserve(el);
    });
  }, {
    threshold:  0.1,
    rootMargin: '0px 0px -40px 0px'
  });

  elements.forEach(el => observer.observe(el));
})();


/* ─────────────────────────────────────────
   7. PRODUCT CARD TILT EFFECT
───────────────────────────────────────── */
(function initCardTilt() {
  // Only on devices with a fine pointer (mouse)
  if (!window.matchMedia('(pointer: fine)').matches) return;

  const cards = document.querySelectorAll('.product-card');

  cards.forEach(card => {
    card.addEventListener('mousemove', e => {
      const rect   = card.getBoundingClientRect();
      const x      = e.clientX - rect.left;
      const y      = e.clientY - rect.top;
      const cx     = rect.width  / 2;
      const cy     = rect.height / 2;
      const rotateX = ((y - cy) / cy) * -4;
      const rotateY = ((x - cx) / cx) *  4;

      card.style.transform =
        `translateY(-6px) perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
      card.style.transition = 'transform 0.5s cubic-bezier(0.16,1,0.3,1)';
      setTimeout(() => { card.style.transition = ''; }, 500);
    });
  });
})();


/* ─────────────────────────────────────────
   8. PARALLAX ON HERO BG IMAGE
───────────────────────────────────────── */
(function initHeroParallax() {
  const heroBgImg = document.querySelector('.hero-bg-img');
  if (!heroBgImg) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  let ticking = false;
  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        const scrollY = window.scrollY;
        const heroH   = document.querySelector('.hero').offsetHeight;
        if (scrollY < heroH) {
          const offset = scrollY * 0.35;
          heroBgImg.style.transform = `scale(1.05) translateY(${offset}px)`;
        }
        ticking = false;
      });
      ticking = true;
    }
  }, { passive: true });
})();


/* ─────────────────────────────────────────
   9. MARQUEE PAUSE ON HOVER (already CSS,
      but also handle touch)
───────────────────────────────────────── */
(function initMarquee() {
  const track = document.getElementById('marqueeTrack');
  if (!track) return;

  track.addEventListener('touchstart', () => {
    track.style.animationPlayState = 'paused';
  }, { passive: true });
  track.addEventListener('touchend', () => {
    track.style.animationPlayState = 'running';
  }, { passive: true });
})();


/* ─────────────────────────────────────────
   10. SMOOTH ANCHOR LINKS (for any in-page)
───────────────────────────────────────── */
(function initSmoothAnchors() {
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', e => {
      const id  = link.getAttribute('href').slice(1);
      const target = document.getElementById(id);
      if (!target) return;
      e.preventDefault();
      const top = target.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });
})();


/* ─────────────────────────────────────────
   11. ACTIVE NAV HIGHLIGHTING ON SCROLL
───────────────────────────────────────── */
(function initActiveNav() {
  const sections  = document.querySelectorAll('section[id], div[id]');
  const navLinks  = document.querySelectorAll('.nav-item');
  if (!sections.length || !navLinks.length) return;

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') && link.getAttribute('href').includes(entry.target.id)) {
            link.classList.add('active');
          }
        });
      }
    });
  }, { threshold: 0.35 });

  sections.forEach(section => observer.observe(section));
})();


/* ─────────────────────────────────────────
   12. CARD IMAGE LAZY LOAD FADE-IN
───────────────────────────────────────── */
(function initImageFadeIn() {
  const imgs = document.querySelectorAll('.card-img img, .dist-img-wrap img');
  imgs.forEach(img => {
    img.style.opacity = '0';
    img.style.transition = 'opacity 0.5s ease';

    if (img.complete) {
      img.style.opacity = '';
    } else {
      img.addEventListener('load', () => {
        img.style.opacity = '';
      });
      img.addEventListener('error', () => {
        img.closest('.card-img') && (img.closest('.card-img').style.background = '#0f2030');
        img.style.opacity = '0';
      });
    }
  });
})();


/* ─────────────────────────────────────────
   13. CURSOR SPOTLIGHT ON HERO
───────────────────────────────────────── */
(function initHeroSpotlight() {
  const hero = document.querySelector('.hero');
  if (!hero) return;
  if (!window.matchMedia('(pointer: fine)').matches) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  // Create spotlight element
  const spotlight = document.createElement('div');
  spotlight.style.cssText = `
    position: absolute;
    pointer-events: none;
    z-index: 5;
    width: 500px;
    height: 500px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(13,158,110,0.07) 0%, transparent 70%);
    transform: translate(-50%, -50%);
    transition: opacity 0.4s;
    opacity: 0;
  `;
  hero.appendChild(spotlight);

  hero.addEventListener('mousemove', e => {
    const rect = hero.getBoundingClientRect();
    spotlight.style.left = (e.clientX - rect.left) + 'px';
    spotlight.style.top  = (e.clientY - rect.top)  + 'px';
    spotlight.style.opacity = '1';
  });

  hero.addEventListener('mouseleave', () => {
    spotlight.style.opacity = '0';
  });
})();


/* ─────────────────────────────────────────
   14. SCROLL PROGRESS BAR
───────────────────────────────────────── */
(function initScrollProgress() {
  const bar = document.createElement('div');
  bar.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    height: 2px;
    width: 0%;
    background: linear-gradient(90deg, #0d9e6e, #1e7ee8);
    z-index: 2000;
    transition: width 0.1s linear;
    pointer-events: none;
  `;
  document.body.appendChild(bar);

  let ticking = false;
  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
        bar.style.width = pct + '%';
        ticking = false;
      });
      ticking = true;
    }
  }, { passive: true });
})();


/* ─────────────────────────────────────────
   15. WHY CARDS STAGGER ON SCROLL
───────────────────────────────────────── */
(function initWhyCards() {
  const whyCards = document.querySelectorAll('.why-card');
  if (!whyCards.length) return;

  // Already handled by reveal + data-reveal-delay
  // Add extra stagger via CSS custom property if needed
  whyCards.forEach((card, i) => {
    if (!card.hasAttribute('data-reveal-delay')) {
      card.setAttribute('data-reveal-delay', i * 80);
    }
  });
})();


/* ─────────────────────────────────────────
   16. BACK TO TOP (on long scroll)
───────────────────────────────────────── */
(function initBackToTop() {
  const btn = document.createElement('button');
  btn.innerHTML = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="18 15 12 9 6 15"/></svg>`;
  btn.setAttribute('aria-label', 'Back to top');
  btn.style.cssText = `
    position: fixed;
    bottom: 32px;
    right: 32px;
    width: 44px;
    height: 44px;
    border-radius: 50%;
    background: rgba(11,24,41,0.9);
    border: 1.5px solid rgba(255,255,255,0.15);
    color: rgba(255,255,255,0.7);
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 900;
    opacity: 0;
    transform: translateY(12px);
    transition: opacity 0.3s, transform 0.3s, background 0.2s;
    backdrop-filter: blur(8px);
  `;
  document.body.appendChild(btn);

  let visible = false;
  let ticking  = false;

  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        const shouldShow = window.scrollY > 500;
        if (shouldShow !== visible) {
          visible = shouldShow;
          btn.style.opacity   = visible ? '1' : '0';
          btn.style.transform = visible ? 'translateY(0)' : 'translateY(12px)';
          btn.style.pointerEvents = visible ? 'auto' : 'none';
        }
        ticking = false;
      });
      ticking = true;
    }
  }, { passive: true });

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
  btn.addEventListener('mouseenter', () => {
    btn.style.background = 'rgba(13,158,110,0.9)';
    btn.style.borderColor = 'transparent';
    btn.style.color = '#fff';
  });
  btn.addEventListener('mouseleave', () => {
    btn.style.background = 'rgba(11,24,41,0.9)';
    btn.style.borderColor = 'rgba(255,255,255,0.15)';
    btn.style.color = 'rgba(255,255,255,0.7)';
  });
})();


/* ─────────────────────────────────────────
   17. KEYBOARD NAVIGATION ACCESSIBILITY
───────────────────────────────────────── */
(function initKeyboardA11y() {
  // Focus-visible polyfill approach: add class on keyboard nav
  document.addEventListener('keydown', e => {
    if (e.key === 'Tab') {
      document.body.classList.add('keyboard-nav');
    }
  });
  document.addEventListener('mousedown', () => {
    document.body.classList.remove('keyboard-nav');
  });

  // Add focus styles dynamically for keyboard nav
  const style = document.createElement('style');
  style.textContent = `
    .keyboard-nav *:focus {
      outline: 2px solid #12c48a !important;
      outline-offset: 3px !important;
    }
  `;
  document.head.appendChild(style);
})();


/* ─────────────────────────────────────────
   18. INIT LOG
───────────────────────────────────────── */
console.log('%cXCAD USA — Enhanced Site Loaded', 'color: #12c48a; font-weight: bold; font-size: 14px;');
