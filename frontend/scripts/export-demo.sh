#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
MIDDLEWARE_PATH="$ROOT_DIR/middleware.ts"
MIDDLEWARE_BACKUP="$ROOT_DIR/middleware.ts.demo-backup"

cleanup() {
  if [[ -f "$MIDDLEWARE_BACKUP" ]]; then
    mv "$MIDDLEWARE_BACKUP" "$MIDDLEWARE_PATH"
  fi
}

trap cleanup EXIT

if [[ -f "$MIDDLEWARE_PATH" ]]; then
  mv "$MIDDLEWARE_PATH" "$MIDDLEWARE_BACKUP"
fi

cd "$ROOT_DIR"
NEXT_PUBLIC_DEMO_MODE="${NEXT_PUBLIC_DEMO_MODE:-1}" next build

if [[ ! -f "$ROOT_DIR/out/index.html" ]]; then
  echo "Expected static export file out/index.html was not generated."
  exit 1
fi

echo "Demo export completed at $ROOT_DIR/out"
