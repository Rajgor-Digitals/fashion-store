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
    const fadeOutPreloader = () => {
      if (!preloader.classList.contains('loaded')) {
        preloader.classList.add('loaded');
        setTimeout(() => {
          preloader.remove();
        }, 800);
      }
    };

    // Snappy fadeout after a brief aesthetic delay to show timeline fill
    setTimeout(fadeOutPreloader, 450);

    // Backup triggers
    window.addEventListener('load', fadeOutPreloader);
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
