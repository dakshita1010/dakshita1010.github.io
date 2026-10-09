# Dakshita Mathur - CyberHub Portfolio Website 🛡️

A high-tech, futuristic **CyberHub / SOC Operations Center** themed portfolio website for **Dakshita Mathur** (Cybersecurity Researcher, Systems Developer, and VIT-AP B.Tech CSE student).

---

## ⚡ Live Highlights & Features

- **CyberHub / SOC Visual Theme**:
  - Obsidian dark base (`#07090e`), neon cyan (`#00f3ff`), matrix green (`#00ff88`), and violet (`#9d4edd`) accents.
  - Interactive neural cyber mesh canvas with mouse proximity lines.
  - Authentic CRT scanline filter (toggleable with `[CRT]` button).
  - High-tech Web Audio API sound synthesizer clicks (toggleable with `[AUDIO]` button, default muted).
  - Real-time IST & UTC system clock and Defcon status strip.

- **Classified Operations (Projects) with Live GitHub Links**:
  - [**ThreatLens**](https://github.com/dakshita1010/ThreatLens): URL & File Hash Threat Intelligence platform (VirusTotal API, Flask, Local SHA-256, SQLite, Chart.js).
  - [**Federated-NIDS**](https://github.com/maplelattte/federated-nids): Privacy-Preserving Network Intrusion Detection System for 4G/5G networks (PyTorch, Flower flwr, FedAvg across 5 client nodes, 86% detection accuracy on CICIDS2017).
  - [**HoverNotes**](https://github.com/dakshita1010/hover-notes): Always-on-top Windows desktop notes app (Electron, Ghost Mode `Alt+Shift+G`, global hotkeys, mini-dock).

- **Research & Publications**:
  - **In-Kernel Defense: Low-Latency In-Kernel Ransomware Containment with eBPF** presented at *Hinweis 5th International Conference on Advances in Software Engineering and Information Technology (ASIT-2026)*.
  - Interactive in-kernel syscall architecture pipeline visualizer.

- **Interactive Threat Intelligence Lab (ThreatLens Simulator)**:
  - Real client-side cryptographic hashing via the native **Web Crypto API** (`crypto.subtle.digest('SHA-256')`).
  - VirusTotal heuristic scoring simulator with real-time risk gauges.

- **Interactive Cyber Command Console (`TERMINAL.EXE`)**:
  - Interactive shell supporting: `help`, `whoami`, `projects`, `research`, `threatlens`, `fl-nids`, `skills`, `education`, `experience`, `contact`, `matrix`, `clear`.
  - Up / Down arrow command history navigation.

- **Comprehensive Resume Integration**:
  - VIT-AP B.Tech CSE (Sep 2023 – Present), CGPA: 8.54/10.
  - Rani Laxmi Bai Memorial School, Class XII: 85.2%.
  - St. Xavier's Senior Secondary School, Class X: 89.2%.
  - India Space Academy (ISRO) Remote Sensing & GIS Intern (Jan 2026, NDWI Surface Water Mapping, Score: 98/100).
  - Full technical skills inventory.
  - High-resolution printable CV modal (`[ACCESS CV]`).

---

## 🚀 How to Run Locally

### Option 1: Direct File Preview
Simply double click `index.html` to open it in Google Chrome, Microsoft Edge, Firefox, or Brave.

### Option 2: Local HTTP Server (PowerShell / Python)
In PowerShell inside this folder:
```powershell
python -m http.server 8080
```
Then visit: `http://localhost:8080` in your web browser.

---

## 🌐 How to Deploy to GitHub Pages

1. Create a repository on GitHub (e.g. `dakshita1010/portfolio`).
2. Push this folder's contents:
   ```bash
   git init
   git add .
   git commit -m "feat: Initial CyberHub portfolio release"
   git branch -M main
   git remote add origin https://github.com/dakshita1010/portfolio.git
   git push -u origin main
   ```
3. Go to **Settings > Pages > Branch: main > Save**.
4. Your portfolio will be live at `https://dakshita1010.github.io/portfolio/`!
