import { createServer } from "node:http";
import { randomBytes } from "node:crypto";
import { readFile } from "node:fs/promises";
import { networkInterfaces } from "node:os";
import { resolve, extname } from "node:path";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL("../static/jeopardy", import.meta.url));
const token = () => randomBytes(24).toString("hex");
const rooms = new Map();
const ttl = 8 * 60 * 60 * 1000;
const types = { ".html": "text/html", ".js": "text/javascript", ".css": "text/css", ".mp3": "audio/mpeg" };

function view(room, slot = -1) {
  const final = room.final;
  const entry = final?.entries[slot];
  return {
    teams: room.teams.map(team => team && { name: team.name }),
    wager: room.wager && slot >= 0 && !final ? {
      category: room.wager.category, max: room.wager.limits[slot],
      submitted: room.wager.values[slot] != null,
    } : null,
    final: final ? { id: final.id, question: final.question, locked: final.locked, entry } : null,
    stage: room.stage, clue: room.clue, queue: room.queue,
  };
}

async function body(req) {
  let input = "";
  for await (const chunk of req) {
    input += chunk;
    if (input.length > 4096) throw new Error("Request too large");
  }
  return JSON.parse(input || "{}");
}

createServer(async (req, res) => {
  const send = (status, value) => {
    res.writeHead(status, { "Content-Type": "application/json", "Cache-Control": "no-store" });
    res.end(JSON.stringify(value));
  };
  try {
    const url = new URL(req.url, "http://localhost");
    if (url.pathname === "/") { res.writeHead(302, { Location: "/jeopardy/" }); return res.end(); }
    if (url.pathname.startsWith("/jeopardy/")) {
      const file = resolve(root, decodeURIComponent(url.pathname.slice(10)) || "index.html");
      if (!file.startsWith(root + "/") || !types[extname(file)]) return send(404, { error: "Not found" });
      const data = await readFile(file).catch(() => null);
      if (!data) return send(404, { error: "Not found" });
      res.writeHead(200, { "Content-Type": types[extname(file)], "Cache-Control": "no-store" });
      return res.end(data);
    }
    if (!url.pathname.startsWith("/captain-api/")) return send(404, { error: "Not found" });
    const action = url.pathname.split("/").pop();
    if (action === "address" && req.method === "GET") {
      const lan = Object.values(networkInterfaces()).flat().filter(entry => entry.family === "IPv4" && !entry.internal);
      return send(200, { host: process.env.CAPTAIN_HOST || lan[0]?.address || "127.0.0.1" });
    }
    const data = req.method === "POST" ? await body(req) : {};
    const auth = req.headers.authorization;
    if (action === "create" && req.method === "POST") {
      for (const [code, room] of rooms) if (room.expires < Date.now()) rooms.delete(code);
      if (rooms.size >= 50) return send(429, { error: "Too many open lobbies" });
      if (!Number.isInteger(data.count) || data.count < 2 || data.count > 6) return send(400, { error: "Choose two to six teams" });
      const code = randomBytes(4).toString("hex");
      const host = token();
      rooms.set(code, { host, teams: Array(data.count).fill(null), stage: "lobby", clue: null, queue: [], expires: Date.now() + ttl });
      return send(200, { code, host });
    }
    const room = rooms.get(url.searchParams.get("room"));
    if (!room || room.expires < Date.now()) return send(404, { error: "Lobby expired or unavailable" });
    const slot = room.teams.findIndex(team => team && team.token === auth);
    if (action === "state" && req.method === "GET" && (slot >= 0 || auth === room.host)) return send(200, view(room, slot));
    if (req.method !== "POST") return send(403, { error: "Access denied" });
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
    if (action === "stage") {
      room.stage = "game";
      if (data.clue?.id !== room.clue?.id) room.queue = [];
      room.clue = data.clue;
      return send(200, view(room));
    }
    return send(404, { error: "Not found" });
  } catch {
    if (!res.headersSent) send(400, { error: "Invalid request" });
    else res.end();
  }
}).listen(Number(process.env.PORT || 1314), "0.0.0.0");
