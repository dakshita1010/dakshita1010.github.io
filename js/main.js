/**
 * Main Controller - HUD Telemetry, Audio Synthesizer, Modal & Interactions
 * Dakshita Mathur Portfolio
 */

(function () {
  // 1. Audio Synthesizer via Web Audio API (No external sound files required)
  let audioCtx = null;
  let audioEnabled = false;
  const audioToggleBtn = document.getElementById('audio-toggle-btn');

  function initAudio() {
    if (!audioCtx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) {
        audioCtx = new AudioContext();
      }
    }
    if (audioCtx && audioCtx.state === 'suspended') {
      audioCtx.resume();
    }
  }

  window.playCyberClick = function (freq = 880, duration = 0.04) {
    if (!audioEnabled || !audioCtx) return;
    try {
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(freq * 0.5, audioCtx.currentTime + duration);

      gain.gain.setValueAtTime(0.08, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + duration);

      osc.connect(gain);
      gain.connect(audioCtx.destination);

      osc.start();
      osc.stop(audioCtx.currentTime + duration);
    } catch (e) {
      console.warn('Audio synthesis issue:', e);
    }
  };

  if (audioToggleBtn) {
    audioToggleBtn.addEventListener('click', () => {
      initAudio();
      audioEnabled = !audioEnabled;
      if (audioEnabled) {
        audioToggleBtn.classList.add('active');
        audioToggleBtn.title = 'Audio Synthesizer: ACTIVE';
        playCyberClick(1200, 0.08);
      } else {
        audioToggleBtn.classList.remove('active');
        audioToggleBtn.title = 'Audio Synthesizer: MUTED';
      }
    });
  }

  // 2. Scanline CRT Overlay Toggle
  const scanlinesEl = document.getElementById('scanlines-overlay');
  const scanlineToggleBtn = document.getElementById('scanline-toggle-btn');

  if (scanlineToggleBtn && scanlinesEl) {
    scanlineToggleBtn.addEventListener('click', () => {
      scanlinesEl.classList.toggle('disabled');
      const isDisabled = scanlinesEl.classList.contains('disabled');
      scanlineToggleBtn.classList.toggle('active', !isDisabled);
      scanlineToggleBtn.title = isDisabled ? 'CRT Scanlines: DISABLED' : 'CRT Scanlines: ACTIVE';
      playCyberClick(900, 0.04);
    });
  }

  // 3. Live Telemetry Clock (IST & UTC)
  const utcClockEl = document.getElementById('telemetry-clock-utc');
  const istClockEl = document.getElementById('telemetry-clock-ist');

  function updateClocks() {
    const now = new Date();
    if (utcClockEl) {
      utcClockEl.textContent = now.toUTCString().split(' ')[4] + ' UTC';
    }
    if (istClockEl) {
      const istTime = now.toLocaleTimeString('en-US', {
        timeZone: 'Asia/Kolkata',
        hour12: false,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      });
      istClockEl.textContent = istTime + ' IST';
    }
  }
  updateClocks();
  setInterval(updateClocks, 1000);

  // 4. Mobile Navigation Menu Toggle
  const mobileToggleBtn = document.getElementById('mobile-toggle');
  const navMenu = document.getElementById('nav-menu');

  if (mobileToggleBtn && navMenu) {
    mobileToggleBtn.addEventListener('click', () => {
      navMenu.classList.toggle('open');
      playCyberClick(700, 0.03);
    });

    // Close menu when link clicked
    navMenu.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('open');
      });
    });
  }

  // 5. Active Nav Indicator on Scroll
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  function highlightNavOnScroll() {
    const scrollY = window.pageYOffset;
    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 120;
      const sectionId = current.getAttribute('id');

      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        navLinks.forEach(link => {
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });
      }
    });
  }
  window.addEventListener('scroll', highlightNavOnScroll);

  // 6. Resume Modal Controller
  const openResumeBtns = document.querySelectorAll('.trigger-resume-modal');
  const resumeModal = document.getElementById('resume-modal');
  const closeResumeBtn = document.getElementById('close-resume-modal');
  const printResumeBtn = document.getElementById('print-resume-btn');

  function openResume() {
    if (resumeModal) {
      resumeModal.classList.add('active');
      document.body.style.overflow = 'hidden';
      playCyberClick(1050, 0.06);
    }
  }

  function closeResume() {
    if (resumeModal) {
      resumeModal.classList.remove('active');
      document.body.style.overflow = '';
      playCyberClick(500, 0.04);
    }
  }

  openResumeBtns.forEach(btn => btn.addEventListener('click', (e) => {
    e.preventDefault();
    openResume();
  }));

  if (closeResumeBtn) closeResumeBtn.addEventListener('click', closeResume);

  if (resumeModal) {
    resumeModal.addEventListener('click', (e) => {
      if (e.target === resumeModal) closeResume();
    });
  }

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && resumeModal && resumeModal.classList.contains('active')) {
      closeResume();
    }
  });

  if (printResumeBtn) {
    printResumeBtn.addEventListener('click', () => {
      window.print();
    });
  }

  // 7. Interactive Sound Clicks for Cyber Buttons
  document.querySelectorAll('.cyber-btn, .nav-link, .skill-pill, .control-btn').forEach(el => {
    el.addEventListener('mouseenter', () => {
      playCyberClick(1400, 0.02);
    });
    el.addEventListener('click', () => {
      playCyberClick(800, 0.04);
    });
  });

  // 8. Contact Form Simulation Dispatch
  const contactForm = document.getElementById('cyber-contact-form');
  const formStatus = document.getElementById('form-status-msg');

  if (contactForm && formStatus) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const sendBtn = contactForm.querySelector('button[type="submit"]');
      const originalText = sendBtn.textContent;

      sendBtn.disabled = true;
      sendBtn.textContent = 'TRANSMITTING VIA ENCRYPTED UPLINK...';
      playCyberClick(1200, 0.09);

      setTimeout(() => {
        sendBtn.disabled = false;
        sendBtn.textContent = originalText;
        formStatus.innerHTML = `
          <div style="color: var(--neon-green); font-family: var(--font-mono); font-size: 0.8rem; margin-top: 12px; border: 1px solid var(--border-green); padding: 8px 12px; background: rgba(0,255,136,0.08); border-radius: 3px;">
            [✓] TRANSMISSION ACKNOWLEDGED: Direct message logged. Operator Dakshita Mathur will reply promptly!
          </div>
        `;
        contactForm.reset();
        playCyberClick(1600, 0.12);
      }, 1200);
    });
  }
})();
