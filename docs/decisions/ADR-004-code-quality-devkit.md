# ADR-004: Code Quality — Spellbook DevKit

**Date:** 2025-10-23  
**Status:** Accepted

---

## Context

Early iterations of the monorepo used Nx configuration files to define linting, formatting, and spell-checking rules.  
However, these Nx-based setups became difficult to maintain and quickly diverged across packages.  
The need for a **centralized, versioned, and reusable developer experience** led to the creation of the `@spellbookx/devkit` repository.

This DevKit consolidates all quality-related configurations and tooling into a single, sharable package — ensuring every project under the organization follows the same strict standards without repetitive boilerplate.

## Decision

Deprecate Nx’s built-in code quality configuration and **adopt the external [Spellbook DevKit](https://github.com/spellbookx/devkit)** as the authoritative source for:

- **CSpell** — for code and documentation spell checking.
- **Commitlint** (with **cz-git adapter**) — to enforce clean and semantically consistent commit messages.
- **Prettier** — for deterministic code formatting.
- **ESLint plugin** — enforcing clean, structured, and well-documented code across all modules.

This DevKit is versioned, published as an NPM package, and used through simple imports or presets — reducing duplication and enabling effortless upgrades across all repositories.

## Alternatives Considered

- **Nx integrated rules** — too fragmented, lacked standardization across teams.
- **Manual `.eslintrc` and `.prettierrc` per package** — high maintenance, prone to drift.
- **Biome (Rome)** — elegant but immature for complex rule sets and ecosystem integrations.

## Consequences

- **Pros**
  - Unified, organization-wide code quality baseline.
  - Easy to maintain through versioned DevKit releases.
  - Enforces documentation and structural hygiene via custom ESLint plugin.
  - Integrates seamlessly with Lefthook and CI.

- **Cons**
  - Requires a small learning curve for contributors unfamiliar with the DevKit conventions.
  - Centralization means changes affect all consuming projects simultaneously — requires controlled releases.

---

[⬅ Back to ADR Index](./README.md)
