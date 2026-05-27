/**
 * ==========================================================================
 * NEW AKSHAT FASHION - SMART STYLIST (local tips, no API key)
 * ==========================================================================
 */

// Clear any previously stored Gemini API key so the old prompt never fires
try { localStorage.removeItem('VITE_GEMINI_API_KEY'); } catch(e) {}

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

  // --- 3. THE STYLING REPORT ENGINE (local tips — no API key needed) ---
  const STYLE_TIPS = {
    Men: {
      Wedding:  "For a wedding, pair a rich silk sherwani in ivory or gold with embroidered mojris. Layer a contrast dupatta over the shoulder for a regal finish. New Akshat Fashion carries the finest wedding sherwanis in Bhujpur, Kutch.",
      Casual:   "A well-fitted linen kurta in earthy tones paired with straight-cut trousers is the perfect casual statement. Keep accessories minimal — a leather watch does the job. Find your ideal casual fit at New Akshat Fashion.",
      Festival: "Go bold for festivals — a printed cotton kurta in deep saffron or royal blue with churidar pants commands attention. Add a Nehru jacket to elevate the look. Explore our festival collection at New Akshat Fashion, Bhujpur.",
      Party:    "A slim-fit bandhgala jacket in midnight black or deep maroon over a crisp white shirt is effortlessly sharp for parties. New Akshat Fashion has an exclusive range of party-ready menswear in Kutch.",
    },
    Women: {
      Wedding:  "A Banarasi silk saree in deep red or emerald green with a contrast blouse and gold jewellery is timeless for weddings. New Akshat Fashion offers the finest bridal sarees and lehengas in Bhujpur, Kutch.",
      Casual:   "A flowy printed kurti with palazzo pants in a complementary tone is both comfortable and stylish for everyday wear. Pair with kolhapuri sandals for a complete look. Shop the latest kurtis at New Akshat Fashion.",
      Festival: "A vibrant Chaniya Choli in mirror-work or bandhani print is the ultimate festival outfit. Choose bright pinks, oranges, or turquoise to stand out. New Akshat Fashion has the best festival collection in Kutch.",
      Party:    "An embellished georgette saree or a designer anarkali suit in jewel tones is perfect for evening parties. Let the fabric do the talking with minimal jewellery. Discover party wear at New Akshat Fashion, Bhujpur.",
    },
    Kids: {
      Wedding:  "Dress little ones in a mini sherwani with a matching safa for boys, or a lehenga choli in pastel shades for girls — adorable and occasion-perfect. New Akshat Fashion has a delightful kids' wedding range.",
      Casual:   "Comfortable cotton kurta-pyjama sets in fun prints keep kids stylish and at ease for casual outings. Easy to wear, easy to wash. Find the best kids' casuals at New Akshat Fashion, Bhujpur.",
      Festival: "Bright bandhani or block-print outfits in festive colours make kids the star of any celebration. Pair with traditional footwear for the full look. Shop kids' festival wear at New Akshat Fashion.",
      Party:    "A smart Indo-western outfit — a printed jacket over a kurta for boys, or a ruffled dress with embroidery for girls — is perfect for kids' parties. New Akshat Fashion has a wide kids' party collection in Kutch.",
    },
  };

  const fetchFashionAdvice = (category, occasion) => {
    const tip = STYLE_TIPS[category]?.[occasion];
    return tip || "Our experts recommend visiting New Akshat Fashion in Bhujpur, Kutch to explore our premium collection and get personalised styling advice from our in-store consultants.";
  };

  // --- 4. SUBMIT HANDLER ---
  btnSubmit.addEventListener('click', () => {
    if (loading) return;

    loading = true;
    btnSubmit.disabled = true;

    if (reportActions) {
      reportActions.style.opacity = '0';
      reportActions.style.pointerEvents = 'none';
    }

    btnSubmit.innerHTML = `
      <svg class="animate-spin" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" x2="12" y1="2" y2="6"/><line x1="12" x2="12" y1="18" y2="22"/><line x1="4.93" x2="7.76" y1="4.93" y2="7.76"/><line x1="16.24" x2="19.07" y1="16.24" y2="19.07"/><line x1="2" x2="6" y1="12" y2="12"/><line x1="18" x2="22" y1="12" y2="12"/><line x1="4.93" x2="7.76" y1="19.07" y2="16.24"/><line x1="16.24" x2="19.07" y1="7.76" y2="4.93"/></svg>
      Analyzing Trends...
    `;

    dot1.classList.add('lit');
    dot2.classList.add('lit');
    dot3.classList.add('lit');

    // Small delay so the spinner is visible before result appears
    setTimeout(() => {
      const advice = fetchFashionAdvice(selectedCategory, selectedOccasion);
      currentAdviceText = advice.trim();

      dot2.classList.remove('lit');
      dot3.classList.remove('lit');

      reportPre.style.display = 'none';
      reportAdviceText.textContent = '';
      reportAdviceText.classList.add('visible');

      typeWriter(reportAdviceText, currentAdviceText, 18, () => {
        if (reportActions) {
          reportActions.style.opacity = '1';
          reportActions.style.pointerEvents = 'auto';
        }
      });

      loading = false;
      btnSubmit.disabled = false;
      btnSubmit.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-send"><line x1="22" x2="11" y1="2" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
        Get Recommendations
      `;
    }, 600);
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
