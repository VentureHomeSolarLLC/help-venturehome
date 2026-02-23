#!/bin/bash

# Copy KB content from helios-kb repo to public folder
KB_SOURCE="../helios-kb/content/articles.json"
DEST="./public/kb-content.json"

if [ -f "$KB_SOURCE" ]; then
  cp "$KB_SOURCE" "$DEST"
  echo "✓ Copied KB content to $DEST"
else
  echo "✗ KB source not found at $KB_SOURCE"
  echo "  Make sure helios-kb repo is cloned in parent directory"
  exit 1
fi