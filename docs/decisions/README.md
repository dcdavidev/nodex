# Architecture Decision Records (ADRs)

This directory contains all major technical and architectural decisions for  
**@dcdavidev/nx-workspace-nodejs**.

Each file documents one decision, using the community standard ADR format:

- **Context:** why the decision was needed.
- **Decision:** what was chosen and why.
- **Consequences:** expected effects or trade-offs.
- **Status:** Accepted, Proposed, Superseded, or Deprecated.

---

## Index

| ID                                            | Title                                             | Status   | Date       |
| --------------------------------------------- | ------------------------------------------------- | -------- | ---------- |
| [ADR-001](./ADR-001-nx-monorepo.md)           | Monorepo Orchestrator — Nx                        | Accepted | 2025-10-23 |
| [ADR-002](./ADR-002-git-hooks-lefthook.md)    | Git Hooks — Lefthook                              | Accepted | 2025-10-23 |
| [ADR-003](./ADR-003-package-manager-npm.md)   | Package Manager — npm                             | Accepted | 2025-10-23 |
| [ADR-004](./ADR-004-code-quality-devkit.md)   | Code Quality — Spellbook DevKit                   | Accepted | 2025-10-23 |
| [ADR-005](./ADR-005-workspace-structure.md)   | Workspace Structure — Apps, Libs, Tools, Packages | Accepted | 2025-10-23 |
| [ADR-006](./ADR-006-testing-frameworks.md)    | Testing Frameworks — Deferred Choice              | Proposed | 2025-10-23 |
| [ADR-007](./ADR-007-build-system.md)          | Build System — Nx + Webpack + Tsdown              | Accepted | 2025-10-23 |
| [ADR-008](./ADR-008-versioning-releases.md)   | Versioning & Releases — Controlled with Tsdown    | Accepted | 2025-10-23 |
| [ADR-009](./ADR-009-linting-formatting-ci.md) | Linting & Formatting — CI-First Approach          | Accepted | 2025-10-23 |

---

### Notes

To add a new ADR:

1. Copy the latest one.
2. Increment the ADR number.
3. Update **title**, **status**, and **date**.
4. Link it here in the table.

Older ADRs should **never be deleted**, only marked as **Superseded by ADR-XXX**.
