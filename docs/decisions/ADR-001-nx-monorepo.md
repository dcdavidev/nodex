# ADR-001: Monorepo Orchestrator — Nx

**Date:** 2025-10-23  
**Status:** Accepted

---

## Context

Managing multiple Node.js and React applications within a single workspace requires a tool that supports incremental builds, dependency graph analysis, and task orchestration.  
The goal is to ensure fast builds, clear structure, and reliable automation for apps, libraries, and internal tools.

## Decision

Adopt [Nx](https://nx.dev) as the core **monorepo orchestrator**.  
Nx provides a modular, extensible system with caching, dependency graph visualization, and a plugin ecosystem designed for scalability.

## Alternatives Considered

- **Turborepo** — excellent for caching, but less mature for TypeScript and library generation workflows.
- **Lerna** — now partially deprecated and integrated into Nx.
- **Bazel** — highly performant but excessively complex for Node.js-centric projects.

## Consequences

- **Pros**
  - Incremental builds and remote caching significantly reduce CI/CD times.
  - Consistent configuration for build, lint, and serve tasks across all packages.
  - Easy extensibility through Nx plugins and custom generators.

- **Cons**
  - Nx configuration syntax can be verbose for simple projects.
  - Requires initial setup overhead compared to simpler tools like Turborepo.

---

[⬅ Back to ADR Index](./README.md)
