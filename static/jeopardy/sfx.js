/* ==========================================================================
   SFX — every sound is synthesized with the Web Audio API at runtime.
   No audio files, no network requests, works offline.
   ========================================================================== */

const SFX = (() => {
  let ctx = null;
  let master = null;
  let enabled = true;
  let tickTimer = null;

  /* Browsers require a user gesture before audio can start. */
  function ensure() {
    if (!ctx) {
      const AC = window.AudioContext || window.webkitAudioContext;
      if (!AC) return null;
      ctx = new AC();
      master = ctx.createGain();
      master.gain.value = 0.5;
      master.connect(ctx.destination);
    }
    if (ctx.state === "suspended") ctx.resume();
    return ctx;
  }

  /* One oscillator with an ADSR-ish envelope. */
  function tone(freq, start, dur, {
    type = "sine", vol = 0.3, glideTo = null, attack = 0.01, release = null,
  } = {}) {
    if (!ctx) return;
    const t0 = ctx.currentTime + start;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = type;
    osc.frequency.setValueAtTime(freq, t0);
    if (glideTo) osc.frequency.exponentialRampToValueAtTime(Math.max(1, glideTo), t0 + dur);

    const rel = release ?? dur * 0.6;
    gain.gain.setValueAtTime(0.0001, t0);
    gain.gain.exponentialRampToValueAtTime(vol, t0 + attack);
    gain.gain.exponentialRampToValueAtTime(0.0001, t0 + dur + rel);

    osc.connect(gain).connect(master);
    osc.start(t0);
    osc.stop(t0 + dur + rel + 0.05);
  }

  /* Filtered white noise — used for sweeps and impacts. */
  function noise(start, dur, { vol = 0.2, from = 400, to = 4000, q = 1 } = {}) {
    if (!ctx) return;
    const t0 = ctx.currentTime + start;
    const frames = Math.max(1, Math.floor(ctx.sampleRate * dur));
    const buf = ctx.createBuffer(1, frames, ctx.sampleRate);
    const data = buf.getChannelData(0);
    for (let i = 0; i < frames; i++) data[i] = Math.random() * 2 - 1;

    const src = ctx.createBufferSource();
    src.buffer = buf;

    const filt = ctx.createBiquadFilter();
    filt.type = "bandpass";
    filt.Q.value = q;
    filt.frequency.setValueAtTime(from, t0);
    filt.frequency.exponentialRampToValueAtTime(Math.max(1, to), t0 + dur);

    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0.0001, t0);
    gain.gain.exponentialRampToValueAtTime(vol, t0 + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);

    src.connect(filt).connect(gain).connect(master);
    src.start(t0);
    src.stop(t0 + dur + 0.05);
  }

  const api = {
    setEnabled(v) { enabled = v; if (!v) api.stopTicking(); },
    unlock() { if (enabled) ensure(); },

    /* selecting a tile on the board */
    select() {
      if (!enabled || !ensure()) return;
      tone(520, 0, 0.06, { type: "triangle", vol: 0.22 });
      tone(780, 0.05, 0.09, { type: "triangle", vol: 0.18 });
    },

    /* correct answer — bright two-note ding */
    correct() {
      if (!enabled || !ensure()) return;
      tone(880, 0, 0.1, { type: "sine", vol: 0.32 });
      tone(1318.5, 0.09, 0.16, { type: "sine", vol: 0.3 });
      tone(1760, 0.18, 0.3, { type: "sine", vol: 0.2 });
    },

    /* wrong answer — the dreaded buzzer */
    wrong() {
      if (!enabled || !ensure()) return;
      tone(150, 0, 0.32, { type: "square", vol: 0.2, release: 0.05 });
      tone(112, 0, 0.34, { type: "sawtooth", vol: 0.16, release: 0.05 });
    },

    /* someone buzzed in */
    buzzIn() {
      if (!enabled || !ensure()) return;
      tone(660, 0, 0.07, { type: "square", vol: 0.16 });
      tone(990, 0.06, 0.1, { type: "square", vol: 0.13 });
    },

    /* Daily Double fanfare */
    dailyDouble() {
      if (!enabled || !ensure()) return;
      noise(0, 0.5, { vol: 0.13, from: 200, to: 6000, q: 0.6 });
      const notes = [392, 523.25, 659.25, 783.99, 1046.5];
      notes.forEach((f, i) => tone(f, i * 0.085, 0.14, { type: "square", vol: 0.2 }));
      tone(1046.5, 0.48, 0.5, { type: "triangle", vol: 0.26 });
      tone(1567.98, 0.48, 0.5, { type: "triangle", vol: 0.16 });
    },

    /* time expired */
    timeUp() {
      if (!enabled || !ensure()) return;
      tone(440, 0, 0.16, { type: "square", vol: 0.2, glideTo: 220 });
      tone(330, 0.16, 0.26, { type: "square", vol: 0.18, glideTo: 110 });
    },

    /* new round sting */
    roundStart() {
      if (!enabled || !ensure()) return;
      noise(0, 0.7, { vol: 0.11, from: 180, to: 7000, q: 0.5 });
      [261.63, 329.63, 392, 523.25].forEach((f, i) =>
        tone(f, 0.1 + i * 0.07, 0.2, { type: "triangle", vol: 0.22 }));
      tone(523.25, 0.42, 0.8, { type: "sine", vol: 0.24 });
    },

    /* board tiles cascading in */
    boardFill() {
      if (!enabled || !ensure()) return;
      for (let i = 0; i < 8; i++) {
        tone(300 + i * 90, i * 0.045, 0.05, { type: "sine", vol: 0.07 });
      }
    },

    /* winner */
    fanfare() {
      if (!enabled || !ensure()) return;
      const seq = [
        [523.25, 0], [659.25, 0.13], [783.99, 0.26], [1046.5, 0.39],
        [783.99, 0.55], [1046.5, 0.68],
      ];
      seq.forEach(([f, t]) => {
        tone(f, t, 0.2, { type: "triangle", vol: 0.24 });
        tone(f * 2, t, 0.2, { type: "sine", vol: 0.1 });
      });
      tone(1046.5, 0.88, 1.1, { type: "triangle", vol: 0.26 });
      tone(1318.5, 0.88, 1.1, { type: "sine", vol: 0.16 });
      noise(0.88, 0.9, { vol: 0.06, from: 2000, to: 8000, q: 0.4 });
    },

    /* Final Jeopardy used to run a ticking clock under a slowly rising drone.
       It was distracting over a whole 30 seconds, so it is silent now — the
       draining timer bar carries the tension on its own. Kept as no-ops so
       callers don't have to care. */
    startTicking() {},
    stopTicking() {
      if (tickTimer) { clearInterval(tickTimer); tickTimer = null; }
    },
  };

  return api;
})();
