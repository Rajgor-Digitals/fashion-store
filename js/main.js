/**
 * ==========================================================================
 * NEW AKSHAT FASHION - MAIN WEB APP SCRIPTS
 * Handles scroll reveal intersection effects and dynamic helpers
 * ==========================================================================
 */

document.addEventListener('DOMContentLoaded', () => {
  // --- 0. PRELOADER INTEGRATION ---
  const preloader = document.getElementById('preloader');
  if (preloader) {
    const fillEl    = document.getElementById('pl-fill');
    const pctEl     = document.getElementById('pl-percent');
    const statusEl  = document.getElementById('pl-status');
    let   current   = 0;
    let   rafId     = null;
    let   exited    = false;

    const statusLabels = [
      [0,  'Preparing'],
      [30, 'Loading Assets'],
      [60, 'Crafting Experience'],
      [85, 'Almost Ready'],
      [99, 'Welcome'],
    ];

    const getStatus = (pct) => {
      let label = 'Preparing';
      for (const [threshold, text] of statusLabels) {
        if (pct >= threshold) label = text;
      }
      return label;
    };

    const animateProgress = (target) => {
      if (rafId) cancelAnimationFrame(rafId);
      const step = () => {
        if (current < target) {
          // Very small increments — let the CSS transition do the easing
          const increment = Math.max(1, Math.ceil((target - current) * 0.03));
          current = Math.min(current + increment, target);
          if (fillEl) {
            fillEl.style.width = `${current}%`;
            if (current > 2) fillEl.classList.add('has-progress');
          }
          if (pctEl)    pctEl.textContent    = `${current}%`;
          if (statusEl) statusEl.textContent = getStatus(current);
          if (current < target) rafId = requestAnimationFrame(step);
        }
      };
      rafId = requestAnimationFrame(step);
    };

    // Exit: flash → fade
    const exitPreloader = () => {
      if (exited) return;
      exited = true;

      animateProgress(100);

      setTimeout(() => {
        preloader.classList.add('pl-exit');
        setTimeout(() => preloader.remove(), 1100);
      }, 350);
    };

    // Organic progress — small stages spread across the full display window
    // so the bar crawls visibly rather than jumping
    setTimeout(() => animateProgress(12),  300);   // initial tick
    setTimeout(() => animateProgress(25),  700);   // fonts loading
    setTimeout(() => animateProgress(40),  1100);  // CSS ready
    setTimeout(() => animateProgress(55),  1600);  // DOM parsed
    setTimeout(() => animateProgress(70),  2100);  // images queued
    setTimeout(() => animateProgress(82),  2600);  // scripts loaded
    setTimeout(() => animateProgress(91),  3000);  // almost there
    setTimeout(() => animateProgress(96),  3200);  // final stretch

    // Minimum display time — full sequence takes ~3s
    const minDisplayTime = 3400;
    const startTime = Date.now();

    const tryExit = () => {
      const elapsed   = Date.now() - startTime;
      const remaining = Math.max(0, minDisplayTime - elapsed);
      setTimeout(exitPreloader, remaining);
    };

    if (document.readyState === 'complete') {
      tryExit();
    } else {
      window.addEventListener('load', tryExit, { once: true });
    }

    // Hard fallback
    setTimeout(exitPreloader, 5800);
  }

  // --- 1. SCROLL REVEAL INTERSECTION OBSERVER ---
  const reveals = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && reveals.length > 0) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry, idx) => {
        if (entry.isIntersecting) {
          // Subtle stagger effect if multiple trigger simultaneously
          setTimeout(() => {
            entry.target.classList.add('active');
          }, idx * 100);
          
          // Once animated, we don't need to track it anymore
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.12,
      rootMargin: '0px 0px -50px 0px'
    });

    reveals.forEach(el => revealObserver.observe(el));
  } else {
    // Fallback if IntersectionObserver is not supported
    reveals.forEach(el => el.classList.add('active'));
  }
});
