/* ============ 8-BIT AUDIO ENGINE ============ */
    class RetroAudioEngine {
      constructor() {
        this.ctx = null;
        this.enabled = true;
      }
      init() {
        if (!this.ctx) {
          const AudioContext = window.AudioContext || window.webkitAudioContext;
          if (AudioContext) {
            this.ctx = new AudioContext();
          }
        }
        if (this.ctx && this.ctx.state === 'suspended') {
          this.ctx.resume();
        }
      }
      toggle() {
        this.enabled = !this.enabled;
        if (this.enabled) this.init();
        return this.enabled;
      }
      playNote(freq, type = 'square', duration = 0.08, delay = 0, vol = 0.15) {
        if (!this.enabled || !this.ctx || !freq) return;
        const now = this.ctx.currentTime + delay;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = type;
        osc.frequency.setValueAtTime(freq, now);
        gain.gain.setValueAtTime(vol, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + duration);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(now);
        osc.stop(now + duration);
      }
      playCoin() {
        this.init();
        this.playNote(987.77, 'square', 0.08, 0, 0.12);
        this.playNote(1318.51, 'square', 0.28, 0.08, 0.14);
      }
      playBlip() {
        this.init();
        this.playNote(523.25, 'triangle', 0.05, 0, 0.1);
      }
      playSelect() {
        this.init();
        this.playNote(440, 'square', 0.04, 0, 0.08);
        this.playNote(880, 'square', 0.06, 0.04, 0.08);
      }
      playLaser() {
        if (!this.enabled || !this.ctx) return;
        this.init();
        const now = this.ctx.currentTime;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(880, now);
        osc.frequency.exponentialRampToValueAtTime(110, now + 0.12);
        gain.gain.setValueAtTime(0.1, now);
        gain.gain.linearRampToValueAtTime(0.01, now + 0.12);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(now);
        osc.stop(now + 0.12);
      }
      playExplosion() {
        if (!this.enabled || !this.ctx) return;
        this.init();
        const now = this.ctx.currentTime;
        const bufferSize = Math.floor(this.ctx.sampleRate * 0.2);
        const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
        const data = buffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) {
          data[i] = (Math.random() * 2 - 1) * (1 - i / bufferSize);
        }
        const noise = this.ctx.createBufferSource();
        noise.buffer = buffer;
        const gain = this.ctx.createGain();
        gain.gain.setValueAtTime(0.18, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.2);
        noise.connect(gain);
        gain.connect(this.ctx.destination);
        noise.start(now);
      }
      playFanfare() {
        this.init();
        const notes = [523.25, 659.25, 783.99, 1046.50, 783.99, 1046.50];
        notes.forEach((n, i) => {
          this.playNote(n, 'square', 0.12, i * 0.09, 0.15);
        });
      }
      playDamage() {
        this.init();
        this.playNote(220, 'sawtooth', 0.12, 0, 0.2);
        this.playNote(110, 'sawtooth', 0.25, 0.06, 0.2);
      }
      playPowerup() {
        this.init();
        this.playNote(440, 'triangle', 0.07, 0, 0.15);
        this.playNote(587.33, 'triangle', 0.07, 0.07, 0.15);
        this.playNote(880, 'square', 0.14, 0.14, 0.18);
      }
      playTimeOut() {
        this.init();
        this.playNote(392, 'square', 0.15, 0, 0.15);
        this.playNote(349.23, 'square', 0.15, 0.15, 0.15);
        this.playNote(261.63, 'sawtooth', 0.4, 0.3, 0.2);
      }
    }

    const audio = new RetroAudioEngine();

    /* ============ DATA ============ */
    const PROJECTS = [
      {
        id: "pressure",
        title: "The Pressure",
        icon: "👻",
        category: "games",
        subtitle: "3D Horror Survival in Unity • Solo Developer",
        desc: "A 3D horror survival game built solo in Unity with a fully custom game world. Features a locally hosted LLM that acts as an in-game assistant with real-time awareness of game state, NavMesh-driven enemy AI, and a full combat system with weapons, health, and animations.",
        tags: ["Unity", "C#", "Python", "LLM Integration", "NavMesh AI"],
        color: "#0a8fb0",
        demoUrl: "",
        githubUrl: "https://github.com/faizh27"
      },
      {
        id: "snacktuary",
        title: "Snacktuary",
        icon: "🕹️",
        category: "mobile",
        subtitle: "iOS Arcade Game in Swift • Built Without an Engine",
        desc: "iOS arcade game built in Swift with a team of 3 developers and 3 artists. Written with no game engine: implemented a custom game loop, physics, and collision systems from scratch, plus a persistent data system for saving game state.",
        tags: ["Swift", "iOS", "Xcode", "Custom Physics", "Git"],
        color: "#e8590c",
        demoUrl: "",
        githubUrl: "https://github.com/DelaineWTan/Snactuary"
      },
      {
        id: "triumf",
        title: "TRIUMF Migration",
        icon: "⚛️",
        category: "web",
        subtitle: "Enterprise Rails to Laravel Core Migration",
        desc: "System engineering engagement at Canada's particle accelerator centre. Executed database schema refactoring, migrated legacy Ruby on Rails services over to modern PHP/Laravel with robust validation.",
        tags: ["Laravel", "PHP", "Ruby on Rails", "MySQL", "Architecture"],
        color: "#7048e8",
        demoUrl: "",
        githubUrl: ""
      },
      {
        id: "hakuna-banana",
        title: "Hakuna Banana",
        icon: "🍌",
        category: "games",
        subtitle: "Global Game Jam 2024 Showcase",
        desc: "Game Jam tournament entry designed and delivered in under 48 hours. Features punchy comedy-action physics, combo scoring, bespoke sprite art, and vibrant feedback loops.",
        tags: ["Unity", "C#", "Physics 2D", "Game Jam", "Rapid Prototyping"],
        color: "#b08900",
        demoUrl: "https://globalgamejam.org/games/2024/hakuna-banana-1",
        githubUrl: "https://github.com/faizh27"
      },
      {
        id: "progress-dawn",
        title: "Progress Dawn",
        icon: "🌅",
        category: "games",
        subtitle: "Narrative 3D Adventure built with Unity",
        desc: "Story-driven 3D Unity experience investigating environmental storytelling, third-person character locomotion, customized camera transitions, and dynamic quest scripting.",
        tags: ["Unity 3D", "C#", "Cinemachine", "Level Design"],
        color: "#12857a",
        demoUrl: "https://www.youtube.com/watch?v=BMkJOUuGemo",
        githubUrl: "https://github.com/faizh27"
      },
      {
        id: "pugna-ultima",
        title: "Pugna Ultima",
        icon: "⚔️",
        category: "games",
        subtitle: "Turn-Based Tactical Combat in Unity",
        desc: "Turn-based tactical RPG framework with grid positioning, elemental strengths, modular stat modifiers, and intuitive controller-friendly UI systems.",
        tags: ["Unity", "C#", "Turn-Based AI", "UI Toolkit"],
        color: "#c2255c",
        demoUrl: "",
        githubUrl: "https://github.com/Lukauigi/COMP_4956_PROJECT_PUGNA_ULTIMA"
      }
    ];

    const SKILLS = {
      languages: ["C#", "Swift", "JavaScript", "TypeScript", "Python", "C++", "Java", "SQL", "PHP", "HTML/CSS"],
      frameworks: [".NET Core", "Vue.js", "React", "Laravel", "Node.js", "Express", "Firebase", "MongoDB", "Tailwind CSS"],
      tools: ["Unity 3D", "Playwright", "Git / GitHub", "Docker", "Figma", "Xcode", "REST APIs"]
    };

    /* ============ HELPERS & STATE ============ */
    const $ = id => document.getElementById(id);
    const root = document.documentElement;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let score = 0;
    let hiScore = parseInt(localStorage.getItem("faiz_arcade_hi") || "35000", 10) || 35000;
    let warpActive = false;
    let acquiredSkills = new Set();

    const scoreDisplay = $("scoreDisplay");
    const hiScoreDisplay = $("hiScoreDisplay");
    const levelLabel = $("levelLabel");
    const levelGrid = $("levelGrid");
    const btnCrt = $("btnCrt");
    const crtStatus = $("crtStatus");
    const btnSfx = $("btnSfx");
    const sfxStatus = $("sfxStatus");
    const btnInsertCoin = $("btnInsertCoin");
    const projectModal = $("projectModal");
    const modalCloseBtn = $("modalCloseBtn");
    const terminalLog = $("terminalLog");

    const contactModal = $("contactModal");
    const contactCloseBtn = $("contactCloseBtn");
    const btnHeroContact = $("btnHeroContact");
    const btnFloatContact = $("btnFloatContact");
    const btnCopyEmail = $("btnCopyEmail");
    const emailCopyToast = $("emailCopyToast");

    const achievements = {
      firstCoin: false,
      fiveSkills: false,
      allSkills: false,
      konami: false
    };

    function addScore(pts, x = null, y = null) {
      score += pts;
      scoreDisplay.textContent = String(score).padStart(6, '0');
      if (score > hiScore) {
        hiScore = score;
        hiScoreDisplay.textContent = String(hiScore).padStart(6, '0');
        try { localStorage.setItem("faiz_arcade_hi", String(hiScore)); } catch (e) {}
      }
      if (x !== null && y !== null) {
        spawnFloatText(`+${pts}`, x, y);
      }
    }
    hiScoreDisplay.textContent = String(hiScore).padStart(6, '0');

    function spawnFloatText(text, x, y) {
      const el = document.createElement("div");
      el.className = "float-text";
      el.textContent = text;
      el.style.left = `${x}px`;
      el.style.top = `${y}px`;
      document.body.appendChild(el);
      setTimeout(() => el.remove(), 1100);
    }

    function logTerminal(msg) {
      if (!terminalLog) return;
      const li = document.createElement("li");
      li.textContent = msg;
      terminalLog.appendChild(li);
      terminalLog.scrollTop = terminalLog.scrollHeight;
    }

    function checkAchievements() {
      if (achievements.firstCoin) $("achFirst").classList.add("unlocked");
      if (acquiredSkills.size >= 5) {
        achievements.fiveSkills = true;
        $("achDev").classList.add("unlocked");
      }
      const totalSkillsCount = SKILLS.languages.length + SKILLS.frameworks.length + SKILLS.tools.length;
      if (acquiredSkills.size >= totalSkillsCount) {
        achievements.allSkills = true;
        $("achMaster").classList.add("unlocked");
      }
      if (achievements.konami) $("achKonami").classList.add("unlocked");
    }

    /* ============ SCROLL REVEAL ============ */
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(en => {
        if (en.isIntersecting) {
          en.target.classList.add("visible");
          revealObserver.unobserve(en.target);
        }
      });
    }, { threshold: 0.1 });
    function watchReveals(scope) {
      (scope || document).querySelectorAll(".reveal:not(.visible)").forEach(el => revealObserver.observe(el));
    }

    /* ============ CONTACT MODAL ============ */
    function openContactModal() {
      audio.playSelect();
      contactModal.classList.add("open");
      logTerminal("Contact channel opened. Awaiting transmission.");
      contactCloseBtn.focus();
    }
    function closeContactModal() {
      audio.playBlip();
      contactModal.classList.remove("open");
      if (emailCopyToast) emailCopyToast.style.display = "none";
    }
    if (btnHeroContact) btnHeroContact.onclick = openContactModal;
    if (btnFloatContact) btnFloatContact.onclick = openContactModal;
    if (contactCloseBtn) contactCloseBtn.onclick = closeContactModal;
    if (contactModal) {
      contactModal.onclick = (e) => {
        if (e.target === contactModal) closeContactModal();
      };
    }
    if (btnCopyEmail) {
      btnCopyEmail.onclick = async () => {
        audio.playCoin();
        const email = "syedfaizhassany@gmail.com";
        let ok = false;
        try {
          if (navigator.clipboard && navigator.clipboard.writeText) {
            await navigator.clipboard.writeText(email);
            ok = true;
          }
        } catch (e) { /* fall through to legacy */ }
        if (!ok) {
          const tempInput = document.createElement("input");
          tempInput.value = email;
          document.body.appendChild(tempInput);
          tempInput.select();
          try {
            ok = document.execCommand("copy");
          } catch (err) { ok = false; }
          tempInput.remove();
        }
        if (ok) {
          if (emailCopyToast) {
            emailCopyToast.style.display = "block";
            setTimeout(() => { emailCopyToast.style.display = "none"; }, 2500);
          }
          logTerminal("Email address copied to clipboard.");
        } else {
          logTerminal("Copy failed. Email: syedfaizhassany@gmail.com");
        }
      };
    }

    /* ============ PROJECT LEVELS ============ */
    function renderLevels(filter = 'all') {
      levelGrid.innerHTML = '';
      const list = filter === 'all' ? PROJECTS : PROJECTS.filter(p => p.category === filter);

      list.forEach((p) => {
        const card = document.createElement("div");
        card.className = "lv-card reveal";
        card.tabIndex = 0;
        card.style.setProperty('--tag-col', p.color);
        card.setAttribute("role", "listitem");
        card.setAttribute("aria-label", `${p.title}: ${p.subtitle}`);

        card.innerHTML = `
          <span class="cur" aria-hidden="true">&gt;</span>
          <div class="lv-icon" aria-hidden="true">${p.icon}</div>
          <div class="lv-info">
            <b>${p.title}</b>
            <i>${p.subtitle}</i>
            <div class="lv-tech">
              ${p.tags.slice(0, 3).map(t => `<span class="tech-chip">${t}</span>`).join('')}
            </div>
          </div>
        `;

        card.onclick = () => openProjectModal(p);
        card.onkeydown = (e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            openProjectModal(p);
          }
          if (e.key === 'ArrowDown') {
            e.preventDefault();
            const next = card.nextElementSibling || levelGrid.firstElementChild;
            if (next) next.focus();
          }
          if (e.key === 'ArrowUp') {
            e.preventDefault();
            const prev = card.previousElementSibling || levelGrid.lastElementChild;
            if (prev) prev.focus();
          }
        };

        levelGrid.appendChild(card);
      });
      watchReveals(levelGrid);
    }

    function openProjectModal(p) {
      audio.playSelect();
      $("modalCategory").textContent = `MISSION CATEGORY: ${p.category.toUpperCase()}`;
      $("modalTitle").textContent = p.title;
      $("modalDesc").textContent = p.desc;
      $("modalBadge").textContent = p.subtitle.toUpperCase();

      const stackBox = $("modalStack");
      stackBox.innerHTML = p.tags.map(t => `<span class="tech-chip">${t}</span>`).join('');

      const linkBox = $("modalLinks");
      linkBox.innerHTML = '';

      if (p.demoUrl) {
        const demoA = document.createElement("a");
        demoA.href = p.demoUrl;
        demoA.target = "_blank";
        demoA.rel = "noopener noreferrer";
        demoA.className = "arcade-btn sec";
        demoA.textContent = "🚀 LAUNCH DEMO / VIDEO";
        linkBox.appendChild(demoA);
      }

      if (p.githubUrl) {
        const gitA = document.createElement("a");
        gitA.href = p.githubUrl;
        gitA.target = "_blank";
        gitA.rel = "noopener noreferrer";
        gitA.className = "arcade-btn";
        gitA.textContent = "📦 SOURCE REPO";
        linkBox.appendChild(gitA);
      }

      if (!p.demoUrl && !p.githubUrl) {
        const note = document.createElement("span");
        note.style.font = "400 11px var(--font-pixel)";
        note.style.color = "var(--mute)";
        note.textContent = "🔒 Internal Enterprise Repository (Proprietary / Client NDA)";
        linkBox.appendChild(note);
      }

      drawModalBackdrop(p.color, p.icon);
      projectModal.classList.add("open");
      logTerminal(`Opened stage dossier: ${p.title}`);
      modalCloseBtn.focus();
    }

    function closeProjectModal() {
      audio.playBlip();
      projectModal.classList.remove("open");
    }

    modalCloseBtn.onclick = closeProjectModal;
    projectModal.onclick = (e) => {
      if (e.target === projectModal) closeProjectModal();
    };

    // ESC closes any open modal
    window.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        if (projectModal.classList.contains("open")) closeProjectModal();
        else if (contactModal.classList.contains("open")) closeContactModal();
      }
    });

    function drawModalBackdrop(color, icon) {
      const cv = $("modalCanvas");
      const ctx = cv.getContext("2d");
      const g = ctx.createLinearGradient(0, 0, 0, cv.height);
      g.addColorStop(0, "#0d0b28");
      g.addColorStop(1, "#050418");
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, cv.width, cv.height);

      // starfield dots
      for (let i = 0; i < 60; i++) {
        const sx = (i * 67) % cv.width;
        const sy = (i * 41) % cv.height;
        ctx.fillStyle = i % 5 === 0 ? color : "rgba(255,255,255,0.35)";
        ctx.fillRect(sx, sy, 2, 2);
      }

      // glow behind icon
      const rg = ctx.createRadialGradient(cv.width / 2, cv.height / 2, 4, cv.width / 2, cv.height / 2, 90);
      rg.addColorStop(0, color + "55");
      rg.addColorStop(1, "transparent");
      ctx.fillStyle = rg;
      ctx.fillRect(0, 0, cv.width, cv.height);

      // big icon
      ctx.textAlign = "center";
      ctx.shadowColor = color;
      ctx.shadowBlur = 26;
      ctx.font = "64px serif";
      ctx.fillText(icon || "👾", cv.width / 2, cv.height / 2 + 24);
      ctx.shadowBlur = 0;

      // scanlines
      ctx.fillStyle = "rgba(0,0,0,0.28)";
      for (let y = 0; y < cv.height; y += 4) {
        ctx.fillRect(0, y, cv.width, 1);
      }
      ctx.textAlign = "left";
    }

    // Filter bar event handling
    document.querySelectorAll(".filter-btn").forEach(btn => {
      btn.onclick = () => {
        document.querySelectorAll(".filter-btn").forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        audio.playBlip();
        renderLevels(btn.dataset.filter);
      };
    });

    /* ============ INVENTORY ============ */
    function populateInventory() {
      const setupCategory = (containerId, items) => {
        const cont = $(containerId);
        cont.innerHTML = '';
        items.forEach(name => {
          const btn = document.createElement("button");
          btn.type = "button";
          btn.className = "inv-btn";
          btn.textContent = name;

          btn.onclick = () => {
            audio.playBlip();
            if (!acquiredSkills.has(name)) {
              acquiredSkills.add(name);
              btn.classList.add("got");
              const r = btn.getBoundingClientRect();
              addScore(250, r.left + r.width / 2, r.top);
              logTerminal(`Equipped talent: [${name}] (+250 PTS)`);
              checkAchievements();
            }
            btn.classList.remove("pop");
            void btn.offsetWidth;
            btn.classList.add("pop");
          };
          cont.appendChild(btn);
        });
      };

      setupCategory("invLanguages", SKILLS.languages);
      setupCategory("invFrameworks", SKILLS.frameworks);
      setupCategory("invTools", SKILLS.tools);
    }

    /* ============ PIXEL SPRITE HELPERS ============ */
    function drawPixelMap(ctx, map, x, y, s, pal) {
      for (let r = 0; r < map.length; r++) {
        const row = map[r];
        for (let c = 0; c < row.length; c++) {
          const col = pal[row[c]];
          if (!col) continue;
          ctx.fillStyle = col;
          ctx.fillRect(Math.round(x + c * s), Math.round(y + r * s), s, s);
        }
      }
    }

    const SHIP_MAP = [
      "......cc......",
      "......cc......",
      ".....cccc.....",
      ".....cccc.....",
      "....cccccc....",
      "...cccccccc...",
      "..cccccccccc..",
      ".cccccccccccc.",
      "cccccccccccccc",
      "c.cc.cc.cc.cc."
    ];

    const ALIEN_A = [
      "..X......X..",
      "...X....X...",
      "..XXXXXXXX..",
      ".XX.XXX.XX.",
      "XXXXXXXXXXX",
      "X.XXXXXXX.X",
      "X.X.....X.X",
      "...XX.XX..."
    ];
    const ALIEN_B = [
      "..X......X..",
      "X..X....X..X",
      "X.XXXXXXXX.X",
      "XXX.XXX.XXX",
      "XXXXXXXXXXX",
      ".XXXXXXXXX.",
      "..X.....X..",
      ".XX.....XX."
    ];

    const BOLT_MAP = [
      "...Y.",
      "...Y.",
      "..Y..",
      "YYYYY",
      "..Y..",
      "..Y..",
      ".Y..."
    ];
    const CLOCK_MAP = [
      ".CCCCC.",
      "CWWWWWC",
      "WWWKWWC",
      "WWWKWWC",
      "WWWWWWC",
      "CWWWWWC",
      ".CCCCC."
    ];
    const BOMB_MAP = [
      "...RR..",
      "..RRRR.",
      ".RRRRRR",
      "RRRRRRR",
      "RRRRRRR",
      ".RRRRRR",
      "..RRR.."
    ];

    /* ============ MINI GAME: BUG BUSTER 1984 v2 ============ */
    const miniCv = $("miniGameCanvas");
    const mCtx = miniCv.getContext("2d");
    let gameLoopId = null;
    let gameActive = false;
    let timeInterval = null;
    let musicTimer = null;
    let splashId = null;
    let splashT = 0;

    const game = {
      playerX: 280,
      playerSpeed: 7.5,
      lives: 3,
      invuln: 0,
      timeLeft: 45,
      kills: 0,
      score: 0,
      rapid: 0,
      combo: 0,
      comboTimer: 0,
      maxCombo: 0,
      wave: 1,
      banner: 0,
      muzzle: 0,
      flash: 0,
      paused: false,
      alienDir: 1,
      bullets: [],
      aliens: [],
      alienBullets: [],
      powerups: [],
      particles: [],
      popups: [],
      keys: { left: false, right: false, fire: false },
      cooldown: 0
    };

    function updateBestRecordDisplay() {
      let best = { score: 0, kills: 0 };
      try { best = JSON.parse(localStorage.getItem("faiz_arcade_high") || '{"score": 0, "kills": 0}'); } catch (e) {}
      $("gameBestRecord").textContent = `${best.score} PTS (${best.kills})`;
    }
    updateBestRecordDisplay();

    function updateMiniHud() {
      $("gameTimer").textContent = `${game.timeLeft}s`;
      $("gameWave").textContent = String(game.wave);
      $("gameKills").textContent = String(game.kills);
      let hearts = "";
      for (let i = 0; i < game.lives; i++) hearts += "♥";
      for (let i = game.lives; i < 3; i++) hearts += "♡";
      $("gameShields").textContent = hearts;
    }

    function triggerScreenShake() {
      const box = $("arcadeCabinetBox");
      if (!box) return;
      box.classList.remove("screen-shake");
      void box.offsetWidth;
      box.classList.add("screen-shake");
    }

    function addPopup(x, y, text, color) {
      game.popups.push({ x, y, text, color: color || "#fff", life: 42 });
    }

    function spawnBurst(x, y, color, n, speed) {
      for (let i = 0; i < n; i++) {
        const ang = Math.random() * Math.PI * 2;
        const sp = (0.4 + Math.random() * 0.6) * speed;
        game.particles.push({
          x, y,
          vx: Math.cos(ang) * sp,
          vy: Math.sin(ang) * sp,
          life: 18 + Math.floor(Math.random() * 14),
          color
        });
      }
    }

    function spawnAlienWave() {
      const rows = 3;
      const cols = 8;
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const type = r === 0 ? "shooter" : (r === 1 ? "zigzag" : "basic");
          game.aliens.push({
            bx: 50 + c * 62,
            y: 22 + r * 34,
            w: 24,
            h: 16,
            wob: Math.random() * 6,
            type,
            alive: true,
            color: type === "shooter" ? "#ff3c96" : (type === "zigzag" ? "#ffd027" : "#2be4f8")
          });
        }
      }
      game.alienDir = 1;
    }

    // Formation x-position of an alien. Zigzag wobble is a visual offset
    // only, so it never permanently drifts the formation apart.
    function alienX(a) {
      return a.bx + (a.type === "zigzag" ? Math.sin(a.wob) * 5 : 0);
    }

    function initMiniGame() {
      stopSplash();
      stopMusic();
      if (timeInterval) clearInterval(timeInterval);
      if (gameLoopId) cancelAnimationFrame(gameLoopId);

      Object.assign(game, {
        playerX: miniCv.width / 2 - 14,
        lives: 3, invuln: 0, timeLeft: 45,
        kills: 0, score: 0, rapid: 0,
        combo: 0, comboTimer: 0, maxCombo: 0,
        wave: 1, banner: 100, muzzle: 0, flash: 0,
        paused: false, alienDir: 1,
        bullets: [], aliens: [], alienBullets: [],
        powerups: [], particles: [], popups: [],
        cooldown: 0
      });
      game.keys.left = game.keys.right = game.keys.fire = false;

      updateMiniHud();
      spawnAlienWave();

      timeInterval = setInterval(() => {
        if (!gameActive || game.paused) return;
        game.timeLeft--;
        updateMiniHud();
        if (game.timeLeft <= 5 && game.timeLeft > 0) {
          audio.playNote(700, 'square', 0.05, 0, 0.1);
        }
        if (game.timeLeft <= 0) {
          endMiniGame("TIME_UP");
        }
      }, 1000);

      gameActive = true;
      startMusic();
      miniGameTick();
      $("btnPauseGame").textContent = "⏸ PAUSE";
      logTerminal("TIME ATTACK STARTED: 45 seconds on the clock!");
    }

    function togglePause() {
      if (!gameActive) return;
      game.paused = !game.paused;
      $("btnPauseGame").textContent = game.paused ? "▶ RESUME" : "⏸ PAUSE";
      audio.playBlip();
      if (!game.paused) logTerminal("Game resumed.");
    }

    function endMiniGame(reason) {
      gameActive = false;
      stopMusic();
      clearInterval(timeInterval);
      if (gameLoopId) cancelAnimationFrame(gameLoopId);

      let best = { score: 0, kills: 0 };
      try { best = JSON.parse(localStorage.getItem("faiz_arcade_high") || '{"score": 0, "kills": 0}'); } catch (e) {}
      if (game.score > best.score) {
        try { localStorage.setItem("faiz_arcade_high", JSON.stringify({ score: game.score, kills: game.kills })); } catch (e) {}
        updateBestRecordDisplay();
        logTerminal(`NEW LOCAL HIGH SCORE: ${game.score} PTS!`);
      }

      if (reason === "DIED") {
        audio.playDamage();
        triggerScreenShake();
      } else {
        audio.playTimeOut();
      }

      renderGameSummary(reason);
    }

    function renderGameSummary(reason) {
      mCtx.fillStyle = "rgba(6, 5, 21, 0.94)";
      mCtx.fillRect(0, 0, miniCv.width, miniCv.height);

      mCtx.textAlign = "center";
      mCtx.fillStyle = reason === "DIED" ? "#ff3c96" : "#ffd027";
      mCtx.font = "15px 'Press Start 2P', monospace";
      mCtx.fillText(reason === "DIED" ? "GAME OVER" : "TIME'S UP!", miniCv.width / 2, 52);
      mCtx.font = "9px 'Press Start 2P', monospace";
      mCtx.fillText(reason === "DIED" ? "SHIELDS DOWN" : "MISSION COMPLETE", miniCv.width / 2, 74);

      mCtx.fillStyle = "#fff";
      mCtx.font = "10px 'Press Start 2P', monospace";
      mCtx.fillText(`SCORE: ${game.score} PTS`, miniCv.width / 2, 108);
      mCtx.fillText(`BUGS DESTROYED: ${game.kills}`, miniCv.width / 2, 130);
      mCtx.fillText(`WAVE REACHED: ${game.wave}`, miniCv.width / 2, 152);
      mCtx.fillText(`MAX COMBO: x${Math.min(game.maxCombo, 8)}`, miniCv.width / 2, 174);

      let rank = "C - ROOKIE";
      if (game.score >= 8000) rank = "S+ - BUG EXTERMINATOR";
      else if (game.score >= 5000) rank = "S - CYBER ACE";
      else if (game.score >= 3000) rank = "A - ACE PILOT";
      else if (game.score >= 1500) rank = "B - VETERAN";

      mCtx.fillStyle = "#2be4f8";
      mCtx.fillText(`RANK: ${rank}`, miniCv.width / 2, 206);

      mCtx.fillStyle = "#ffd027";
      mCtx.font = "9px 'Press Start 2P', monospace";
      if (Math.floor(Date.now() / 500) % 2 === 0) {
        mCtx.fillText("PRESS START TO RETRY", miniCv.width / 2, 246);
      }
      mCtx.textAlign = "left";
    }

    function destroyAlien(a, silent) {
      if (!a.alive) return;
      a.alive = false;
      const ax = alienX(a);
      game.kills++;
      game.combo++;
      game.comboTimer = 80;
      game.maxCombo = Math.max(game.maxCombo, game.combo);
      const mult = Math.min(game.combo, 8);
      const base = a.type === "shooter" ? 200 : (a.type === "zigzag" ? 150 : 100);
      const pts = base * mult;
      game.score += pts;
      addScore(pts);
      addPopup(ax + a.w / 2, a.y, "+" + pts, mult > 1 ? "#ffd027" : "#ffffff");
      if (!silent) audio.playExplosion();
      updateMiniHud();

      if (Math.random() < 0.13) {
        const types = ["rapid", "time", "bomb"];
        const chosen = types[Math.floor(Math.random() * types.length)];
        game.powerups.push({ x: ax + a.w / 2, y: a.y, type: chosen, wob: Math.random() * 6 });
      }
      spawnBurst(ax + a.w / 2, a.y + a.h / 2, a.color, 10, 5);
    }

    function damagePlayer() {
      game.lives--;
      audio.playDamage();
      triggerScreenShake();
      game.invuln = 70;
      game.combo = 0;
      game.comboTimer = 0;
      spawnBurst(game.playerX + 14, miniCv.height - 16, "#ff3c96", 22, 6);
      spawnBurst(game.playerX + 14, miniCv.height - 16, "#20e070", 12, 4);
      updateMiniHud();
      if (game.lives <= 0) {
        endMiniGame("DIED");
      }
    }

    function miniGameTick() {
      if (!gameActive) return;
      gameLoopId = requestAnimationFrame(miniGameTick);

      if (game.paused) {
        renderMiniGameCanvas();
        mCtx.fillStyle = "rgba(4,3,16,0.72)";
        mCtx.fillRect(0, 0, miniCv.width, miniCv.height);
        mCtx.textAlign = "center";
        mCtx.fillStyle = "#ffd027";
        mCtx.font = "14px 'Press Start 2P', monospace";
        mCtx.fillText("PAUSED", miniCv.width / 2, miniCv.height / 2);
        mCtx.fillStyle = "#fff";
        mCtx.font = "9px 'Press Start 2P', monospace";
        mCtx.fillText("PRESS P OR RESUME", miniCv.width / 2, miniCv.height / 2 + 28);
        mCtx.textAlign = "left";
        return;
      }

      // movement
      if (game.keys.left && game.playerX > 8) game.playerX -= game.playerSpeed;
      if (game.keys.right && game.playerX < miniCv.width - 36) game.playerX += game.playerSpeed;

      if (game.invuln > 0) game.invuln--;
      if (game.rapid > 0) game.rapid--;
      if (game.muzzle > 0) game.muzzle--;
      if (game.flash > 0) game.flash--;
      if (game.banner > 0) game.banner--;
      if (game.comboTimer > 0) {
        game.comboTimer--;
        if (game.comboTimer === 0) game.combo = 0;
      }

      // thruster particles
      if (Math.random() < 0.7) {
        game.particles.push({
          x: game.playerX + 6 + Math.random() * 16,
          y: miniCv.height - 6,
          vx: (Math.random() - 0.5) * 1.2,
          vy: 1.5 + Math.random() * 1.5,
          life: 14,
          color: Math.random() > 0.5 ? "#ff9d00" : "#ffd027"
        });
      }

      // firing
      if (game.cooldown > 0) game.cooldown--;
      const maxCooldown = game.rapid > 0 ? 6 : 13;
      if (game.keys.fire && game.cooldown === 0) {
        if (game.rapid > 0) {
          game.bullets.push({ x: game.playerX + 5, y: miniCv.height - 34, vy: -9 });
          game.bullets.push({ x: game.playerX + 19, y: miniCv.height - 34, vy: -9 });
        } else {
          game.bullets.push({ x: game.playerX + 12, y: miniCv.height - 34, vy: -7.5 });
        }
        game.cooldown = maxCooldown;
        game.muzzle = 4;
        audio.playLaser();
      }

      // bullets
      for (let i = game.bullets.length - 1; i >= 0; i--) {
        const b = game.bullets[i];
        b.y += b.vy;
        if (b.y < -12) game.bullets.splice(i, 1);
      }

      // alien bullets
      for (let i = game.alienBullets.length - 1; i >= 0; i--) {
        const ab = game.alienBullets[i];
        ab.y += ab.vy;
        if (ab.y > miniCv.height + 10) {
          game.alienBullets.splice(i, 1);
          continue;
        }
        if (game.invuln === 0 &&
            ab.x > game.playerX + 2 && ab.x < game.playerX + 26 &&
            ab.y > miniCv.height - 26 && ab.y < miniCv.height - 4) {
          game.alienBullets.splice(i, 1);
          damagePlayer();
          if (!gameActive) return;
        }
      }

      // powerups
      for (let i = game.powerups.length - 1; i >= 0; i--) {
        const p = game.powerups[i];
        p.y += 1.8;
        p.wob += 0.08;
        if (p.y > miniCv.height + 12) {
          game.powerups.splice(i, 1);
          continue;
        }
        if (p.x > game.playerX - 12 && p.x < game.playerX + 40 &&
            p.y > miniCv.height - 32 && p.y < miniCv.height) {
          audio.playPowerup();
          if (p.type === "rapid") {
            game.rapid = 300;
            addPopup(game.playerX + 14, miniCv.height - 60, "RAPID FIRE!", "#ffd027");
          } else if (p.type === "time") {
            game.timeLeft = Math.min(99, game.timeLeft + 6);
            addPopup(game.playerX + 14, miniCv.height - 60, "+6s TIME!", "#00f0ff");
          } else if (p.type === "bomb") {
            game.flash = 8;
            triggerScreenShake();
            game.aliens.forEach(a => { if (a.alive) destroyAlien(a, true); });
            audio.playExplosion();
            addPopup(miniCv.width / 2, 120, "BUG BOMB!", "#ff3c96");
          }
          updateMiniHud();
          game.powerups.splice(i, 1);
        }
      }

      // aliens: move the whole formation as one unit (classic invaders).
      // The formation only drops a row when its leading edge hits a wall,
      // so it can never free-fall straight down.
      let aliveCount = 0;
      let minB = Infinity, maxB = -Infinity;
      game.aliens.forEach(a => {
        if (!a.alive) return;
        aliveCount++;
        a.wob += 0.07;
        if (a.bx < minB) minB = a.bx;
        if (a.bx + a.w > maxB) maxB = a.bx + a.w;
      });

      if (aliveCount > 0) {
        const step = 1.1 + (game.wave - 1) * 0.28;
        const hitWall = (game.alienDir > 0 && maxB + step > miniCv.width - 12) ||
                        (game.alienDir < 0 && minB - step < 10);
        if (hitWall) {
          game.alienDir *= -1;
          game.aliens.forEach(a => { if (a.alive) a.y += 8; });
        } else {
          game.aliens.forEach(a => { if (a.alive) a.bx += step * game.alienDir; });
        }
      }

      const fireChance = 0.0028 + (game.wave - 1) * 0.0012;
      game.aliens.forEach(a => {
        if (!a.alive) return;
        const ax = alienX(a);

        if (a.type === "shooter" && Math.random() < fireChance) {
          game.alienBullets.push({ x: ax + a.w / 2, y: a.y + a.h, vy: 3.2 + game.wave * 0.25 });
        }

        // alien rams player
        if (game.invuln === 0 &&
            ax < game.playerX + 26 && ax + a.w > game.playerX + 2 &&
            a.y + a.h > miniCv.height - 26 && a.y < miniCv.height) {
          destroyAlien(a);
          damagePlayer();
          if (!gameActive) return;
        }

        // player bullet hits alien
        for (let bIdx = game.bullets.length - 1; bIdx >= 0; bIdx--) {
          const b = game.bullets[bIdx];
          if (b.x > ax - 2 && b.x < ax + a.w + 2 && b.y > a.y && b.y < a.y + a.h) {
            game.bullets.splice(bIdx, 1);
            destroyAlien(a);
            break;
          }
        }
      });

      if (aliveCount === 0 && gameActive) {
        game.wave++;
        game.banner = 100;
        updateMiniHud();
        spawnAlienWave();
        audio.playSelect();
        logTerminal(`Wave ${game.wave} inbound. Hostiles faster.`);
      }

      // particles
      for (let p = game.particles.length - 1; p >= 0; p--) {
        const pt = game.particles[p];
        pt.x += pt.vx;
        pt.y += pt.vy;
        pt.life--;
        if (pt.life <= 0) game.particles.splice(p, 1);
      }

      // popups
      for (let p = game.popups.length - 1; p >= 0; p--) {
        const pp = game.popups[p];
        pp.y -= 0.9;
        pp.life--;
        if (pp.life <= 0) game.popups.splice(p, 1);
      }

      renderMiniGameCanvas();
    }

    function renderMiniGameCanvas() {
      mCtx.fillStyle = "#060515";
      mCtx.fillRect(0, 0, miniCv.width, miniCv.height);

      // drifting star dust
      mCtx.fillStyle = "rgba(255,255,255,0.16)";
      const t = Date.now() * 0.05;
      for (let i = 0; i < 18; i++) {
        mCtx.fillRect((i * 47) % miniCv.width, (i * 29 + t) % miniCv.height, 2, 2);
      }

      const alienFrame = Math.floor(Date.now() / 280) % 2 === 0 ? ALIEN_A : ALIEN_B;

      // powerups
      game.powerups.forEach(p => {
        const bob = Math.sin(p.wob) * 3;
        const px = p.x - 7, py = p.y + bob;
        mCtx.shadowColor = p.type === "rapid" ? "#ffd027" : (p.type === "time" ? "#00f0ff" : "#ff3c96");
        mCtx.shadowBlur = 10;
        if (p.type === "rapid") drawPixelMap(mCtx, BOLT_MAP, px, py, 2, { Y: "#ffd027" });
        else if (p.type === "time") drawPixelMap(mCtx, CLOCK_MAP, px - 3, py, 2, { C: "#00f0ff", W: "#e8fbff", K: "#062a33" });
        else drawPixelMap(mCtx, BOMB_MAP, px - 3, py, 2, { R: "#ff3c96" });
        mCtx.shadowBlur = 0;
      });

      // aliens
      game.aliens.forEach(a => {
        if (!a.alive) return;
        const ax = alienX(a);
        drawPixelMap(mCtx, alienFrame, ax, a.y, 2, { X: a.color });
        mCtx.fillStyle = "#060515";
        mCtx.fillRect(Math.round(ax) + 7, Math.round(a.y) + 7, 3, 3);
        mCtx.fillRect(Math.round(ax) + 14, Math.round(a.y) + 7, 3, 3);
      });

      // player ship (blink while invulnerable)
      if (game.invuln === 0 || Math.floor(Date.now() / 70) % 2 === 0) {
        const shipCol = game.rapid > 0 ? "#ffd027" : "#20e070";
        drawPixelMap(mCtx, SHIP_MAP, game.playerX, miniCv.height - 26, 2, { c: shipCol });
        // muzzle flash
        if (game.muzzle > 0) {
          mCtx.fillStyle = "#fff3b0";
          mCtx.fillRect(game.playerX + 11, miniCv.height - 36, 6, 8);
        }
      }

      // bullets
      mCtx.fillStyle = game.rapid > 0 ? "#ff3c96" : "#ffd027";
      game.bullets.forEach(b => {
        mCtx.fillRect(b.x, b.y, 4, 10);
      });

      // alien bullets
      mCtx.fillStyle = "#ff382e";
      game.alienBullets.forEach(ab => {
        mCtx.fillRect(ab.x - 2, ab.y, 4, 9);
      });

      // particles
      game.particles.forEach(pt => {
        mCtx.globalAlpha = Math.max(0, pt.life / 24);
        mCtx.fillStyle = pt.color;
        mCtx.fillRect(pt.x, pt.y, 3, 3);
      });
      mCtx.globalAlpha = 1;

      // popups
      mCtx.textAlign = "center";
      mCtx.font = "8px 'Press Start 2P', monospace";
      game.popups.forEach(pp => {
        mCtx.globalAlpha = Math.max(0, pp.life / 42);
        mCtx.fillStyle = pp.color;
        mCtx.fillText(pp.text, pp.x, pp.y);
      });
      mCtx.globalAlpha = 1;

      // combo meter
      if (game.combo >= 2) {
        mCtx.textAlign = "right";
        mCtx.fillStyle = "#ffd027";
        mCtx.font = "10px 'Press Start 2P', monospace";
        mCtx.fillText(`COMBO x${Math.min(game.combo, 8)}`, miniCv.width - 14, 22);
        // combo timer bar
        mCtx.fillStyle = "#ffd027";
        mCtx.fillRect(miniCv.width - 114, 28, 100 * (game.comboTimer / 80), 4);
        mCtx.textAlign = "left";
      }

      // wave banner
      if (game.banner > 0) {
        const a = Math.min(1, game.banner / 30);
        mCtx.globalAlpha = a;
        mCtx.textAlign = "center";
        mCtx.fillStyle = "#2be4f8";
        mCtx.font = "18px 'Press Start 2P', monospace";
        mCtx.fillText(`WAVE ${game.wave}`, miniCv.width / 2, miniCv.height / 2 - 10);
        mCtx.globalAlpha = 1;
        mCtx.textAlign = "left";
      }

      // rapid fire indicator
      if (game.rapid > 0) {
        mCtx.fillStyle = "#ffd027";
        mCtx.font = "8px 'Press Start 2P', monospace";
        mCtx.fillText("RAPID-FIRE ACTIVE", 12, miniCv.height - 8);
      }

      // bomb flash
      if (game.flash > 0) {
        mCtx.fillStyle = `rgba(255,60,150,${game.flash / 24})`;
        mCtx.fillRect(0, 0, miniCv.width, miniCv.height);
      }
    }

    /* Chiptune loop while playing (only when SFX is on) */
    function startMusic() {
      stopMusic();
      if (!audio.enabled) return;
      let step = 0;
      const bass = [55, 0, 55, 0, 65.41, 0, 55, 0, 49, 0, 55, 0, 73.42, 0, 65.41, 0];
      const lead = [440, 523.25, 659.25, 523.25, 440, 0, 392, 440, 494, 587.33, 740, 587.33, 659.25, 523.25, 440, 0];
      musicTimer = setInterval(() => {
        if (!gameActive || game.paused || !audio.enabled) return;
        const b = bass[step % bass.length];
        const l = lead[step % lead.length];
        if (b) audio.playNote(b, 'triangle', 0.15, 0, 0.07);
        if (l && step % 2 === 0) audio.playNote(l, 'square', 0.09, 0, 0.035);
        step++;
      }, 150);
    }
    function stopMusic() {
      if (musicTimer) {
        clearInterval(musicTimer);
        musicTimer = null;
      }
    }

    /* Animated attract-mode splash */
    function drawSplash(t) {
      mCtx.fillStyle = "#060515";
      mCtx.fillRect(0, 0, miniCv.width, miniCv.height);
      mCtx.fillStyle = "rgba(255,255,255,0.22)";
      for (let i = 0; i < 22; i++) {
        mCtx.fillRect((i * 53 + t * 0.4) % miniCv.width, (i * 37) % miniCv.height, 2, 2);
      }
      const frame = Math.floor(t / 22) % 2 === 0 ? ALIEN_A : ALIEN_B;
      const cols = ["#ff3c96", "#ffd027", "#2be4f8", "#20e070", "#ff3c96"];
      cols.forEach((c, i) => {
        const bx = 130 + i * 68;
        const by = 36 + Math.sin(t / 18 + i * 1.3) * 8;
        drawPixelMap(mCtx, frame, bx, by, 2, { X: c });
      });
      drawPixelMap(mCtx, SHIP_MAP, miniCv.width / 2 - 14, 220, 2, { c: "#20e070" });

      mCtx.textAlign = "center";
      mCtx.fillStyle = "#2be4f8";
      mCtx.font = "13px 'Press Start 2P', monospace";
      mCtx.fillText("BUG BUSTER 1984", miniCv.width / 2, 140);
      mCtx.fillStyle = "#a29acf";
      mCtx.font = "9px 'Press Start 2P', monospace";
      mCtx.fillText("45S TIME ATTACK", miniCv.width / 2, 164);
      if (Math.floor(t / 26) % 2 === 0) {
        mCtx.fillStyle = "#ffd027";
        mCtx.fillText("PRESS START TO PLAY", miniCv.width / 2, 196);
      }
      mCtx.textAlign = "left";
    }
    function startSplash() {
      stopSplash();
      const loop = () => {
        drawSplash(splashT++);
        splashId = requestAnimationFrame(loop);
      };
      loop();
    }
    function stopSplash() {
      if (splashId) {
        cancelAnimationFrame(splashId);
        splashId = null;
      }
    }

    /* Mini-game controls */
    $("btnStartGame").onclick = (e) => {
      e.currentTarget.blur();
      audio.init();
      initMiniGame();
    };
    $("btnPauseGame").onclick = (e) => {
      e.currentTarget.blur();
      togglePause();
    };

    window.addEventListener("keydown", (e) => {
      if ([" ", "ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(e.key)) {
        if (gameActive || document.activeElement === miniCv) {
          e.preventDefault();
        }
      }
      if (e.key === "a" || e.key === "A" || e.key === "ArrowLeft") game.keys.left = true;
      if (e.key === "d" || e.key === "D" || e.key === "ArrowRight") game.keys.right = true;
      if (e.key === " " || e.key === "w" || e.key === "W" || e.key === "ArrowUp") {
        if (e.target.tagName !== "INPUT" && e.target.tagName !== "BUTTON") {
          if (gameActive) e.preventDefault();
          game.keys.fire = true;
        }
      }
      if ((e.key === "p" || e.key === "P") && !e.repeat) {
        if (e.target.tagName !== "INPUT") togglePause();
      }
    });

    window.addEventListener("keyup", (e) => {
      if (e.key === "a" || e.key === "A" || e.key === "ArrowLeft") game.keys.left = false;
      if (e.key === "d" || e.key === "D" || e.key === "ArrowRight") game.keys.right = false;
      if (e.key === " " || e.key === "w" || e.key === "W" || e.key === "ArrowUp") game.keys.fire = false;
    });

    const touchLeft = $("btnTouchLeft");
    const touchRight = $("btnTouchRight");
    const touchFire = $("btnTouchFire");

    const setupHold = (el, onStart, onEnd) => {
      if (!el) return;
      el.addEventListener("mousedown", onStart);
      el.addEventListener("mouseup", onEnd);
      el.addEventListener("mouseleave", onEnd);
      el.addEventListener("touchstart", (e) => { e.preventDefault(); onStart(); }, { passive: false });
      el.addEventListener("touchend", onEnd);
      el.addEventListener("touchcancel", onEnd);
    };

    setupHold(touchLeft, () => { game.keys.left = true; }, () => { game.keys.left = false; });
    setupHold(touchRight, () => { game.keys.right = true; }, () => { game.keys.right = false; });
    setupHold(touchFire, () => { game.keys.fire = true; }, () => { game.keys.fire = false; });

    /* ============ HUD CONTROLS ============ */
    btnSfx.onclick = () => {
      const isEnabled = audio.toggle();
      sfxStatus.textContent = isEnabled ? "ON" : "OFF";
      btnSfx.classList.toggle("active", isEnabled);
      if (isEnabled) {
        audio.playCoin();
        if (gameActive) startMusic();
      } else {
        stopMusic();
      }
    };

    // Browsers block audio until the first user gesture. SFX is on by
    // default, so unlock the AudioContext on the first interaction.
    window.addEventListener("pointerdown", () => audio.init(), { once: true });
    window.addEventListener("keydown", () => audio.init(), { once: true });

    btnCrt.onclick = () => {
      document.body.classList.toggle("crt-active");
      const active = document.body.classList.contains("crt-active");
      crtStatus.textContent = active ? "ON" : "OFF";
      btnCrt.classList.toggle("active", active);
      audio.playBlip();
    };

    btnInsertCoin.onclick = (e) => {
      audio.playCoin();
      achievements.firstCoin = true;
      checkAchievements();

      const r = e.currentTarget.getBoundingClientRect();
      const fx = document.createElement("div");
      fx.className = "fx-coin";
      fx.style.left = `${r.left + r.width / 2}px`;
      fx.style.top = `${r.top}px`;
      document.body.appendChild(fx);
      setTimeout(() => fx.remove(), 920);

      addScore(1000, r.left + r.width / 2, r.top);
      logTerminal("Credit verified: +1000 PTS awarded!");

      const lvlSec = $("levelsSec");
      if (lvlSec) lvlSec.scrollIntoView({ behavior: "smooth" });
    };

    const palBtns = document.querySelectorAll(".pal-btn");
    function setPalette(p) {
      root.dataset.pal = p;
      palBtns.forEach(b => b.setAttribute("aria-pressed", b.dataset.p === p ? "true" : "false"));
      audio.playBlip();
    }
    palBtns.forEach(b => {
      b.onclick = () => setPalette(b.dataset.p);
    });

    /* ============ STARFIELD + HUD SECTION LABEL ============ */
    const cvSky = $("sky");
    const cxSky = cvSky.getContext("2d");
    let W = 0, H = 0, stars = [];

    function resizeSky() {
      W = cvSky.width = window.innerWidth;
      H = cvSky.height = window.innerHeight;
      stars = Array.from({ length: Math.min(180, Math.floor((W * H) / 8000)) }, () => ({
        x: Math.random() * W,
        y: Math.random() * H,
        z: Math.random() * 2.5 + 0.5,
        color: Math.random() > 0.8 ? "#ff3c96" : Math.random() > 0.5 ? "#2be4f8" : "#ffffff"
      }));
    }
    window.addEventListener("resize", resizeSky);
    resizeSky();

    const hudSections = [
      ["top", "TITLE: READY"],
      ["levelsSec", "STAGE: SELECT"],
      ["miniGameSec", "BOSS: DEFENDER"],
      ["questSec", "LOG: CAREER"],
      ["invSec", "VAULT: SKILLS"]
    ];

    function renderSky() {
      cxSky.clearRect(0, 0, W, H);
      const speedMult = warpActive ? 22 : 0.35;
      const scrollOffset = window.scrollY * 0.12;

      for (let s of stars) {
        s.x -= s.z * speedMult;
        if (s.x < 0) s.x += W;

        const y = ((s.y - scrollOffset * s.z) % H + H) % H;
        const size = Math.ceil(s.z);
        const trailWidth = warpActive ? size * 16 : size;

        cxSky.fillStyle = warpActive ? "#ffd027" : s.color;
        cxSky.globalAlpha = 0.3 + (s.z / 3) * 0.7;
        cxSky.fillRect(Math.floor(s.x), Math.floor(y), trailWidth, size);
      }
      cxSky.globalAlpha = 1;

      let currentSection = hudSections[0][1];
      for (const [id, label] of hudSections) {
        const el = $(id);
        if (el && el.getBoundingClientRect().top < window.innerHeight * 0.45) {
          currentSection = label;
        }
      }
      levelLabel.textContent = currentSection;

      requestAnimationFrame(renderSky);
    }
    requestAnimationFrame(renderSky);

    /* ============ KONAMI CODE ============ */
    const KONAMI = ["ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown", "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight", "b", "a"];
    let kIdx = 0;

    window.addEventListener("keydown", (e) => {
      const expected = KONAMI[kIdx];
      if (e.key.toLowerCase() === expected.toLowerCase()) {
        kIdx++;
        if (kIdx === KONAMI.length) {
          kIdx = 0;
          warpActive = true;
          achievements.konami = true;
          checkAchievements();
          audio.playFanfare();
          addScore(10000, window.innerWidth / 2 - 50, 120);
          logTerminal("KONAMI CODE EXECUTED: WARP HYPERSPACE ACTIVATED!");
          setTimeout(() => { warpActive = false; }, 3500);
        }
      } else {
        kIdx = e.key.toLowerCase() === KONAMI[0].toLowerCase() ? 1 : 0;
      }
    });

    /* ============ HERO SPRITE (PLAYER 1) ============ */
    const HERO_MAP = [
      "................",
      ".....kkkkkk.....",
      "....kkkkkkkk....",
      "....kffffffk....",
      "....kfefeffk....",
      "....kffffffk....",
      ".....ffffff.....",
      "....bbbbbbbb....",
      "...bbbbbbbbbb...",
      "...b.bbbbbb.b...",
      ".....bbbbbb.....",
      ".....dddddd.....",
      ".....dd..dd.....",
      "....sss..sss...."
    ];
    function cssVar(name, fallback) {
      const v = getComputedStyle(root).getPropertyValue(name).trim();
      return v || fallback;
    }
    function drawHeroSprite(t) {
      const cv = $("heroSprite");
      if (!cv) return;
      const ctx = cv.getContext("2d");
      ctx.clearRect(0, 0, cv.width, cv.height);
      const bob = reducedMotion ? 0 : Math.round(Math.sin(t / 320) * 3);
      // shadow
      ctx.fillStyle = "rgba(0,0,0,0.35)";
      const shW = 56 - Math.abs(bob);
      ctx.fillRect(cv.width / 2 - shW / 2, 98, shW, 5);
      drawPixelMap(ctx, HERO_MAP, 16, 36 + bob, 4, {
        k: "#3a2b1f",
        f: "#ffcf9e",
        e: "#14141f",
        b: cssVar("--b", "#2be4f8"),
        d: cssVar("--sf-dark", "#120e33"),
        s: cssVar("--a", "#ff3c96")
      });
    }
    function heroSpriteLoop(t) {
      drawHeroSprite(t || 0);
      if (!reducedMotion) requestAnimationFrame(heroSpriteLoop);
    }

    /* ============ TYPEWRITER HERO SUB ============ */
    function typewriterHero() {
      const el = $("heroSub");
      const full = el.textContent;
      if (reducedMotion) return;
      el.textContent = "";
      let i = 0;
      const caret = "▌";
      const timer = setInterval(() => {
        i++;
        el.textContent = full.slice(0, i) + (i < full.length ? caret : "");
        if (i >= full.length) clearInterval(timer);
      }, 14);
    }

    /* ============ TERMINAL CLOCK ============ */
    function tickTerminalClock() {
      const el = $("terminalClock");
      if (!el) return;
      const now = new Date();
      const hh = String(now.getHours()).padStart(2, "0");
      const mm = String(now.getMinutes()).padStart(2, "0");
      const ss = String(now.getSeconds()).padStart(2, "0");
      el.textContent = `${hh}:${mm}:${ss} LOCAL`;
    }
    setInterval(tickTerminalClock, 1000);
    tickTerminalClock();

    /* ============ INIT ============ */
    window.addEventListener("load", () => {
      renderLevels('all');
      populateInventory();
      drawModalBackdrop("#00f0ff", "👾");
      updateMiniHud();
      startSplash();
      heroSpriteLoop();
      typewriterHero();
      watchReveals(document);
    });
