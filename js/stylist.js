/**
 * ==========================================================================
 * NEW AKSHAT FASHION - AI STYLING REPORT UTILS
 * Hooks selector events and targets Google Generative AI REST endpoints directly.
 * Features typewriter rendering and copy/share social functionalities.
 * ==========================================================================
 */

document.addEventListener('DOMContentLoaded', () => {
  const panel = document.querySelector('.stylist-card');
  if (!panel) return;

  // --- STATE REGISTRY ---
  let selectedCategory = 'Men';
  let selectedOccasion = 'Wedding';
  let loading = false;
  let currentAdviceText = '';

  // --- DOM NODES ---
  const catButtons = document.querySelectorAll('[data-category]');
  const occasionButtons = document.querySelectorAll('[data-occasion]');
  const btnSubmit = document.getElementById('btn-get-advice');
  const reportPre = document.getElementById('report-pre');
  const reportAdviceText = document.getElementById('report-advice-text');
  
  const dot1 = document.getElementById('dot-1');
  const dot2 = document.getElementById('dot-2');
  const dot3 = document.getElementById('dot-3');

  // Report actions container (will be shown once advice loads)
  const reportActions = document.getElementById('report-actions');
  const btnCopy = document.getElementById('btn-copy-report');
  const btnShare = document.getElementById('btn-share-report');

  // --- 1. TOGGLE EVENTS ---
  catButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      catButtons.forEach(b => b.classList.remove('active-category'));
      btn.classList.add('active-category');
      selectedCategory = btn.getAttribute('data-category');
    });
  });

  occasionButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      occasionButtons.forEach(b => b.classList.remove('active-occasion'));
      btn.classList.add('active-occasion');
      selectedOccasion = btn.getAttribute('data-occasion');
    });
  });

  // --- 2. LUXURY TYPEWRITER RENDERER ---
  const typeWriter = (element, text, speed = 20, callback) => {
    element.textContent = '“';
    let i = 0;
    const timer = setInterval(() => {
      if (i < text.length) {
        element.textContent += text.charAt(i);
        i++;
      } else {
        element.textContent += '”';
        clearInterval(timer);
        if (callback) callback();
      }
    }, speed);
  };

  // --- 3. THE STYLING REPORT API ENGINE ---
  const fetchFashionAdvice = async (category, occasion) => {
    let apiKey = null;
    try {
      apiKey = localStorage.getItem('VITE_GEMINI_API_KEY');
    } catch (e) {
      console.warn("localStorage access blocked on file:// protocol. Using session fallback.", e);
    }
    
    if (!apiKey || apiKey === 'YOUR_API_KEY_HERE') {
      const keyPrompt = prompt("Please enter your Google Gemini API Key to use the Smart Stylist AI features. It will be saved locally in your browser session:", "");
      if (keyPrompt) {
        apiKey = keyPrompt.trim();
        try {
          localStorage.setItem('VITE_GEMINI_API_KEY', apiKey);
        } catch (e) {
          console.warn("Unable to persist VITE_GEMINI_API_KEY to localStorage on this protocol.", e);
        }
      } else {
        return "For this specific occasion, our designers recommend pairing textured natural cotton shirts with classic chinos for an effortlessly tailored presence. Discover the finest selection of fits in Bhujpur, Kutch, exclusively at New Akshat Fashion.";
      }
    }

    const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`;

    const promptText = `You are an expert fashion stylist for "New Akshat Fashion", a premium family clothing showroom. 
    Provide a concise (2-3 sentences), luxurious fashion tip for a customer looking for ${category} wear for a ${occasion} occasion. 
    Be encouraging and focus on quality and style. Mention that New Akshat Fashion has the best collections in Bhujpur, Kutch.`;

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: promptText
            }]
          }],
          generationConfig: {
            temperature: 0.7,
            maxOutputTokens: 250
          }
        })
      });

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }

      const data = await response.json();
      return data.candidates[0].content.parts[0].text;
    } catch (err) {
      console.error("Gemini API Request Failed:", err);
      return "Our experts recommend selecting fine silks for ethnic weddings, clean linens for casual events, and premium structured jackets for evening festivals. Visit us at New Akshat Fashion, Bhujpur to discover our bespoke fits.";
    }
  };

  // --- 4. SUBMIT HANDLER ---
  btnSubmit.addEventListener('click', async () => {
    if (loading) return;

    loading = true;
    btnSubmit.disabled = true;
    
    // Hide previous advice action buttons
    if (reportActions) {
      reportActions.style.opacity = '0';
      reportActions.style.pointerEvents = 'none';
    }
    
    // Toggle loader text
    btnSubmit.innerHTML = `
      <svg class="animate-spin" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" x2="12" y1="2" y2="6"/><line x1="12" x2="12" y1="18" y2="22"/><line x1="4.93" x2="7.76" y1="4.93" y2="7.76"/><line x1="16.24" x2="19.07" y1="16.24" y2="19.07"/><line x1="2" x2="6" y1="12" y2="12"/><line x1="18" x2="22" y1="12" y2="12"/><line x1="4.93" x2="7.76" y1="19.07" y2="16.24"/><line x1="16.24" x2="19.07" y1="7.76" y2="4.93"/></svg>
      Analyzing Trends...
    `;

    // Dot indicators shimmer
    dot1.classList.add('lit');
    dot2.classList.add('lit');
    dot3.classList.add('lit');

    // Run fetch
    const advice = await fetchFashionAdvice(selectedCategory, selectedOccasion);
    currentAdviceText = advice.trim();

    // Reset indicator lights
    dot2.classList.remove('lit');
    dot3.classList.remove('lit');

    // Hide pre-loader
    reportPre.style.display = 'none';
    reportAdviceText.textContent = '';
    reportAdviceText.classList.add('visible');

    // Typewriter printout
    typeWriter(reportAdviceText, currentAdviceText, 18, () => {
      // Reveal action buttons on typing complete
      if (reportActions) {
        reportActions.style.opacity = '1';
        reportActions.style.pointerEvents = 'auto';
      }
    });

    // Reset Submit State
    loading = false;
    btnSubmit.disabled = false;
    btnSubmit.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-send"><line x1="22" x2="11" y1="2" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
      Get Recommendations
    `;
  });

  // --- 5. SOCIAL SHARE & COPY LOGIC ---
  if (btnCopy) {
    btnCopy.addEventListener('click', () => {
      if (!currentAdviceText) return;
      navigator.clipboard.writeText(`"${currentAdviceText}" — Styling advice from New Akshat Fashion.`)
        .then(() => {
          const originalText = btnCopy.textContent;
          btnCopy.textContent = 'Copied!';
          btnCopy.style.borderColor = 'var(--brand-gold)';
          btnCopy.style.color = 'var(--brand-gold)';
          setTimeout(() => {
            btnCopy.textContent = originalText;
            btnCopy.style.borderColor = '';
            btnCopy.style.color = '';
          }, 2000);
        })
        .catch(err => {
          console.error('Could not copy report text: ', err);
        });
    });
  }

  if (btnShare) {
    btnShare.addEventListener('click', () => {
      if (!currentAdviceText) return;
      const formattedMessage = encodeURIComponent(
        `Hi New Akshat Fashion! The Smart Stylist AI recommended this custom look for me: "${currentAdviceText}". I would love to check out your collections for this! 🌟`
      );
      const whatsappUrl = `https://wa.me/919327620020?text=${formattedMessage}`;
      window.open(whatsappUrl, '_blank');
    });
  }
});
