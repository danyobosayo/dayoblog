export const ttl = 8 * 60 * 60 * 1000;
export function token(bytes = 24) {
  return Array.from(crypto.getRandomValues(new Uint8Array(bytes)), byte =>
    byte.toString(16).padStart(2, "0")).join("");
}

export function freshRoom(count) {
  return { host: token(), teams: Array(count).fill(null), stage: "lobby",
    clue: null, queue: [], expires: Date.now() + ttl };
}

function view(room, slot = -1) {
  const final = room.final;
  const entry = final?.entries[slot];
  return {
    slot: slot >= 0 ? slot : null,
    teams: room.teams.map(team => team && { name: team.name }),
    wager: room.wager && slot >= 0 && !final ? {
      category: room.wager.category, max: room.wager.limits[slot],
      submitted: room.wager.values[slot] != null,
    } : null,
    final: final ? { id: final.id, question: final.question, locked: final.locked, entry } : null,
    stage: room.stage, clue: room.clue, queue: room.queue,
  };
}

export function handleRoom(room, action, method, data, auth, send) {
  const slot = room.teams.findIndex(team => team && team.token === auth);
  if (action === "state" && method === "GET" && (slot >= 0 || auth === room.host)) return send(200, view(room, slot));
  if (method !== "POST") return send(403, { error: "Access denied" });
  if (action === "join" && room.stage === "lobby") {
    const name = typeof data.name === "string" && data.name.trim().slice(0, 22);
    if (!name) return send(400, { error: "Enter a team name" });
    if (room.teams.some(team => team?.name.toLowerCase() === name.toLowerCase())) return send(409, { error: "That team name is already taken" });
    const seat = room.teams.indexOf(null);
    if (seat < 0) return send(409, { error: "All captain seats are filled" });
    const identity = token();
    room.teams[seat] = { name, token: identity };
    return send(200, { slot: seat, token: identity });
  }
  if (action === "buzz" && slot >= 0) {
    if (!room.clue || data.id !== room.clue.id || !room.clue.eligible.includes(slot)) return send(409, { error: "Buzzers are closed for your team" });
    if (!room.queue.includes(slot)) room.queue.push(slot);
    return send(200, view(room));
  }
  if (action === "final-wager" && slot >= 0) {
    const wager = room.wager;
    if (!wager || room.final) return send(409, { error: "Wagers are closed." });
    if (!Number.isInteger(data.amount) || data.amount < 0 || data.amount > wager.limits[slot]) {
      return send(400, { error: "Enter a whole-number wager up to your balance." });
    }
    wager.values[slot] ??= data.amount;
    return send(200, view(room, slot));
  }
  if (action === "final-write" && slot >= 0) {
    const final = room.final;
    if (!final || final.locked || data.id !== final.id) return send(409, { error: "Final responses are locked." });
    if (!final.entries[slot]?.submitted) {
      final.entries[slot] = {
        text: typeof data.text === "string" ? data.text.slice(0, 240) : "",
        submitted: data.submitted === true,
      };
    }
    return send(200, view(room, slot));
  }
  if (auth !== room.host) return send(403, { error: "Access denied" });
  if (action === "final-wagers") {
    if (!Array.isArray(data.limits) || data.limits.length !== room.teams.length ||
        !data.limits.every(n => Number.isSafeInteger(n) && n >= 0)) {
      return send(400, { error: "Invalid wager limits" });
    }
    room.final = null;
    room.wager = { category: String(data.category).slice(0, 120), limits: data.limits, values: room.teams.map(() => null) };
    return send(200, view(room));
  }
  if (action === "final-open") {
    if (typeof data.question !== "string" || !data.question.trim()) return send(400, { error: "Missing Final clue" });
    if (!room.wager) return send(409, { error: "Open wagering first." });
    room.final ??= { id: token(), question: data.question, locked: false, entries: room.teams.map(() => null) };
    return send(200, { wagers: room.wager.values.map((n, i) => room.teams[i] ? n ?? 0 : null) });
  }
  if (action === "final-reveal") {
    if (!room.final) return send(409, { error: "Final responses have not opened yet." });
    room.final.locked = true;
    return send(200, { entries: room.final.entries });
  }
  if (action === "reorder") {
    if (room.stage !== "lobby") return send(409, { error: "Team order is locked once play starts." });
    const { from, to } = data;
    if (![from, to].every(i => Number.isInteger(i) && i >= 0 && i < room.teams.length)) {
      return send(400, { error: "Invalid team number." });
    }
    [room.teams[from], room.teams[to]] = [room.teams[to], room.teams[from]];
    return send(200, view(room));
  }
  if (action === "stage") {
    room.stage = "game";
    if (data.clue?.id !== room.clue?.id) room.queue = [];
    room.clue = data.clue;
    return send(200, view(room));
  }
  return send(404, { error: "Not found" });
}
