#!/bin/sh
set -eu

if test -z "$WEBHOOK_URL"; then
  echo "Set the WEBHOOK_URL"
  exit 1
fi

if test -z "$COMMIT"; then
  echo "Set the COMMIT"
  exit 1
fi

MSG=${MESSAGE:="Triggered by ga/samson-create-release"}

curl -X POST \
     -H "Content-type: application/json" \
     -d "{\"deploy\":{\"branch\":\"master\",\"commit\":{\"sha\":\"$COMMIT\",\"message\":\"$MSG\"}}}" \
     $WEBHOOK_URL 
