#!/usr/bin/env bash
# Asks for the demo account and devbox logins, and saves them to .env (git-ignored, owner-only).
# Passwords are typed hidden and never echoed.
set -euo pipefail
cd "$(dirname "$0")"
ENV_FILE=".env"

# Keep current values as defaults when re-running.
current() { # current VAR → saved value, unquoted
  [ -f "$ENV_FILE" ] || return 0
  local line; line="$(grep -m1 "^$1=" "$ENV_FILE" || true)"
  line="${line#*=}"; line="${line#\"}"; line="${line%\"}"
  printf '%s' "$line" | sed 's/\\\(["\\]\)/\1/g'
}

ask() { # ask VAR "Prompt"
  local def; def="$(current "$1")"
  local val
  read -r -p "$2${def:+ [$def]}: " val
  printf -v "$1" '%s' "${val:-$def}"
}

ask_secret() { # ask_secret VAR "Prompt"
  local def; def="$(current "$1")"
  local val
  read -r -s -p "$2${def:+ [press Enter to keep the saved one]}: " val; echo
  printf -v "$1" '%s' "${val:-$def}"
}

echo "FlowFlex demo account (use an organisation with demo data only)"
ask        DOCS_EMAIL          "  Email"
ask_secret DOCS_PASSWORD       "  Password"
ask        DOCS_ORG            "  Organisation name (leave empty if the account has only one)"
echo
echo "Devbox basic-auth login (the browser prompt on *.zen-tesla.flowflex.ai)"
ask        DOCS_BASIC_USER     "  Username"
ask_secret DOCS_BASIC_PASSWORD "  Password"

if [ -z "$DOCS_EMAIL" ] || [ -z "$DOCS_PASSWORD" ]; then
  echo "Email and password are required." >&2
  exit 1
fi

quote() { printf '"%s"' "$(printf '%s' "$1" | sed 's/["\\]/\\&/g')"; }
umask 077
{
  echo "DOCS_EMAIL=$(quote "$DOCS_EMAIL")"
  echo "DOCS_PASSWORD=$(quote "$DOCS_PASSWORD")"
  echo "DOCS_ORG=$(quote "$DOCS_ORG")"
  echo "DOCS_BASIC_USER=$(quote "$DOCS_BASIC_USER")"
  echo "DOCS_BASIC_PASSWORD=$(quote "$DOCS_BASIC_PASSWORD")"
} > "$ENV_FILE"
chmod 600 "$ENV_FILE"
echo
echo "Saved to $(pwd)/$ENV_FILE (readable only by you)."
