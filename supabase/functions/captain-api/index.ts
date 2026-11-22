import { freshRoom, handleRoom, token } from "./room.mjs";

const origin = Deno.env.get("SUPABASE_URL");
const key = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
const allowed = new Set(["https://dayoblog.pages.dev"]);
const table = origin + "/rest/v1/captain_rooms";

function db(query: string, method = "GET", data?: unknown) {
  return fetch(table + query, {
    method,
    headers: {
      apikey: key, Authorization: "Bearer " + key,
      "Content-Type": "application/json", Prefer: "return=representation",
    },
    body: data === undefined ? undefined : JSON.stringify(data),
  });
}

Deno.serve(async (req) => {
  const caller = req.headers.get("origin");
  const headers = {
    "Content-Type": "application/json",
    "Cache-Control": "no-store",
    "Access-Control-Allow-Origin": caller && allowed.has(caller) ? caller : "https://dayoblog.pages.dev",
    "Access-Control-Allow-Headers": "authorization, content-type",
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
    Vary: "Origin",
  };
  const send = (status: number, value: unknown) =>
    new Response(JSON.stringify(value), { status, headers });
  if (caller && !allowed.has(caller)) return send(403, { error: "Origin not allowed" });
  if (req.method === "OPTIONS") return new Response(null, { status: 204, headers });
  if (!["GET", "POST"].includes(req.method)) return send(405, { error: "Method not allowed" });
  try {
    const url = new URL(req.url);
    const action = url.pathname.split("/").pop();
    const auth = req.headers.get("authorization");
    const raw = req.method === "POST" ? await req.text() : "";
    if (raw.length > 4096) return send(413, { error: "Request too large" });
    let data;
    try { data = JSON.parse(raw || "{}"); } catch { return send(400, { error: "Invalid JSON" }); }
    if (!data || typeof data !== "object" || Array.isArray(data)) return send(400, { error: "Invalid request" });
    if (action === "create" && req.method === "POST") {
      if (!Number.isInteger(data.count) || data.count < 2 || data.count > 10) return send(400, { error: "Choose two to ten teams" });
      const room = freshRoom(data.count);
      const code = token(4);
      await db("?expires_at=lt." + encodeURIComponent(new Date().toISOString()), "DELETE");
      const created = await db("", "POST", { code, expires_at: new Date(room.expires).toISOString(), state: room });
      if (!created.ok) return send(503, { error: "Could not create lobby" });
      return send(200, { code, host: room.host });
    }
    const code = url.searchParams.get("room") || "";
    if (!/^[a-f0-9]{8}$/.test(code)) return send(404, { error: "Lobby expired or unavailable" });
    const query = "?code=eq." + code;
    // A versioned update commits each successful action in a single order.
    // A concurrent change forces a reread before acting on the room again.
    for (let attempt = 0; attempt < 12; attempt++) {
      const result = await db(query + "&select=version,state");
      if (!result.ok) return send(503, { error: "Lobby temporarily unavailable" });
      const [row] = await result.json();
      if (!row || row.state.expires < Date.now()) return send(404, { error: "Lobby expired or unavailable" });
      const { status, value } = handleRoom(row.state, action, req.method, data, auth,
        (status: number, value: unknown) => ({ status, value }));
      if (req.method === "GET" || status >= 400) return send(status, value);
      const saved = await db(query + "&version=eq." + row.version, "PATCH", {
        state: row.state, version: row.version + 1,
      });
      if (!saved.ok) return send(503, { error: "Could not save lobby action" });
      if ((await saved.json()).length) return send(status, value);
    }
    return send(409, { error: "Lobby is busy. Try again." });
  } catch {
    return send(503, { error: "Lobby temporarily unavailable" });
  }
});
