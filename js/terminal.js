/**
 * Interactive Cyber Terminal (Inspired by designby.cc & <ZAFAR/>)
 * Dakshita Mathur Portfolio
 */

(function () {
  const terminalScreen = document.getElementById('terminal-screen');
  const terminalInput = document.getElementById('terminal-input');
  const historyContainer = document.getElementById('terminal-history-log');
  const uptimeEl = document.getElementById('term-uptime');
  const cmdCountEl = document.getElementById('term-cmd-count');

  if (!terminalInput || !historyContainer) return;

  const commandHistory = [];
  let historyIndex = -1;
  let executedCount = 0;
  const startTime = Date.now();

  // Uptime ticker
  setInterval(() => {
    if (uptimeEl) {
      const sec = Math.floor((Date.now() - startTime) / 1000);
      uptimeEl.textContent = sec < 60 ? `${sec}s` : `${Math.floor(sec / 60)}m ${sec % 60}s`;
    }
  }, 1000);

  const ASCII_BANNER = `
  < D A K S H I T A  M A T H U R />
  =================================
  Cybersecurity Researcher & Systems Developer (VIT-AP CSE '27)
  Low-Latency In-Kernel Defense | Threat Intelligence | Federated ML
`;

  const COMMAND_LIST = [
    { name: '/help', desc: 'display available directives' },
    { name: '/about', desc: 'operator profile & academic pedigree' },
    { name: '/projects', desc: 'classified operations & repositories' },
    { name: '/research', desc: 'ASIT-2026 eBPF in-kernel defense paper' },
    { name: '/skills', desc: 'defensive & offensive technical toolkit' },
    { name: '/experience', desc: 'ISRO remote sensing mission log (98/100)' },
    { name: '/lab', desc: 'run interactive SHA-256 & threat intelligence scan' },
    { name: '/contact', desc: 'transmit message & direct uplink' },
    { name: '/links', desc: 'quick social links & GitHub' },
    { name: '/cv', desc: 'access printable CV dossier' },
    { name: '/theme', desc: 'toggle color theme (Emerald / Cyan / Violet)' },
    { name: '/matrix', desc: 'toggle Matrix code rain canvas' },
    { name: '/history', desc: 'view session command history' },
    { name: '/clear', desc: 'clear terminal screen (Ctrl+L)' },
    { name: '/welcome', desc: 'replay welcome briefing & banner' },
    { name: '/secret', desc: 'classified SOC easter egg' }
  ];

  const COMMANDS = {
    '/help': () => {
      let rows = COMMAND_LIST.map(c => 
        `<tr><td><span style="color:var(--neon-green); font-weight:600; cursor:pointer;" onclick="window.runTermCmd('${c.name}')">${c.name}</span></td><td style="color:var(--text-muted);">${c.desc}</td></tr>`
      ).join('');

      return `
<div class="term-output-block">
  <div style="color:var(--neon-green); font-weight:700; margin-bottom:6px;">Available directives:</div>
  <table class="term-table">
    ${rows}
  </table>
  <div style="color:var(--text-dim); font-size:0.75rem; margin-top:6px;">
    Tip: Click any command above, or press <span style="color:var(--neon-green)">Tab</span> to autocomplete.
  </div>
</div>`;
    },

    '/about': () => `
<div class="term-output-block success">
  <div style="font-weight:700; color:#fff; margin-bottom:8px;">[ OPERATOR PROFILE // DAKSHITA MATHUR ]</div>
  <div style="color:var(--text-muted); line-height:1.7; margin-bottom:12px;">
    B.Tech Computer Science student at <strong>VIT-AP (CGPA: 8.54/10)</strong> with hands-on research and engineering experience spanning 
    in-kernel behavioral monitoring (eBPF), threat intelligence architectures, and privacy-preserving federated machine learning.
  </div>
  <div style="font-size:0.82rem; color:var(--text-dim); line-height:1.6;">
    • <strong>Academic Pedigree:</strong><br>
    &nbsp;&nbsp;- Vellore Institute of Technology, AP: B.Tech CSE (Sep 2023 – Present) | <span style="color:var(--neon-green)">CGPA: 8.54/10</span><br>
    &nbsp;&nbsp;- Rani Laxmi Bai Memorial School, Lucknow: Class XII CBSE (July 2022) | <span style="color:var(--neon-green)">85.2%</span><br>
    &nbsp;&nbsp;- St. Xavier’s Senior Secondary School, Chandigarh: Class X ICSE (July 2020) | <span style="color:var(--neon-green)">89.2%</span>
  </div>
</div>`,

    '/projects': () => `
<div class="term-output-block">
  <div style="color:var(--neon-green); font-weight:700; margin-bottom:10px;">[ CLASSIFIED OPERATIONS & REPOSITORIES ]</div>

  <div style="margin-bottom:14px; padding:8px 12px; background:rgba(255,255,255,0.03); border-radius:4px; border:1px solid rgba(255,255,255,0.08);">
    <div style="display:flex; justify-content:space-between; align-items:center;">
      <span style="color:#fff; font-weight:700;">1. ThreatLens – URL & Hash Threat Intelligence</span>
      <span style="font-size:0.7rem; color:var(--neon-green); border:1px solid var(--border-cyber); padding:1px 6px; border-radius:2px;">ONLINE</span>
    </div>
    <div style="font-size:0.8rem; color:var(--text-muted); margin:4px 0;">Flask platform using VirusTotal API, local SHA-256 hashing, SQLite audit history, and Chart.js reporting.</div>
    <div><a href="https://github.com/dakshita1010/ThreatLens" target="_blank" style="color:var(--neon-green); text-decoration:underline;">https://github.com/dakshita1010/ThreatLens</a></div>
  </div>

  <div style="margin-bottom:14px; padding:8px 12px; background:rgba(255,255,255,0.03); border-radius:4px; border:1px solid rgba(255,255,255,0.08);">
    <div style="display:flex; justify-content:space-between; align-items:center;">
      <span style="color:#fff; font-weight:700;">2. Federated-NIDS – Privacy-Preserving 4G/5G Intrusion Detection</span>
      <span style="font-size:0.7rem; color:var(--neon-cyan); border:1px solid var(--border-cyan); padding:1px 6px; border-radius:2px;">86% ACCURACY</span>
    </div>
    <div style="font-size:0.8rem; color:var(--text-muted); margin:4px 0;">PyTorch classifiers on CICIDS2017 dataset; Flower (flwr) FedAvg aggregation across 5 distributed client base stations.</div>
    <div><a href="https://github.com/maplelattte/federated-nids" target="_blank" style="color:var(--neon-cyan); text-decoration:underline;">https://github.com/maplelattte/federated-nids</a></div>
  </div>

  <div style="padding:8px 12px; background:rgba(255,255,255,0.03); border-radius:4px; border:1px solid rgba(255,255,255,0.08);">
    <div style="display:flex; justify-content:space-between; align-items:center;">
      <span style="color:#fff; font-weight:700;">3. HoverNotes – Always-on-Top Floating Notes Workspace</span>
      <span style="font-size:0.7rem; color:var(--neon-amber); border:1px solid rgba(245,158,11,0.3); padding:1px 6px; border-radius:2px;">GHOST MODE</span>
    </div>
    <div style="font-size:0.8rem; color:var(--text-muted); margin:4px 0;">Electron-based Windows desktop app with global hotkeys (Alt+Shift+G), adjustable transparency, and persistent storage.</div>
    <div><a href="https://github.com/dakshita1010/hover-notes" target="_blank" style="color:var(--neon-green); text-decoration:underline;">https://github.com/dakshita1010/hover-notes</a></div>
  </div>
</div>`,

    '/research': () => `
<div class="term-output-block" style="border-left-color:var(--neon-purple);">
  <div style="color:#c084fc; font-weight:700; margin-bottom:4px;">[ RESEARCH PUBLICATION // ASIT-2026 ]</div>
  <div style="color:#fff; font-weight:700; font-size:0.95rem;">In-Kernel Defense: Low-Latency In-Kernel Ransomware Containment with eBPF</div>
  <div style="color:var(--text-dim); font-size:0.8rem; margin:2px 0 10px;">
    Presented at: Hinweis Fifth Int'l Conference on Advances in Software Engineering and Information Technology (ASIT-2026)
  </div>
  <div style="color:var(--text-muted); font-size:0.82rem; line-height:1.6;">
    • <strong>Kernel Behavioral Telemetry:</strong> Syscall interception via eBPF kprobes with sub-millisecond anomaly detection.<br>
    • <strong>Shannon Entropy Computation:</strong> Live mathematical entropy measurement on file writes to catch encryption cycles early.<br>
    • <strong>Automated SIGSTOP Containment:</strong> Zero-delay process suspension in kernel space, slashing containment latency compared to legacy user-space daemons.
  </div>
</div>`,

    '/skills': () => `
<div class="term-output-block">
  <div style="color:var(--neon-green); font-weight:700; margin-bottom:8px;">[ TECHNICAL ARSENAL ]</div>
  <table class="term-table">
    <tr><td style="color:var(--neon-green); font-weight:600;">Languages</td><td>Java, Python, C/C++, JavaScript, SQL, Bash</td></tr>
    <tr><td style="color:var(--neon-green); font-weight:600;">Cybersecurity</td><td>Network Security, Threat Intelligence, Malware Analysis, Intrusion Detection</td></tr>
    <tr><td style="color:var(--neon-green); font-weight:600;">Security / Net</td><td>Wireshark, SHA-256 Hashing, VirusTotal API, eBPF Kernel Probes</td></tr>
    <tr><td style="color:var(--neon-green); font-weight:600;">Machine Learning</td><td>PyTorch, Federated Learning, Flower (flwr), FedAvg Aggregation</td></tr>
    <tr><td style="color:var(--neon-green); font-weight:600;">Development</td><td>Flask, SQLite, HTML5, CSS3, JavaScript, Electron</td></tr>
    <tr><td style="color:var(--neon-green); font-weight:600;">Tools & Platforms</td><td>Git, GitHub, Linux Environments, REST APIs, JSON</td></tr>
  </table>
</div>`,

    '/experience': () => `
<div class="term-output-block success">
  <div style="color:#fff; font-weight:700; margin-bottom:4px;">[ MISSION LOG // ISRO INTERNSHIP ]</div>
  <div><strong>Role:</strong> Remote Sensing & GIS Intern – India Space Academy (ISRO) [Jan 2026]</div>
  <div style="color:var(--text-dim); font-size:0.8rem; margin-bottom:6px;">
    Winter Training Programme: Remote Sensing & GIS – Basics to AI-Powered Geospatial Analysis
  </div>
  <div style="color:var(--text-muted); font-size:0.82rem; line-height:1.6;">
    • 4-week rigorous training in satellite telemetry, multispectral imagery, and spatial analysis.<br>
    • Engineered AI-assisted surface water classification using NDWI (Normalized Difference Water Index).<br>
    • Final evaluation score: <strong style="color:var(--neon-green);">98 / 100</strong>.
  </div>
</div>`,

    '/lab': (args) => {
      const target = args || 'https://malicious-ransomware-distrib.com/crypt.exe';
      return `
<div class="term-output-block" style="border-left-color:var(--neon-cyan);">
  <div style="color:var(--neon-cyan); font-weight:700; margin-bottom:6px;">[ THREATLENS INTELLIGENCE SCAN ]</div>
  <div style="color:var(--text-muted); font-size:0.82rem;">
    Target: <code style="color:#fff;">${escapeHtml(target)}</code><br>
    Engine: VirusTotal v3 API Heuristics + Client SHA-256 Web Crypto<br>
    Status: <span style="color:var(--neon-green);">Analyzed</span> (Scroll down or visit SOC Dashboard for interactive live analyzer)
  </div>
</div>`;
    },

    '/contact': () => `
<div class="term-output-block">
  <div style="color:var(--neon-green); font-weight:700; margin-bottom:6px;">[ COMMUNICATION UPLINK ]</div>
  <div style="color:var(--text-muted); font-size:0.84rem; line-height:1.8;">
    • Email: <a href="mailto:dakshita.mathur03@gmail.com" style="color:var(--neon-green);">dakshita.mathur03@gmail.com</a><br>
    • Phone: <a href="tel:+919696233384" style="color:var(--neon-green);">+91 9696233384</a><br>
    • GitHub: <a href="https://github.com/dakshita1010" target="_blank" style="color:var(--neon-green);">github.com/dakshita1010</a><br>
    • LinkedIn: <a href="https://linkedin.com/in/dakshita-mathur10" target="_blank" style="color:var(--neon-green);">linkedin.com/in/dakshita-mathur10</a>
  </div>
</div>`,

    '/links': () => `
<div class="term-output-block">
  <div style="color:var(--neon-green); font-weight:700; margin-bottom:6px;">[ DIRECT LINKS ]</div>
  <div style="display:flex; flex-wrap:wrap; gap:10px; margin-top:8px;">
    <a href="https://github.com/dakshita1010" target="_blank" class="cyber-btn cyber-btn-sm">GITHUB</a>
    <a href="https://linkedin.com/in/dakshita-mathur10" target="_blank" class="cyber-btn cyber-btn-sm">LINKEDIN</a>
    <a href="mailto:dakshita.mathur03@gmail.com" class="cyber-btn cyber-btn-sm">EMAIL</a>
  </div>
</div>`,

    '/cv': () => {
      const modal = document.getElementById('resume-modal');
      if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
      }
      return `<div class="term-output-block success">Dossier modal opened. Press Esc or close button to exit.</div>`;
    },

    '/theme': () => {
      const themes = ['emerald', 'cyan', 'violet'];
      const current = document.body.getAttribute('data-theme') || 'emerald';
      const next = themes[(themes.indexOf(current) + 1) % themes.length];
      document.body.setAttribute('data-theme', next);
      return `<div class="term-output-block success">Color theme toggled to: <strong>${next.toUpperCase()}</strong>.</div>`;
    },

    '/matrix': () => {
      if (window.toggleMatrixMode) {
        const active = window.toggleMatrixMode();
        return `<div class="term-output-block ${active ? 'success' : ''}">Matrix digital rain: <strong>${active ? 'ACTIVE' : 'DEACTIVATED'}</strong>.</div>`;
      }
      return `<div class="term-output-block error">Matrix canvas unavailable.</div>`;
    },

    '/history': () => {
      const list = commandHistory.map((cmd, i) => `${i + 1}. ${escapeHtml(cmd)}`).join('<br>');
      return `<div class="term-output-block">${list || 'No commands executed yet.'}</div>`;
    },

    '/welcome': () => `
<div class="term-output-block">
  <pre class="ascii-banner" style="font-size:0.68rem;">${ASCII_BANNER}</pre>
  <div style="color:var(--text-muted);">Welcome to the CyberHub SOC Terminal. Type <span style="color:var(--neon-green)">/help</span> to begin.</div>
</div>`,

    '/secret': () => `
<div class="term-output-block" style="border-left-color:var(--neon-amber);">
  <div style="color:var(--neon-amber); font-weight:700;">[ SOC CLASSIFIED ARCHIVE ]</div>
  <div>"Defending the kernel is not about building thicker walls; it's about seeing anomalies before syscalls complete."</div>
  <div style="color:var(--text-dim); font-size:0.75rem; margin-top:4px;">eBPF probes status: 12 active hooks | Latency overhead: &lt; 0.04ms</div>
</div>`,

    '/clear': () => {
      historyContainer.innerHTML = '';
      return null;
    }
  };

  // Add aliases
  COMMANDS['/whoami'] = COMMANDS['/about'];
  COMMANDS['/ops'] = COMMANDS['/projects'];
  COMMANDS['/ebpf'] = COMMANDS['/research'];
  COMMANDS['/cls'] = COMMANDS['/clear'];

  function execute(raw) {
    const trimmed = raw.trim();
    if (!trimmed) return;

    let normalized = trimmed;
    if (!normalized.startsWith('/') && !normalized.startsWith('http')) {
      normalized = '/' + normalized;
    }

    const parts = normalized.split(' ');
    const cmd = parts[0].toLowerCase();
    const args = parts.slice(1).join(' ');

    executedCount++;
    if (cmdCountEl) cmdCountEl.textContent = executedCount;
    commandHistory.push(trimmed);
    historyIndex = commandHistory.length;

    // Play tactile sound FX if enabled
    if (window.playCyberClick) {
      window.playCyberClick(700, 0.04);
    }

    // Append executed line
    const entry = document.createElement('div');
    entry.className = 'term-entry';
    entry.innerHTML = `
      <div class="term-prompt-line">
        <span class="term-symbol">$</span>
        <span class="term-cmd-executed">${escapeHtml(trimmed)}</span>
      </div>
    `;
    historyContainer.appendChild(entry);

    if (COMMANDS[cmd]) {
      const output = COMMANDS[cmd](args);
      if (output !== null) {
        const outDiv = document.createElement('div');
        outDiv.innerHTML = output;
        historyContainer.appendChild(outDiv);
      }
    } else {
      const errDiv = document.createElement('div');
      errDiv.className = 'term-output-block error';
      errDiv.innerHTML = `Directive not found: <strong>${escapeHtml(trimmed)}</strong>. Type <span style="color:var(--neon-green)">/help</span> for available commands.`;
      historyContainer.appendChild(errDiv);
    }

    terminalScreen.scrollTop = terminalScreen.scrollHeight;
  }

  function escapeHtml(str) {
    return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }

  // Keyboard events
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
      if (match) {
        terminalInput.value = match.name + ' ';
      }
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
    } else if (e.ctrlKey && e.key === 'l') {
      e.preventDefault();
      COMMANDS['/clear']();
    }
  });

  // Global helper for clickable elements
  window.runTermCmd = function (cmdStr) {
    terminalInput.value = '';
    execute(cmdStr);
    terminalInput.focus();
  };

  // Wire up pills in terminal header
  document.querySelectorAll('.term-cmd-pill').forEach(pill => {
    pill.addEventListener('click', () => {
      const cmd = pill.getAttribute('data-cmd');
      if (cmd) window.runTermCmd(cmd);
    });
  });
})();
