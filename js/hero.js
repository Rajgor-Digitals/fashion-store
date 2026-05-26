/**
 * ==========================================================================
 * NEW AKSHAT FASHION - HERO ARCHITECTURE AND SOUND SYNTHESIS
 * Handles Canvas particle engine, cursor parallax, slider slides, Web Audio pads
 * ==========================================================================
 */

const CAMPAIGNS = [
  {
    id: "01",
    label: "ATELIER COUTURE - ESSENTIALS",
    titleLine1: "NEW AKSHAT",
    titleLine2: "FASHION",
    titleFontClass1: "font-serif camp-size-large1",
    titleFontClass2: "font-serif-royal camp-size-large2 italic",
    quotes: ["\u201cWe Believe In Quality\u201d"],
    desc: "Welcome to a masterfully curated sanctuary where handpicked premium textiles meet state-of-the-art tailoring. Crafted for the modern wardrobe that values absolute aesthetic excellence.",
    ctaPrimary: "Explore Collection",
    ctaPrimaryLink: "collection.html",
    ctaSecondary: "Visit Showroom",
    ctaSecondaryLink: "#visit"
  },
  {
    id: "02",
    label: "THE SIGNATURE SERIES",
    titleLine1: "STYLE BEYOND",
    titleLine2: "TRENDS",
    titleFontClass1: "font-royal-caps-span1 camp-size-medium1",
    titleFontClass2: "font-royal-caps-span2 camp-size-medium2",
    quotes: ["\u201cWhere Style Meets Fashion\u201d"],
    desc: "Every silhouette, every curve, and every dynamic seam reflects twelve years of unmatched local trust. Designed for taste makers who understand the delicate pedigree of fine materials.",
    ctaPrimary: "Discover Bespoke",
    ctaPrimaryLink: "collection.html",
    ctaSecondary: "Book Consult",
    ctaSecondaryLink: "#visit"
  },
  {
    id: "03",
    label: "FAMILY FASHION - ATELIER",
    titleLine1: "ALL FAMILY",
    titleLine2: "FEELS PREMIUM",
    titleFontClass1: "font-royal-caps-span1 camp-size-medium1",
    titleFontClass2: "font-royal-caps-span2 camp-size-medium2",
    quotes: ["\u201cFashion that feels premium.\u201d"],
    desc: "Uncompromised tactile comfort. Our physical showroom delivers expert design advice, customizable silhouettes, premium luxury consultations, and the comfort of excellence.",
    ctaPrimary: "Book Appoint",
    ctaPrimaryLink: "#visit",
    ctaSecondary: "Our Atelier",
    ctaSecondaryLink: "about.html"
  }
    titleFontClass1: "font-royal-caps-span1 camp-size-medium1",
    titleFontClass2: "font-royal-caps-span2 camp-size-medium2",
    quotes: ["\u201cFashion that feels premium.\u201d"],
    desc: "Uncompromised tactile comfort. Our physical showroom delivers expert design advice, customizable silhouettes, premium luxury consultations, and the comfort of excellence.",
    ctaPrimary: "Book Appoint",
    ctaPrimaryLink: "#visit",
    ctaSecondary: "Our Atelier",
    ctaSecondaryLink: "about.html"
  }
];

document.addEventListener('DOMContentLoaded', () => {
  const heroSection = document.getElementById('hero');
  if (!heroSection) return;

  // --- STATE REGISTRY ---
  let currentCampaignIndex = 0;
  let autoplayActive = true;
  let mouse = { x: -1000, y: -1000, targetX: 0, targetY: 0 };
  let autoplayTimer = null;

  // --- DOM NODES ---
  const slideLabel = document.getElementById('slide-label');
  const slideTitle1 = document.getElementById('slide-title-1');
  const slideTitle2 = document.getElementById('slide-title-2');
  const slideQuote1 = document.getElementById('slide-quote-1');
  const slideQuoteBox = document.getElementById('slide-quote-box');
  const slideDesc = document.getElementById('slide-desc');
  const slideCtaPrimary = document.getElementById('slide-cta-primary');
  const slideCtaSecondary = document.getElementById('slide-cta-secondary');
  
  const labelSlideNum = document.getElementById('label-slide-num');
  const progressBarFill = document.getElementById('progress-bar-fill');
  const autoplayText = document.getElementById('autoplay-status-text');

  const btnPrev = document.getElementById('btn-prev');
  const btnNext = document.getElementById('btn-next');
  const canvas = document.getElementById('hero-canvas');

  // --- 1. MOUSE INTERACTION SHIFTER ---
  heroSection.addEventListener('mousemove', (e) => {
    const rect = heroSection.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const targetX = ((e.clientX / window.innerWidth) - 0.5) * 30;
    const targetY = ((e.clientY / window.innerHeight) - 0.5) * 30;

    mouse = { x, y, targetX, targetY };
  });

  heroSection.addEventListener('mouseleave', () => {
    mouse = { x: -1000, y: -1000, targetX: 0, targetY: 0 };
  });

  // --- 2. THE RICH CANVAS RENDERING ENGINE ---
  if (canvas) {
    const ctx = canvas.getContext('2d');
    if (ctx) {
      let width = (canvas.width = canvas.offsetWidth);
      let height = (canvas.height = canvas.offsetHeight);

      const handleResize = () => {
        width = canvas.width = canvas.offsetWidth;
        height = canvas.height = canvas.offsetHeight;
      };
      window.addEventListener('resize', handleResize);

      // Particulate definitions
      const dustCount = 85;
      const particles = [];
      const goldPaints = ['#D4AF37', '#F3E5AB', '#FFE484', '#C5A02B', '#E6C280'];

      for (let i = 0; i < dustCount; i++) {
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          z: Math.random() * 0.8 + 0.2,
          radius: Math.random() * 1.5 + 0.3,
          color: goldPaints[Math.floor(Math.random() * goldPaints.length)],
          speed: Math.random() * 0.2 + 0.05,
          amplitude: Math.random() * 30 + 10,
          phase: Math.random() * Math.PI * 2,
          opacity: Math.random() * 0.4 + 0.1
        });
      }

      let smoothCamX = 0;
      let smoothCamY = 0;
      let rotationAngle = 0;

      const tick = (time) => {
        ctx.clearRect(0, 0, width, height);

        // Smooth camera dampings
        smoothCamX += (mouse.targetX - smoothCamX) * 0.04;
        smoothCamY += (mouse.targetY - smoothCamY) * 0.04;

        // Apply scale transition to container element
        canvas.style.transform = `scale(1.04) translate3d(${-smoothCamX * 0.4}px, ${-smoothCamY * 0.4}px, 0)`;

        // Background Gold Light
        const radial2 = ctx.createRadialGradient(
          width * 0.65 - smoothCamX * 0.1,
          height * 0.4 - smoothCamY * 0.1,
          0,
          width * 0.65,
          height * 0.4,
          Math.max(width, height) * 0.32
        );
        radial2.addColorStop(0, 'rgba(212, 175, 55, 0.025)');
        radial2.addColorStop(1, 'rgba(212, 175, 55, 0)');
        ctx.fillStyle = radial2;
        ctx.fillRect(0, 0, width, height);

        // Couture Blueprint Rings
        rotationAngle += 0.0007;
        const centerX = width * 0.65;
        const centerY = height * 0.5;

        ctx.strokeStyle = 'rgba(214, 175, 55, 0.055)';
        ctx.lineWidth = 1;
        ctx.shadowColor = 'rgba(212, 175, 55, 0.4)';
        ctx.shadowBlur = 12;

        ctx.save();
        ctx.translate(centerX - smoothCamX * 0.2, centerY - smoothCamY * 0.2);
        ctx.rotate(rotationAngle);
        ctx.beginPath();
        ctx.setLineDash([2, 25]);
        ctx.arc(0, 0, 180, 0, Math.PI * 2);
        ctx.stroke();
        ctx.restore();

        ctx.save();
        ctx.translate(centerX - smoothCamX * 0.15, centerY - smoothCamY * 0.15);
        ctx.rotate(-rotationAngle * 0.5);
        ctx.beginPath();
        ctx.setLineDash([4, 40]);
        ctx.arc(0, 0, 280, 0, Math.PI * 2);
        ctx.stroke();
        ctx.restore();

        ctx.shadowBlur = 0;

        // Architectural Grid Boundaries
        ctx.strokeStyle = 'rgba(212, 175, 55, 0.025)';
        ctx.lineWidth = 1;
        ctx.setLineDash([]);
        ctx.beginPath();
        ctx.moveTo(width * 0.1, 0);
        ctx.lineTo(width * 0.1, height);
        ctx.moveTo(width * 0.9, 0);
        ctx.lineTo(width * 0.9, height);
        ctx.stroke();

        // Weaving Wave Paths
        const weaveCount = 3;
        for (let w = 0; w < weaveCount; w++) {
          ctx.beginPath();
          ctx.strokeStyle = `rgba(214, 175, 55, ${0.015 - w * 0.003})`;
          ctx.lineWidth = 1.5;

          for (let x = 0; x < width; x += 15) {
            const sinVal = (x * 0.002) + (time * 0.0003) + (w * 2.5);
            const cosVal = (x * 0.004) - (time * 0.0001) + (w * 1.2);
            const yOffset = Math.sin(sinVal) * 110 + Math.cos(cosVal) * 45;
            const finalY = height * 0.45 + yOffset - (smoothCamY * (0.1 + w * 0.05));

            if (x === 0) {
              ctx.moveTo(x, finalY);
            } else {
              ctx.lineTo(x, finalY);
            }
          }
          ctx.stroke();
        }

        // Shimmering Gold Dust
        particles.forEach(p => {
          p.y -= p.speed * p.z;
          p.phase += 0.008;
          const oX = Math.sin(p.phase) * p.amplitude * 0.08;

          if (p.y < -30) {
            p.y = height + 30;
            p.x = Math.random() * width;
          }

          let pullX = 0;
          let pullY = 0;
          if (mouse.x > 0 && mouse.y > 0) {
            const dx = mouse.x - (p.x + oX);
            const dy = mouse.y - p.y;
            const dist = Math.hypot(dx, dy);

            if (dist < 280) {
              const force = (280 - dist) / 280;
              const swirlX = -dy / dist;
              const swirlY = dx / dist;
              pullX = ((dx / dist) * 0.45 + swirlX * 0.55) * force * p.z * 22;
              pullY = ((dy / dist) * 0.45 + swirlY * 0.55) * force * p.z * 22;
            }
          }

          const finalX = p.x + oX - smoothCamX * p.z * 0.6 + pullX;
          const finalY = p.y - smoothCamY * p.z * 0.6 + pullY;

          if (finalX >= 0 && finalX <= width && finalY >= 0 && finalY <= height) {
            const shimmer = 0.4 + Math.sin(time * 0.003 + p.phase) * 0.6;
            ctx.fillStyle = p.color;
            ctx.globalAlpha = p.opacity * p.z * shimmer;
            ctx.beginPath();
            ctx.arc(finalX, finalY, p.radius * p.z, 0, Math.PI * 2);
            ctx.fill();
          }
        });

        ctx.globalAlpha = 1;
        requestAnimationFrame(tick);
      };
      
      requestAnimationFrame(tick);
    }
  }

  // --- 3. THE CAMPAIGN CAROUSEL ENGINE ---
  const applyCampaignData = (index) => {
    const camp = CAMPAIGNS[index];
    
    const activeSpread = document.querySelector('.campaign-slide.active');
    if (activeSpread) {
      activeSpread.classList.remove('active');
    }

    setTimeout(() => {
      slideLabel.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-compass animate-spin-slow"><circle cx="12" cy="12" r="10"/><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"/></svg>
        ${camp.label}
      `;

      slideTitle1.className = camp.titleFontClass1;
      slideTitle1.textContent = camp.titleLine1;

      slideTitle2.className = camp.titleFontClass2;
      slideTitle2.textContent = camp.titleLine2;

      if (camp.quotes && camp.quotes.length > 0) {
        slideQuoteBox.style.display = 'block';
        slideQuote1.textContent = camp.quotes[0];
      } else {
        slideQuoteBox.style.display = 'none';
      }

      slideDesc.textContent = camp.desc;

      slideCtaPrimary.textContent = camp.ctaPrimary;
      slideCtaPrimary.parentNode.setAttribute('href', camp.ctaPrimaryLink);

      slideCtaSecondary.textContent = camp.ctaSecondary;
      slideCtaSecondary.parentNode.setAttribute('href', camp.ctaSecondaryLink);

      labelSlideNum.textContent = camp.id;

      const containerSpread = document.querySelector('.campaign-slide');
      if (containerSpread) {
        containerSpread.classList.add('active');
      }

      resetTimelineProgressBar();
    }, 400);
  };

  const resetTimelineProgressBar = () => {
    progressBarFill.classList.remove('running');
    void progressBarFill.offsetWidth;
    if (autoplayActive) {
      progressBarFill.classList.add('running');
    }
  };

  const handleNext = () => {
    currentCampaignIndex = (currentCampaignIndex + 1) % CAMPAIGNS.length;
    applyCampaignData(currentCampaignIndex);
  };

  const handlePrev = () => {
    currentCampaignIndex = (currentCampaignIndex - 1 + CAMPAIGNS.length) % CAMPAIGNS.length;
    applyCampaignData(currentCampaignIndex);
  };

  const toggleAutoplay = () => {
    autoplayActive = !autoplayActive;
    if (autoplayActive) {
      autoplayText.textContent = 'AUTOPLAY: ON';
      resetTimelineProgressBar();
      startAutoplayTimer();
    } else {
      autoplayText.textContent = 'AUTOPLAY: OFF';
      progressBarFill.classList.remove('running');
      if (autoplayTimer) {
        clearInterval(autoplayTimer);
      }
    }
  };

  const startAutoplayTimer = () => {
    if (autoplayTimer) clearInterval(autoplayTimer);
    autoplayTimer = setInterval(() => {
      if (autoplayActive) {
        handleNext();
      }
    }, 9500);
  };

  btnPrev.addEventListener('click', () => {
    autoplayActive = false;
    autoplayText.textContent = 'AUTOPLAY: OFF';
    progressBarFill.classList.remove('running');
    if (autoplayTimer) clearInterval(autoplayTimer);
    handlePrev();
  });

  btnNext.addEventListener('click', () => {
    autoplayActive = false;
    autoplayText.textContent = 'AUTOPLAY: OFF';
    progressBarFill.classList.remove('running');
    if (autoplayTimer) clearInterval(autoplayTimer);
    handleNext();
  });

  const toggleStatus = document.getElementById('autoplay-toggle');
  if (toggleStatus) {
    toggleStatus.addEventListener('click', toggleAutoplay);
  }

  applyCampaignData(0);
  startAutoplayTimer();

});
