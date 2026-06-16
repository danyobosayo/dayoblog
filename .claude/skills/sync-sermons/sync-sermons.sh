#!/usr/bin/env bash
#
# sync-sermons.sh — Sync the Hugo Sermons section from the Obsidian notes vault.
#
# The `content/sermons/*.md` files in this repo are verbatim copies of the
# sermon notes kept in the Obsidian vault. This script reports the delta
# between the vault (source of truth) and the repo, and optionally applies it.
#
# Usage:
#   ./sync-sermons.sh            # dry-run: report new / changed / orphaned files
#   ./sync-sermons.sh --apply    # copy new + changed files into the repo
#   ./sync-sermons.sh --apply --prune   # also DELETE repo files no longer in the vault
#
# Environment overrides:
#   SERMON_SRC   path to the vault Sermons folder (source of truth)
#   SERMON_DST   path to the repo content/sermons folder
#
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO_ROOT="$(cd "$SCRIPT_DIR" && git rev-parse --show-toplevel 2>/dev/null || echo "$SCRIPT_DIR/../../..")"

SRC="${SERMON_SRC:-/Users/dayo/matcha milk tea/2 - General Notes/Sermons}"
DST="${SERMON_DST:-$REPO_ROOT/content/sermons}"

# _index.md carries Hugo menu config and is managed in the repo — never synced.
EXCLUDE="_index.md"

APPLY=0
PRUNE=0
for arg in "$@"; do
  case "$arg" in
    --apply) APPLY=1 ;;
    --prune) PRUNE=1 ;;
    -h|--help) grep '^#' "$0" | sed 's/^# \{0,1\}//'; exit 0 ;;
    *) echo "Unknown option: $arg" >&2; exit 2 ;;
  esac
done

if [ ! -d "$SRC" ]; then
  echo "ERROR: source vault folder not found: $SRC" >&2
  echo "Set SERMON_SRC to the correct path." >&2
  exit 1
fi
mkdir -p "$DST"

new=(); changed=(); orphaned=()

# New + changed: walk the source of truth.
while IFS= read -r f; do
  [ "$f" = "$EXCLUDE" ] && continue
  if [ ! -f "$DST/$f" ]; then
    new+=("$f")
  elif ! diff -q "$SRC/$f" "$DST/$f" >/dev/null 2>&1; then
    changed+=("$f")
  fi
done < <(cd "$SRC" && ls -1 *.md 2>/dev/null)

# Orphaned: files in the repo that no longer exist in the vault.
while IFS= read -r f; do
  [ "$f" = "$EXCLUDE" ] && continue
  [ -f "$SRC/$f" ] || orphaned+=("$f")
done < <(cd "$DST" && ls -1 *.md 2>/dev/null)

echo "Source (vault): $SRC"
echo "Dest   (repo):  $DST"
echo
echo "NEW      (in vault, missing from repo): ${#new[@]}"
for f in "${new[@]:-}"; do [ -n "$f" ] && echo "  + $f"; done
echo "CHANGED  (content differs):             ${#changed[@]}"
for f in "${changed[@]:-}"; do [ -n "$f" ] && echo "  ~ $f"; done
echo "ORPHANED (in repo, deleted from vault): ${#orphaned[@]}"
for f in "${orphaned[@]:-}"; do [ -n "$f" ] && echo "  - $f"; done
echo

if [ "$APPLY" -eq 0 ]; then
  total=$(( ${#new[@]} + ${#changed[@]} ))
  echo "Dry run. $total file(s) would be copied. Re-run with --apply to sync."
  [ "${#orphaned[@]}" -gt 0 ] && echo "Add --prune to also delete the ${#orphaned[@]} orphaned file(s)."
  exit 0
fi

copied=0
for f in "${new[@]:-}" "${changed[@]:-}"; do
  [ -n "$f" ] || continue
  cp "$SRC/$f" "$DST/$f"
  echo "copied: $f"
  copied=$((copied+1))
done

pruned=0
if [ "$PRUNE" -eq 1 ]; then
  for f in "${orphaned[@]:-}"; do
    [ -n "$f" ] || continue
    rm "$DST/$f"
    echo "pruned: $f"
    pruned=$((pruned+1))
  done
fi

echo
echo "Done. Copied $copied file(s); pruned $pruned file(s)."
