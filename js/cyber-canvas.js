/**
 * Cyber Canvas - Interactive Cyber Neural Mesh & Matrix Rain Effect
 * Dakshita Mathur Portfolio
 */

(function () {
  const canvas = document.getElementById('cyber-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let width, height;
  let particles = [];
  const particleCount = 65;
  const maxDistance = 140;

  let mouse = {
    x: null,
    y: null,
    radius: 120
  };

  // Matrix Mode State
  let isMatrixMode = false;
  let matrixDrops = [];
  const matrixChars = '01ABCDEF9876543210!<>[]{}_=+~#@%$&*';
  const fontSize = 14;

  function resizeCanvas() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;

    if (isMatrixMode) {
      initMatrix();
    }
  }

  window.addEventListener('resize', resizeCanvas);

  window.addEventListener('mousemove', (e) => {
    mouse.x = e.x;
    mouse.y = e.y;
  });

  window.addEventListener('mouseout', () => {
    mouse.x = null;
    mouse.y = null;
  });

  // Particle Class for Neural Cyber Mesh
  class Particle {
    constructor() {
      this.x = Math.random() * width;
      this.y = Math.random() * height;
      this.vx = (Math.random() - 0.5) * 0.8;
      this.vy = (Math.random() - 0.5) * 0.8;
      this.radius = Math.random() * 2 + 1.2;
      this.color = Math.random() > 0.3 ? '#00f3ff' : '#9d4edd';
    }

    update() {
      this.x += this.vx;
      this.y += this.vy;

      if (this.x < 0 || this.x > width) this.vx *= -1;
      if (this.y < 0 || this.y > height) this.vy *= -1;

      // Mouse interactivity
      if (mouse.x !== null && mouse.y !== null) {
        let dx = mouse.x - this.x;
        let dy = mouse.y - this.y;
        let dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < mouse.radius) {
          let force = (mouse.radius - dist) / mouse.radius;
          let dirX = dx / dist;
          let dirY = dy / dist;
          this.x -= dirX * force * 3;
          this.y -= dirY * force * 3;
        }
      }
    }

    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fillStyle = this.color;
      ctx.shadowBlur = 8;
      ctx.shadowColor = this.color;
      ctx.fill();
      ctx.shadowBlur = 0;
    }
  }

  function initParticles() {
    particles = [];
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }
  }

  function drawConnections() {
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        let dx = particles[i].x - particles[j].x;
        let dy = particles[i].y - particles[j].y;
        let dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < maxDistance) {
          let alpha = (1 - dist / maxDistance) * 0.25;
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(0, 243, 255, ${alpha})`;
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      }
    }
  }

  function initMatrix() {
    const columns = Math.floor(width / fontSize);
    matrixDrops = [];
    for (let i = 0; i < columns; i++) {
      matrixDrops[i] = Math.floor(Math.random() * -50);
    }
  }

  function drawMatrix() {
    ctx.fillStyle = 'rgba(7, 9, 14, 0.08)';
    ctx.fillRect(0, 0, width, height);

    ctx.font = `${fontSize}px "JetBrains Mono", monospace`;

    for (let i = 0; i < matrixDrops.length; i++) {
      const char = matrixChars[Math.floor(Math.random() * matrixChars.length)];
      const x = i * fontSize;
      const y = matrixDrops[i] * fontSize;

      // Glow first character in white/bright green
      ctx.fillStyle = '#ffffff';
      ctx.fillText(char, x, y);

      ctx.fillStyle = '#00ff88';
      ctx.fillText(char, x, y - fontSize);

      if (y > height && Math.random() > 0.975) {
        matrixDrops[i] = 0;
      }
      matrixDrops[i]++;
    }
  }

  function animate() {
    if (isMatrixMode) {
      drawMatrix();
    } else {
      ctx.clearRect(0, 0, width, height);

      particles.forEach(p => {
        p.update();
        p.draw();
      });

      drawConnections();
    }

    requestAnimationFrame(animate);
  }

  // Global toggle for Matrix Mode
  window.toggleMatrixMode = function () {
    isMatrixMode = !isMatrixMode;
    if (isMatrixMode) {
      initMatrix();
    } else {
      ctx.clearRect(0, 0, width, height);
      initParticles();
    }
    return isMatrixMode;
  };

  // Initialize
  resizeCanvas();
  initParticles();
  animate();
})();
