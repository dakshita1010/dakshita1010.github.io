/**
 * SOC Real-Time Telemetry Chart (Trinity/BlockTrade Inspired)
 * Dakshita Mathur Portfolio
 */

(function () {
  const canvas = document.getElementById('soc-telemetry-chart');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let width, height;
  let points = [];
  const maxPoints = 50;
  let baseValue = 1640;
  let currentValue = 1648.35;
  let animId = null;

  // Metric displays
  const liveValEl = document.getElementById('chart-live-val');
  const liveChangeEl = document.getElementById('chart-live-change');

  function resize() {
    if (!canvas.parentElement) return;
    const rect = canvas.parentElement.getBoundingClientRect();
    width = canvas.width = rect.width;
    height = canvas.height = 240;
    drawChart();
  }

  function initData() {
    points = [];
    let val = baseValue;
    for (let i = 0; i < maxPoints; i++) {
      val += (Math.random() - 0.48) * 8;
      points.push(val);
    }
    currentValue = points[points.length - 1];
    updateDisplay();
  }

  function updateDisplay() {
    if (liveValEl) {
      liveValEl.textContent = currentValue.toFixed(2) + ' OPS/s';
    }
    if (liveChangeEl) {
      const diff = currentValue - baseValue;
      const pct = (diff / baseValue) * 100;
      const sign = diff >= 0 ? '+' : '';
      liveChangeEl.textContent = `${sign}${diff.toFixed(2)} (${sign}${pct.toFixed(2)}%)`;
      liveChangeEl.className = diff >= 0 ? 'metric-badge text-green' : 'metric-badge text-red';
    }
  }

  function tick() {
    // Add new data point simulating network flow & eBPF syscall probes
    const delta = (Math.random() - 0.47) * 9;
    currentValue = Math.max(1580, Math.min(1720, currentValue + delta));
    points.push(currentValue);
    if (points.length > maxPoints) {
      points.shift();
    }
    updateDisplay();
    drawChart();
  }

  function drawChart() {
    if (!width || !height) return;
    ctx.clearRect(0, 0, width, height);

    // 1. Draw subtle background grid lines
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
    ctx.lineWidth = 1;
    const rows = 5;
    for (let i = 1; i < rows; i++) {
      const y = (height / rows) * i;
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
      ctx.stroke();
    }

    const cols = 8;
    for (let j = 1; j < cols; j++) {
      const x = (width / cols) * j;
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, height);
      ctx.stroke();
    }

    if (points.length < 2) return;

    // 2. Compute min/max
    const min = Math.min(...points) - 10;
    const max = Math.max(...points) + 10;
    const range = max - min || 1;

    // Helper to get canvas coordinates
    const getX = (idx) => (width / (points.length - 1)) * idx;
    const getY = (val) => height - ((val - min) / range) * (height * 0.8) - height * 0.1;

    // 3. Draw gradient filled area under the line
    const gradient = ctx.createLinearGradient(0, 0, 0, height);
    gradient.addColorStop(0, 'rgba(0, 230, 118, 0.28)');
    gradient.addColorStop(0.7, 'rgba(0, 230, 118, 0.04)');
    gradient.addColorStop(1, 'rgba(0, 230, 118, 0.0)');

    ctx.beginPath();
    ctx.moveTo(getX(0), height);
    for (let i = 0; i < points.length; i++) {
      ctx.lineTo(getX(i), getY(points[i]));
    }
    ctx.lineTo(getX(points.length - 1), height);
    ctx.closePath();
    ctx.fillStyle = gradient;
    ctx.fill();

    // 4. Draw high-tech glowing trend line
    ctx.beginPath();
    ctx.moveTo(getX(0), getY(points[0]));
    for (let i = 1; i < points.length; i++) {
      // Smooth curve
      const xc = (getX(i) + getX(i - 1)) / 2;
      const yc = (getY(points[i]) + getY(points[i - 1])) / 2;
      ctx.quadraticCurveTo(getX(i - 1), getY(points[i - 1]), xc, yc);
    }
    ctx.lineTo(getX(points.length - 1), getY(points[points.length - 1]));
    ctx.strokeStyle = '#00e676';
    ctx.lineWidth = 2;
    ctx.shadowColor = '#00e676';
    ctx.shadowBlur = 8;
    ctx.stroke();
    ctx.shadowBlur = 0;

    // 5. Pulsing live point at head
    const lastX = getX(points.length - 1);
    const lastY = getY(points[points.length - 1]);
    ctx.beginPath();
    ctx.arc(lastX, lastY, 4, 0, Math.PI * 2);
    ctx.fillStyle = '#ffffff';
    ctx.shadowColor = '#00e676';
    ctx.shadowBlur = 10;
    ctx.fill();
    ctx.shadowBlur = 0;
  }

  // Timeframe pill buttons
  const timeBtns = document.querySelectorAll('.chart-time-btn');
  timeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      timeBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      initData();
    });
  });

  window.addEventListener('resize', resize);
  resize();
  initData();

  // Tick interval
  setInterval(tick, 1600);
})();
