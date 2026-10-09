/**
 * Cyber Terminal Emulator (TERMINAL.EXE)
 * Dakshita Mathur Cybersecurity Portfolio
 */

(function () {
  const outputContainer = document.getElementById('terminal-output');
  const inputField = document.getElementById('terminal-input');
  const terminalBody = document.getElementById('terminal-body');
  const suggestionChips = document.querySelectorAll('.sugg-chip');
  const quickActions = document.querySelectorAll('.term-quick-btn');

  if (!inputField || !outputContainer) return;

  const commandHistory = [];
  let historyIndex = -1;

  const COMMANDS = {
    help: () => `
<div class="term-response">
  <div style="color: var(--neon-cyan); font-weight: 700; margin-bottom: 6px;">[ AVAILABLE SYSTEM DIRECTIVES ]</div>
  <table class="term-table">
    <tr><td><span style="color:var(--neon-green)">help</span></td><td>Display this command manual</td></tr>
    <tr><td><span style="color:var(--neon-green)">whoami</span></td><td>Display candidate identity dossier & background</td></tr>
    <tr><td><span style="color:var(--neon-green)">projects</span></td><td>List classified operations & repositories</td></tr>
    <tr><td><span style="color:var(--neon-green)">research</span></td><td>ASIT-2026 In-Kernel eBPF defense publication</td></tr>
    <tr><td><span style="color:var(--neon-green)">threatlens</span></td><td>Inspect ThreatLens URL/Hash intelligence engine</td></tr>
    <tr><td><span style="color:var(--neon-green)">fl-nids</span></td><td>Inspect Federated Learning 4G/5G intrusion detection</td></tr>
    <tr><td><span style="color:var(--neon-green)">skills</span></td><td>List offensive/defensive technical arsenal</td></tr>
    <tr><td><span style="color:var(--neon-green)">education</span></td><td>Academic pedigree & verified CGPA</td></tr>
    <tr><td><span style="color:var(--neon-green)">experience</span></td><td>ISRO space academy internship telemetry</td></tr>
    <tr><td><span style="color:var(--neon-green)">contact</span></td><td>Display communication uplink & channels</td></tr>
    <tr><td><span style="color:var(--neon-green)">matrix</span></td><td>Toggle background Matrix digital rain</td></tr>
    <tr><td><span style="color:var(--neon-green)">clear</span></td><td>Purge terminal screen buffer</td></tr>
  </table>
  <div style="color: var(--text-dim); margin-top: 6px;">TIP: Use UP / DOWN arrow keys to navigate command history.</div>
</div>`,

    whoami: () => `
<div class="term-response success">
  <div style="font-weight: 700; color: #fff; margin-bottom: 6px;">[ OPERATOR PROFILE ]</div>
  <div><strong>NAME:</strong> Dakshita Mathur</div>
  <div><strong>TITLE:</strong> Cybersecurity Researcher & Machine Learning Systems Developer</div>
  <div><strong>INSTITUTION:</strong> Vellore Institute of Technology (VIT-AP) | B.Tech CSE (CGPA: 8.54/10)</div>
  <div><strong>DOMAINS:</strong> In-Kernel Defense (eBPF), Threat Intelligence, Privacy-Preserving ML, Systems Programming</div>
  <div style="margin-top: 8px; color: var(--text-muted); font-size: 0.8rem;">
    "B.Tech Computer Science student at VIT-AP with hands-on experience in cybersecurity, machine learning, software development, 
    and technical research. Published author on low-latency in-kernel ransomware containment at ASIT-2026."
  </div>
</div>`,

    projects: () => `
<div class="term-response">
  <div style="color: var(--neon-cyan); font-weight: 700; margin-bottom: 8px;">[ CLASSIFIED OPERATIONS & REPOSITORIES ]</div>
  
  <div style="margin-bottom: 10px; border-left: 2px solid var(--neon-red); padding-left: 8px;">
    <div style="color: #fff; font-weight: 700;">1. ThreatLens - URL & File Hash Threat Intelligence</div>
    <div style="color: var(--text-muted); font-size: 0.78rem;">Flask, VirusTotal API, Local SHA-256 Hashing, Custom Risk Engine, SQLite</div>
    <div><a href="https://github.com/dakshita1010/ThreatLens" target="_blank" style="color: var(--neon-cyan); text-decoration: underline;">https://github.com/dakshita1010/ThreatLens</a></div>
  </div>

  <div style="margin-bottom: 10px; border-left: 2px solid var(--neon-cyan); padding-left: 8px;">
    <div style="color: #fff; font-weight: 700;">2. Federated-NIDS - Privacy-Preserving Intrusion Detection</div>
    <div style="color: var(--text-muted); font-size: 0.78rem;">PyTorch, Flower (flwr) FedAvg, CICIDS2017 Dataset, 86% Accuracy across 5 Base Stations</div>
    <div><a href="https://github.com/maplelattte/federated-nids" target="_blank" style="color: var(--neon-cyan); text-decoration: underline;">https://github.com/maplelattte/federated-nids</a></div>
  </div>

  <div style="margin-bottom: 6px; border-left: 2px solid var(--neon-amber); padding-left: 8px;">
    <div style="color: #fff; font-weight: 700;">3. HoverNotes - Always-On-Top Floating Workspace</div>
    <div style="color: var(--text-muted); font-size: 0.78rem;">Electron, Ghost Mode (Alt+Shift+G), Global Hotkeys, Mini-dock, Persistent Storage</div>
    <div><a href="https://github.com/dakshita1010/hover-notes" target="_blank" style="color: var(--neon-cyan); text-decoration: underline;">https://github.com/dakshita1010/hover-notes</a></div>
  </div>
</div>`,

    research: () => `
<div class="term-response" style="border-left-color: var(--neon-purple);">
  <div style="color: #c084fc; font-weight: 700; margin-bottom: 4px;">[ RESEARCH & PEER-REVIEWED PUBLICATION ]</div>
  <div style="color: #fff; font-weight: 700; font-size: 0.92rem;">In-Kernel Defense: Low-Latency In-Kernel Ransomware Containment with eBPF</div>
  <div style="color: var(--neon-purple); font-size: 0.8rem; margin: 4px 0 10px;">Presented at: Hinweis Fifth Int'l Conference on Advances in Software Engineering & IT (ASIT-2026)</div>
  <ul style="padding-left: 18px; color: var(--text-muted); font-size: 0.8rem; line-height: 1.6;">
    <li>Kernel-level behavioral syscall telemetry using eBPF probes for sub-millisecond anomaly detection.</li>
    <li>Shannon entropy computation on write payloads to intercept encryption phases before disk persistence.</li>
    <li>Automated in-kernel process suspension (SIGSTOP), drastically slashing containment latency compared to legacy user-space daemons.</li>
  </ul>
</div>`,

    threatlens: () => `
<div class="term-response" style="border-left-color: var(--neon-red);">
  <div style="color: var(--neon-red); font-weight: 700;">[ DEEP DIVE // THREATLENS ]</div>
  <div><strong>Repository:</strong> <a href="https://github.com/dakshita1010/ThreatLens" target="_blank" style="color: var(--neon-cyan);">github.com/dakshita1010/ThreatLens</a></div>
  <div style="margin: 6px 0; color: var(--text-muted); font-size: 0.8rem;">
    • Architecture: Flask microservice with VirusTotal API v3 integration.<br>
    • Local Security: Computes client-side SHA-256 hash without auto-uploading sensitive files.<br>
    • Custom Risk Engine: Weighted scoring of vendor flags (Clean, Suspicious, Malicious).<br>
    • Persistence: SQLite query audit history + JSON export + Chart.js graphical telemetry.
  </div>
</div>`,

    'fl-nids': () => `
<div class="term-response" style="border-left-color: var(--neon-cyan);">
  <div style="color: var(--neon-cyan); font-weight: 700;">[ DEEP DIVE // FEDERATED-NIDS ]</div>
  <div><strong>Repository:</strong> <a href="https://github.com/maplelattte/federated-nids" target="_blank" style="color: var(--neon-cyan);">github.com/maplelattte/federated-nids</a></div>
  <div style="margin: 6px 0; color: var(--text-muted); font-size: 0.8rem;">
    • Objective: Decentralized intrusion detection for 4G/5G cellular base stations.<br>
    • Privacy: Raw network packet records never leave local base stations; only tensor gradients are shared.<br>
    • Aggregation: 10 training rounds of FedAvg over 5 simulated base station clients.<br>
    • Performance: 86% detection accuracy on CICIDS2017 multi-class attack categories (DoS, DDoS, Port-Scan).
  </div>
</div>`,

    skills: () => `
<div class="term-response">
  <div style="color: var(--neon-green); font-weight: 700; margin-bottom: 6px;">[ TECHNICAL ARSENAL ]</div>
  <div><strong style="color:var(--neon-cyan)">Languages:</strong> Java, Python, C/C++</div>
  <div><strong style="color:var(--neon-cyan)">Cybersecurity:</strong> Network Security, Threat Intelligence, Malware Analysis, Intrusion Detection</div>
  <div><strong style="color:var(--neon-cyan)">Security & Net:</strong> Wireshark, SHA-256, VirusTotal, eBPF</div>
  <div><strong style="color:var(--neon-cyan)">Machine Learning:</strong> PyTorch, Federated Learning, Flower (flwr)</div>
  <div><strong style="color:var(--neon-cyan)">Development:</strong> Flask, SQLite, HTML5, CSS3, JavaScript, Electron</div>
  <div><strong style="color:var(--neon-cyan)">Tools & Platforms:</strong> Git, GitHub, Linux Environments, REST APIs, JSON</div>
</div>`,

    education: () => `
<div class="term-response">
  <div style="color: var(--neon-cyan); font-weight: 700; margin-bottom: 6px;">[ ACADEMIC RECORD ]</div>
  <div style="margin-bottom: 8px;">
    <strong>Vellore Institute of Technology, AP</strong> [Sep 2023 - Present]<br>
    Bachelor of Technology in Computer Science & Engineering | <span style="color:var(--neon-green)">CGPA: 8.54/10</span>
  </div>
  <div style="margin-bottom: 8px;">
    <strong>Rani Laxmi Bai Memorial School, Lucknow</strong> [July 2022]<br>
    Class XII (CBSE) | <span style="color:var(--neon-green)">85.2%</span>
  </div>
  <div>
    <strong>St. Xavier’s Senior Secondary School, Chandigarh</strong> [July 2020]<br>
    Class X (ICSE) | <span style="color:var(--neon-green)">89.2%</span>
  </div>
</div>`,

    experience: () => `
<div class="term-response success">
  <div style="font-weight: 700; color: #fff; margin-bottom: 4px;">[ MISSION LOG // ISRO INTERNSHIP ]</div>
  <div><strong>Role:</strong> Remote Sensing & GIS Intern - India Space Academy (ISRO)</div>
  <div><strong>Timeline:</strong> January 2026</div>
  <div><strong>Programme:</strong> Winter Training: Remote Sensing & GIS - Basics to AI-Powered Geospatial Analysis</div>
  <div style="margin-top: 6px; color: var(--text-muted); font-size: 0.8rem;">
    • 4-week program in satellite telemetry, GIS analysis, and geospatial ML models.<br>
    • Built AI-assisted surface water classification using NDWI (Normalized Difference Water Index).<br>
    • Final Project Evaluation Score: <strong style="color: var(--neon-green);">98 / 100</strong>.
  </div>
</div>`,

    contact: () => `
<div class="term-response">
  <div style="color: var(--neon-cyan); font-weight: 700; margin-bottom: 6px;">[ COMMUNICATION UPLINK ]</div>
  <div><strong>Email:</strong> <a href="mailto:dakshita.mathur03@gmail.com" style="color:var(--neon-cyan)">dakshita.mathur03@gmail.com</a></div>
  <div><strong>Phone:</strong> +91 9696233384</div>
  <div><strong>GitHub:</strong> <a href="https://github.com/dakshita1010" target="_blank" style="color:var(--neon-cyan)">github.com/dakshita1010</a></div>
  <div><strong>LinkedIn:</strong> <a href="https://linkedin.com/in/dakshita-mathur10" target="_blank" style="color:var(--neon-cyan)">linkedin.com/in/dakshita-mathur10</a></div>
</div>`,

    matrix: () => {
      if (window.toggleMatrixMode) {
        const active = window.toggleMatrixMode();
        return `<div class="term-response ${active ? 'success' : 'warning'}">[ MATRIX DIGITAL RAIN: ${active ? 'ACTIVATED' : 'DEACTIVATED'} ]</div>`;
      }
      return `<div class="term-response error">Matrix canvas module not ready.</div>`;
    },

    clear: () => {
      outputContainer.innerHTML = '';
      return null;
    }
  };

  // Aliases
  COMMANDS.cls = COMMANDS.clear;
  COMMANDS.bio = COMMANDS.whoami;
  COMMANDS.about = COMMANDS.whoami;
  COMMANDS.ops = COMMANDS.projects;
  COMMANDS.fl = COMMANDS['fl-nids'];
  COMMANDS.ebpf = COMMANDS.research;
  COMMANDS.socials = COMMANDS.contact;

  function executeCommand(rawCmd) {
    const cmd = rawCmd.trim().toLowerCase();
    if (!cmd) return;

    // Play cyber click sound if available
    if (window.playCyberClick) {
      window.playCyberClick(600, 0.05);
    }

    // Append user input line to output
    const lineEl = document.createElement('div');
    lineEl.className = 'term-line';
    lineEl.innerHTML = `
      <div class="term-prompt-line">
        <span class="term-prompt-user">operator@cyberhub</span><span class="term-prompt-symbol">:</span><span class="term-prompt-path">~</span><span class="term-prompt-symbol">$</span>
        <span class="term-command-text">${escapeHtml(cmd)}</span>
      </div>
    `;
    outputContainer.appendChild(lineEl);

    // Save history
    commandHistory.push(cmd);
    historyIndex = commandHistory.length;

    // Execute
    if (COMMANDS[cmd]) {
      const result = COMMANDS[cmd]();
      if (result !== null) {
        const resEl = document.createElement('div');
        resEl.innerHTML = result;
        outputContainer.appendChild(resEl);
      }
    } else {
      const errEl = document.createElement('div');
      errEl.className = 'term-response error';
      errEl.innerHTML = `Command not recognized: <strong>"${escapeHtml(cmd)}"</strong>. Type <span style="color:var(--neon-green)">help</span> for directives.`;
      outputContainer.appendChild(errEl);
    }

    // Auto-scroll to bottom
    terminalBody.scrollTop = terminalBody.scrollHeight;
  }

  function escapeHtml(str) {
    return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }

  // Keydown handler
  inputField.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      const val = inputField.value;
      inputField.value = '';
      executeCommand(val);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (historyIndex > 0) {
        historyIndex--;
        inputField.value = commandHistory[historyIndex];
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex < commandHistory.length - 1) {
        historyIndex++;
        inputField.value = commandHistory[historyIndex];
      } else {
        historyIndex = commandHistory.length;
        inputField.value = '';
      }
    }
  });

  // Click on suggestions chips
  suggestionChips.forEach((chip) => {
    chip.addEventListener('click', () => {
      const cmd = chip.getAttribute('data-cmd');
      if (cmd) {
        executeCommand(cmd);
        inputField.focus();
      }
    });
  });

  // Quick Action Buttons in Window Top Bar
  quickActions.forEach((btn) => {
    btn.addEventListener('click', () => {
      const action = btn.getAttribute('data-action');
      if (action) {
        executeCommand(action);
        inputField.focus();
      }
    });
  });
})();
