import { createServer } from "node:http";
import { freshRoom, handleRoom, token } from "../supabase/functions/captain-api/room.mjs";
import { readFile } from "node:fs/promises";
import { networkInterfaces } from "node:os";
import { resolve, extname } from "node:path";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL("../static/jeopardy", import.meta.url));
const rooms = new Map();
const types = { ".html": "text/html", ".js": "text/javascript", ".css": "text/css", ".mp3": "audio/mpeg" };

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
    if (url.pathname === "/healthz" && req.method === "GET") return send(200, { status: "ok" });
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
      if (!Number.isInteger(data.count) || data.count < 2 || data.count > 10) return send(400, { error: "Choose two to ten teams" });
      const code = token(4);
      const room = freshRoom(data.count);
      rooms.set(code, room);
      return send(200, { code, host: room.host });
    }
    const room = rooms.get(url.searchParams.get("room"));
    if (!room || room.expires < Date.now()) return send(404, { error: "Lobby expired or unavailable" });
    return handleRoom(room, action, req.method, data, auth, send);
  } catch {
    if (!res.headersSent) send(400, { error: "Invalid request" });
    else res.end();
  }
}).listen(Number(process.env.PORT || 1314), "0.0.0.0");
