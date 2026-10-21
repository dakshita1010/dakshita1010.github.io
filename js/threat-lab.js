/**
 * Threat Intelligence Lab & Hash Calculator (BlockTrade Style)
 * Real Client-Side SHA-256 via Web Crypto API
 * Dakshita Mathur Portfolio
 */

(function () {
  const inputEl = document.getElementById('inspector-input');
  const analyzeBtn = document.getElementById('inspector-analyze-btn');
  const hashOutputEl = document.getElementById('inspector-hash-val');
  const vendorCountEl = document.getElementById('inspector-vendor-count');
  const progressBarEl = document.getElementById('inspector-risk-bar');
  const verdictEl = document.getElementById('inspector-verdict-tag');
  const copyBtn = document.getElementById('inspector-copy-hash');
  const presetChips = document.querySelectorAll('.inspector-preset-chip');
  const modeTabs = document.querySelectorAll('.mode-tab-btn');

  if (!inputEl || !analyzeBtn) return;

  // Real SHA-256 calculation
  async function computeSha256(text) {
    const encoder = new TextEncoder();
    const data = encoder.encode(text);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  }

  // VirusTotal Heuristic Simulator
  function analyzeTarget(targetStr) {
    const lower = targetStr.toLowerCase();
    const totalVendors = 72;
    let malicious = 0;
    let suspicious = 0;

    if (lower.includes('ransomware') || lower.includes('.exe') || lower.includes('phish') || lower.includes('malware') || lower.includes('crypt')) {
      malicious = Math.floor(Math.random() * 20) + 42; // 42-61 vendors
      suspicious = Math.floor(Math.random() * 5) + 3;
    } else if (lower.includes('shortener') || lower.includes('.xyz') || lower.includes('temp') || lower.includes('script') || lower.includes('unknown')) {
      malicious = Math.floor(Math.random() * 8) + 6;
      suspicious = Math.floor(Math.random() * 6) + 4;
    } else {
      malicious = 0;
      suspicious = Math.random() > 0.85 ? 1 : 0;
    }

    const clean = totalVendors - (malicious + suspicious);
    const riskScore = Math.min(100, Math.round(((malicious * 1.5) + (suspicious * 0.7)) * (100 / totalVendors)));

    let verdict = 'CLEAN / VERIFIED';
    let color = 'var(--neon-green)';
    let bg = 'var(--neon-green-dim)';

    if (riskScore > 40) {
      verdict = 'CRITICAL MALICIOUS';
      color = 'var(--neon-red)';
      bg = 'rgba(239, 68, 68, 0.15)';
    } else if (riskScore > 10) {
      verdict = 'ELEVATED RISK';
      color = 'var(--neon-amber)';
      bg = 'rgba(245, 158, 11, 0.15)';
    }

    return {
      malicious,
      suspicious,
      clean,
      totalVendors,
      riskScore,
      verdict,
      color,
      bg
    };
  }

  async function runInspection() {
    const val = inputEl.value.trim();
    if (!val) {
      inputEl.focus();
      return;
    }

    if (window.playCyberClick) {
      window.playCyberClick(800, 0.05);
    }

    analyzeBtn.disabled = true;
    analyzeBtn.textContent = 'RUNNING HEURISTICS & HASHING...';

    try {
      // 1. Calculate Real SHA-256
      const sha256 = await computeSha256(val);
      if (hashOutputEl) {
        hashOutputEl.textContent = sha256;
      }

      // 2. Compute threat metrics
      const results = analyzeTarget(val);

      if (vendorCountEl) {
        vendorCountEl.textContent = `${results.malicious} / ${results.totalVendors} VENDORS`;
      }

      if (progressBarEl) {
        progressBarEl.style.width = `${results.riskScore}%`;
        progressBarEl.style.backgroundColor = results.color;
      }

      if (verdictEl) {
        verdictEl.textContent = `${results.verdict} (${results.riskScore}/100)`;
        verdictEl.style.color = results.color;
        verdictEl.style.backgroundColor = results.bg;
      }
    } catch (err) {
      console.error(err);
      if (hashOutputEl) hashOutputEl.textContent = 'Error computing SHA-256';
    } finally {
      analyzeBtn.disabled = false;
      analyzeBtn.textContent = 'EXECUTE THREAT SCAN';
    }
  }

  analyzeBtn.addEventListener('click', runInspection);

  inputEl.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') runInspection();
  });

  presetChips.forEach(chip => {
    chip.addEventListener('click', () => {
      inputEl.value = chip.getAttribute('data-val');
      runInspection();
    });
  });

  modeTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      modeTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      const mode = tab.getAttribute('data-mode');
      if (mode === 'url') {
        inputEl.placeholder = 'e.g. https://malicious-ransomware-distrib.com/crypt.exe';
      } else {
        inputEl.placeholder = 'e.g. SHA-256, MD5, or arbitrary file payload text...';
      }
    });
  });

  if (copyBtn && hashOutputEl) {
    copyBtn.addEventListener('click', () => {
      const text = hashOutputEl.textContent;
      if (text && text !== 'Standby...') {
        navigator.clipboard.writeText(text).then(() => {
          const orig = copyBtn.textContent;
          copyBtn.textContent = 'COPIED!';
          setTimeout(() => { copyBtn.textContent = orig; }, 1500);
        });
      }
    });
  }

  // Initial calculation
  if (inputEl.value) {
    runInspection();
  }
})();
