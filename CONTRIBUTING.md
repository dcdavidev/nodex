# Contributing

> Thank you for considering contributing to the **dcdavidev/nx-workspace-nodejs** project!
> This document outlines the conventions, tools, and workflow **we** follow to maintain a clean and productive development process across our projects.

## Table of Contents

1. [Getting Started](#getting-started)
   1. [Global Tools](#global-tools)
   2. [Local Setup](#local-setup)
2. [Branch Naming](#branch-naming)
3. [Commit Messages](#commit-messages)
4. [Code Style](#code-style)
5. [Pull Requests](#pull-requests)
6. [Git Hooks](#git-hooks)
7. [Discussions vs Issues](#discussions-vs-issues)

---

## Getting Started

### Global Tools

Before contributing, install the following tools **globally**:

```bash
npm install -g commitizen nx cspell eslint prettier lefthook
```

These tools provide the CLI, build system, linting, formatting, spellchecking, hooks, environment management, and conventional commit support.

### Local Setup

1. Fork and clone the repository:

   ```bash
   git clone https://github.com/dcdavidev/nx-workspace-nodejs.git
   cd nx-workspace-nodejs
   ```

   or:

   ```bash
   gh repo clone dcdavidev/nx-workspace-nodejs
   cd nx-workspace-nodejs
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Build all packages:

   ```bash
   nx run-many -t build
   ```

---

## Branch Naming

Branch names must follow the convention:

`type/description`

Examples:

- `feat/auth-api`
- `fix/auth-bug`
- `chore/ci-pipeline`

---

## Commit Messages

**We** follow **Conventional Commits**.
All commits should be made using **Commitizen**:

- Run `cz` directly

  ```bash
  cz
  ```

- Use the script:

  ```bash
  npm run commit
  ```

Format:

`<type>(<scope>): <description>`

Examples:

- `feat(cspell-config): add rate limiting`
- `fix(eslint-plugin): resolve token refresh bug`
- `chore: update GitHub Actions workflow`

Types include: `feat`, `fix`, `chore`, `docs`, `refactor`, `style`, `test`, `perf`, `build`, `ci`.

---

## Code Style

- Use **TypeScript** for all code.
- Document code with **JSDoc**.
- Code must pass **ESLint**, **Prettier**, and **cspell** checks.

Run manually:

```bash
eslint .
prettier --check .
cspell lint .
```

or use a convenient script:

```bash
npm run lint:fmt
```

---

## Pull Requests

- Keep PRs **small and focused**.
- Update **README** or **docs** if your change affects usage.
- Ensure all **checks pass** before requesting review.

---

## Git Hooks

**We** use **lefthook** for Git hooks.
It runs linters, formatters, spellcheck, and type checks before commits.

Install/update hooks with:

```bash
lefthook install
```

---

## Discussions vs Issues

- Use **GitHub Discussions** for ideas, proposals, and questions.
- Use **Issues** only for actionable bugs or tasks.

---

By following these guidelines, you help keep the **dcdavidev/nx-workspace-nodejs** project clean, modular, and welcoming.
