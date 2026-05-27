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

  // --- 2. THE RICH CANVAS RENDERING ENGINE (PREMIUM NEURAL NETWORK UPGRADE) ---
  if (canvas) {
    const ctx = canvas.getContext('2d');
    if (ctx) {
      let width = canvas.offsetWidth || window.innerWidth;
      let height = canvas.offsetHeight || window.innerHeight;

      // Setup sharp Retina display mapping
      const setupCanvasSize = () => {
        let canvasWidth = canvas.offsetWidth;
        let canvasHeight = canvas.offsetHeight;
        
        // Fallback to viewport if layout is uncomputed
        if (!canvasWidth || canvasWidth === 0) canvasWidth = window.innerWidth;
        if (!canvasHeight || canvasHeight === 0) canvasHeight = window.innerHeight;

        const dpr = window.devicePixelRatio || 1;
        canvas.width = canvasWidth * dpr;
        canvas.height = canvasHeight * dpr;
        ctx.scale(dpr, dpr);
        width = canvasWidth;
        height = canvasHeight;
        initParticleLayers();
      };

      // Configuration of counts depending on mobile vs desktop
      let bgCount = 50;
      let networkCount = 70;
      let fgCount = 12;
      let lineDistance = 120;
      let isMobile = false;

      const adjustDensity = () => {
        if (window.innerWidth < 768) {
          bgCount = 35;
          networkCount = 42;
          fgCount = 6;
          lineDistance = 95;
          isMobile = true;
        } else {
          bgCount = 75;
          networkCount = 120;
          fgCount = 20;
          lineDistance = 135;
          isMobile = false;
        }
      };

      // Particle Storage arrays
      let bgParticles = [];
      let netParticles = [];
      let fgParticles = [];

      const goldPaints = ['212, 175, 55', '243, 229, 171', '255, 228, 132', '197, 160, 43', '230, 194, 128'];
      const violetAccent = '139, 92, 246'; // Complementary luxury violet accent

      // Particle Layer Initializations
      const initParticleLayers = () => {
        adjustDensity();
        bgParticles = [];
        netParticles = [];
        fgParticles = [];

        // 1. Deep stars background
        for (let i = 0; i < bgCount; i++) {
          bgParticles.push({
            x: Math.random() * width,
            y: Math.random() * height,
            radius: Math.random() * 1.2 + 0.4,
            alpha: Math.random() * 0.35 + 0.15,
            speedY: Math.random() * -0.05 - 0.02,
            speedX: Math.random() * 0.04 - 0.02
          });
        }

        // 2. Main neural interactive network
        for (let i = 0; i < networkCount; i++) {
          let color = goldPaints[Math.floor(Math.random() * goldPaints.length)];

          const vx = Math.random() * 0.3 - 0.15;
          const vy = Math.random() * 0.3 - 0.15;

          netParticles.push({
            x: Math.random() * width,
            y: Math.random() * height,
            radius: Math.random() * 1.6 + 1.2,
            color: color,
            alpha: Math.random() * 0.4 + 0.4,
            vx: vx,
            vy: vy,
            baseVx: vx,
            baseVy: vy,
            angle: Math.random() * Math.PI * 2,
            angleSpeed: Math.random() * 0.01 + 0.005
          });
        }

        // 3. Foreground blurry lens-bokeh floaters
        for (let i = 0; i < fgCount; i++) {
          fgParticles.push({
            x: Math.random() * width,
            y: Math.random() * height,
            radius: Math.random() * 5.0 + 3.0,
            color: goldPaints[Math.floor(Math.random() * goldPaints.length)],
            alpha: Math.random() * 0.25 + 0.1,
            speedY: Math.random() * -0.4 - 0.15,
            speedX: Math.random() * 0.2 - 0.1,
            parallaxMultiplier: (Math.random() * 4.0 + 3.0) * 0.03
          });
        }
      };

      // Set initial dimensions
      setupCanvasSize();
      window.addEventListener('resize', setupCanvasSize);

      let smoothCamX = 0;
      let smoothCamY = 0;
      let rotationAngle = 0;

      const tick = (time) => {
        ctx.clearRect(0, 0, width, height);

        // Smooth camera dampings (LERP)
        smoothCamX += (mouse.targetX - smoothCamX) * 0.04;
        smoothCamY += (mouse.targetY - smoothCamY) * 0.04;

        // Apply scale transition to container element for depth illusion
        canvas.style.transform = `scale(1.04) translate3d(${-smoothCamX * 0.4}px, ${-smoothCamY * 0.4}px, 0)`;

        // Background Radial Ambient Gold Light (Cinematic)
        const radial2 = ctx.createRadialGradient(
          width * 0.65 - smoothCamX * 0.1,
          height * 0.4 - smoothCamY * 0.1,
          0,
          width * 0.65,
          height * 0.4,
          Math.max(width, height) * 0.32
        );
        radial2.addColorStop(0, 'rgba(212, 175, 55, 0.035)');
        radial2.addColorStop(0.5, 'rgba(243, 229, 171, 0.015)'); // Add warm champagne gold overlay core
        radial2.addColorStop(1, 'rgba(6, 6, 6, 0)');
        ctx.fillStyle = radial2;
        ctx.fillRect(0, 0, width, height);

        // Couture Blueprint Rings (Luxury marks)
        rotationAngle += 0.0006;
        const centerX = width * 0.65;
        const centerY = height * 0.5;

        ctx.strokeStyle = 'rgba(214, 175, 55, 0.06)';
        ctx.lineWidth = 1;
        ctx.shadowColor = 'rgba(212, 175, 55, 0.3)';
        ctx.shadowBlur = 10;

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
        ctx.strokeStyle = 'rgba(212, 175, 55, 0.03)';
        ctx.lineWidth = 1;
        ctx.setLineDash([]);
        ctx.beginPath();
        ctx.moveTo(width * 0.1, 0);
        ctx.lineTo(width * 0.1, height);
        ctx.moveTo(width * 0.9, 0);
        ctx.lineTo(width * 0.9, height);
        ctx.stroke();

        // 1. Render Layer 1: Background Stars
        bgParticles.forEach(p => {
          p.x += p.speedX;
          p.y += p.speedY;

          // Wrap boundaries
          if (p.y < 0) p.y = height;
          if (p.x < 0) p.x = width;
          if (p.x > width) p.x = 0;

          // Slide parallax shift
          const finalX = p.x - smoothCamX * 0.15;
          const finalY = p.y - smoothCamY * 0.15;

          ctx.beginPath();
          ctx.arc(finalX, finalY, p.radius, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255, 255, 255, ${p.alpha})`;
          ctx.fill();
        });

        // 2. Render Layer 2: Main Connected Neural Network
        netParticles.forEach(p => {
          p.angle += p.angleSpeed;
          const wave = Math.sin(p.angle) * 0.06;

          p.x += p.vx + wave;
          p.y += p.vy + wave;

          // Mouse spring interaction
          if (mouse.x > -500) {
            const dx = mouse.x - p.x;
            const dy = mouse.y - p.y;
            const dist = Math.hypot(dx, dy);

            if (dist < 160) {
              const force = (160 - dist) / 160;
              // Swirl and repel force
              const swirlX = -dy / dist;
              const swirlY = dx / dist;
              p.vx -= ((dx / dist) * 0.2 + swirlX * 0.15) * force;
              p.vy -= ((dy / dist) * 0.2 + swirlY * 0.15) * force;
            }
          }

          // Return velocity to normal base speeds
          p.vx += (p.baseVx - p.vx) * 0.03;
          p.vy += (p.baseVy - p.vy) * 0.03;

          // Boundary checks
          if (p.x < 0 || p.x > width) p.vx *= -1;
          if (p.y < 0 || p.y > height) p.vy *= -1;

          // Parallax camera adjustments
          const finalX = p.x - smoothCamX * 0.5;
          const finalY = p.y - smoothCamY * 0.5;

          ctx.beginPath();
          ctx.arc(finalX, finalY, p.radius, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${p.color}, ${p.alpha})`;
          ctx.shadowBlur = 8;
          ctx.shadowColor = `rgba(${p.color}, 0.65)`;
          ctx.fill();
          ctx.shadowBlur = 0; // Reset canvas shadow state
        });

        // Connect neural network lines
        if (!isMobile) {
          const len = netParticles.length;
          for (let i = 0; i < len; i++) {
            const p1 = netParticles[i];
            const fX1 = p1.x - smoothCamX * 0.5;
            const fY1 = p1.y - smoothCamY * 0.5;

            for (let j = i + 1; j < len; j++) {
              const p2 = netParticles[j];
              const fX2 = p2.x - smoothCamX * 0.5;
              const fY2 = p2.y - smoothCamY * 0.5;

              const dx = fX1 - fX2;
              const dy = fY1 - fY2;
              const dist = Math.hypot(dx, dy);

              if (dist < lineDistance) {
                const opacity = (1 - dist / lineDistance) * 0.38;
                ctx.beginPath();
                ctx.moveTo(fX1, fY1);
                ctx.lineTo(fX2, fY2);

                const grad = ctx.createLinearGradient(fX1, fY1, fX2, fY2);
                grad.addColorStop(0, `rgba(${p1.color}, ${opacity})`);
                grad.addColorStop(1, `rgba(${p2.color}, ${opacity})`);

                ctx.strokeStyle = grad;
                ctx.lineWidth = 0.95;
                ctx.stroke();
              }
            }
          }
        }

        // 3. Render Layer 3: Blurry Foreground Bokeh
        fgParticles.forEach(p => {
          p.x += p.speedX;
          p.y += p.speedY;

          // Wrap bounds
          if (p.y < -30) {
            p.y = height + 30;
            p.x = Math.random() * width;
          }
          if (p.x < -30 || p.x > width + 30) {
            p.x = Math.random() * width;
          }

          // Parallax camera adjustments
          const relativeX = (mouse.x - width / 2) * p.parallaxMultiplier * -0.04;
          const relativeY = (mouse.y - height / 2) * p.parallaxMultiplier * -0.04;

          const finalX = p.x - smoothCamX * 0.95 + relativeX;
          const finalY = p.y - smoothCamY * 0.95 + relativeY;

          ctx.save();
          ctx.beginPath();
          ctx.arc(finalX, finalY, p.radius, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${p.color}, ${p.alpha})`;
          ctx.shadowBlur = p.radius * 2.0;
          ctx.shadowColor = `rgba(${p.color}, 0.5)`;
          ctx.fill();
          ctx.restore();
        });

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
    }, 280);
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
