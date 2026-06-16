# dayoblog — project notes for Claude

A [Hugo](https://gohugo.io) static site (`dayowrites`) using the **hugo-book** theme.
Content lives in `content/`; the site builds to `public/` and deploys via CI on push.

## Content sections

- `content/posts/` — blog posts (self-help, stories, thoughts). Front matter uses
  `title`, `date`, `draft`, `tags`.
- `content/sermons/` — sermon notes (see below).
- `content/docs/` — university / video notes.

## Sermons are mirrored from the Obsidian vault

The **Sermons** section (`content/sermons/*.md`) is **not authored in this repo**. Each
file is a **verbatim copy** of a sermon note kept in the user's Obsidian vault:

```
/Users/dayo/matcha milk tea/2 - General Notes/Sermons
```

That vault folder is the **source of truth**. The user writes sermon notes there
during/after service, then they are copied into `content/sermons/` so Hugo can publish
them. The copy is 1:1 — same filename, same front matter (`title`, `date`, `tags`,
`#### series:`, `#### verse:`), same body. The only file that is *not* mirrored is
`content/sermons/_index.md`, which carries Hugo menu config and is managed here.

### Keeping it in sync

Use the **`sync-sermons`** skill (`.claude/skills/sync-sermons/`). It reports the delta
(new / changed / orphaned) between the vault and the repo and copies new + changed
notes across. Always dry-run first:

```bash
.claude/skills/sync-sermons/sync-sermons.sh           # report delta (read-only)
.claude/skills/sync-sermons/sync-sermons.sh --apply   # copy new + changed notes
```

When the vault paths differ on another machine, override `SERMON_SRC` / `SERMON_DST`.

After syncing, the new `.md` files are untracked/modified in git — commit them only when
the user wants to publish. Pushing to the default branch triggers the CI/CD deploy.
