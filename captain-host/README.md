# Captain mode

Run Node 20 or newer from the checkout and start `node captain-host/server.mjs`.
Open the Mac's LAN address at port 1314 and choose the team count before
opening a captain lobby. Scan the QR from the same Wi-Fi network. If hosting
from localhost, set `CAPTAIN_HOST` to the address phones should use.

The server assigns a seat when a captain joins. Start Game closes registration
and copies joined names to the board. Any empty seat can still use the host
controls. Captains can reload their current tab to reconnect.

The server records one buzz per seat per clue in arrival order. The host page
polls every 300 ms and keeps the ruling controls. The five-second bar is visual.
An incorrect ruling advances to the next eligible team, and revealing the
answer closes buzzes. Daily Doubles stay with the wagering team.

This rehearsal service keeps lobbies in memory for up to eight hours. A server
restart clears them. Hugo alone only serves static files. A hosted release
requires a running Node service or another shared store for lobby state.

## Cross-network rehearsal

Build with `docker build -f Dockerfile.captain -t potluck-captain .` and run
one instance on a container host with an HTTPS URL and port 1314 routed to
the service. Open the host game at that HTTPS URL under `/jeopardy/`.
The QR uses the same public host, so phones can join from cellular data or
another Wi-Fi network. Keep the service at one replica for a rehearsal.
Persistent or multi-instance hosting needs a shared lobby store.

## Sing It Back

Put the five new MP3 excerpts under `static/jeopardy/clips/` and fill in
`GAME.musicClues` in the question bank. Include the prompt, accepted answer,
and file-relative timestamps. Once all five are present, **Sing It Back**
appears in Settings → Board. Move an existing category Off to make space
for it. Guessing clues open buzzers when the host starts playback.
Timed finish-the-lyric clues open buzzers when the clip pauses.

## Permanent projector URL

The repository's Render Blueprint defines one free Docker web service. Connect
it to the repository in Render to get an HTTPS `onrender.com` address. Open
`/jeopardy/` on that address for the projector. The QR code uses that same
address and captain requests go to the hosted server.

Open the hosted game before the event and rehearse with two phones. Render's
free service spins down after 15 minutes without inbound traffic. An open
captain lobby polls the service during play. A restart or a redeploy clears
in-memory lobbies, so pause deploys during a game and start a new lobby if the
service has restarted.
