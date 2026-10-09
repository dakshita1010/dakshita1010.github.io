/**
 * Threat Intelligence Lab - Interactive ThreatLens Simulator
 * Real Client-Side SHA-256 Hashing via Web Crypto API
 * Dakshita Mathur Portfolio
 */

(function () {
  const inputEl = document.getElementById('lab-input');
  const analyzeBtn = document.getElementById('lab-analyze-btn');
  const hashOutputEl = document.getElementById('lab-hash-output');
  const vendorScoreEl = document.getElementById('lab-vendor-score');
  const riskBarEl = document.getElementById('lab-risk-bar');
  const riskVerdictEl = document.getElementById('lab-risk-verdict');
  const copyHashBtn = document.getElementById('lab-copy-hash');
  const presetChips = document.querySelectorAll('.lab-preset-btn');

  if (!inputEl || !analyzeBtn) return;

  // Real SHA-256 Calculation using Web Crypto API
  async function computeSha256(message) {
    const msgBuffer = new TextEncoder().encode(message);
    const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  }

  // ThreatLens Heuristic Simulation
  function simulateThreatIntel(inputStr) {
    const lower = inputStr.toLowerCase();
    let malicious = 0;
    let suspicious = 0;
    let totalVendors = 72;

    if (lower.includes('malware') || lower.includes('phish') || lower.includes('.exe') || lower.includes('trojan') || lower.includes('exploit')) {
      malicious = Math.floor(Math.random() * 25) + 38; // 38 - 63 detections
      suspicious = Math.floor(Math.random() * 6) + 3;
    } else if (lower.includes('suspicious') || lower.includes('unknown') || lower.includes('.xyz') || lower.includes('temp') || lower.includes('bit.ly')) {
      malicious = Math.floor(Math.random() * 8) + 4;
      suspicious = Math.floor(Math.random() * 8) + 3;
    } else {
      // Clean or standard string
      malicious = 0;
      suspicious = Math.random() > 0.8 ? 1 : 0;
    }

    const clean = totalVendors - (malicious + suspicious);
    const riskScore = Math.min(100, Math.round(((malicious * 1.5) + (suspicious * 0.7)) * (100 / totalVendors)));

    let verdict = 'CLEAN / REPUTABLE';
    let verdictColor = 'var(--neon-green)';
    let badgeBg = 'rgba(0, 255, 136, 0.15)';
    let barColor = 'var(--neon-green)';

    if (riskScore > 40) {
      verdict = 'CRITICAL MALICIOUS THREAT';
      verdictColor = 'var(--neon-red)';
      badgeBg = 'rgba(255, 51, 102, 0.15)';
      barColor = 'var(--neon-red)';
    } else if (riskScore > 10) {
      verdict = 'SUSPICIOUS / ELEVATED RISK';
      verdictColor = 'var(--neon-amber)';
      badgeBg = 'rgba(255, 170, 0, 0.15)';
      barColor = 'var(--neon-amber)';
    }

    return {
      malicious,
      suspicious,
      clean,
      totalVendors,
      riskScore,
      verdict,
      verdictColor,
      badgeBg,
      barColor
    };
  }

  async function runThreatAnalysis() {
    const val = inputEl.value.trim();
    if (!val) {
      inputEl.focus();
      return;
    }

    if (window.playCyberClick) {
      window.playCyberClick(800, 0.08);
    }

    analyzeBtn.disabled = true;
    analyzeBtn.textContent = 'ANALYZING THREAT INTEL...';

    try {
      // 1. Calculate Real SHA-256
      const sha256 = await computeSha256(val);

      // 2. Simulate Threat Engine
      const result = simulateThreatIntel(val);

      // 3. Update UI
      hashOutputEl.textContent = sha256;
      vendorScoreEl.textContent = `${result.malicious} / ${result.totalVendors} VENDORS FLAGGED`;

      riskBarEl.style.width = `${result.riskScore}%`;
      riskBarEl.style.backgroundColor = result.barColor;

      riskVerdictEl.textContent = `[ ${result.verdict} (SCORE: ${result.riskScore}/100) ]`;
      riskVerdictEl.style.color = result.verdictColor;
      riskVerdictEl.style.backgroundColor = result.badgeBg;
      riskVerdictEl.style.border = `1px solid ${result.verdictColor}`;
    } catch (err) {
      console.error('Error during analysis:', err);
      hashOutputEl.textContent = 'Error computing SHA-256';
    } finally {
      analyzeBtn.disabled = false;
      analyzeBtn.textContent = '[ RUN THREAT INTELLIGENCE SCAN ]';
    }
  }

  // Event Listeners
  analyzeBtn.addEventListener('click', runThreatAnalysis);

  inputEl.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      runThreatAnalysis();
    }
  });

  presetChips.forEach(chip => {
    chip.addEventListener('click', () => {
      inputEl.value = chip.getAttribute('data-value');
      runThreatAnalysis();
    });
  });

  if (copyHashBtn) {
    copyHashBtn.addEventListener('click', () => {
      const hashText = hashOutputEl.textContent;
      if (hashText && hashText !== 'Awaiting Input...') {
        navigator.clipboard.writeText(hashText).then(() => {
          const originalText = copyHashBtn.textContent;
          copyHashBtn.textContent = 'COPIED!';
          setTimeout(() => {
            copyHashBtn.textContent = originalText;
          }, 1800);
        });
      }
    });
  }

  // Run initial default analysis
  if (inputEl.value) {
    runThreatAnalysis();
  }
})();
