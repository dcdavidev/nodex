# ADR-003: Package Manager — npm

**Date:** 2025-10-23  
**Status:** Accepted

---

## Context

A monorepo must manage dependencies reliably across multiple workspaces, ensuring predictable installs in local and CI environments.  
While alternatives like pnpm or yarn offer performance advantages, they introduce extra configuration layers and CI compatibility issues that complicate automation pipelines.

The goal is to use a package manager that is:

- Native to the Node.js runtime.
- Universally supported in all environments.
- Easy to configure and maintain, especially in CI/CD.

## Decision

Adopt **npm** as the **default package manager** for the monorepo.  
Despite being slower than pnpm or yarn in some scenarios, npm remains the most stable, straightforward, and natively supported option — ensuring frictionless use in any Node environment.

## Alternatives Considered

- **pnpm** — faster and space-efficient, but adds complexity for CI caching and workspace linking.
- **yarn (berry)** — powerful but introduces nonstandard behavior and requires a virtual filesystem layer.
- **bun** — extremely fast, yet too experimental and not production-proven for monorepo pipelines.

## Consequences

- **Pros**
  - Zero configuration required — works natively with Node.js and Nx.
  - Maximum compatibility with CI providers, Docker, and cloud build systems.
  - Easier onboarding for developers already familiar with npm.

- **Cons**
  - Slightly slower installs compared to pnpm.
  - Less efficient caching and deduplication for large dependency graphs.

---

### Example

```bash
npm install
npx nx run-many --target=build
```

---

[⬅ Back to ADR Index](./README.md)
