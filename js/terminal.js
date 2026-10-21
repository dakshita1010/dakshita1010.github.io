/**
 * Immersive Virtual Terminal Operating System (Zero Green, Graphite & Coral Red)
 * Dakshita Mathur Portfolio
 */

(function () {
  const terminalScreen = document.getElementById('terminal-screen');
  const terminalInput = document.getElementById('terminal-input');
  const logContainer = document.getElementById('terminal-log-flow');
  const uptimeEl = document.getElementById('term-uptime');
  const pathPreviewEl = document.getElementById('term-path-preview');
  const startTime = Date.now();

  if (!terminalInput || !logContainer) return;

  // Uptime counter
  setInterval(() => {
    if (uptimeEl) {
      const sec = Math.floor((Date.now() - startTime) / 1000);
      uptimeEl.textContent = sec < 60 ? `${sec}s` : `${Math.floor(sec / 60)}m ${sec % 60}s`;
    }
  }, 1000);

  // Current working directory
  let currentDir = '~';

  // Virtual File System
  const VFS = {
    '~': {
      type: 'dir',
      children: {
        'about.md': { type: 'file', content: getAboutContent },
        'academics.txt': { type: 'file', content: getEducationContent },
        'ThreatLens.py': { type: 'file', content: getThreatLensContent },
        'federated_nids.py': { type: 'file', content: getFederatedNidsContent },
        'HoverNotes.js': { type: 'file', content: getHoverNotesContent },
        'asit2026_ebpf_defense.c': { type: 'file', content: getResearchContent },
        'isro_internship.log': { type: 'file', content: getExperienceContent },
        'toolkit.json': { type: 'file', content: getSkillsContent },
        'uplink.sh': { type: 'file', content: getSocialContent },
        'resume.pdf': { type: 'file', content: () => { openResumeModal(); return 'Opening resume dossier modal...'; } }
      }
    }
  };

  function getAboutContent() {
    return `
<div class="term-output-card">
  <div style="color:#fff; font-weight:700; margin-bottom:4px;">DAKSHITA MATHUR</div>
  <div style="color:var(--text-muted); line-height:1.6; margin-bottom:8px;">
    B.Tech Computer Science student at <strong>VIT-AP (CGPA: 8.54/10)</strong> with hands-on research and engineering experience in 
    cybersecurity, machine learning, and systems programming.
  </div>
  <div style="color:var(--text-dim); font-size:0.82rem; line-height:1.6;">
    • Specialization: In-Kernel Defense (eBPF), Threat Intelligence, Privacy-Preserving ML.<br>
    • Research: Author of ASIT-2026 conference paper on low-latency ransomware containment.<br>
    • Internship: India Space Academy (ISRO) Remote Sensing & GIS Intern (Score: 98/100).
  </div>
</div>`;
  }

  function getEducationContent() {
    return `
<div class="term-output-card">
  <div style="color:#fff; font-weight:700; margin-bottom:6px;">ACADEMIC PEDIGREE:</div>
  <div style="color:var(--text-muted); font-size:0.84rem; line-height:1.7;">
    • <strong>Vellore Institute of Technology (VIT-AP)</strong> [Sep 2023 – Present]<br>
    &nbsp;&nbsp;Bachelor of Technology in Computer Science & Engineering | <span style="color:var(--accent-red); font-weight:700;">CGPA: 8.54 / 10.0</span><br><br>
    • <strong>Rani Laxmi Bai Memorial School, Lucknow</strong> [July 2022]<br>
    &nbsp;&nbsp;Class XII (CBSE) | <span style="color:var(--accent-red); font-weight:700;">Score: 85.2%</span><br><br>
    • <strong>St. Xavier’s Senior Secondary School, Chandigarh</strong> [July 2020]<br>
    &nbsp;&nbsp;Class X (ICSE) | <span style="color:var(--accent-red); font-weight:700;">Score: 89.2%</span>
  </div>
</div>`;
  }

  function getThreatLensContent() {
    return `
<div class="term-output-card">
  <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:6px;">
    <span style="color:#fff; font-weight:700; font-size:0.95rem;">ThreatLens – URL & File Hash Threat Intelligence</span>
    <span style="color:var(--accent-red); font-size:0.75rem; border:1px solid var(--border-accent); padding:1px 6px; border-radius:3px;">ONLINE</span>
  </div>
  <div style="color:var(--text-muted); font-size:0.84rem; line-height:1.6; margin-bottom:10px;">
    Built a Flask-based threat intelligence platform using the VirusTotal API to analyze URLs, file hashes, and local files across 5 test cases.
    Features local SHA-256 calculation, custom risk scoring engine, SQLite audit history, and Chart.js reporting.
  </div>
  <div style="margin-top:6px;">
    <a href="https://github.com/dakshita1010/ThreatLens" target="_blank" class="cyber-btn cyber-btn-sm">
      Open Repository (github.com/dakshita1010/ThreatLens) &rarr;
    </a>
  </div>
</div>`;
  }

  function getFederatedNidsContent() {
    return `
<div class="term-output-card" style="border-left-color:var(--accent-cyan);">
  <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:6px;">
    <span style="color:#fff; font-weight:700; font-size:0.95rem;">Federated-NIDS – 4G/5G Intrusion Detection System</span>
    <span style="color:var(--accent-cyan); font-size:0.75rem; border:1px solid rgba(56,189,248,0.3); padding:1px 6px; border-radius:3px;">86% ACCURACY</span>
  </div>
  <div style="color:var(--text-muted); font-size:0.84rem; line-height:1.6; margin-bottom:10px;">
    Privacy-preserving Network Intrusion Detection System using Federated Learning. Trained PyTorch neural classifiers on the CICIDS2017 dataset 
    for multi-class attack detection (DoS, DDoS, Port-Scan) across 5 distributed client nodes with Flower (flwr) FedAvg aggregation over 10 training rounds.
  </div>
  <div style="margin-top:6px;">
    <a href="https://github.com/maplelattte/federated-nids" target="_blank" class="cyber-btn cyber-btn-sm" style="border-color:var(--accent-cyan); color:var(--accent-cyan); background:var(--accent-cyan-dim);">
      Open Repository (github.com/maplelattte/federated-nids) &rarr;
    </a>
  </div>
</div>`;
  }

  function getHoverNotesContent() {
    return `
<div class="term-output-card" style="border-left-color:var(--accent-amber);">
  <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:6px;">
    <span style="color:#fff; font-weight:700; font-size:0.95rem;">HoverNotes – Always-on-Top Floating Notes Workspace</span>
    <span style="color:var(--accent-amber); font-size:0.75rem; border:1px solid rgba(245,158,11,0.3); padding:1px 6px; border-radius:3px;">GHOST MODE</span>
  </div>
  <div style="color:var(--text-muted); font-size:0.84rem; line-height:1.6; margin-bottom:10px;">
    Developed an Electron-based Windows desktop notes app with global hotkeys, click-through Ghost Mode (Alt+Shift+G), adjustable window transparency, 
    persistent local storage, collapsible mini-dock, and custom quick-action formatting tools.
  </div>
  <div style="margin-top:6px;">
    <a href="https://github.com/dakshita1010/hover-notes" target="_blank" class="cyber-btn cyber-btn-sm" style="border-color:var(--accent-amber); color:var(--accent-amber); background:rgba(245,158,11,0.12);">
      Open Repository (github.com/dakshita1010/hover-notes) &rarr;
    </a>
  </div>
</div>`;
  }

  function getResearchContent() {
    return `
<div class="term-output-card" style="border-left-color:var(--accent-purple);">
  <div style="color:var(--accent-purple); font-size:0.75rem; font-weight:700; margin-bottom:2px;">ASIT-2026 INTERNATIONAL CONFERENCE PAPER</div>
  <div style="color:#fff; font-weight:700; font-size:0.95rem; margin-bottom:6px;">In-Kernel Defense: Low-Latency In-Kernel Ransomware Containment with eBPF</div>
  <div style="color:var(--text-muted); font-size:0.84rem; line-height:1.6;">
    • <strong>Behavioral Interception:</strong> eBPF kprobes hook directly into sys_enter_write to detect anomalous encryption attempts.<br>
    • <strong>Shannon Entropy Measurement:</strong> Rapid calculation of file buffer randomness to spot encryption routines prior to disk persistence.<br>
    • <strong>Automated SIGSTOP Suspension:</strong> Kernel-level suspension mechanism slashing containment latency compared to legacy user-space daemons.
  </div>
</div>`;
  }

  function getExperienceContent() {
    return `
<div class="term-output-card">
  <div style="color:var(--accent-cyan); font-size:0.75rem; font-weight:700; margin-bottom:2px;">INDIA SPACE ACADEMY (ISRO) &bull; JANUARY 2026</div>
  <div style="color:#fff; font-weight:700; font-size:0.95rem; margin-bottom:6px;">Remote Sensing & GIS Intern</div>
  <div style="color:var(--text-muted); font-size:0.84rem; line-height:1.6;">
    • Winter Training Programme: Remote Sensing & GIS – Basics to AI-Powered Geospatial Analysis.<br>
    • Completed 4-week program on satellite imagery, remote sensing, and AI spatial analytics.<br>
    • Developed AI-assisted surface water mapping using NDWI to detect and delineate water bodies.<br>
    • Awarded distinction score of <strong style="color:var(--accent-red);">98 / 100</strong> in final comprehensive project evaluation.
  </div>
</div>`;
  }

  function getSkillsContent() {
    return `
<div class="term-output-card">
  <div style="color:#fff; font-weight:700; margin-bottom:6px;">TECHNICAL TOOLKIT:</div>
  <div style="color:var(--text-muted); font-size:0.84rem; line-height:1.7;">
    • <strong style="color:#fff;">Languages:</strong> Java, Python, C/C++, JavaScript, SQL, Bash<br>
    • <strong style="color:#fff;">Cybersecurity:</strong> Network Security, Threat Intelligence, Malware Analysis, Intrusion Detection<br>
    • <strong style="color:#fff;">Security / Networking:</strong> Wireshark, SHA-256, VirusTotal API, eBPF Kernel Probes<br>
    • <strong style="color:#fff;">Machine Learning:</strong> PyTorch, Federated Learning, Flower (flwr), FedAvg Aggregation<br>
    • <strong style="color:#fff;">Development:</strong> Flask, SQLite, HTML5, CSS3, JavaScript, Electron<br>
    • <strong style="color:#fff;">Tools & Platforms:</strong> Git, GitHub, Linux Environments, REST APIs, JSON
  </div>
</div>`;
  }

  function getSocialContent() {
    return `
<div class="term-output-card">
  <div style="color:#fff; font-weight:700; margin-bottom:6px;">COMMUNICATION UPLINK & REPOSITORIES:</div>
  <div style="color:var(--text-muted); font-size:0.84rem; line-height:1.8;">
    • Email: <a href="mailto:dakshita.mathur03@gmail.com" style="color:var(--accent-red);">dakshita.mathur03@gmail.com</a><br>
    • Phone: <a href="tel:+919696233384" style="color:var(--accent-red);">+91 9696233384</a><br>
    • GitHub Profile: <a href="https://github.com/dakshita1010" target="_blank" style="color:var(--accent-red);">github.com/dakshita1010</a><br>
    • LinkedIn Profile: <a href="https://linkedin.com/in/dakshita-mathur10" target="_blank" style="color:var(--accent-red);">linkedin.com/in/dakshita-mathur10</a>
  </div>
</div>`;
  }

  function openResumeModal() {
    const modal = document.getElementById('resume-modal');
    if (modal) {
      modal.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
  }

  // Real SHA-256 calculation
  async function computeSha256(text) {
    const encoder = new TextEncoder();
    const data = encoder.encode(text);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  }

  // Interactive Mini-Game: Tic Tac Toe in Terminal
  let tttBoard = Array(9).fill(null);
  let tttActive = false;

  function renderTtt() {
    let cells = tttBoard.map((c, i) => {
      const cls = c === 'X' ? 'ttt-cell x' : c === 'O' ? 'ttt-cell o' : 'ttt-cell';
      return `<div class="${cls}" onclick="window.makeTttMove(${i})">${c || (i + 1)}</div>`;
    }).join('');

    return `
<div class="term-output-card">
  <div style="color:#fff; font-weight:700; margin-bottom:4px;">TERMINAL TIC-TAC-TOE [You: X | CPU: O]</div>
  <div style="color:var(--text-muted); font-size:0.8rem;">Click a cell or type 'play 1-9' to make your move:</div>
  <div class="ttt-grid-box">${cells}</div>
</div>`;
  }

  window.makeTttMove = function (idx) {
    if (!tttActive || tttBoard[idx] !== null) return;
    tttBoard[idx] = 'X';

    // Check user win
    if (checkTttWin('X')) {
      tttActive = false;
      logOutput(renderTtt() + `<div style="color:var(--accent-red); font-weight:700;">[✓] CONGRATULATIONS! You defeated the system!</div>`);
      return;
    }

    // AI move
    const emptyIndices = tttBoard.map((v, i) => v === null ? i : null).filter(v => v !== null);
    if (emptyIndices.length > 0) {
      const aiChoice = emptyIndices[Math.floor(Math.random() * emptyIndices.length)];
      tttBoard[aiChoice] = 'O';
      if (checkTttWin('O')) {
        tttActive = false;
        logOutput(renderTtt() + `<div style="color:var(--accent-cyan); font-weight:700;">[!] CPU Wins. Better luck next time! Type 'tictactoe' to replay.</div>`);
        return;
      }
    } else {
      tttActive = false;
      logOutput(renderTtt() + `<div style="color:var(--accent-amber); font-weight:700;">[=] It's a draw! Type 'tictactoe' to play again.</div>`);
      return;
    }

    logOutput(renderTtt());
  };

  function checkTttWin(player) {
    const wins = [
      [0,1,2], [3,4,5], [6,7,8],
      [0,3,6], [1,4,7], [2,5,8],
      [0,4,8], [2,4,6]
    ];
    return wins.some(w => w.every(i => tttBoard[i] === player));
  }

  // Command Parser
  const commandHistory = [];
  let historyIndex = -1;

  async function execute(raw) {
    const trimmed = raw.trim();
    if (!trimmed) return;

    commandHistory.push(trimmed);
    historyIndex = commandHistory.length;

    // Append executed line
    const entry = document.createElement('div');
    entry.innerHTML = `
      <div class="term-auth-prompt font-mono">
        <span style="color:var(--rp-foam);">╭─ dakshita@archbox</span> <span style="color:var(--rp-gold);">${currentDir}</span> <span style="color:var(--rp-iris); font-size:0.75rem;"> main</span>
      </div>
      <div class="term-executed-row">
        <span style="color:var(--rp-love); font-weight:700;">╰─❯</span>
        <span style="color:var(--rp-text); font-weight:600;">${escapeHtml(trimmed)}</span>
      </div>
    `;
    logContainer.appendChild(entry);

    const parts = trimmed.split(' ');
    const cmd = parts[0].toLowerCase();
    const args = parts.slice(1).join(' ').trim();

    // 1. Core Navigation Commands (ls, cd, pwd, cat)
    if (cmd === 'ls') {
      let targetObj = currentDir === '~' ? VFS['~'].children : VFS['~'].children[currentDir.replace('~/', '')]?.children;
      if (!targetObj) targetObj = VFS['~'].children;

      if (args === '-la' || args === '-l') {
        let lines = Object.keys(targetObj).map(name => {
          const item = targetObj[name];
          const isDir = item.type === 'dir';
          const perm = isDir ? 'drwxr-xr-x' : (name.endsWith('.py') || name.endsWith('.sh') || name.endsWith('.c') ? '-rwxr-xr-x' : '-rw-r--r--');
          const size = isDir ? '4.0K' : (name.length * 140 + 'B');
          const icon = isDir ? '󰉋' : (name.endsWith('.py') ? '󰌠' : name.endsWith('.c') ? '󰆧' : '󰈚');
          const colorClass = isDir ? 'dir-folder' : (name.endsWith('.py') || name.endsWith('.sh') || name.endsWith('.c') ? 'dir-exec' : 'dir-file');
          return `<div><span style="color:var(--rp-muted);">${perm}  dakshita users  ${size.padEnd(6)}</span>  <span class="${colorClass}">${icon} ${name}${isDir ? '/' : ''}</span></div>`;
        }).join('');
        logOutput(`<div class="dir-tree-view" style="line-height:1.7;">${lines}</div>`);
      } else {
        let list = Object.keys(targetObj).map(name => {
          const item = targetObj[name];
          if (item.type === 'dir') return `<span class="dir-folder">󰉋 ${name}/</span>`;
          if (name.endsWith('.py') || name.endsWith('.sh') || name.endsWith('.c') || name.endsWith('.exe')) return `<span class="dir-exec"> ${name}*</span>`;
          return `<span class="dir-file">󰈚 ${name}</span>`;
        }).join('&nbsp;&nbsp;&nbsp;&nbsp;');
        logOutput(`<div class="dir-tree-view">${list}</div>`);
      }
    }
    else if (cmd === 'pwd') {
      logOutput(`<div style="color:var(--text-muted); font-size:0.85rem;">/home/dakshita${currentDir === '~' ? '' : '/' + currentDir.replace('~/', '')}</div>`);
    }
    else if (cmd === 'cd') {
      if (!args || args === '~' || args === '/') {
        currentDir = '~';
      } else if (args === '..') {
        currentDir = '~';
      } else {
        const cleanArg = args.replace(/\/$/, '');
        if (VFS['~'].children[cleanArg] && VFS['~'].children[cleanArg].type === 'dir') {
          currentDir = '~/' + cleanArg;
        } else {
          logOutput(`<div class="term-output-card error">cd: no such file or directory: ${escapeHtml(args)}</div>`);
          return;
        }
      }
      if (pathPreviewEl) pathPreviewEl.textContent = currentDir;
    }
    else if (cmd === 'cat') {
      if (!args) {
        logOutput(`<div class="term-output-card error">usage: cat &lt;filename&gt;</div>`);
        return;
      }
      const fileName = args.trim();
      let fileObj = null;

      if (fileName.includes('/')) {
        const [d, f] = fileName.split('/');
        fileObj = VFS['~'].children[d]?.children?.[f];
      } else {
        let curChildren = currentDir === '~' ? VFS['~'].children : VFS['~'].children[currentDir.replace('~/', '')]?.children;
        fileObj = curChildren?.[fileName] || VFS['~'].children[fileName];
      }

      if (fileObj && fileObj.type === 'file') {
        const out = fileObj.content();
        if (out) logOutput(out);
      } else {
        logOutput(`<div class="term-output-card error">cat: ${escapeHtml(fileName)}: No such file or directory</div>`);
      }
    }
    // 2. Direct Named Directives
    else if (cmd === 'help' || cmd === 'commands') {
      logOutput(getHelpTable());
    }
    else if (cmd === 'about' || cmd === 'whoami' || cmd === 'bio') {
      logOutput(getAboutContent());
    }
    else if (cmd === 'projects' || cmd === 'ops') {
      logOutput(getThreatLensContent() + getFederatedNidsContent() + getHoverNotesContent());
    }
    else if (cmd === 'research' || cmd === 'ebpf') {
      logOutput(getResearchContent());
    }
    else if (cmd === 'experience' || cmd === 'isro') {
      logOutput(getExperienceContent());
    }
    else if (cmd === 'education') {
      logOutput(getEducationContent());
    }
    else if (cmd === 'skills') {
      logOutput(getSkillsContent());
    }
    else if (cmd === 'social' || cmd === 'contact' || cmd === 'links') {
      logOutput(getSocialContent());
    }
    else if (cmd === 'cv' || cmd === 'resume') {
      openResumeModal();
      logOutput(`<div class="term-output-card">Resume dossier modal launched. Press Esc or close button to exit.</div>`);
    }
    // Visual Portfolio Scroll Navigation
    else if (cmd === 'gui' || cmd === 'portfolio' || cmd === 'web' || cmd === 'scroll' || cmd === 'down') {
      const target = document.getElementById('projects');
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
        logOutput(`<div class="term-output-card" style="border-left-color:var(--accent-cyan);"><span style="color:var(--accent-cyan);">[↓]</span> Scrolling to Visual Portfolio section...</div>`);
      }
    }
    else if (cmd === 'top' || cmd === 'term' || cmd === 'terminal') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      logOutput(`<div class="term-output-card"><span style="color:var(--accent-red);">[↑]</span> Scrolled back to top Terminal Workstation.</div>`);
    }
    // 3. Live Interactive Threat Scanner
    else if (cmd === 'scan' || cmd === 'threatlens') {
      const target = args || 'https://malicious-ransomware-distrib.com/crypt.exe';
      logOutput(`<div style="color:var(--accent-cyan); font-weight:700;">[*] Initiating ThreatLens heuristic scan on: <code>${escapeHtml(target)}</code>...</div>`);
      
      const hash = await computeSha256(target);
      const isMalicious = target.includes('malicious') || target.includes('ransomware') || target.includes('.exe');
      const vendors = isMalicious ? '54 / 72 Vendors Flagged' : '0 / 72 Vendors Flagged';
      const verdict = isMalicious ? 'CRITICAL RISK [MALICIOUS]' : 'CLEAN / VERIFIED';
      const verdictColor = isMalicious ? 'var(--accent-red)' : 'var(--accent-cyan)';

      setTimeout(() => {
        logOutput(`
<div class="term-output-card">
  <div><strong>Target:</strong> ${escapeHtml(target)}</div>
  <div style="margin: 4px 0;"><strong>Client-Side SHA-256 (Web Crypto):</strong> <code style="color:var(--accent-red);">${hash}</code></div>
  <div><strong>VirusTotal v3 Heuristic:</strong> ${vendors}</div>
  <div style="margin-top:4px;"><strong>Verdict:</strong> <span style="color:${verdictColor}; font-weight:700;">${verdict}</span></div>
</div>`);
      }, 300);
    }
    // 4. Tic Tac Toe Game
    else if (cmd === 'tictactoe' || cmd === 'game') {
      tttBoard = Array(9).fill(null);
      tttActive = true;
      logOutput(renderTtt());
    }
    else if (cmd === 'play') {
      const cellIdx = parseInt(args) - 1;
      if (!isNaN(cellIdx) && cellIdx >= 0 && cellIdx <= 8) {
        window.makeTttMove(cellIdx);
      } else {
        logOutput(`<div class="term-output-card error">usage: play 1-9</div>`);
      }
    }
    // 5. Matrix Code Rain
    else if (cmd === 'matrix') {
      const canvas = document.getElementById('matrix-canvas');
      if (canvas) {
        canvas.classList.toggle('active');
        const isActive = canvas.classList.contains('active');
        logOutput(`<div class="term-output-card">Matrix digital rain: <strong>${isActive ? 'ACTIVATED' : 'DEACTIVATED'}</strong></div>`);
      }
    }
    // 6. Utility Commands
    else if (cmd === 'clear' || cmd === 'cls') {
      logContainer.innerHTML = '';
    }
    else if (cmd === 'date') {
      logOutput(`<div>${new Date().toUTCString()}</div>`);
    }
    else if (cmd === 'sudo') {
      if (args.includes('rm -rf') || args.includes('rm')) {
        logOutput(`<div class="term-output-card error">[!] SYSTEM DEFENSE INTERCEPT: In-Kernel eBPF Probes blocked unauthorized root deletion. Process suspended (SIGSTOP).</div>`);
      } else if (args) {
        execute(args);
      } else {
        logOutput(`<div class="term-output-card error">sudo: command required</div>`);
      }
    }
    else {
      logOutput(`<div class="term-output-card error">Command not found: <strong>${escapeHtml(trimmed)}</strong>. Type <span style="color:var(--accent-red); font-weight:600;">help</span> for available commands.</div>`);
    }

    terminalScreen.scrollTop = terminalScreen.scrollHeight;
  }

  function logOutput(html) {
    const div = document.createElement('div');
    div.innerHTML = html;
    logContainer.appendChild(div);
    terminalScreen.scrollTop = terminalScreen.scrollHeight;
  }

  function getHelpTable() {
    return `
<div class="term-output-panel">
  <table class="term-cmd-table font-mono">
    <tr><td style="width:130px;"><span class="cmd-name" onclick="window.runTermCmd('help')">help</span> <span class="term-arrow">=&gt;</span></td><td class="cmd-desc">display this command directory</td></tr>
    <tr><td><span class="cmd-name" onclick="window.runTermCmd('clear')">clear</span> <span class="term-arrow">=&gt;</span></td><td class="cmd-desc">clear the terminal screen buffer</td></tr>
    <tr><td><span class="cmd-name" onclick="window.runTermCmd('about')">about</span> <span class="term-arrow">=&gt;</span></td><td class="cmd-desc">operator briefing (VIT-AP B.Tech CSE, 8.54 CGPA)</td></tr>
    <tr><td><span class="cmd-name" onclick="window.runTermCmd('social')">social</span> <span class="term-arrow">=&gt;</span></td><td class="cmd-desc">social links, email & GitHub profile</td></tr>
    <tr><td><span class="cmd-name" onclick="window.runTermCmd('projects')">projects</span> <span class="term-arrow">=&gt;</span></td><td class="cmd-desc">classified operations (ThreatLens, Federated-NIDS, HoverNotes)</td></tr>
    <tr><td><span class="cmd-name" onclick="window.runTermCmd('research')">research</span> <span class="term-arrow">=&gt;</span></td><td class="cmd-desc">ASIT-2026 paper: In-Kernel Defense via eBPF</td></tr>
    <tr><td><span class="cmd-name" onclick="window.runTermCmd('skills')">skills</span> <span class="term-arrow">=&gt;</span></td><td class="cmd-desc">defensive & offensive technical arsenal</td></tr>
    <tr><td><span class="cmd-name" onclick="window.runTermCmd('experience')">experience</span> <span class="term-arrow">=&gt;</span></td><td class="cmd-desc">ISRO space academy mission log (Score: 98/100)</td></tr>
    <tr><td><span class="cmd-name" onclick="window.runTermCmd('scan')">scan</span> <span class="term-arrow">=&gt;</span></td><td class="cmd-desc">live client-side SHA-256 hash & threat analyzer</td></tr>
    <tr><td><span class="cmd-name" onclick="window.runTermCmd('tictactoe')">tictactoe</span> <span class="term-arrow">=&gt;</span></td><td class="cmd-desc">play interactive mini-game in terminal</td></tr>
    <tr><td><span class="cmd-name" onclick="window.runTermCmd('matrix')">matrix</span> <span class="term-arrow">=&gt;</span></td><td class="cmd-desc">toggle background Matrix digital rain</td></tr>
    <tr><td><span class="cmd-name" onclick="window.runTermCmd('gui')">gui</span> <span class="term-arrow">=&gt;</span></td><td class="cmd-desc">scroll down to visual projects & dossier</td></tr>
    <tr><td><span class="cmd-name" onclick="window.runTermCmd('top')">top</span> <span class="term-arrow">=&gt;</span></td><td class="cmd-desc">scroll back up to terminal workstation</td></tr>
    <tr><td><span class="cmd-name" onclick="window.runTermCmd('cv')">cv</span> <span class="term-arrow">=&gt;</span></td><td class="cmd-desc">open printable resume dossier modal</td></tr>
    <tr><td><span class="cmd-name" onclick="window.runTermCmd('ls')">ls</span> <span class="term-arrow">=&gt;</span></td><td class="cmd-desc">list files in virtual filesystem (or 'cd &lt;dir&gt;')</td></tr>
  </table>
</div>`;
  }

  function escapeHtml(str) {
    return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }

  // Key Listeners
  terminalInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      const val = terminalInput.value;
      terminalInput.value = '';
      execute(val);
    } else if (e.key === 'Tab') {
      e.preventDefault();
      const current = terminalInput.value.trim().toLowerCase();
      if (!current) return;

      const cmds = ['help', 'clear', 'about', 'social', 'projects', 'research', 'skills', 'experience', 'contact', 'cv', 'scan', 'gui', 'portfolio', 'top', 'tictactoe', 'matrix', 'ls', 'cd', 'cat', 'pwd'];
      const match = cmds.find(c => c.startsWith(current));
      if (match) {
        terminalInput.value = match + ' ';
        return;
      }

      // Check file/dir match
      let curChildren = currentDir === '~' ? VFS['~'].children : VFS['~'].children[currentDir.replace('~/', '')]?.children;
      if (curChildren) {
        const fileMatch = Object.keys(curChildren).find(f => f.toLowerCase().startsWith(current));
        if (fileMatch) terminalInput.value = (current.startsWith('cat') ? '' : 'cat ') + fileMatch;
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
    }
  });

  // Global Runner for Pills and Links
  window.runTermCmd = function (cmdStr) {
    terminalInput.value = '';
    execute(cmdStr);
    terminalInput.focus();
  };

  document.querySelectorAll('.term-pill').forEach(pill => {
    pill.addEventListener('click', () => {
      const cmd = pill.getAttribute('data-cmd');
      if (cmd) window.runTermCmd(cmd);
    });
  });
})();
