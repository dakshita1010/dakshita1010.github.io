/**
 * Minimalist Terminal Controller (designby.cc & <ZAFAR/> style)
 * Dakshita Mathur Portfolio
 */

(function () {
  const terminalScreen = document.getElementById('terminal-screen');
  const terminalInput = document.getElementById('terminal-input');
  const logContainer = document.getElementById('terminal-log-flow');
  const uptimeEl = document.getElementById('term-uptime');
  const startTime = Date.now();

  if (!terminalInput || !logContainer) return;

  const commandHistory = [];
  let historyIndex = -1;

  // Uptime counter
  setInterval(() => {
    if (uptimeEl) {
      const sec = Math.floor((Date.now() - startTime) / 1000);
      uptimeEl.textContent = sec < 60 ? `${sec}s` : `${Math.floor(sec / 60)}m ${sec % 60}s`;
    }
  }, 1000);

  const COMMAND_LIST = [
    { name: '/help', desc: 'show available commands' },
    { name: '/about', desc: 'about Dakshita Mathur & VIT-AP degree' },
    { name: '/projects', desc: 'featured projects & GitHub repositories' },
    { name: '/research', desc: 'ASIT-2026 eBPF in-kernel defense paper' },
    { name: '/skills', desc: 'technical capabilities & tools' },
    { name: '/experience', desc: 'ISRO remote sensing internship (98/100)' },
    { name: '/contact', desc: 'direct email, phone & social links' },
    { name: '/cv', desc: 'open printable resume dossier' },
    { name: '/clear', desc: 'clear terminal screen' }
  ];

  const COMMANDS = {
    '/help': () => {
      let rows = COMMAND_LIST.map(c => 
        `<tr><td style="width:120px;"><span style="color:var(--accent-green); font-weight:600; cursor:pointer;" onclick="window.runTermCmd('${c.name}')">${c.name}</span></td><td style="color:var(--text-muted);">${c.desc}</td></tr>`
      ).join('');
      return `
<div class="term-output-panel">
  <div style="color:#fff; font-weight:700; margin-bottom:4px;">Available directives:</div>
  <table class="term-simple-table">${rows}</table>
</div>`;
    },

    '/about': () => `
<div class="term-output-panel">
  <div style="color:#fff; font-weight:700; margin-bottom:4px;">DAKSHITA MATHUR</div>
  <div style="color:var(--text-muted); margin-bottom:8px;">
    B.Tech Computer Science student at <strong>VIT-AP (CGPA: 8.54/10)</strong> with hands-on research and engineering experience in 
    cybersecurity, machine learning, and systems programming.
  </div>
  <div style="font-size:0.8rem; color:var(--text-dim); line-height:1.6;">
    • <strong>VIT-AP:</strong> B.Tech CSE (Sep 2023 – Present) | <span style="color:var(--accent-green)">CGPA: 8.54/10</span><br>
    • <strong>Class XII (CBSE):</strong> Rani Laxmi Bai Memorial School | <span style="color:var(--accent-green)">85.2%</span><br>
    • <strong>Class X (ICSE):</strong> St. Xavier’s Senior Secondary School | <span style="color:var(--accent-green)">89.2%</span>
  </div>
</div>`,

    '/projects': () => `
<div class="term-output-panel">
  <div style="color:#fff; font-weight:700; margin-bottom:8px;">FEATURED PROJECTS:</div>

  <div style="margin-bottom:10px;">
    <div style="color:var(--accent-green); font-weight:600;">1. ThreatLens – URL & Hash Threat Intelligence</div>
    <div style="color:var(--text-muted); font-size:0.82rem;">Flask platform using VirusTotal API, local SHA-256 hashing, SQLite, and Chart.js.</div>
    <div><a href="https://github.com/dakshita1010/ThreatLens" target="_blank" style="color:var(--accent-cyan); text-decoration:underline; font-size:0.8rem;">github.com/dakshita1010/ThreatLens</a></div>
  </div>

  <div style="margin-bottom:10px;">
    <div style="color:var(--accent-green); font-weight:600;">2. Federated-NIDS – 4G/5G Intrusion Detection</div>
    <div style="color:var(--text-muted); font-size:0.82rem;">PyTorch neural classifiers with Flower (flwr) FedAvg aggregation across 5 base stations. (86% Accuracy).</div>
    <div><a href="https://github.com/maplelattte/federated-nids" target="_blank" style="color:var(--accent-cyan); text-decoration:underline; font-size:0.8rem;">github.com/maplelattte/federated-nids</a></div>
  </div>

  <div>
    <div style="color:var(--accent-green); font-weight:600;">3. HoverNotes – Always-on-Top Floating Notes</div>
    <div style="color:var(--text-muted); font-size:0.82rem;">Electron desktop utility with global hotkeys (Alt+Shift+G Ghost Mode), transparency, and local storage.</div>
    <div><a href="https://github.com/dakshita1010/hover-notes" target="_blank" style="color:var(--accent-cyan); text-decoration:underline; font-size:0.8rem;">github.com/dakshita1010/hover-notes</a></div>
  </div>
</div>`,

    '/research': () => `
<div class="term-output-panel">
  <div style="color:#fff; font-weight:700;">In-Kernel Defense: Low-Latency In-Kernel Ransomware Containment with eBPF</div>
  <div style="color:var(--accent-purple); font-size:0.8rem; margin:2px 0 6px;">ASIT-2026 International Conference Paper</div>
  <div style="color:var(--text-muted); font-size:0.82rem; line-height:1.6;">
    • eBPF kernel probes for sub-millisecond syscall write anomaly detection.<br>
    • Rapid Shannon entropy measurement to catch file encryption routines early.<br>
    • Automated SIGSTOP process suspension in kernel-space without user-space latency.
  </div>
</div>`,

    '/skills': () => `
<div class="term-output-panel">
  <div style="color:#fff; font-weight:700; margin-bottom:6px;">TECHNICAL SKILLS:</div>
  <div style="color:var(--text-muted); font-size:0.82rem; line-height:1.7;">
    • <strong>Languages:</strong> Java, Python, C/C++, JavaScript, SQL, Bash<br>
    • <strong>Cybersecurity:</strong> Network Security, Threat Intelligence, Malware Analysis, Intrusion Detection<br>
    • <strong>Security / Net:</strong> Wireshark, SHA-256, VirusTotal API, eBPF Kernel Probes<br>
    • <strong>Machine Learning:</strong> PyTorch, Federated Learning, Flower (flwr), FedAvg<br>
    • <strong>Development:</strong> Flask, SQLite, HTML5, CSS3, JavaScript, Electron<br>
    • <strong>Tools & Platforms:</strong> Git, GitHub, Linux Environments, REST APIs, JSON
  </div>
</div>`,

    '/experience': () => `
<div class="term-output-panel">
  <div style="color:#fff; font-weight:700;">Remote Sensing & GIS Intern – India Space Academy (ISRO)</div>
  <div style="color:var(--accent-cyan); font-size:0.8rem; margin:2px 0 6px;">January 2026 | Final Project Score: 98 / 100</div>
  <div style="color:var(--text-muted); font-size:0.82rem; line-height:1.6;">
    • 4-week program on satellite imagery, remote sensing, and AI-powered geospatial analysis.<br>
    • Developed AI-assisted surface water mapping using NDWI to detect surface water bodies.<br>
    • Awarded 98/100 in final project evaluation.
  </div>
</div>`,

    '/contact': () => `
<div class="term-output-panel">
  <div style="color:#fff; font-weight:700; margin-bottom:4px;">CONTACT INFORMATION:</div>
  <div style="color:var(--text-muted); font-size:0.84rem; line-height:1.8;">
    • Email: <a href="mailto:dakshita.mathur03@gmail.com" style="color:var(--accent-green);">dakshita.mathur03@gmail.com</a><br>
    • Phone: <a href="tel:+919696233384" style="color:var(--accent-green);">+91 9696233384</a><br>
    • GitHub: <a href="https://github.com/dakshita1010" target="_blank" style="color:var(--accent-green);">github.com/dakshita1010</a><br>
    • LinkedIn: <a href="https://linkedin.com/in/dakshita-mathur10" target="_blank" style="color:var(--accent-green);">linkedin.com/in/dakshita-mathur10</a>
  </div>
</div>`,

    '/cv': () => {
      const modal = document.getElementById('resume-modal');
      if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
      }
      return `<div class="term-output-panel">Resume modal opened. Press Esc to close.</div>`;
    },

    '/clear': () => {
      logContainer.innerHTML = '';
      return null;
    }
  };

  COMMANDS['/whoami'] = COMMANDS['/about'];
  COMMANDS['/cls'] = COMMANDS['/clear'];

  function execute(raw) {
    const trimmed = raw.trim();
    if (!trimmed) return;

    let normalized = trimmed;
    if (!normalized.startsWith('/')) {
      normalized = '/' + normalized;
    }

    commandHistory.push(trimmed);
    historyIndex = commandHistory.length;

    // Append executed line
    const entry = document.createElement('div');
    entry.innerHTML = `
      <div class="term-line-executed">
        <span class="term-symbol">$</span>
        <span style="color:#fff;">${escapeHtml(trimmed)}</span>
      </div>
    `;
    logContainer.appendChild(entry);

    if (COMMANDS[normalized]) {
      const output = COMMANDS[normalized]();
      if (output !== null) {
        const outDiv = document.createElement('div');
        outDiv.innerHTML = output;
        logContainer.appendChild(outDiv);
      }
    } else {
      const errDiv = document.createElement('div');
      errDiv.className = 'term-output-panel error';
      errDiv.innerHTML = `Command not recognized: <strong>${escapeHtml(trimmed)}</strong>. Type <span style="color:var(--accent-green)">/help</span>.`;
      logContainer.appendChild(errDiv);
    }

    terminalScreen.scrollTop = terminalScreen.scrollHeight;
  }

  function escapeHtml(str) {
    return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }

  terminalInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      const val = terminalInput.value;
      terminalInput.value = '';
      execute(val);
    } else if (e.key === 'Tab') {
      e.preventDefault();
      const current = terminalInput.value.trim().toLowerCase();
      if (!current) return;
      const match = COMMAND_LIST.find(c => c.name.startsWith(current) || c.name.substring(1).startsWith(current));
      if (match) terminalInput.value = match.name + ' ';
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (historyIndex > 0) {
        historyIndex--;
        terminalInput.value = commandHistory[historyIndex];
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex < commandHistory.length - 1) {
        historyIndex++;
        terminalInput.value = commandHistory[historyIndex];
      } else {
        historyIndex = commandHistory.length;
        terminalInput.value = '';
      }
    }
  });

  window.runTermCmd = function (cmdStr) {
    terminalInput.value = '';
    execute(cmdStr);
    terminalInput.focus();
  };

  document.querySelectorAll('.term-pill-btn').forEach(pill => {
    pill.addEventListener('click', () => {
      const cmd = pill.getAttribute('data-cmd');
      if (cmd) window.runTermCmd(cmd);
    });
  });
})();
