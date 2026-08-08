/* ==========================================================================
   BIBLE STUDY JEOPARDY! — game engine
   ========================================================================== */

const $  = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];

const SAVE_KEY = "bs-jeopardy-v3";
const LAYOUT_KEY = "bs-jeopardy-layout";
const MAX_COLS = 6;

/* Every category from every round, in one flat pool. The board is just a list
   of pool ids per round, which is what lets you move a Double Jeopardy
   category onto board one mid-game.

   Ids come from the title rather than the position, so reordering categories
   in questions.js doesn't silently repoint a saved layout at the wrong one. */
const slug = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

const POOL = [];
GAME.rounds.forEach((r, ri) =>
  r.categories.forEach((c) =>
    POOL.push({ id: slug(c.title), title: c.title, clues: c.clues, home: ri })));

const poolById = (id) => POOL.find((p) => p.id === id);

function defaultLayout() {
  const layout = {};
  GAME.rounds.forEach((_, ri) =>
    (layout[ri] = POOL.filter((p) => p.home === ri).map((p) => p.id)));
  return layout;
}

/* The board arrangement is remembered separately from the game, so starting a
   fresh game from the team screen doesn't throw away a layout you set up. */
function saveLayout() {
  try { localStorage.setItem(LAYOUT_KEY, JSON.stringify(S.layout)); } catch (e) { /* noop */ }
}

function loadLayout() {
  try {
    const raw = localStorage.getItem(LAYOUT_KEY);
    if (!raw) return null;
    const l = JSON.parse(raw);
    // ignore anything referring to categories that no longer exist
    const ok = GAME.rounds.every((_, ri) =>
      Array.isArray(l[ri]) && l[ri].every((id) => poolById(id)));
    return ok ? l : null;
  } catch (e) { return null; }
}

function forgetLayout() {
  try { localStorage.removeItem(LAYOUT_KEY); } catch (e) { /* noop */ }
}
const PALETTE = ["#4dd2ff", "#ff6b8a", "#7ee787", "#ffb04d"];
const DEFAULT_NAMES = ["Team 1", "Team 2", "Team 3", "Team 4"];

/* ==========================================================================
   STATE
   ========================================================================== */

let S = null;          // the live game state
let history = [];      // undo snapshots
let clue = null;       // the clue currently on screen (transient, not persisted)
let timer = null;      // { id, left, total, paused }

function freshState(teams, settings) {
  return {
    teams,
    settings,
    round: 0,
    activeTeam: 0,
    layout: loadLayout() || defaultLayout(),   // round -> [pool id, ...] — the columns on that board
    used: {},          // "catId-row" -> true
    dd: {},            // round -> ["catId-row", ...]
    ddHit: {},         // "catId-row" -> true (already played, for the ★)
    finalIndex: 0,
    final: null,       // { wagers: {}, results: {} }
    phase: "board",    // board | final | results
  };
}

function defaultSettings() {
  return {
    timer: true,
    timerSecs: 20,
    penalty: true,
    dailyDoubles: true,
    sound: true,
    strictTurns: false,
    autoTurn: true,
  };
}

/* ==========================================================================
   PERSISTENCE
   ========================================================================== */

function save() {
  try { localStorage.setItem(SAVE_KEY, JSON.stringify(S)); } catch (e) { /* private mode */ }
}
function load() {
  try {
    const raw = localStorage.getItem(SAVE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch (e) { return null; }
}
function wipe() {
  try { localStorage.removeItem(SAVE_KEY); } catch (e) { /* noop */ }
}

/* ==========================================================================
   UNDO
   ========================================================================== */

function snapshot(label) {
  history.push({ label, state: JSON.parse(JSON.stringify(S)) });
  if (history.length > 60) history.shift();
}

function undo() {
  const prev = history.pop();
  if (!prev) return toast("Nothing left to undo");
  S = prev.state;
  save();
  closeClue(true);
  renderAll();
  toast(prev.label ? `Undid: ${prev.label}` : "Undone");
}

/* ==========================================================================
   HELPERS
   ========================================================================== */

const money = (n) => (n < 0 ? "-$" : "$") + Math.abs(n).toLocaleString();
const key = (catId, row) => `${catId}-${row}`;
const roundOf = (i) => GAME.rounds[i];
const colsOf = (r) => (S.layout && S.layout[r]) || [];

function toast(msg) {
  const el = document.createElement("div");
  el.className = "toast";
  el.textContent = msg;
  $("#toasts").appendChild(el);
  setTimeout(() => {
    el.classList.add("out");
    setTimeout(() => el.remove(), 300);
  }, 2200);
}

function clueCount(r) {
  return colsOf(r).length * roundOf(r).values.length;
}
function usedCount(r) {
  let n = 0;
  colsOf(r).forEach((id) =>
    roundOf(r).values.forEach((_, row) => { if (S.used[key(id, row)]) n++; }));
  return n;
}
function boardExhausted() {
  return usedCount(S.round) >= clueCount(S.round);
}

/* Pick Daily Double squares. Real Jeopardy skews them toward the bottom rows. */
function rollDailyDoubles(r) {
  const round = roundOf(r);
  const ids = colsOf(r);
  const weighted = [];
  ids.forEach((id) => {
    round.values.forEach((_, row) => {
      // row 0 is nearly never a DD; deeper rows are far more likely
      const weight = [1, 3, 5, 6, 5][row] ?? 3;
      for (let w = 0; w < weight; w++) weighted.push(key(id, row));
    });
  });

  const picks = [];
  const usedCats = new Set();
  const want = Math.min(round.dailyDoubles || 0, ids.length);
  let guard = 0;
  while (picks.length < want && guard++ < 400 && weighted.length) {
    const pick = weighted[Math.floor(Math.random() * weighted.length)];
    const catId = pick.slice(0, pick.lastIndexOf("-"));
    if (picks.includes(pick) || usedCats.has(catId)) continue;  // one per column
    picks.push(pick);
    usedCats.add(catId);
  }
  S.dd[r] = picks;
}

function isDD(r, catId, row) {
  return S.settings.dailyDoubles && (S.dd[r] || []).includes(key(catId, row));
}

/* ==========================================================================
   SETUP SCREEN
   ========================================================================== */

let setupTeamCount = 2;

function renderSetupTeams() {
  const wrap = $("#team-inputs");
  const existing = {};
  $$(".team-row input", wrap).forEach((inp, i) => { existing[i] = inp.value; });

  wrap.innerHTML = "";
  for (let i = 0; i < setupTeamCount; i++) {
    const row = document.createElement("div");
    row.className = "team-row";
    row.style.setProperty("--tc", PALETTE[i]);
    row.style.animationDelay = i * 55 + "ms";
    row.innerHTML = `
      <span class="swatch"></span>
      <input type="text" maxlength="22" aria-label="Team ${i + 1} name">`;
    const inp = row.querySelector("input");
    inp.placeholder = DEFAULT_NAMES[i];
    inp.value = existing[i] ?? "";
    wrap.appendChild(row);
  }
}

function initSetup() {
  renderSetupTeams();

  $("#team-count-seg").addEventListener("click", (e) => {
    const btn = e.target.closest("button[data-n]");
    if (!btn) return;
    setupTeamCount = +btn.dataset.n;
    $$("#team-count-seg button").forEach((b) => b.classList.toggle("on", b === btn));
    renderSetupTeams();
    SFX.select();
  });

  const saved = load();
  if (saved && saved.teams) {
    const btn = $("#btn-resume");
    btn.classList.remove("hidden");
    btn.textContent = `Resume saved game (${saved.teams.map((t) => t.name).join(" vs ")})`;
    btn.addEventListener("click", () => {
      S = saved;
      if (!S.settings) S.settings = defaultSettings();
      SFX.setEnabled(S.settings.sound);
      SFX.unlock();
      startFromState();
    });
  }

  $("#btn-start").addEventListener("click", startNewGame);
}

function startNewGame() {
  const names = $$(".team-row input").map((inp, i) => inp.value.trim() || DEFAULT_NAMES[i]);
  const teams = names.map((name, i) => ({ name, color: PALETTE[i], score: 0 }));

  const settings = {
    timer: $("#opt-timer").checked,
    timerSecs: Math.max(5, +$("#opt-timer-secs").value || 20),
    penalty: $("#opt-penalty").checked,
    dailyDoubles: $("#opt-dd").checked,
    sound: $("#opt-sound").checked,
    strictTurns: $("#opt-freeforall").checked,
    autoTurn: true,
  };

  S = freshState(teams, settings);
  history = [];
  rollDailyDoubles(0);
  rollDailyDoubles(1);
  S.finalIndex = Math.floor(Math.random() * GAME.finals.length);

  SFX.setEnabled(settings.sound);
  SFX.unlock();
  save();
  startFromState();
  splashRound(roundOf(0).name, "Pick a square to begin");
}

function startFromState() {
  document.body.dataset.view = S.phase === "results" ? "results"
    : S.phase === "final" ? "final" : "board";
  renderAll();
  if (S.phase === "final") renderFinal();
  if (S.phase === "results") renderResults();
}

/* ==========================================================================
   BOARD
   ========================================================================== */

let lastBoardShown = null;   // which round the cascade last played for

function renderBoard() {
  const round = roundOf(S.round);
  const ids = colsOf(S.round);
  const board = $("#board");
  board.style.setProperty("--cols", Math.max(1, ids.length));
  board.innerHTML = "";

  // Only cascade the tiles in when a board is genuinely new, otherwise the
  // whole grid re-animates after every single clue.
  const intro = lastBoardShown !== S.round;
  board.classList.toggle("intro", intro);
  lastBoardShown = S.round;

  ids.forEach((id, c) => {
    const cat = poolById(id);
    if (!cat) return;
    const el = document.createElement("div");
    el.className = "cat";
    el.style.animationDelay = c * 70 + "ms";
    el.textContent = cat.title;
    el.style.gridColumn = c + 1;
    el.style.gridRow = 1;
    board.appendChild(el);
  });

  ids.forEach((id, c) => {
    round.values.forEach((val, row) => {
      const k = key(id, row);
      const tile = document.createElement("button");
      tile.className = "tile" + (S.used[k] ? " used" : "") + (S.ddHit[k] ? " was-dd" : "");
      tile.style.gridColumn = c + 1;
      tile.style.gridRow = row + 2;
      tile.style.setProperty("--d", 380 + (c * 5 + row) * 26 + "ms");
      tile.dataset.cat = id;
      tile.dataset.c = c;
      tile.dataset.row = row;
      tile.innerHTML = `<span class="amt">$${val}</span>`;
      if (!S.used[k]) {
        tile.addEventListener("click", () => openClue(id, row, tile));
      } else {
        tile.tabIndex = -1;
      }
      board.appendChild(tile);
    });
  });

  $("#round-name").textContent = round.name;
  const done = usedCount(S.round);
  $("#round-progress").textContent = `${done} of ${clueCount(S.round)} played`;

  const exhausted = boardExhausted();
  const nextBtn = $("#btn-next-round");
  nextBtn.classList.toggle("hidden", !exhausted);
  nextBtn.textContent = S.round === 0 ? "On to Double Jeopardy! →" : "On to Final Jeopardy! →";

  renderTurnHint(exhausted);
}

function renderTurnHint(exhausted) {
  const hint = $("#turn-hint");
  if (exhausted) {
    hint.innerHTML = "Board cleared!";
  } else {
    const t = S.teams[S.activeTeam];
    hint.innerHTML = t ? `Board control: <b>${escapeHtml(t.name)}</b>` : "";
  }
}

function escapeHtml(s) {
  return String(s).replace(/[&<>"']/g, (m) =>
    ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[m]));
}

/* ==========================================================================
   PODIUMS
   ========================================================================== */

function renderPodiums() {
  const wrap = $("#podiums");
  wrap.innerHTML = "";
  S.teams.forEach((t, i) => {
    const el = document.createElement("div");
    el.className = "podium" + (i === S.activeTeam ? " active" : "");
    el.style.setProperty("--tc", t.color);
    el.style.setProperty("--d", i * 70 + "ms");
    el.dataset.team = i;
    el.innerHTML = `
      <div class="podium-name">${escapeHtml(t.name)}</div>
      <div class="podium-score${t.score < 0 ? " neg" : ""}">${money(t.score)}</div>`;
    el.addEventListener("click", () => {
      if (clue) return;
      snapshot("turn change");
      S.activeTeam = i;
      save();
      renderPodiums();
      renderTurnHint(boardExhausted());
      SFX.select();
    });
    wrap.appendChild(el);
  });
}

/* Animate a score change: rolling number + floating delta + flash. */
function applyScore(teamIndex, delta, label) {
  const t = S.teams[teamIndex];
  if (!t) return;
  snapshot(label || `${delta > 0 ? "+" : ""}${delta} to ${t.name}`);
  const from = t.score;
  t.score += delta;
  save();

  const podium = $(`.podium[data-team="${teamIndex}"]`);
  if (podium) {
    podium.classList.remove("flash-good", "flash-bad");
    void podium.offsetWidth;
    podium.classList.add(delta >= 0 ? "flash-good" : "flash-bad");

    const d = document.createElement("span");
    d.className = "delta " + (delta >= 0 ? "up" : "down");
    d.textContent = (delta >= 0 ? "+" : "−") + "$" + Math.abs(delta).toLocaleString();
    podium.appendChild(d);
    setTimeout(() => d.remove(), 1200);

    rollNumber(podium.querySelector(".podium-score"), from, t.score);
  }
  renderScoreEditor();
}

function rollNumber(el, from, to) {
  if (!el) return;
  const dur = 620;
  const t0 = performance.now();
  const step = (now) => {
    const p = Math.min(1, (now - t0) / dur);
    const eased = 1 - Math.pow(1 - p, 3);
    const v = Math.round(from + (to - from) * eased);
    el.textContent = money(v);
    el.classList.toggle("neg", v < 0);
    if (p < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
}

/* ==========================================================================
   CLUE — open / animate / resolve
   ========================================================================== */

function openClue(catId, row, tileEl) {
  if (clue) return;
  const round = roundOf(S.round);
  const cat = poolById(catId);
  const k = key(catId, row);
  if (!cat || S.used[k]) return;

  const data = cat.clues[row];
  const dd = isDD(S.round, catId, row);

  clue = {
    catId, row, k, tileEl,
    cat: cat.title,
    value: round.values[row],
    q: data.q, a: data.a, note: data.note || "",
    media: data.media || null,
    seconds: data.seconds || null,
    dd,
    wager: null,
    buzzed: null,
    lockedOut: [],
    revealed: false,
    resolved: false,
    awardedTo: null,   // team that answered correctly, if any
    touched: false,    // whether this clue already pushed an undo snapshot
  };

  SFX.select();
  zoomFromTile(tileEl, () => {
    if (dd) showDailyDouble();
    else showClueBody();
  });
}

/* FLIP: start the overlay card exactly on the tile, then grow it fullscreen. */
function zoomFromTile(tileEl, done) {
  const layer = $("#clue-layer");
  const card = $("#clue-card");
  const r = tileEl.getBoundingClientRect();

  $("#clue-body").classList.remove("show");
  $("#dd-splash").classList.remove("show");
  $("#wager-panel").classList.remove("show");
  $("#answer-box").classList.remove("show");

  card.classList.remove("animating", "full");
  card.style.left = r.left + "px";
  card.style.top = r.top + "px";
  card.style.width = r.width + "px";
  card.style.height = r.height + "px";

  layer.classList.add("open");
  layer.setAttribute("aria-hidden", "false");
  tileEl.classList.add("launching");

  requestAnimationFrame(() => {
    card.classList.add("animating");
    requestAnimationFrame(() => {
      const W = window.innerWidth, H = window.innerHeight;
      const padX = Math.min(60, W * 0.04);
      const padY = Math.min(40, H * 0.05);
      card.style.left = padX + "px";
      card.style.top = padY + "px";
      card.style.width = (W - padX * 2) + "px";
      card.style.height = (H - padY * 2) + "px";
      card.classList.add("full");
    });
  });

  setTimeout(done, 470);
}

function showClueBody() {
  const body = $("#clue-body");
  $("#clue-cat").textContent = clue.cat;
  $("#clue-val").textContent = clue.dd
    ? "DAILY DOUBLE · " + money(clue.wager || 0)
    : "$" + clue.value.toLocaleString();
  $("#clue-text").textContent = clue.q;
  $("#answer-text").textContent = clue.a;
  $("#answer-note").textContent = clue.note;
  $("#answer-box").classList.remove("show");

  body.classList.add("show");
  startMedia(clue.media);
  renderBuzzRow();
  renderClueActions();
  // Clues with a clip don't start their countdown here at all — it begins when
  // the host presses play (or, for a windowed clip, when the clip cuts out).
  if (!clue.media) startTimer();
}

function showDailyDouble() {
  const splash = $("#dd-splash");
  splash.classList.add("show");
  SFX.dailyDouble();
  S.ddHit[clue.k] = true;

  setTimeout(() => {
    splash.classList.remove("show");
    showWagerPanel();
  }, 2100);
}

function showWagerPanel() {
  const panel = $("#wager-panel");
  const team = S.teams[S.activeTeam];
  const maxBoard = Math.max(...roundOf(S.round).values);
  const max = Math.max(team.score, maxBoard);
  const min = 100;

  panel.style.setProperty("--tc", team.color);
  $("#wager-team").textContent = team.name;
  $("#wager-range").textContent = `Between ${money(min)} and ${money(max)} — current score ${money(team.score)}`;

  const input = $("#wager-input");
  input.min = min; input.max = max;
  input.value = Math.min(max, clue.value);

  const quick = $("#wager-quick");
  quick.innerHTML = "";
  const options = [
    ["$" + clue.value, clue.value],
    ["Half", Math.max(min, Math.round(max / 2 / 100) * 100)],
    ["Max — " + money(max), max],
  ];
  options.forEach(([label, val]) => {
    if (val < min || val > max) return;
    const b = document.createElement("button");
    b.textContent = label;
    b.addEventListener("click", () => { input.value = val; SFX.select(); });
    quick.appendChild(b);
  });

  panel.classList.add("show");
  setTimeout(() => input.select(), 260);

  const go = () => {
    let w = Math.round(+input.value || 0);
    w = Math.max(min, Math.min(max, w));
    clue.wager = w;
    panel.classList.remove("show");
    $("#wager-go").removeEventListener("click", go);
    input.removeEventListener("keydown", onKey);
    showClueBody();
  };
  const onKey = (e) => { if (e.key === "Enter") { e.preventDefault(); go(); } };

  $("#wager-go").addEventListener("click", go);
  input.addEventListener("keydown", onKey);
}

/* --- buzz row --------------------------------------------------------- */

function renderBuzzRow() {
  const row = $("#buzz-row");
  row.innerHTML = "";

  // Daily Double: only the team that picked it plays.
  if (clue.dd) {
    const t = S.teams[S.activeTeam];
    const b = document.createElement("div");
    b.className = "buzz-btn on";
    b.style.setProperty("--tc", t.color);
    b.innerHTML = `${escapeHtml(t.name)} — wagering ${money(clue.wager || 0)}`;
    row.appendChild(b);
    clue.buzzed = S.activeTeam;
    return;
  }

  S.teams.forEach((t, i) => {
    const allowed = !S.settings.strictTurns || i === S.activeTeam;
    // once the clue is over (time up, or already answered) nobody can buzz,
    // so every button should visibly go dead
    // (but the team that just won it stays lit rather than greying out)
    const dead = (clue.resolved && clue.buzzed !== i)
      || clue.lockedOut.includes(i) || !allowed;
    const b = document.createElement("button");
    b.className = "buzz-btn"
      + (clue.buzzed === i ? " on" : "")
      + (dead ? " out" : "");
    b.style.setProperty("--tc", t.color);
    b.innerHTML = `<span class="num">${i + 1}</span>${escapeHtml(t.name)}`;
    b.addEventListener("click", () => buzzIn(i));
    row.appendChild(b);
  });

  $$(".podium").forEach((p, i) => {
    p.classList.toggle("buzzed", clue.buzzed === i);
    p.classList.toggle("locked-out", clue.lockedOut.includes(i));
  });
}

function buzzIn(i) {
  if (!clue || clue.resolved || clue.lockedOut.includes(i)) return;
  if (S.settings.strictTurns && i !== S.activeTeam) return;
  clue.buzzed = i;
  pauseTimer();
  SFX.buzzIn();
  renderBuzzRow();
  renderClueActions();
}

function renderClueActions() {
  const has = clue && clue.buzzed !== null && !clue.resolved;
  $("#btn-correct").disabled = !has;
  $("#btn-wrong").disabled = !has;
  $("#btn-reveal").classList.toggle("hidden", clue?.revealed);
}

/* --- resolving -------------------------------------------------------- */

function markCorrect() {
  if (!clue || clue.buzzed === null || clue.resolved) return;
  const amount = clue.dd ? clue.wager : clue.value;
  const team = clue.buzzed;
  stopTimer();
  SFX.correct();
  applyScore(team, amount, `${S.teams[team].name} +${money(amount)}`);
  if (S.settings.autoTurn) S.activeTeam = team;
  clue.resolved = true;
  clue.touched = true;
  clue.awardedTo = team;
  revealAnswer();
}

function markWrong() {
  if (!clue || clue.buzzed === null || clue.resolved) return;
  const amount = clue.dd ? clue.wager : clue.value;
  const team = clue.buzzed;
  SFX.wrong();

  if (S.settings.penalty) {
    applyScore(team, -amount, `${S.teams[team].name} −${money(amount)}`);
  } else {
    snapshot(`${S.teams[team].name} missed`);
  }

  clue.touched = true;
  clue.lockedOut.push(team);
  clue.buzzed = null;

  // Daily Double, strict turns, or everyone has missed it → clue is over.
  const everyoneOut = clue.lockedOut.length >= S.teams.length;
  if (clue.dd || S.settings.strictTurns || everyoneOut) {
    clue.resolved = true;
    stopTimer();
    revealAnswer();
  } else {
    renderBuzzRow();
    renderClueActions();
    resumeTimer();
  }
}

function revealAnswer() {
  if (!clue) return;
  clue.revealed = true;
  stopTimer();
  playAnswerClip();
  $("#answer-box").classList.add("show");
  renderBuzzRow();      // grey out the team buttons — the clue is closed to answers
  renderClueActions();
}

function revealAndHold() {
  if (!clue) return;
  if (!clue.revealed) revealAnswer();
  else closeClue();
}

/* --- closing ---------------------------------------------------------- */

function closeClue(instant) {
  if (!clue) return;
  stopTimer();
  stopMedia();

  const cur = clue;
  clue = null;

  // Nobody scored on this clue, so nothing has snapshotted it yet — do it here
  // so the square can still be reopened with undo.
  if (!cur.touched) snapshot("skipped clue");

  // If no one answered it correctly, board control moves on to the next team.
  // That's the usual outcome of "nobody even attempted it".
  if (cur.awardedTo === null && S.teams.length > 1) {
    S.activeTeam = (S.activeTeam + 1) % S.teams.length;
  }

  S.used[cur.k] = true;
  save();

  const layer = $("#clue-layer");
  const card = $("#clue-card");
  const finish = () => {
    layer.classList.remove("open");
    layer.setAttribute("aria-hidden", "true");
    card.classList.remove("animating", "full");
    $("#clue-body").classList.remove("show");
    $("#dd-splash").classList.remove("show");
    $("#wager-panel").classList.remove("show");
    renderAll();
    if (boardExhausted()) setTimeout(() => SFX.roundStart(), 260);
  };

  if (instant) return finish();

  $("#clue-body").classList.remove("show");
  const r = cur.tileEl?.getBoundingClientRect();
  if (r && r.width) {
    card.style.left = r.left + "px";
    card.style.top = r.top + "px";
    card.style.width = r.width + "px";
    card.style.height = r.height + "px";
    card.classList.remove("full");
    setTimeout(finish, 430);
  } else {
    finish();
  }
}

/* ==========================================================================
   CLUE MEDIA — optional audio clip or YouTube snippet
   ========================================================================== */

let audioEl = null;      // the <audio> element for local/URL clips
let curMedia = null;     // the media spec currently loaded
let ytPaused = false;    // youtube has no readable state from out here, so track it
let clipTimer = null;    // fires at the end of a clip window
let clipArmed = false;   // the window timer has been scheduled
let clipStopped = false; // the window already ended — don't stop it a second time
let mediaStarted = false; // the host has pressed play at least once

const YT_ORIGIN = "https://www.youtube-nocookie.com";

/* Drive the embedded player without touching it — the cover panel sits on top
   of the iframe, so the host can't click the video's own controls. */
function ytCommand(func, args = []) {
  const iframe = $("#media-frame iframe");
  if (!iframe || !iframe.contentWindow) return;
  iframe.contentWindow.postMessage(
    JSON.stringify({ event: "command", func, args }), YT_ORIGIN);
}

/* Ask the player to start reporting state changes back to us. */
function ytListen() {
  const iframe = $("#media-frame iframe");
  if (!iframe || !iframe.contentWindow) return;
  iframe.contentWindow.postMessage(
    JSON.stringify({ event: "listening", id: "clue-player", channel: "widget" }), YT_ORIGIN);
}

/* Stop at the end of the clip window.
   We deliberately do NOT use YouTube's own `end` parameter: it hard-stops the
   video in a state you can't simply resume from, and the whole point of the
   finish-the-lyric clue is being able to carry on from where it stopped. So we
   time the window ourselves, starting the clock only once the video is really
   playing (it can take a second or two to load). */
function armClipWindow() {
  if (clipArmed || !curMedia || curMedia.end == null) return;
  clipArmed = true;
  const ms = Math.max(0, (curMedia.end - (curMedia.start || 0)) * 1000);
  clearTimeout(clipTimer);
  clipTimer = setTimeout(() => {
    if (!curMedia) return;
    clipStopped = true;
    if (curMedia.type === "youtube") ytCommand("pauseVideo");
    else if (audioEl) audioEl.pause();
    ytPaused = true;
    setPausedUI(true);
    // the countdown waits for the music to stop, so nobody loses time to the clip
    startTimer();
  }, ms);
}

/* The local mp3 failed. Swap to the YouTube id the clue named, if it has one,
   so a missing file degrades to streaming instead of silence. */
function useFallback(media) {
  if (!media || !media.fallback || !curMedia) return;
  const wasPlaying = mediaStarted;
  toast("Clip file missing — streaming instead");
  startMedia({
    type: "youtube",
    id: media.fallback,
    start: media.fallbackStart ?? media.start,
    end: media.fallbackEnd ?? media.end,
  });
  // if the host had already hit play, don't make them press it twice
  if (wasPlaying) $("#media-play").click();
}

/* Reveal plays the rest of the song, so the room actually hears the answer. */
function playAnswerClip() {
  if (!curMedia) return;
  clearTimeout(clipTimer);
  clipStopped = true;
  mediaStarted = true;
  if (curMedia.type === "youtube") { ytCommand("playVideo"); ytPaused = false; }
  // play() rejects if a pause lands mid-request; swallow it rather than
  // throwing, and reflect whatever state we actually ended up in.
  else if (audioEl && audioEl.paused) {
    audioEl.play().catch(() => setPausedUI(true));
  }
  setPausedUI(false);
}

function onYtMessage(e) {
  if (e.origin !== YT_ORIGIN) return;
  let data;
  try { data = typeof e.data === "string" ? JSON.parse(e.data) : e.data; }
  catch (_) { return; }
  // info === 1 means "playing"
  if (data && data.event === "onStateChange" && data.info === 1) armClipWindow();
}

function startMedia(media) {
  const wrap = $("#clue-media");
  const frame = $("#media-frame");

  stopMedia();

  if (!media) { wrap.classList.remove("show"); return; }

  curMedia = media;
  ytPaused = true;         // nothing plays until the host presses play
  clipArmed = false;
  clipStopped = false;
  mediaStarted = false;
  wrap.classList.add("show");
  frame.innerHTML = "";

  if (media.type === "youtube") {
    const p = new URLSearchParams({
      autoplay: "0", rel: "0", modestbranding: "1", playsinline: "1",
      controls: "0", iv_load_policy: "3",
      enablejsapi: "1", origin: location.origin,
    });
    if (media.start != null) p.set("start", Math.floor(media.start));
    const iframe = document.createElement("iframe");
    iframe.src = `https://www.youtube-nocookie.com/embed/${encodeURIComponent(media.id)}?${p}`;
    iframe.allow = "autoplay; encrypted-media";
    iframe.title = "Clue clip";
    iframe.addEventListener("load", ytListen);
    frame.appendChild(iframe);
  } else {
    audioEl = new Audio(media.src);
    audioEl.preload = "auto";
    // A seek set before the file has metadata can be discarded, which would
    // start the clip in the wrong place — so re-apply it once it loads.
    const seekTo = media.start || 0;
    audioEl.currentTime = seekTo;
    if (seekTo) {
      audioEl.addEventListener("loadedmetadata", () => {
        if (audioEl && Math.abs(audioEl.currentTime - seekTo) > 0.05) {
          audioEl.currentTime = seekTo;
        }
      }, { once: true });
    }
    audioEl.addEventListener("playing", armClipWindow, { once: true });
    // If the mp3 is missing or won't decode, quietly stream from YouTube
    // instead of leaving the host with a dead clue.
    audioEl.addEventListener("error", () => useFallback(media), { once: true });
  }

  // Nothing plays on its own — the host presses play when the room is ready,
  // and only then does any countdown begin.
  setPausedUI(true);
}

function stopMedia() {
  clearTimeout(clipTimer);
  clipTimer = null;
  clipArmed = clipStopped = mediaStarted = false;
  if (audioEl) { audioEl.pause(); audioEl.src = ""; audioEl = null; }
  $("#media-frame").innerHTML = "";   // unloading the iframe stops YouTube
  $("#clue-media").classList.remove("show", "paused");
  curMedia = null;
}

function setPausedUI(paused) {
  $("#clue-media").classList.toggle("paused", paused);
  const btn = $("#media-play");
  const label = $("#media-label");
  const primary = (on) => {
    btn.classList.toggle("btn-gold", on);
    btn.classList.toggle("btn-ghost", !on);
  };

  if (!paused) {
    btn.textContent = "Pause";
    primary(false);
    if (label) label.textContent = "Now playing";
  } else if (!mediaStarted) {
    // the clip is loaded and waiting — make this the obvious thing to click
    btn.textContent = "▶  Play clip";
    primary(true);
    if (label) label.textContent = "Ready — press play";
  } else {
    // after a clip window ends, the button's job is to carry the song on
    btn.textContent = clipStopped ? "Continue" : "Play";
    primary(false);
    if (label) label.textContent = clipStopped ? "Clip ended" : "Paused";
  }
}

function initMedia() {
  // Works for both kinds. For YouTube this doubles as the rescue button when
  // the browser refuses to autoplay the iframe.
  $("#media-play").addEventListener("click", () => {
    if (!curMedia) return;
    const isYT = curMedia.type === "youtube";
    const paused = isYT ? ytPaused : !audioEl || audioEl.paused;

    if (paused) {
      const firstStart = !mediaStarted;
      mediaStarted = true;
      // A later press means the host is driving, so the clip window is done.
      // The very first press is just "start the clip" and must not cancel it.
      if (!firstStart) { clipStopped = true; clearTimeout(clipTimer); }

      if (isYT) { ytCommand("playVideo"); ytPaused = false; }
      else if (audioEl) audioEl.play().catch(() => setPausedUI(true));
      setPausedUI(false);

      if (firstStart) {
        if (curMedia.end != null) {
          // windowed clue ($800): the countdown waits for the clip to cut out,
          // which armClipWindow handles. This is just a backstop in case the
          // player never reports that it started.
          setTimeout(armClipWindow, 2500);
        } else {
          // guessing clue: the countdown runs alongside the music
          startTimer();
        }
      }
    } else {
      clearTimeout(clipTimer);
      clipStopped = true;
      if (isYT) { ytCommand("pauseVideo"); ytPaused = true; }
      else if (audioEl) audioEl.pause();
      setPausedUI(true);
    }
  });

  $("#media-replay").addEventListener("click", () => {
    if (!curMedia) return;
    clearTimeout(clipTimer);
    clipArmed = false;
    clipStopped = false;
    mediaStarted = true;

    if (curMedia.type === "youtube") {
      ytCommand("seekTo", [curMedia.start || 0, true]);
      ytCommand("playVideo");
      ytPaused = false;
    } else if (audioEl) {
      audioEl.currentTime = curMedia.start || 0;
      audioEl.play().catch(() => setPausedUI(true));
    }
    setPausedUI(false);
    armClipWindow();   // re-arm the cut so a replay stops in the same place
  });

  window.addEventListener("message", onYtMessage);
}

/* ==========================================================================
   TIMER
   ========================================================================== */

function buildTimerStrip(el, segments) {
  el.innerHTML = "";
  for (let i = 0; i < segments; i++) el.appendChild(document.createElement("i"));
}

function startTimer() {
  const strip = $("#timer-strip");
  if (!S.settings.timer) { strip.style.display = "none"; return; }
  strip.style.display = "flex";
  strip.classList.remove("warn", "done");

  // a clue can ask for more time than the default — song clips need to finish
  const total = clue?.seconds || S.settings.timerSecs;
  const segments = Math.min(30, Math.max(5, total));
  buildTimerStrip(strip, segments);

  timer = { left: total, total, segments, paused: false, strip, onEnd: onTimeUp };
  timer.id = setInterval(tick, 1000 * (total / segments));
}

function tick() {
  if (!timer || timer.paused) return;
  timer.left -= timer.total / timer.segments;
  const lit = Math.max(0, Math.ceil((timer.left / timer.total) * timer.segments));
  const bulbs = $$("i", timer.strip);
  bulbs.forEach((b, i) => b.classList.toggle("out", i >= lit));
  timer.strip.classList.toggle("warn", lit <= timer.segments * 0.3);
  if (timer.left <= 0.01) {
    const end = timer.onEnd;
    stopTimer();
    timer = null;
    end && end();
  }
}

function pauseTimer()  { if (timer) timer.paused = true; }
function resumeTimer() { if (timer) timer.paused = false; }
function stopTimer() {
  if (timer?.id) clearInterval(timer.id);
  if (timer?.strip) timer.strip.classList.add("done");
  timer = null;   // don't leave a dead timer around to be mistaken for a live one
}

function onTimeUp() {
  if (!clue || clue.resolved) return;
  SFX.timeUp();
  clue.resolved = true;
  revealAnswer();
  toast("Time's up!");
}

/* ==========================================================================
   ROUND TRANSITIONS
   ========================================================================== */

function splashRound(text, sub) {
  const el = $("#round-splash");
  $("#round-splash-text").textContent = text;
  $("#round-splash-sub").textContent = sub || "";
  el.classList.add("show");
  el.setAttribute("aria-hidden", "false");
  SFX.roundStart();
  setTimeout(() => {
    el.classList.remove("show");
    el.setAttribute("aria-hidden", "true");
    SFX.boardFill();
  }, 2300);
}

function nextRound() {
  if (S.round === 0) {
    snapshot("advance round");
    S.round = 1;
    save();
    renderAll();
    splashRound(roundOf(1).name, "All values doubled");
  } else {
    goToFinal();
  }
}

/* ==========================================================================
   FINAL JEOPARDY
   ========================================================================== */

function goToFinal() {
  snapshot("go to Final Jeopardy");
  S.phase = "final";
  S.final = { wagers: {}, results: {} };
  save();
  document.body.dataset.view = "final";
  renderFinal();
  SFX.roundStart();
}

function renderFinal() {
  const f = GAME.finals[S.finalIndex] || GAME.finals[0];
  $("#final-category").textContent = f.category;
  $("#final-clue-text").textContent = f.q;
  $("#final-answer-text").textContent = f.a;
  $("#final-answer-note").textContent = f.note || "";

  showFinalStep("final-wagers");

  const list = $("#final-wager-list");
  list.innerHTML = "";
  S.teams.forEach((t, i) => {
    const max = Math.max(0, t.score);
    const row = document.createElement("div");
    row.className = "final-wager-row";
    row.style.setProperty("--tc", t.color);
    row.innerHTML = `
      <span class="fw-name">${escapeHtml(t.name)}</span>
      <span class="fw-score">${money(t.score)}</span>
      <input type="number" min="0" max="${max}" step="100" value="${S.final.wagers[i] ?? 0}"
             aria-label="${escapeHtml(t.name)} wager">`;
    row.querySelector("input").addEventListener("input", (e) => {
      const v = Math.max(0, Math.min(max, Math.round(+e.target.value || 0)));
      S.final.wagers[i] = v;
    });
    list.appendChild(row);
  });
}

function showFinalStep(id) {
  $$(".final-step").forEach((s) => s.classList.toggle("show", s.id === id));
}

function lockFinalWagers() {
  S.teams.forEach((t, i) => {
    const max = Math.max(0, t.score);
    S.final.wagers[i] = Math.max(0, Math.min(max, Math.round(S.final.wagers[i] || 0)));
  });
  save();
  showFinalStep("final-clue");

  const strip = $("#final-timer");
  if (S.settings.timer) {
    strip.style.display = "flex";
    const total = 30;
    buildTimerStrip(strip, 30);
    timer = { left: total, total, segments: 30, paused: false, strip, onEnd: () => { SFX.stopTicking(); SFX.timeUp(); } };
    timer.id = setInterval(tick, 1000);
    SFX.startTicking(total);
  } else {
    strip.style.display = "none";
  }
}

function revealFinal() {
  stopTimer();
  timer = null;
  SFX.stopTicking();
  showFinalStep("final-judge");

  const list = $("#final-judge-list");
  list.innerHTML = "";
  S.teams.forEach((t, i) => {
    const row = document.createElement("div");
    row.className = "final-judge-row";
    row.style.setProperty("--tc", t.color);
    row.innerHTML = `
      <span class="fj-name">${escapeHtml(t.name)}</span>
      <span class="fj-wager">wagered ${money(S.final.wagers[i] || 0)}</span>
      <span class="fj-toggle">
        <button data-v="1">Right</button>
        <button data-v="0">Wrong</button>
      </span>`;
    row.querySelectorAll("button").forEach((b) => {
      b.addEventListener("click", () => {
        const right = b.dataset.v === "1";
        S.final.results[i] = right;
        row.querySelectorAll("button").forEach((x) => {
          x.classList.remove("on-good", "on-bad");
        });
        b.classList.add(right ? "on-good" : "on-bad");
        right ? SFX.correct() : SFX.wrong();
      });
    });
    list.appendChild(row);
  });
}

function finishFinal() {
  snapshot("final scoring");
  S.teams.forEach((t, i) => {
    const w = S.final.wagers[i] || 0;
    const right = S.final.results[i];
    if (right === true) t.score += w;
    else if (right === false) t.score -= w;
  });
  S.phase = "results";
  save();
  document.body.dataset.view = "results";
  renderResults();
}

/* ==========================================================================
   RESULTS
   ========================================================================== */

function renderResults() {
  const ranked = S.teams.map((t, i) => ({ ...t, i })).sort((a, b) => b.score - a.score);
  const top = ranked[0];
  const tied = ranked.filter((t) => t.score === top.score);

  $("#winner-line").textContent = tied.length > 1
    ? `It's a tie — ${tied.map((t) => t.name).join(" & ")}!`
    : `Winner: ${top.name}`;

  const list = $("#results-list");
  list.innerHTML = "";
  ranked.forEach((t, idx) => {
    const li = document.createElement("li");
    li.style.setProperty("--tc", t.color);
    li.style.setProperty("--d", idx * 110 + "ms");
    li.innerHTML = `
      <span class="rank">${idx + 1}</span>
      <span class="rname">${escapeHtml(t.name)}</span>
      <span class="rscore${t.score < 0 ? " neg" : ""}">${money(t.score)}</span>`;
    list.appendChild(li);
  });

  SFX.fanfare();
  runConfetti(S.teams.map((t) => t.color));
}

/* --- confetti --------------------------------------------------------- */

let confettiRAF = null;
function runConfetti(colors) {
  const cv = $("#confetti");
  const ctx = cv.getContext("2d");
  const dpr = Math.min(2, window.devicePixelRatio || 1);
  const resize = () => {
    cv.width = window.innerWidth * dpr;
    cv.height = window.innerHeight * dpr;
    cv.style.width = window.innerWidth + "px";
    cv.style.height = window.innerHeight + "px";
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  };
  resize();
  window.addEventListener("resize", resize);

  const W = () => window.innerWidth, H = () => window.innerHeight;
  const palette = [...colors, "#ffd479", "#ffffff", "#d8a04a"];
  const bits = Array.from({ length: 170 }, () => ({
    x: Math.random() * W(),
    y: -20 - Math.random() * H() * 0.9,
    w: 6 + Math.random() * 7,
    h: 9 + Math.random() * 12,
    vy: 1.8 + Math.random() * 3.4,
    vx: -1.2 + Math.random() * 2.4,
    rot: Math.random() * Math.PI * 2,
    vr: -0.12 + Math.random() * 0.24,
    color: palette[Math.floor(Math.random() * palette.length)],
    sway: Math.random() * Math.PI * 2,
  }));

  let frames = 0;
  const draw = () => {
    ctx.clearRect(0, 0, W(), H());
    bits.forEach((b) => {
      b.sway += 0.05;
      b.y += b.vy;
      b.x += b.vx + Math.sin(b.sway) * 0.9;
      b.rot += b.vr;
      if (b.y > H() + 30 && frames < 460) {
        b.y = -25; b.x = Math.random() * W();
      }
      ctx.save();
      ctx.translate(b.x, b.y);
      ctx.rotate(b.rot);
      ctx.fillStyle = b.color;
      ctx.globalAlpha = frames > 460 ? Math.max(0, 1 - (frames - 460) / 130) : 1;
      ctx.fillRect(-b.w / 2, -b.h / 2, b.w, b.h);
      ctx.restore();
    });
    frames++;
    if (frames < 600) confettiRAF = requestAnimationFrame(draw);
    else ctx.clearRect(0, 0, W(), H());
  };
  cancelAnimationFrame(confettiRAF);
  draw();
}

/* ==========================================================================
   SETTINGS DRAWER
   ========================================================================== */

function openSettings() {
  $("#settings").classList.add("open");
  $("#settings").setAttribute("aria-hidden", "false");
  $("#settings-scrim").classList.add("open");
  renderSettings();
}
function closeSettings() {
  $("#settings").classList.remove("open");
  $("#settings").setAttribute("aria-hidden", "true");
  $("#settings-scrim").classList.remove("open");
}

function renderSettings() {
  renderScoreEditor();
  renderTeamEditor();
  renderLayoutEditor();
  renderBoardEditor();

  $("#set-timer").checked   = S.settings.timer;
  $("#set-timer-secs").value = S.settings.timerSecs;
  $("#set-penalty").checked = S.settings.penalty;
  $("#set-dd-on").checked   = S.settings.dailyDoubles;
  $("#set-sound").checked   = S.settings.sound;
  $("#set-ffa").checked     = S.settings.strictTurns;
  $("#set-autoturn").checked = S.settings.autoTurn;
  $("#set-round").value     = S.round;

  const turn = $("#set-turn");
  turn.innerHTML = "";
  S.teams.forEach((t, i) => {
    const o = document.createElement("option");
    o.value = i; o.textContent = t.name;
    turn.appendChild(o);
  });
  turn.value = S.activeTeam;

  const fp = $("#set-final-pick");
  fp.innerHTML = "";
  GAME.finals.forEach((f, i) => {
    const o = document.createElement("option");
    o.value = i;
    o.textContent = `${f.category} — ${f.q.slice(0, 40)}…`;
    fp.appendChild(o);
  });
  fp.value = S.finalIndex;
}

function renderScoreEditor() {
  const wrap = $("#score-editor");
  if (!wrap) return;
  wrap.innerHTML = "";
  S.teams.forEach((t, i) => {
    const row = document.createElement("div");
    row.className = "score-row";
    row.style.setProperty("--tc", t.color);
    row.innerHTML = `
      <span class="sname">${escapeHtml(t.name)}</span>
      <button class="nudge" data-d="-100" aria-label="minus 100">−</button>
      <input type="number" step="100" value="${t.score}" aria-label="${escapeHtml(t.name)} score">
      <button class="nudge" data-d="100" aria-label="plus 100">+</button>`;

    row.querySelectorAll(".nudge").forEach((b) => {
      b.addEventListener("click", () => {
        applyScore(i, +b.dataset.d, "manual adjust");
        renderPodiums();
      });
    });
    row.querySelector("input").addEventListener("change", (e) => {
      const v = Math.round(+e.target.value || 0);
      snapshot("set score");
      S.teams[i].score = v;
      save();
      renderPodiums();
    });
    wrap.appendChild(row);
  });
}

function renderTeamEditor() {
  const wrap = $("#team-editor");
  wrap.innerHTML = "";
  S.teams.forEach((t, i) => {
    const row = document.createElement("div");
    row.className = "team-edit-row";
    row.style.setProperty("--tc", t.color);
    row.innerHTML = `
      <input type="color" value="${t.color}" aria-label="${escapeHtml(t.name)} colour">
      <input type="text" maxlength="22" value="${escapeHtml(t.name)}" aria-label="Team ${i + 1} name">`;
    const [colorIn, nameIn] = row.querySelectorAll("input");
    colorIn.addEventListener("input", (e) => {
      S.teams[i].color = e.target.value;
      row.style.setProperty("--tc", e.target.value);
      save(); renderPodiums();
    });
    nameIn.addEventListener("input", (e) => {
      S.teams[i].name = e.target.value || `Team ${i + 1}`;
      save(); renderPodiums(); renderTurnHint(boardExhausted());
    });
    wrap.appendChild(row);
  });
}

function renderBoardEditor() {
  const wrap = $("#board-editor");
  const round = roundOf(S.round);
  const ids = colsOf(S.round);
  wrap.innerHTML = "";
  wrap.style.gridTemplateColumns = `repeat(${Math.max(1, ids.length)}, 1fr)`;

  ids.forEach((id) => {
    const h = document.createElement("div");
    h.className = "be-head";
    h.textContent = poolById(id)?.title || "?";
    wrap.appendChild(h);
  });

  round.values.forEach((val, row) => {
    ids.forEach((id) => {
      const cat = poolById(id);
      const k = key(id, row);
      const isDaily = isDD(S.round, id, row);
      const cell = document.createElement("button");
      cell.className = "be-cell" + (S.used[k] ? " used" : "") + (isDaily ? " dd" : "");
      cell.textContent = "$" + val;
      cell.title = `${cat?.title} — $${val}${isDaily ? " (Daily Double)" : ""}`;
      cell.addEventListener("click", () => {
        snapshot("toggle clue");
        if (S.used[k]) delete S.used[k]; else S.used[k] = true;
        save();
        renderBoardEditor();
        renderBoard();
        SFX.select();
      });
      wrap.appendChild(cell);
    });
  });
}

/* ---- which categories sit on which board -------------------------------- */

function renderLayoutEditor() {
  const wrap = $("#layout-editor");
  if (!wrap) return;
  wrap.innerHTML = "";

  POOL.forEach((cat) => {
    const inR1 = colsOf(0).includes(cat.id);
    const inR2 = colsOf(1).includes(cat.id);
    const played = roundOf(inR2 ? 1 : 0).values
      .filter((_, row) => S.used[key(cat.id, row)]).length;

    const row = document.createElement("div");
    row.className = "layout-row";
    row.innerHTML = `
      <span class="lay-name">${escapeHtml(cat.title)}</span>
      <span class="lay-played">${played ? played + " played" : ""}</span>
      <span class="lay-btns">
        <button data-to="0" class="${inR1 ? "on" : ""}">R1</button>
        <button data-to="1" class="${inR2 ? "on" : ""}">R2</button>
        <button data-to="off" class="${!inR1 && !inR2 ? "on" : ""}">Off</button>
      </span>`;

    row.querySelectorAll("button").forEach((b) => {
      b.addEventListener("click", () => moveCategory(cat.id, b.dataset.to));
    });
    wrap.appendChild(row);
  });

  const n = colsOf(S.round).length;
  $("#layout-count").textContent =
    `${n} ${n === 1 ? "column" : "columns"} on this board · ${n * roundOf(S.round).values.length} clues`;
}

function moveCategory(catId, to) {
  const target = to === "off" ? null : +to;
  if (target !== null && !colsOf(target).includes(catId) && colsOf(target).length >= MAX_COLS) {
    return toast(`A board holds at most ${MAX_COLS} categories`);
  }
  snapshot("move category");

  // pull it off both boards, then put it where it was asked for
  [0, 1].forEach((r) => { S.layout[r] = colsOf(r).filter((id) => id !== catId); });
  if (target !== null) S.layout[target].push(catId);

  // a Daily Double belongs to a board, so re-hide them wherever the columns moved
  rollDailyDoubles(0);
  rollDailyDoubles(1);

  lastBoardShown = null;   // let the new board cascade in
  save();
  saveLayout();            // remember it for the next game too
  renderAll();
  renderLayoutEditor();
  renderBoardEditor();
  SFX.select();
}

function initSettings() {
  $("#btn-settings").addEventListener("click", openSettings);
  $("#btn-close-settings").addEventListener("click", closeSettings);
  $("#settings-scrim").addEventListener("click", closeSettings);

  $("#set-undo").addEventListener("click", () => { undo(); renderSettings(); });
  $("#set-zero").addEventListener("click", () => {
    snapshot("reset scores");
    S.teams.forEach((t) => (t.score = 0));
    save(); renderAll(); renderSettings();
    toast("Scores reset");
  });

  $("#bonus-all-go").addEventListener("click", () => {
    const v = Math.round(+$("#bonus-all").value || 0);
    if (!v) return;
    snapshot("bonus for all");
    S.teams.forEach((t, i) => {
      t.score += v;
      const p = $(`.podium[data-team="${i}"]`);
      if (p) {
        p.classList.remove("flash-good", "flash-bad");
        void p.offsetWidth;
        p.classList.add(v >= 0 ? "flash-good" : "flash-bad");
      }
    });
    save(); renderPodiums(); renderScoreEditor();
    toast(`${v >= 0 ? "+" : ""}${money(v)} to everyone`);
  });

  $("#set-add-team").addEventListener("click", () => {
    if (S.teams.length >= 4) return toast("Four teams is the max");
    snapshot("add team");
    const i = S.teams.length;
    S.teams.push({ name: DEFAULT_NAMES[i], color: PALETTE[i], score: 0 });
    save(); renderAll(); renderSettings();
  });
  $("#set-remove-team").addEventListener("click", () => {
    if (S.teams.length <= 1) return toast("Need at least one team");
    snapshot("remove team");
    S.teams.pop();
    if (S.activeTeam >= S.teams.length) S.activeTeam = 0;
    save(); renderAll(); renderSettings();
  });

  $("#set-turn").addEventListener("change", (e) => {
    snapshot("turn change");
    S.activeTeam = +e.target.value;
    save(); renderPodiums(); renderTurnHint(boardExhausted());
  });

  $("#set-round").addEventListener("change", (e) => {
    snapshot("switch round");
    S.round = +e.target.value;
    S.phase = "board";
    document.body.dataset.view = "board";
    save(); renderAll(); renderBoardEditor();
  });

  $("#set-open-all").addEventListener("click", () => {
    snapshot("reopen board");
    colsOf(S.round).forEach((id) =>
      roundOf(S.round).values.forEach((_, row) => delete S.used[key(id, row)]));
    save(); renderAll(); renderBoardEditor();
    toast("Every clue is available again");
  });
  $("#set-close-all").addEventListener("click", () => {
    snapshot("clear board");
    colsOf(S.round).forEach((id) =>
      roundOf(S.round).values.forEach((_, row) => { S.used[key(id, row)] = true; }));
    save(); renderAll(); renderBoardEditor();
  });

  $("#set-reroll-dd").addEventListener("click", () => {
    snapshot("reshuffle Daily Doubles");
    rollDailyDoubles(S.round);
    save(); renderBoardEditor(); renderBoard();
    toast("Daily Doubles moved");
  });

  $("#set-goto-final").addEventListener("click", () => { closeSettings(); goToFinal(); });

  const bindToggle = (id, prop, after) => {
    $(id).addEventListener("change", (e) => {
      S.settings[prop] = e.target.checked;
      save();
      after && after();
    });
  };
  bindToggle("#set-timer", "timer");
  bindToggle("#set-penalty", "penalty");
  bindToggle("#set-dd-on", "dailyDoubles", () => { renderBoardEditor(); renderBoard(); });
  bindToggle("#set-sound", "sound", () => SFX.setEnabled(S.settings.sound));
  bindToggle("#set-ffa", "strictTurns");
  bindToggle("#set-autoturn", "autoTurn");

  $("#set-timer-secs").addEventListener("change", (e) => {
    S.settings.timerSecs = Math.max(5, Math.min(120, +e.target.value || 20));
    e.target.value = S.settings.timerSecs;
    save();
  });

  $("#set-final-pick").addEventListener("change", (e) => {
    S.finalIndex = +e.target.value;
    save();
    if (S.phase === "final") renderFinal();
  });

  $("#set-reset-board").addEventListener("click", () => {
    snapshot("reset board");
    S.used = {};
    S.ddHit = {};
    forgetLayout();              // an explicit reset really does reset
    S.layout = defaultLayout();
    rollDailyDoubles(0); rollDailyDoubles(1);
    S.round = 0;
    S.phase = "board";
    lastBoardShown = null;   // let the tiles cascade back in
    document.body.dataset.view = "board";
    save(); renderAll(); renderSettings();
    toast("Board reset — scores kept");
  });

  $("#set-new-game").addEventListener("click", () => {
    if (!confirm("Wipe this game and go back to the setup screen?")) return;
    wipe();
    forgetLayout();
    location.reload();
  });
}

/* ==========================================================================
   RENDER ALL
   ========================================================================== */

function renderAll() {
  if (!S) return;
  if (document.body.dataset.view === "board") {
    renderBoard();
    renderPodiums();
  }
  if ($("#settings").classList.contains("open")) renderSettings();
}

/* ==========================================================================
   KEYBOARD + CHROME
   ========================================================================== */

function initChrome() {
  $("#btn-undo").addEventListener("click", undo);
  $("#btn-next-round").addEventListener("click", nextRound);

  $("#btn-correct").addEventListener("click", markCorrect);
  $("#btn-wrong").addEventListener("click", markWrong);
  $("#btn-reveal").addEventListener("click", revealAndHold);
  $("#btn-clue-x").addEventListener("click", () => closeClue());

  $("#final-lock").addEventListener("click", lockFinalWagers);
  $("#final-reveal").addEventListener("click", revealFinal);
  $("#final-done").addEventListener("click", finishFinal);

  $("#btn-back-board").addEventListener("click", () => {
    S.phase = "board";
    save();
    document.body.dataset.view = "board";
    renderAll();
  });
  $("#btn-play-again").addEventListener("click", () => {
    if (!confirm("Start a brand new game?")) return;
    wipe();
    location.reload();
  });

  $("#btn-fullscreen").addEventListener("click", toggleFullscreen);

  const help = $("#help"), helpScrim = $("#help-scrim");
  const showHelp = () => { help.classList.add("open"); helpScrim.classList.add("open"); };
  const hideHelp = () => { help.classList.remove("open"); helpScrim.classList.remove("open"); };
  $("#help-close").addEventListener("click", hideHelp);
  helpScrim.addEventListener("click", hideHelp);

  document.addEventListener("keydown", (e) => {
    const typing = /^(INPUT|TEXTAREA|SELECT)$/.test(e.target.tagName);
    const k = e.key.toLowerCase();

    if (k === "escape") {
      if (help.classList.contains("open")) return hideHelp();
      if ($("#settings").classList.contains("open")) return closeSettings();
      if (clue) {
        if (!clue.revealed) revealAnswer();
        else closeClue();
      }
      return;
    }
    if (typing) return;

    if (k === "?" || (e.shiftKey && k === "/")) { e.preventDefault(); showHelp(); return; }
    if (k === "s") { e.preventDefault(); $("#settings").classList.contains("open") ? closeSettings() : openSettings(); return; }
    if (k === "f") { e.preventDefault(); toggleFullscreen(); return; }
    if (k === "z") { e.preventDefault(); undo(); return; }
    if (k === "+" || k === "=") { e.preventDefault(); applyZoom(uiZoom + ZOOM_STEP); return; }
    if (k === "-" || k === "_") { e.preventDefault(); applyZoom(uiZoom - ZOOM_STEP); return; }
    if (k === "0" && (e.metaKey || e.ctrlKey)) { e.preventDefault(); applyZoom(100, true); return; }

    if (!clue) return;
    if (k >= "1" && k <= "4") { e.preventDefault(); buzzIn(+k - 1); return; }
    if (k === "enter") { e.preventDefault(); markCorrect(); return; }
    if (k === "x") { e.preventDefault(); markWrong(); return; }
    if (k === " ") { e.preventDefault(); revealAndHold(); return; }
  });

  // keep the expanded clue card sized correctly if the window changes
  window.addEventListener("resize", () => {
    const card = $("#clue-card");
    if (!clue || !card.classList.contains("full")) return;
    const W = window.innerWidth, H = window.innerHeight;
    const padX = Math.min(60, W * 0.04), padY = Math.min(40, H * 0.05);
    card.style.left = padX + "px";
    card.style.top = padY + "px";
    card.style.width = (W - padX * 2) + "px";
    card.style.height = (H - padY * 2) + "px";
  });

  // any first interaction unlocks audio
  document.addEventListener("pointerdown", () => SFX.unlock(), { once: true });
}

/* ==========================================================================
   UI SCALE — the zoom dial
   ========================================================================== */

const ZOOM_KEY = "bs-jeopardy-zoom";
const ZOOM_MIN = 80, ZOOM_MAX = 220, ZOOM_STEP = 10;
let uiZoom = 100;

function applyZoom(pct, announce) {
  uiZoom = Math.round(Math.max(ZOOM_MIN, Math.min(ZOOM_MAX, pct)));
  document.documentElement.style.setProperty("--ui-scale", uiZoom / 100);
  const label = uiZoom + "%";
  const val = $("#zoom-val"), read = $("#zoom-readout"), range = $("#zoom-range");
  if (val) val.textContent = label;
  if (read) read.textContent = label;
  if (range) range.value = uiZoom;
  try { localStorage.setItem(ZOOM_KEY, uiZoom); } catch (e) { /* private mode */ }

  // the expanded clue card is sized in pixels, so re-fit it after a resize
  window.dispatchEvent(new Event("resize"));
  if (announce) toast(`Interface size ${label}`);
}

function initZoom() {
  let saved = 100;
  try { saved = +localStorage.getItem(ZOOM_KEY) || 100; } catch (e) { /* noop */ }
  applyZoom(saved);

  $("#zoom-up").addEventListener("click", () => applyZoom(uiZoom + ZOOM_STEP));
  $("#zoom-down").addEventListener("click", () => applyZoom(uiZoom - ZOOM_STEP));
  $("#zoom-val").addEventListener("click", () => applyZoom(100, true));
  $("#zoom-range").addEventListener("input", (e) => applyZoom(+e.target.value));
}

function toggleFullscreen() {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen?.().catch(() => toast("Fullscreen blocked"));
  } else {
    document.exitFullscreen?.();
  }
}

/* ==========================================================================
   BOOT
   ========================================================================== */

initSetup();
initSettings();
initChrome();
initMedia();
initZoom();
