# ADR-009: Linting & Formatting — CI-First Approach

**Date:** 2025-10-23  
**Status:** Accepted

---

## Context

Maintaining consistent code style and quality across a large Nx workspace is crucial.  
Traditional approaches often enforce linting and formatting **locally via pre-commit hooks**, which can:

- Slow down commits for developers.
- Introduce inconsistent formatting if hooks are skipped.
- Require everyone to have the same Node/npm configuration locally.

The goal is to **guarantee a fully consistent codebase**, while allowing developers to work quickly without being blocked by formatting and linting.

## Decision

- All **linting and formatting of workspace files** will be performed in the **CI pipeline**.
- Developers may bypass automatic fixes locally for speed, but the CI ensures the repository remains consistent.
- GitHub Actions workflow (`Check and Fix Workspace`) will:
  - Checkout the branch or merge ref.
  - Install dependencies.
  - Sync Nx workspace.
  - Run **ESLint** with `--fix`.
  - Run **Prettier** with `--write`.
  - Auto-commit changes back to the PR branch if necessary.

- Local tooling remains optional for fast iterations.

## Alternatives Considered

- **Pre-commit hooks with Lefthook** — reliable but slows down commits and pushes.
- **Manual local linting/formatting** — error-prone, inconsistent across developers.
- **Nx affected lint/format targets in local scripts** — requires developer discipline.

## Consequences

- **Pros**
  - Ensures workspace consistency across all branches.
  - Reduces friction in local development.
  - Automatic CI enforcement removes human error.

- **Cons**
  - Developers might push unformatted code temporarily.
  - Requires a CI workflow setup and access to GitHub Actions.
  - Slight delay in PR merging due to CI enforcement.

---

### Example GitHub Actions Workflow

```yaml
name: Check and Fix Workspace

on:
  push:
    branches:
      - '**'

permissions:
  contents: write

jobs:
  'workspace-fixes':
    if: github.event_name != 'push' || github.ref != 'refs/heads/main'
    runs-on: ubuntu-latest
    permissions:
      contents: write

    steps:
      - name: Checkout PR branch
        uses: actions/checkout@v5
        with:
          ref: ${{ github.head_ref }}
          fetch-depth: 0

      - name: Setup Node.js
        uses: actions/setup-node@v5
        with:
          node-version-file: '.nvmrc'
          cache: 'npm'

      - name: Install Dependencies
        run: npm install --ignore-scripts

      - name: Sync Workspace
        run: npx nx sync

      - name: Lint Code with ESLint
        run: npx eslint --fix .

      - name: Format Code with Prettier
        run: npx prettier --write .

      - name: Auto-Commit Files
        uses: stefanzweifel/git-auto-commit-action@v5
        with:
          commit_message: 'ci: lint and format'
          branch: ${{ github.head_ref }}
```

---

[⬅ Back to ADR Index](./README.md)
