const captainLobby = (() => {
  const panel = document.querySelector("#captain-lobby");
  const open = document.querySelector("#captain-open");
  const status = document.querySelector("#captain-lobby-status");
  let room;
  let started = false;
  let lastStage;
  let closing = false;
  let moving = false;
  let layoutRevision = 0;

  async function request(action, data) {
    const suffix = room ? `?room=${encodeURIComponent(room.code)}` : "";
    const response = await fetch(captainApi + action + suffix, {
      method: data ? "POST" : "GET",
      headers: { "Content-Type": "application/json", ...(room ? { Authorization: room.host } : {}) },
      body: data ? JSON.stringify(data) : undefined,
    });
    const result = await response.json();
    if (!response.ok) throw new Error(result.error);
    return result;
  }

  function syncNames(state) {
    const inputs = document.querySelectorAll("#team-inputs input");
    state.teams.forEach((team, i) => {
      const input = inputs[i];
      if (!input) return;
      input.readOnly = true;
      input.value = team?.name || "";
      input.placeholder = "Not yet joined";
      const row = input.closest(".team-row");
      row.classList.toggle("captain-joined", Boolean(team));
      const badge = row.querySelector(".captain-seat-status");
      badge.hidden = !team;
      const controls = row.querySelector(".captain-seat-move");
      controls.hidden = false;
      controls.querySelectorAll("button").forEach(button => {
        const target = i + Number(button.dataset.step);
        button.disabled = moving || target < 0 || target >= state.teams.length;
      });
    });
    status.textContent = "";
  }

  async function poll() {
    if (!room) return;
    try {
      if (!started) {
        const revision = layoutRevision;
        const state = await request("state");
        if (!moving && !closing && !started && revision === layoutRevision) syncNames(state);
      } else {
        const current = clue;
        const remoteClue = current?.openForBuzz && !current.dd && !current.resolved && !current.revealed
          ? {
              id: current.buzzId,
              eligible: S.teams.flatMap((_, i) =>
                !current.lockedOut.includes(i) && (!S.settings.strictTurns || S.activeTeam === i) ? [i] : []),
              answering: current.buzzed,
            }
          : null;
        const stage = JSON.stringify(remoteClue);
        const result = stage !== lastStage
          ? await request("stage", { clue: remoteClue })
          : await request("state");
        lastStage = stage;
        if (current && current === clue && result.clue?.id === current.buzzId) {
          for (const i of result.queue) buzzIn(i);
        }
      }
    } catch {
      status.textContent = "Connection interrupted. Host buzzers still work.";
    } finally {
      setTimeout(poll, 300);
    }
  }

  document.querySelector("#team-inputs").addEventListener("click", async event => {
    const button = event.target.closest(".captain-seat-move button");
    if (!button || !room || moving || started || closing) return;
    const from = Number(button.closest(".captain-seat-move").dataset.seat);
    const to = from + Number(button.dataset.step);
    const start = document.querySelector("#btn-start");
    moving = true;
    layoutRevision++;
    start.disabled = true;
    document.querySelectorAll(".captain-seat-move button").forEach(control => { control.disabled = true; });
    try {
      const state = await request("reorder", { from, to });
      moving = false;
      syncNames(state);
      document.querySelector(`.captain-seat-move[data-seat="${to}"] button:not(:disabled)`)?.focus();
    } catch (error) {
      status.textContent = error.message;
    } finally {
      moving = false;
      start.disabled = false;
    }
  });

  open.addEventListener("click", async () => {
    open.disabled = true;
    try {
      room = await request("create", { count: setupTeamCount });
      const base = new URL(location.href);
      if (["localhost", "127.0.0.1"].includes(base.hostname)) {
        const lan = await fetch("/captain-api/address").then(response => response.json());
        base.hostname = lan.host;
      }
      const url = new URL("captain.html", base);
      url.searchParams.set("room", room.code);
      const qr = qrcode(0, "M");
      qr.addData(url.href);
      qr.make();
      const image = document.querySelector("#captain-qr");
      image.src = qr.createDataURL(5, 15);
      const link = document.querySelector("#captain-link");
      link.href = url.href;
      link.textContent = "Open captain join link";
      panel.hidden = false;
      open.setAttribute("aria-expanded", "true");
      document.querySelectorAll("#team-count-seg button").forEach(button => { button.disabled = true; });
      syncNames({ teams: Array(setupTeamCount).fill(null) });
      poll();
    } catch {
      room = undefined;
      open.disabled = false;
      panel.hidden = false;
      open.setAttribute("aria-expanded", "true");
      status.textContent = "Captain lobby unavailable. Open the game from the captain server to enable phone buzzers.";
    }
  });

  return {
    openWagers(category, limits) { return request("final-wagers", { category, limits }); },
    openFinal(question) { return request("final-open", { question }); },
    revealFinal() { return request("final-reveal", {}); },
    get active() { return Boolean(room); },
    async prepare() {
      if (!room || started) return true;
      if (closing || moving) return false;
      closing = true;
      try {
        syncNames(await request("stage", { clue: null }));
        started = true;
        lastStage = "null";
        return true;
      } catch {
        status.textContent = "Could not lock the lobby. Try Start Game again.";
        return false;
      } finally {
        closing = false;
      }
    },
  };
})();
