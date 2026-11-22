/* Regenerates ANSWER-SHEET.md from questions.js.
   Run from the repo root:  node jeopardy-host/make-answer-sheet.js

   NOTE: this writes only inside the repo. Never copy the output over a file in
   the Obsidian vault that has hand-written annotations on it — regenerating is
   destructive and there is no merge. Sync to a distinct "(generated)" filename
   instead, and keep the annotated copy separate. */

const fs = require("fs");
const path = require("path");

/* Lives outside static/ on purpose: anything under static/ gets published, and
   the answer sheet should not be sitting at a guessable public URL. */
const dir = __dirname;
const GAME = require(path.join(dir, "..", "static", "jeopardy", "questions.js"));

const out = [];
out.push("# Thanksgiving Potluck Jeopardy — Answer Sheet");
out.push("");
out.push("_Host reference. Generated from `questions.js` — run `node jeopardy-host/make-answer-sheet.js` after editing._");
out.push("");

out.push("Ask for responses in question form. Parentheses mark optional units or descriptors. Use the notes for explicitly accepted variants.");
out.push("");

GAME.rounds.forEach((round, ri) => {
  out.push(`## Round ${ri + 1} — ${round.name}`);
  out.push("");
  round.categories.forEach((cat) => {
    out.push(`### ${cat.title}`);
    out.push("");
    cat.clues.forEach((c, i) => {
      out.push(`**$${round.values[i]}** — ${c.q}`);
      out.push("");
      if (c.media) {
        const m = c.media;
        const win = `${m.start ?? 0}s–${m.end ?? "end"}${m.end ? "s" : ""}`;
        out.push(m.type === "youtube"
          ? `🎵 clip: youtube.com/watch?v=${m.id} · plays ${win}`
          : `🎵 clip: ${m.src} · plays ${win}`);
        out.push("");
      }
      out.push(`> ${c.a}${c.note ? `\n>\n> _${c.note}_` : ""}`);
      out.push("");
    });
  });
});

for (const category of GAME.optionalCategories || []) {
  out.push(`## ${category.title} (optional column)`, "");
  category.clues.forEach((c, i) => {
    out.push(`**Clue ${i + 1}** — ${c.q}`, "");
    out.push(`> ${c.a}${c.note ? `\n>\n> _${c.note}_` : ""}`, "");
  });
}

out.push("## Final Jeopardy pool");
out.push("");
GAME.finals.forEach((f, i) => {
  out.push(`**${i + 1}. ${f.category}** — ${f.q}`);
  out.push("");
  out.push(`> ${f.a}${f.note ? `\n>\n> _${f.note}_` : ""}`);
  out.push("");
});

const total = GAME.rounds.reduce((n, r) => n + r.categories.length * r.values.length, 0);
out.push("---");
out.push("");
out.push(`${total} clues across ${GAME.rounds.length} boards, plus ${GAME.finals.length} Final Jeopardy options.`);
out.push("");

fs.writeFileSync(path.join(dir, "ANSWER-SHEET.md"), out.join("\n"));
console.log(`Wrote ANSWER-SHEET.md — ${total} clues + ${GAME.finals.length} finals`);
