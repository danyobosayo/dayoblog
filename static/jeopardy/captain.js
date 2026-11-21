const room = new URLSearchParams(location.search).get("room");
const form = document.querySelector("#join-form");
const button = document.querySelector("#phone-buzz");
const status = document.querySelector("#phone-status");
const key = "potluck-captain-" + room;
let identity;
let state;
let pending = false;
try { identity = JSON.parse(sessionStorage.getItem(key)); } catch { /* private browsing */ }

async function request(action, data) {
  const response = await fetch(`${captainApi}${action}?room=${encodeURIComponent(room)}`, {
    method: data ? "POST" : "GET",
    headers: { "Content-Type": "application/json", ...(identity ? { Authorization: identity.token } : {}) },
    body: data ? JSON.stringify(data) : undefined,
  });
  const result = await response.json();
  if (!response.ok) throw new Error(result.error);
  return result;
}

const finalForm = document.querySelector("#final-form");
const finalInput = document.querySelector("#final-response");
const finalSubmit = document.querySelector("#final-submit");
let finalId;
let finalWrites = Promise.resolve();
let finalSubmitted = false;
let finalSubmitting = false;

function renderFinalEntry(final) {
  document.querySelector("#phone-final-clue").textContent = final.question;
  if (finalId !== final.id) {
    finalId = final.id;
    finalSubmitting = false;
    finalSubmitted = Boolean(final.entry?.submitted);
    finalInput.value = final.entry?.text || "";
  }
  finalSubmitted ||= Boolean(final.entry?.submitted);
  finalInput.disabled = final.locked || finalSubmitted || finalSubmitting;
  finalSubmit.disabled = finalInput.disabled;
  status.textContent = final.locked ? "Responses are locked."
    : finalSubmitted ? "Response submitted."
    : "Your draft is saved as you type.";
}

function writeFinal(submitted) {
  const text = finalInput.value;
  const id = finalId;
  if (submitted) {
    finalSubmitting = true;
    finalInput.disabled = true;
    finalSubmit.disabled = true;
  }
  finalWrites = finalWrites.then(async () => {
    try {
      const result = await request("final-write", { id, text, submitted });
      if (id === finalId && result.final?.id === id) {
        if (submitted) finalSubmitting = false;
        renderFinalEntry(result.final);
      }
    } catch (error) {
      if (id === finalId && submitted) finalSubmitting = false;
      status.textContent = error.message;
      if (id === finalId && !state?.final?.locked && !finalSubmitted && !finalSubmitting) {
        finalInput.disabled = false;
        finalSubmit.disabled = false;
      }
    }
  });
}
finalInput.addEventListener("input", () => writeFinal(false));
finalForm.addEventListener("submit", event => {
  event.preventDefault();
  writeFinal(true);
});

const wagerForm = document.querySelector("#wager-form");
const wagerInput = document.querySelector("#phone-wager");
let wagerPending = false;
wagerForm.addEventListener("submit", async event => {
  event.preventDefault();
  if (wagerPending) return;
  wagerPending = true;
  try {
    state = await request("final-wager", { amount: Number(wagerInput.value) });
    render();
  } catch (error) {
    status.textContent = error.message;
  } finally {
    wagerPending = false;
  }
});

function render() {
  const team = state.teams[identity.slot];
  document.querySelector("#captain-title").textContent = team.name;
  finalForm.hidden = !state.final;
  wagerForm.hidden = !state.wager;
  button.hidden = Boolean(state.final || state.wager);
  if (state.wager) {
    const { category, max, submitted } = state.wager;
    document.querySelector("#phone-wager-category").textContent = "Final category: " + category;
    document.querySelector("#phone-wager-limit").textContent = "Wager up to " + max.toLocaleString() + " points.";
    wagerInput.max = max;
    wagerInput.disabled = submitted;
    wagerForm.querySelector("button").disabled = submitted;
    status.textContent = submitted ? "Wager locked. Wait for the clue." : "Only your team can see your wager.";
    return;
  }
  if (state.final) {
    renderFinalEntry(state.final);
    return;
  }
  const position = state.queue.indexOf(identity.slot);
  const eligible = state.clue?.eligible.includes(identity.slot);
  const answering = state.clue?.answering === identity.slot;
  button.disabled = pending || !eligible || position >= 0;
  button.textContent = answering ? "Your turn" : position >= 0 && eligible ? "In the queue" : "Buzz in";
  status.textContent = answering ? "Answer out loud."
    : state.stage === "lobby" ? "Waiting for the host to start."
    : position >= 0 && eligible ? "Wait for the host to call your team."
    : eligible ? "Buzz when your team is ready."
    : state.clue ? "Your team can’t buzz on this turn." : "Waiting for the next clue.";
}

async function poll() {
  if (!identity) return;
  try {
    state = await request("state");
    render();
  } catch (error) {
    button.disabled = true;
    status.textContent = error.message;
  } finally {
    setTimeout(poll, 350);
  }
}

function enter() {
  form.hidden = true;
  document.querySelector("#phone-game").hidden = false;
  poll();
}

form.addEventListener("submit", async event => {
  event.preventDefault();
  const submit = form.querySelector("button");
  submit.disabled = true;
  try {
    identity = await request("join", { name: document.querySelector("#team-name").value });
    try { sessionStorage.setItem(key, JSON.stringify(identity)); } catch { /* private browsing */ }
    enter();
  } catch (error) {
    status.textContent = error.message;
  } finally {
    submit.disabled = false;
  }
});

button.addEventListener("click", async () => {
  if (button.disabled || !state?.clue) return;
  pending = true;
  button.disabled = true;
  try {
    state = await request("buzz", { id: state.clue.id });
    render();
  } catch (error) {
    status.textContent = error.message;
  } finally {
    pending = false;
  }
});

if (identity) enter();
