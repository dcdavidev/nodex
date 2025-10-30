# ADR-002: Git Hooks — Lefthook

**Date:** 2025-10-23  
**Status:** Accepted

---

## Context

Managing Git hooks across a monorepo can easily become inconsistent and difficult to maintain.  
Each developer might have different pre-commit and pre-push scripts, leading to code quality drift.  
A unified solution is needed to ensure consistent local validation (lint, typecheck, tests) before committing or pushing code.

## Decision

Adopt [Lefthook](https://github.com/evilmartians/lefthook) as the **Git hooks manager**.  
Lefthook provides a fast, declarative YAML configuration that supports parallel task execution and easy integration with Nx.

## Alternatives Considered

- **Husky** — popular and mature, but slower and requires installing hooks per package.
- **Simple-git-hooks** — minimal and fast, but lacks multi-task orchestration and YAML-based configuration.
- **Pre-commit (Python)** — too heavy for a Node.js ecosystem.

## Consequences

- **Pros**
  - Centralized configuration for all hooks.
  - High performance through concurrent execution.
  - Easy CI integration and local enforcement of quality gates.

- **Cons**
  - Requires Node.js or Docker context setup to ensure parity between local and CI environments.
  - Less community documentation than Husky.

---

### Example

```yaml
# lefthook.yml
commit-msg:
  commands:
    lint-commit-msg:
      run: npx commitlint --verbose --edit {1}
```

---

[⬅ Back to ADR Index](./README.md)
