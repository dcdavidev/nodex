# ADR-006: Testing Frameworks — Deferred Choice

**Date:** 2025-10-23  
**Status:** Proposed

---

## Context

Unit testing and end-to-end testing are essential for maintaining a robust codebase.  
Nx provides built-in test runners for Jest, Vitest, and Cypress, but their default configurations are often **too heavy, opinionated, or outdated**.  
This can lead to unnecessary complexity and friction, especially in a monorepo where multiple apps, libs, and packages coexist.

The goal is to implement a testing solution that is:

- Easy to integrate across all workspace projects.
- Configurable but minimal by default.
- Compatible with Nx without introducing redundant or conflicting configs.
- Maintainable without requiring developers to override Nx defaults constantly.

## Decision

Postpone the definitive choice of testing frameworks.  
Investigate a **lightweight integration strategy** that allows using Jest, Vitest, or other frameworks **without relying on Nx-generated configurations**.  
The approach should ideally:

- Be standardized via [`@spellbookx/devkit`](https://github.com/spellbookx/devkit) or similar presets.
- Allow each project to define only the minimal test setup needed.
- Keep CI/CD pipelines simple and fast.

## Alternatives Considered

- **Nx built-in test generators** — ready-made but too opinionated and hard to customize.
- **Manual Jest/Vitest setup per project** — works but duplicates effort and increases maintenance.
- **Skip tests entirely for now** — not acceptable for long-term quality.

## Consequences

- **Pros**
  - Avoids bloated and brittle Nx configurations.
  - Provides flexibility to choose the best testing framework for each project.
  - Ensures minimal friction for CI/CD integration.

- **Cons**
  - Requires experimentation and iteration to find the best universal approach.
  - Temporary lack of a fully standardized test setup may confuse new contributors.
  - Risk of inconsistent testing patterns if not enforced by DevKit presets later.

---

[⬅ Back to ADR Index](./README.md)
