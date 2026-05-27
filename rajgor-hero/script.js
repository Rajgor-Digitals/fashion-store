/**
 * Rajgor Digitals — Futuristic Animated Hero Background Engine
 * Highly optimized, 3D layered parallax particle canvas, with mouse inertia tracking
 * and real-time telemetry HUD updates.
 */

(function () {
  'use strict';

  // --- 1. DOM REFERENCES & STATE SETUP ---
  const canvas = document.getElementById('hero-canvas');
  const ctx = canvas.getContext('2d');
  
  const cursorGlow = document.getElementById('js-cursor-glow');
  const fpsCounter = document.getElementById('js-fps-counter');
  const activeNodesIndicator = document.getElementById('js-active-nodes');
  const densityIndicator = document.getElementById('js-density-indicator');
  const progressHud = document.getElementById('js-progress-hud');

  // Interactive mouse tracking state with inertia
  const mouse = {
    x: null,
    y: null,
    targetX: null,
    targetY: null,
    active: false,
    radius: 180, // Area of particle interaction
    inertia: 0.08 // Easing multiplier (lower = smoother/slower cursor follow)
  };

  // Performance monitoring variables
  let lastTime = performance.now();
  let frameCount = 0;
  let fps = 60;
  let hudProgressValue = 0;
  let hudProgressDirection = 1;

  // Particle storage lists
  let bgParticles = [];      // Layer 1: Background stars (small, static, deep Z)
  let networkParticles = []; // Layer 2: Connecting network (medium, reactive, interactive lines)
  let fgParticles = [];      // Layer 3: Blurry bokeh floaters (large, close, fast parallax)

  // Configuration options depending on screen size
  let config = {
    bgCount: 60,
    networkCount: 85,
    fgCount: 15,
    lineDistance: 115,
    mobile: false
  };

  // --- 2. DYNAMIC INTENSITY CONFIGURATION ---
  function adjustDensityConfig() {
    const width = window.innerWidth;
    
    if (width < 768) {
      // Mobile optimizations (Lightweight to prevent heating/lag)
      config.bgCount = 20;
      config.networkCount = 22;
      config.fgCount = 4;
      config.lineDistance = 85;
      config.mobile = true;
      if (densityIndicator) densityIndicator.textContent = "LOW (MOBILE_MODIFIED)";
    } else if (width < 1024) {
      // Tablet configurations
      config.bgCount = 40;
      config.networkCount = 50;
      config.fgCount = 8;
      config.lineDistance = 100;
      config.mobile = false;
      if (densityIndicator) densityIndicator.textContent = "BALANCED (TABLET_MODIFIED)";
    } else {
      // High-end Desktop setups
      config.bgCount = 75;
      config.networkCount = 95;
      config.fgCount = 18;
      config.lineDistance = 125;
      config.mobile = false;
      if (densityIndicator) densityIndicator.textContent = "OPTIMAL (DESKTOP_HD)";
    }

    if (activeNodesIndicator) {
      activeNodesIndicator.textContent = (config.bgCount + config.networkCount + config.fgCount).toString();
    }
  }

  // --- 3. DYNAMIC CANVAS RESIZING (RETINA SHARP) ---
  function resizeCanvas() {
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    
    // Scale canvas context to handle retina/4K resolution mapping automatically
    ctx.scale(dpr, dpr);
    
    // Readjust count limits on resize
    adjustDensityConfig();
    
    // Reinitialize particles to fill the new canvas dimensions
    initParticles();
  }

  // Helper: Generates random integers/floats in range
  function randomRange(min, max) {
    return Math.random() * (max - min) + min;
  }

  // --- 4. PARTICLE CONSTRUCTORS ---

  // Layer 1: Background Star Particle
  class BackgroundParticle {
    constructor(w, h) {
      this.reset(w, h);
      this.x = randomRange(0, w);
      this.y = randomRange(0, h);
    }

    reset(w, h) {
      this.x = randomRange(0, w);
      this.y = this.y ? 0 : randomRange(0, h); // Spawn at top if resetting
      this.radius = randomRange(0.4, 1.2);
      this.alpha = randomRange(0.1, 0.45);
      this.speedY = randomRange(-0.02, -0.09); // Float upwards very slowly
      this.speedX = randomRange(-0.03, 0.03);
    }

    update(w, h) {
      this.x += this.speedX;
      this.y += this.speedY;

      // Wrap boundaries or reset
      if (this.y < 0 || this.x < 0 || this.x > w) {
        this.reset(w, h);
        this.y = h;
      }
    }

    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255, 255, 255, ${this.alpha})`;
      ctx.fill();
    }
  }

  // Layer 2: Main Connected Neural Network Particle
  class NetworkParticle {
    constructor(w, h) {
      this.reset(w, h);
      this.x = randomRange(0, w);
      this.y = randomRange(0, h);
    }

    reset(w, h) {
      this.x = randomRange(0, w);
      this.y = randomRange(0, h);
      this.radius = randomRange(1.2, 2.5);
      
      // Assign subtle glows: cyan or violet
      const colorSeed = Math.random();
      if (colorSeed < 0.45) {
        this.color = '34, 211, 238'; // Cyan accent
      } else if (colorSeed < 0.9) {
        this.color = '139, 92, 246'; // Violet accent
      } else {
        this.color = '251, 191, 36'; // Amber highlight
      }

      this.alpha = randomRange(0.3, 0.7);
      
      // Slow elegant initial speeds
      this.vx = randomRange(-0.15, 0.15);
      this.vy = randomRange(-0.15, 0.15);
      
      // Restoring force coordinates (to return back to original vector floating)
      this.baseVx = this.vx;
      this.baseVy = this.vy;
      
      // Floating wave offset for natural float paths
      this.angle = randomRange(0, Math.PI * 2);
      this.angleSpeed = randomRange(0.005, 0.015);
    }

    update(w, h) {
      // 1. Natural floating wave mechanics
      this.angle += this.angleSpeed;
      const waveOffset = Math.sin(this.angle) * 0.05;

      this.x += this.vx + waveOffset;
      this.y += this.vy + waveOffset;

      // 2. Interactive Mouse Repulsion Force with Easing
      if (mouse.active && mouse.x !== null) {
        const dx = this.x - mouse.x;
        const dy = this.y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < mouse.radius) {
          // Calculate force scaling exponentially with proximity
          const force = (mouse.radius - dist) / mouse.radius;
          const forceDirX = dx / dist;
          const forceDirY = dy / dist;
          
          // Gently push particle away
          const acceleration = force * 0.4;
          this.vx += forceDirX * acceleration;
          this.vy += forceDirY * acceleration;
          
          // Clamp velocity to avoid chaotic shooting off
          const maxSpeed = 1.8;
          const speed = Math.sqrt(this.vx * this.vx + this.vy * this.vy);
          if (speed > maxSpeed) {
            this.vx = (this.vx / speed) * maxSpeed;
            this.vy = (this.vy / speed) * maxSpeed;
          }
        }
      }

      // 3. Inertial damping to slowly return velocities back to base floating speeds
      this.vx += (this.baseVx - this.vx) * 0.03;
      this.vy += (this.baseVy - this.vy) * 0.03;

      // Screen boundary bouncing
      if (this.x < 0 || this.x > w) {
        this.vx *= -1;
        this.baseVx *= -1;
        this.x = Math.max(0, Math.min(this.x, w));
      }
      if (this.y < 0 || this.y > h) {
        this.vy *= -1;
        this.baseVy *= -1;
        this.y = Math.max(0, Math.min(this.y, h));
      }
    }

    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${this.color}, ${this.alpha})`;
      ctx.shadowBlur = this.radius * 2.5;
      ctx.shadowColor = `rgba(${this.color}, 0.8)`;
      ctx.fill();
      
      // Reset canvas shadow filter to prevent performance degradation
      ctx.shadowBlur = 0;
    }
  }

  // Layer 3: Foreground Large Blurry Bokeh Particle (Creates Parallax/Depth of Field)
  class ForegroundParticle {
    constructor(w, h) {
      this.reset(w, h);
      this.x = randomRange(0, w);
      this.y = randomRange(0, h);
    }

    reset(w, h) {
      this.x = randomRange(0, w);
      this.y = randomRange(0, h);
      // Large dimensions to represent close proximity to camera
      this.radius = randomRange(3.5, 9.0);
      this.alpha = randomRange(0.08, 0.28);
      
      // Cyan-violet primary themes
      this.color = Math.random() > 0.5 ? '34, 211, 238' : '139, 92, 246';
      
      // Faster speeds simulating moving closer
      this.speedX = randomRange(-0.3, 0.3);
      this.speedY = randomRange(-0.25, -0.65); // Move upwards faster
      
      // Parallax coordinate factor
      this.parallaxMultiplier = this.radius * 0.035;
    }

    update(w, h) {
      // Natural float
      this.x += this.speedX;
      this.y += this.speedY;

      // Mouse Parallax drift: Move particles slightly away from cursor relative to size
      if (mouse.active && mouse.x !== null) {
        const relativeX = (mouse.x - w / 2) * this.parallaxMultiplier * -0.05;
        const relativeY = (mouse.y - h / 2) * this.parallaxMultiplier * -0.05;
        
        // Add subtle translation offset
        this.x += (relativeX - (this.offsetX || 0)) * 0.05;
        this.y += (relativeY - (this.offsetY || 0)) * 0.05;
        
        this.offsetX = relativeX;
        this.offsetY = relativeY;
      }

      // Reset when floating out of top screen
      if (this.y < -50) {
        this.reset(w, h);
        this.y = h + 20;
      }
      if (this.x < -50 || this.x > w + 50) {
        this.reset(w, h);
      }
    }

    draw() {
      // Simulate physical Camera Lens Blur (Bokeh)
      ctx.save();
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${this.color}, ${this.alpha})`;
      
      // Combine soft drop shadow and overlapping fills to render pristine cinematic circular blur
      ctx.shadowBlur = this.radius * 2.2;
      ctx.shadowColor = `rgba(${this.color}, 0.55)`;
      ctx.fill();
      ctx.restore();
    }
  }

  // --- 5. INITIALIZATION ENGINE ---
  function initParticles() {
    const w = canvas.getBoundingClientRect().width;
    const h = canvas.getBoundingClientRect().height;

    bgParticles = [];
    networkParticles = [];
    fgParticles = [];

    // 1. Populate Layer 1 (Stars background)
    for (let i = 0; i < config.bgCount; i++) {
      bgParticles.push(new BackgroundParticle(w, h));
    }

    // 2. Populate Layer 2 (Interactive Connections)
    for (let i = 0; i < config.networkCount; i++) {
      networkParticles.push(new NetworkParticle(w, h));
    }

    // 3. Populate Layer 3 (Blurry Bokeh Foreground)
    for (let i = 0; i < config.fgCount; i++) {
      fgParticles.push(new ForegroundParticle(w, h));
    }
  }

  // --- 6. CORE DRAW & LINE CONNECTOR ROUTINE ---
  function drawConnections() {
    // Avoid drawing connections on mobile to preserve processing bandwidth
    if (config.mobile) return;

    const threshold = config.lineDistance;
    const len = networkParticles.length;

    for (let i = 0; i < len; i++) {
      const p1 = networkParticles[i];

      for (let j = i + 1; j < len; j++) {
        const p2 = networkParticles[j];
        
        const dx = p1.x - p2.x;
        const dy = p1.y - p2.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < threshold) {
          // Proximity opacity scaling (closer = brighter, max 0.25 opacity)
          const opacity = (1 - dist / threshold) * 0.22;
          
          ctx.beginPath();
          ctx.moveTo(p1.x, p1.y);
          ctx.lineTo(p2.x, p2.y);
          
          // Beautiful gradient connecting lines using color themes of the two endpoints
          const lineGrad = ctx.createLinearGradient(p1.x, p1.y, p2.x, p2.y);
          lineGrad.addColorStop(0, `rgba(${p1.color}, ${opacity})`);
          lineGrad.addColorStop(1, `rgba(${p2.color}, ${opacity})`);
          
          ctx.strokeStyle = lineGrad;
          ctx.lineWidth = 0.8;
          ctx.stroke();
        }
      }
    }
  }

  // --- 7. MAIN RENDER LOOP (requestAnimationFrame) ---
  function render(time) {
    const w = canvas.getBoundingClientRect().width;
    const h = canvas.getBoundingClientRect().height;

    // Clear Canvas and retain slight dark ambient opacity mapping
    ctx.clearRect(0, 0, w, h);

    // Calculate real-time FPS
    frameCount++;
    const delta = time - lastTime;
    if (delta >= 1000) {
      fps = Math.round((frameCount * 1000) / delta);
      frameCount = 0;
      lastTime = time;
      
      // Update visual indicator
      if (fpsCounter) {
        fpsCounter.textContent = `${fps} FPS`;
        // Color shifts in status depending on engine load
        if (fps < 45) {
          fpsCounter.className = 'widget-metric neon-amber';
        } else {
          fpsCounter.className = 'widget-metric neon-cyan';
        }
      }
    }

    // 1. Process custom cursor glow tracking with smooth inertia lag
    if (mouse.active && mouse.targetX !== null) {
      if (mouse.x === null) {
        mouse.x = mouse.targetX;
        mouse.y = mouse.targetY;
      } else {
        mouse.x += (mouse.targetX - mouse.x) * mouse.inertia;
        mouse.y += (mouse.targetY - mouse.y) * mouse.inertia;
      }
      
      if (cursorGlow) {
        cursorGlow.style.transform = `translate3d(${mouse.x}px, ${mouse.y}px, 0)`;
        cursorGlow.style.opacity = '1';
      }
    } else {
      if (cursorGlow) {
        cursorGlow.style.opacity = '0';
      }
    }

    // 2. Render Layer 1: Background Stars
    for (let i = 0; i < bgParticles.length; i++) {
      const p = bgParticles[i];
      p.update(w, h);
      p.draw();
    }

    // 3. Render Layer 2: Network & Connections
    for (let i = 0; i < networkParticles.length; i++) {
      const p = networkParticles[i];
      p.update(w, h);
      p.draw();
    }
    drawConnections();

    // 4. Render Layer 3: Foreground Bokeh
    for (let i = 0; i < fgParticles.length; i++) {
      const p = fgParticles[i];
      p.update(w, h);
      p.draw();
    }

    // 5. Update Telemetry HUD components (Pulsating telemetry bar)
    hudProgressValue += 0.5 * hudProgressDirection;
    if (hudProgressValue >= 100 || hudProgressValue <= 0) {
      hudProgressDirection *= -1; // Bounce progression
    }
    if (progressHud) {
      progressHud.style.width = `${hudProgressValue}%`;
    }

    // Recursively call next frame
    requestAnimationFrame(render);
  }

  // --- 8. MOUSE & TOUCH EVENT LISTENERS ---
  function setupInteractionListeners() {
    // Mouse movements
    window.addEventListener('mousemove', (e) => {
      mouse.active = true;
      mouse.targetX = e.clientX;
      mouse.targetY = e.clientY;
    });

    // Handle mouse leaving window
    document.addEventListener('mouseleave', () => {
      mouse.active = false;
      mouse.targetX = null;
      mouse.targetY = null;
    });

    // Touch device support (Generates single tap points)
    window.addEventListener('touchmove', (e) => {
      if (e.touches.length > 0) {
        mouse.active = true;
        mouse.targetX = e.touches[0].clientX;
        mouse.targetY = e.touches[0].clientY;
      }
    }, { passive: true });

    window.addEventListener('touchend', () => {
      mouse.active = false;
      mouse.targetX = null;
      mouse.targetY = null;
    });
  }

  // --- 9. LAUNCH SEQUENCING ---
  function initializeEngine() {
    // 1. Set initial configurations
    adjustDensityConfig();
    
    // 2. Setup screen coordinates
    resizeCanvas();
    
    // 3. Attach interactive events
    setupInteractionListeners();
    
    // 4. Handle page resizes perfectly
    let resizeTimeout;
    window.addEventListener('resize', () => {
      // Throttle window resize actions to prevent frame stutter
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        resizeCanvas();
      }, 150);
    });

    // 5. Fire core rendering loop
    requestAnimationFrame(render);

    // 6. Smooth scroll transitions for buttons
    setupSmoothScroll();
  }

  function setupSmoothScroll() {
    const anchors = document.querySelectorAll('a[href^="#"]');
    anchors.forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
          targetElement.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      });
    });
  }

  // Trigger engine boot when DOM is loaded
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeEngine);
  } else {
    initializeEngine();
  }

})();
