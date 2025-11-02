#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(pwd)"

#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(pwd)"

# Install jq, yq, and awk if missing
install_tools() {
  # jq
  if ! command -v jq &>/dev/null; then
    echo "🟡 jq not found, attempting to install..."
    if command -v apt-get &>/dev/null; then
      sudo apt-get update && sudo apt-get install -y jq
    elif command -v dnf &>/dev/null; then
      sudo dnf install -y jq
    elif command -v yum &>/dev/null; then
      sudo yum install -y jq
    elif command -v apk &>/dev/null; then
      sudo apk add --no-cache jq
    elif command -v zypper &>/dev/null; then
      sudo zypper install -y jq
    elif command -v pacman &>/dev/null; then
      sudo pacman -Sy jq --noconfirm
    else
      echo "🔴 Cannot install jq: package manager not recognized."
      exit 1
    fi
  fi

  # yq (binary version for best compatibility)
  if ! command -v yq &>/dev/null; then
    echo "🟡 yq not found, attempting to install (binary version)..."
    YQ_BIN="/usr/local/bin/yq"
    ARCH=$(uname -m)
    if [ "$ARCH" = "x86_64" ]; then
      ARCH="amd64"
    elif [[ "$ARCH" == aarch64* ]]; then
      ARCH="arm64"
    fi
    if curl -fL "https://github.com/mikefarah/yq/releases/latest/download/yq_$(uname -s)_${ARCH}" -o yq; then
      chmod +x yq
      sudo mv yq "$YQ_BIN"
    else
      echo "🔴 Failed to install yq automatically. Please install it manually: https://mikefarah.gitbook.io/yq/"
      exit 1
    fi
  fi

  # awk (install only if missing; most distros come with awk by default)
  if ! command -v awk &>/dev/null; then
    echo "🟡 awk not found, attempting to install..."
    if command -v apt-get &>/dev/null; then
      sudo apt-get update && sudo apt-get install -y gawk
    elif command -v dnf &>/dev/null; then
      sudo dnf install -y gawk
    elif command -v yum &>/dev/null; then
      sudo yum install -y gawk
    elif command -v apk &>/dev/null; then
      sudo apk add --no-cache gawk
    elif command -v zypper &>/dev/null; then
      sudo zypper install -y gawk
    elif command -v pacman &>/dev/null; then
      sudo pacman -Sy gawk --noconfirm
    else
      echo "🔴 Cannot install awk: package manager not recognized."
      exit 1
    fi
  fi
}

install_tools

# Upgrade Nx
printf "🔄 Running Nx migrations...\n"
npx nx migrate latest
npx nx migrate --run-migrations=migrations.json --if-exists
npm install --ignore-scripts

# Upgrade dependencies in the workspace root
printf "🟢 Upgrading dependencies in the workspace root...\n"
npx npm-check-updates -u

# Function to extract workspace package patterns
get_workspaces() {
  if [ -f "$ROOT_DIR/pnpm-workspace.yaml" ]; then
    # Requires yq (pip install yq)
    yq -r '.packages[]' "$ROOT_DIR/pnpm-workspace.yaml"
  elif [ -f "$ROOT_DIR/package.json" ]; then
    jq -r '.workspaces // .workspaces.packages // empty | .[]' "$ROOT_DIR/package.json"
  elif [ -f "$ROOT_DIR/bunfig.toml" ]; then
    # Adapt for bun workspaces if needed
    awk '/^\[workspace\]/ { insection=1; next } /^\[/ { insection=0 } insection && /=/ { print $0 }' "$ROOT_DIR/bunfig.toml"
  fi
}

printf "🔎 Looking for workspace packages...\n"

packages=()
while read -r pattern; do
  # Expand globs to package directories
  for dir in $ROOT_DIR/$pattern; do
    if [ -d "$dir" ] && [ -f "$dir/package.json" ]; then
      packages+=("$dir")
    fi
  done
done < <(get_workspaces)

for package in "${packages[@]}"; do
  printf "🟢 Upgrading dependencies in %s ...\n" "$package"
  (cd "$package" && npx npm-check-updates -u)
done

echo "✅ Upgrade complete in root and all workspace packages"