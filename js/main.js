/**
 * Main Controller - View Switcher, Audio FX, Theme & Telemetry
 * Dakshita Mathur Portfolio
 */

(function () {
  // 1. Audio Synthesizer (Web Audio API)
  let audioCtx = null;
  let audioEnabled = false;
  const audioToggleBtn = document.getElementById('audio-toggle-btn');

  function initAudio() {
    if (!audioCtx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) audioCtx = new AudioContext();
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

      gain.gain.setValueAtTime(0.06, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + duration);

      osc.connect(gain);
      gain.connect(audioCtx.destination);

      osc.start();
      osc.stop(audioCtx.currentTime + duration);
    } catch (e) {
      console.warn(e);
    }
  };

  if (audioToggleBtn) {
    audioToggleBtn.addEventListener('click', () => {
      initAudio();
      audioEnabled = !audioEnabled;
      audioToggleBtn.classList.toggle('active', audioEnabled);
      audioToggleBtn.title = audioEnabled ? 'Audio FX: ACTIVE' : 'Audio FX: MUTED';
      if (audioEnabled) playCyberClick(1200, 0.08);
    });
  }

  // 2. Theme Switcher (Emerald, Cyan, Violet)
  const themeToggleBtn = document.getElementById('theme-toggle-btn');
  const themes = ['emerald', 'cyan', 'violet'];

  function cycleTheme() {
    const current = document.body.getAttribute('data-theme') || 'emerald';
    const next = themes[(themes.indexOf(current) + 1) % themes.length];
    document.body.setAttribute('data-theme', next);
    playCyberClick(900, 0.05);
  }

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', cycleTheme);
  }

  // 3. Scanline Filter Toggle
  const scanlinesEl = document.getElementById('scanlines-overlay');
  const scanlineBtn = document.getElementById('scanline-toggle-btn');

  if (scanlineBtn && scanlinesEl) {
    scanlineBtn.addEventListener('click', () => {
      scanlinesEl.classList.toggle('disabled');
      const isDisabled = scanlinesEl.classList.contains('disabled');
      scanlineBtn.classList.toggle('active', !isDisabled);
      playCyberClick(800, 0.04);
    });
  }

  // 4. View Switcher (Terminal View vs SOC Dashboard View)
  const navTabs = document.querySelectorAll('.nav-tab-item');
  const terminalSection = document.getElementById('section-terminal');
  const dashboardSection = document.getElementById('section-dashboard');

  navTabs.forEach(tab => {
    tab.addEventListener('click', (e) => {
      const target = tab.getAttribute('data-target');
      if (target === 'terminal') {
        e.preventDefault();
        navTabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        if (terminalSection) {
          terminalSection.scrollIntoView({ behavior: 'smooth' });
          const inp = document.getElementById('terminal-input');
          if (inp) setTimeout(() => inp.focus(), 300);
        }
      } else if (target === 'dashboard') {
        e.preventDefault();
        navTabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        if (dashboardSection) {
          dashboardSection.scrollIntoView({ behavior: 'smooth' });
        }
      }
      playCyberClick(1000, 0.04);
    });
  });

  // 5. Latency Ticker (Simulated WebSockets)
  const latencyEl = document.getElementById('nav-latency');
  if (latencyEl) {
    setInterval(() => {
      const ms = Math.floor(Math.random() * 8) + 16; // 16 - 24ms
      latencyEl.textContent = `Stable (${ms}ms)`;
    }, 3500);
  }

  // 6. Resume Modal Controller
  const openResumeBtns = document.querySelectorAll('.trigger-resume-modal');
  const resumeModal = document.getElementById('resume-modal');
  const closeResumeBtn = document.getElementById('close-resume-modal');
  const printResumeBtn = document.getElementById('print-resume-btn');

  function openResume() {
    if (resumeModal) {
      resumeModal.classList.add('active');
      document.body.style.overflow = 'hidden';
      playCyberClick(1100, 0.06);
    }
  }

  function closeResume() {
    if (resumeModal) {
      resumeModal.classList.remove('active');
      document.body.style.overflow = '';
      playCyberClick(500, 0.04);
    }
  }

  openResumeBtns.forEach(b => b.addEventListener('click', (e) => {
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
    printResumeBtn.addEventListener('click', () => window.print());
  }

  // 7. Operations Table Filter
  const tableFilters = document.querySelectorAll('.table-filter-btn');
  const tableRows = document.querySelectorAll('.op-table-row');

  tableFilters.forEach(filter => {
    filter.addEventListener('click', () => {
      tableFilters.forEach(f => f.classList.remove('active'));
      filter.classList.add('active');
      const cat = filter.getAttribute('data-cat');

      tableRows.forEach(row => {
        if (cat === 'all' || row.getAttribute('data-cat') === cat) {
          row.style.display = '';
        } else {
          row.style.display = 'none';
        }
      });
      playCyberClick(800, 0.03);
    });
  });

  // 8. Contact Form Dispatch
  const contactForm = document.getElementById('cyber-contact-form');
  const formStatus = document.getElementById('form-status-msg');

  if (contactForm && formStatus) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const sendBtn = contactForm.querySelector('button[type="submit"]');
      const origText = sendBtn.textContent;

      sendBtn.disabled = true;
      sendBtn.textContent = 'TRANSMITTING VIA ENCRYPTED UPLINK...';
      playCyberClick(1200, 0.08);

      setTimeout(() => {
        sendBtn.disabled = false;
        sendBtn.textContent = origText;
        formStatus.innerHTML = `
          <div style="color:var(--neon-green); font-family:var(--font-mono); font-size:0.78rem; margin-top:10px; border:1px solid var(--border-cyber); padding:8px 12px; background:var(--neon-green-dim); border-radius:4px;">
            [✓] TRANSMISSION ACKNOWLEDGED: Direct payload dispatched. Operator Dakshita Mathur will reply promptly!
          </div>
        `;
        contactForm.reset();
        playCyberClick(1500, 0.1);
      }, 1000);
    });
  }
})();
