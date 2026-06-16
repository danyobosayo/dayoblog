---
name: sync-sermons
description: Sync the Hugo Sermons section (content/sermons) from the Obsidian notes vault. Use when the user wants to update sermons, check for new sermon notes, or reconcile the blog's Sermons section with their notes folder.
---

# Sync Sermons

The blog's **Sermons** section (`content/sermons/*.md`) is a verbatim mirror of the
sermon notes the user keeps in their Obsidian vault. The vault is the **source of
truth**; this repo is downstream. New sermons are written in the vault first, then
copied here so Hugo can publish them.

- **Vault (source):** `/Users/dayo/matcha milk tea/2 - General Notes/Sermons`
- **Repo (dest):** `content/sermons/`

Files are copied with **no transformation** — same filename, same front matter, same
body. `_index.md` is the only exception: it carries Hugo menu config and is managed in
the repo, so it is never overwritten by the sync.

## How to use

Run the helper script from the repo root.

1. **Check the delta** (always do this first — it is read-only):

   ```bash
   .claude/skills/sync-sermons/sync-sermons.sh
   ```

   It prints three groups:
   - **NEW** — in the vault, missing from the repo (will be added)
   - **CHANGED** — present in both but content differs (will be overwritten)
   - **ORPHANED** — in the repo but deleted from the vault (left alone unless `--prune`)

2. **Apply** new + changed files:

   ```bash
   .claude/skills/sync-sermons/sync-sermons.sh --apply
   ```

3. **Apply and prune** (also delete orphaned repo files that no longer exist in the
   vault). Only use this when the user confirms a vault deletion was intentional:

   ```bash
   .claude/skills/sync-sermons/sync-sermons.sh --apply --prune
   ```

## After syncing

- Summarize what changed (counts + filenames), don't just say "done".
- The new/changed `.md` files are untracked or modified in git. Stage and commit them
  if the user wants to publish (the repo deploys via CI on push — see the `release`
  skill / commit conventions). Do **not** commit unless asked.
- If filenames contain characters Hugo handles oddly (`?`, `'`), they already exist in
  the current section, so no special handling is needed.

## Paths differ on another machine?

Override with environment variables:

```bash
SERMON_SRC="/path/to/vault/Sermons" SERMON_DST="/path/to/repo/content/sermons" \
  .claude/skills/sync-sermons/sync-sermons.sh --apply
```
