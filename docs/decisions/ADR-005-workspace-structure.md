# ADR-005: Workspace Structure — Apps, Libs, Tools, and Packages

**Date:** 2025-10-23  
**Status:** Accepted

---

## Context

The repository follows a modular monorepo structure built on **Nx**, with four main top-level directories:

- `apps/` — executable applications or entrypoints (e.g. servers, web consoles).
- `libs/` — reusable logic units, SDKs, adapters, and shared modules.
- `tools/` — developer-facing automation scripts and CLI utilities.
- `packages/` — standalone packages intended to be published to registries (e.g., npm), versioned independently.

This layout is consistent with Nx’s architectural philosophy and supports scalable composition of applications from versioned, typed, and independently testable libraries and packages.

Nx defaults for generators, linting, and build configurations have been **intentionally simplified** or **overridden** in favor of **custom generators and presets** from [`@spellbookx/devkit`](https://github.com/spellbookx/devkit).

## Decision

Keep the **canonical Nx workspace structure** but **extend it with a `packages/` directory** for standalone publishable modules.  
Rely on DevKit for scaffolding and enforcing coding, linting, and testing conventions.

Each directory serves a precise purpose:

- **apps/** — deployable applications (NodeJS servers, React frontends, workers).
- **libs/** — internal reusable logic (core APIs, adapters, shared utilities).
- **tools/** — developer utilities, CLI extensions, migration scripts, release pipelines.
- **packages/** — standalone, publishable libraries with independent versioning and registry deployment.

All modules must be self-contained, documented, and export only what’s necessary. Cross-dependencies must respect clean architectural boundaries enforced by ESLint and Nx dependency constraints.

## Alternatives Considered

- **Flat structure** (`src/` only): simple but unscalable for large projects.
- **Lerna-style packages/** folder only: redundant with Nx workspace features for internal libs.
- **TurboRepo layout**: lacks strong dependency graphing and task caching Nx provides.

## Consequences

- **Pros**
  - Predictable Nx-compatible layout for contributors.
  - Clear separation between internal libs and publishable packages.
  - Easier CI/CD pipelines for incremental builds and registry publishing.
  - Simplified dependency graph computation with Nx.

- **Cons**
  - Requires discipline to prevent “lib sprawl” or cyclic dependencies.
  - CI configuration slightly more complex to handle both apps/libs and publishable packages.

---

[⬅ Back to ADR Index](./README.md)
