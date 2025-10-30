# ADR-008: Versioning & Releases — Controlled with Tsdown

**Date:** 2025-10-23  
**Status:** Accepted

---

## Context

Nx provides a `publishable` flag for libraries, which enables automated build and publishing to registries.  
However, enabling it in a monorepo with multiple packages can lead to **unwanted dependencies** such as `verdaccio` installation or default npm publishing behaviors that are hard to control.

The goal is to **retain full control over versioning and publishing** while avoiding unnecessary tooling installation and configuration overhead.

## Decision

- **Disable `publishable`** in all Nx library configurations in `nx.json`.
- Use **Tsdown** and custom DevKit scripts for building, packaging, and generating type definitions.
- Publish to registries only via controlled pipelines, avoiding Nx’s automated publish flow.
- Ensure all packages in `packages/` or `libs/` are versioned consistently, with change logs generated separately.

This approach reduces the risk of installing extra dependencies and gives precise control over how and when libraries are published.

## Alternatives Considered

- **Enable Nx `publishable`** — convenient but triggers unwanted dependencies and automatic behaviors.
- **Manual `npm pack` for each library** — cumbersome, error-prone.
- **Third-party monorepo publishing tools** — adds unnecessary complexity.

## Consequences

- **Pros**
  - Full control over build and publishing pipelines.
  - Avoids installing `verdaccio` or other unnecessary dependencies.
  - Compatible with CI/CD automation using DevKit scripts.
  - Consistent versioning strategy across all libraries and packages.

- **Cons**
  - Requires developers to follow explicit DevKit publishing steps.
  - Loss of Nx’s built-in publish automation features, traded for precise control.

---

### Example Release Workflow

```bash
# Build all libraries and packages
nx run-many -t build

# use nx release
nx release --first-release --yes
```

---

[⬅ Back to ADR Index](./README.md)
