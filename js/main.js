/**
 * Minimal Controller - Modal, Matrix & Window Actions
 * Dakshita Mathur Portfolio
 */

(function () {
  // Resume Modal Controller
  const openResumeBtns = document.querySelectorAll('.trigger-resume-modal');
  const resumeModal = document.getElementById('resume-modal');
  const closeResumeBtn = document.getElementById('close-resume-modal');
  const printResumeBtn = document.getElementById('print-resume-btn');

  function openResume() {
    if (resumeModal) {
      resumeModal.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
  }

  function closeResume() {
    if (resumeModal) {
      resumeModal.classList.remove('active');
      document.body.style.overflow = '';
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

  // Background Matrix Rain Canvas
  const canvas = document.getElementById('matrix-canvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;
    const chars = '01ABCDEF9876543210!<>[]{}_=+~#@%$&*';
    const fontSize = 14;
    const cols = Math.floor(width / fontSize);
    const drops = Array(cols).fill(1);

    window.addEventListener('resize', () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    });

    function drawMatrix() {
      ctx.fillStyle = 'rgba(17, 23, 27, 0.08)';
      ctx.fillRect(0, 0, width, height);
      ctx.fillStyle = '#f43f5e';
      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        const text = chars[Math.floor(Math.random() * chars.length)];
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);
        if (drops[i] * fontSize > height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
    }
    setInterval(drawMatrix, 40);
  }

  // Window Dots Interactive Behavior
  const redDot = document.querySelector('.dot.red');
  const yellowDot = document.querySelector('.dot.yellow');
  const greenDot = document.querySelector('.dot.green');
  const workstation = document.querySelector('.terminal-workstation');

  if (greenDot && workstation) {
    greenDot.addEventListener('click', () => {
      if (workstation.style.width === '100vw' && workstation.style.height === '100vh') {
        workstation.style.width = '94vw';
        workstation.style.height = '90vh';
        workstation.style.borderRadius = '10px';
      } else {
        workstation.style.width = '100vw';
        workstation.style.height = '100vh';
        workstation.style.borderRadius = '0';
      }
    });
  }
})();
