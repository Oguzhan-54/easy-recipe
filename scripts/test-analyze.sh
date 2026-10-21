#!/usr/bin/env bash
# Sends a local image to /api/analyze (needs `npm run dev:vercel` running).
# Usage: ./scripts/test-analyze.sh path/to/dish.jpg ["optional description"]
set -euo pipefail

IMAGE_PATH="$1"
DESCRIPTION="${2:-}"
URL="${URL:-http://localhost:3000/api/analyze}"

# Base64 without line breaks (works on macOS and Linux)
IMAGE_BASE64=$(base64 < "$IMAGE_PATH" | tr -d '\n')

# Build the JSON body in a temp file – the image is too big for a command line argument
BODY_FILE=$(mktemp)
trap 'rm -f "$BODY_FILE"' EXIT
printf '{"image":"%s","mimeType":"image/jpeg","description":"%s"}' \
  "$IMAGE_BASE64" "$DESCRIPTION" > "$BODY_FILE"

curl -s -X POST "$URL" -H "Content-Type: application/json" --data-binary "@$BODY_FILE"
echo
