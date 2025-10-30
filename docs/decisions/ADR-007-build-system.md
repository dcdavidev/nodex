# ADR-007: Build System — Nx + Webpack + Tsdown

**Date:** 2025-10-23  
**Status:** Accepted

---

## Context

The monorepo contains multiple apps, libraries, and standalone packages that require compilation and bundling.  
Nx provides built-in build targets for libraries and apps, but its default setups (especially for Node.js and React) can be **overly complex or opinionated**, forcing extra configuration files that are hard to maintain and may not suit every project.

The goal is to have a **flexible, predictable build system** that works for:

- TypeScript libraries (`libs/` and `packages/`).
- Node.js applications (`apps/server`).
- Web/React applications (`apps/console`).
- CI/CD pipelines without extra Nx boilerplate.

## Decision

- **Node.js libraries and packages** — compile with **tsc**, as configured via Nx plugins (`@nx/js:library`).
- **Node.js apps** — bundle using **Webpack**, leveraging Nx’s Webpack plugin for task orchestration.
- **Documentation/Type Definitions** — generate via **Tsdown**, outside of Nx’s default generators.

This approach avoids the heavy default Nx configurations while still integrating with its task graph, caching, and affected commands.

## Alternatives Considered

- **Nx default builders only** — too rigid and verbose.
- **Rollup** — powerful but redundant for small server-side apps.
- **Babel-only builds** — lacks TypeScript type verification out of the box.

## Consequences

- **Pros**
  - Flexible, per-project build pipelines.
  - Nx task graph and incremental builds are fully utilized.
  - CI pipelines remain fast and predictable.
  - Customization through DevKit is possible without touching Nx defaults.

- **Cons**
  - Slightly more initial setup to combine tsc, Webpack, and Tsdown.
  - Requires developers to understand multiple build tools depending on project type.

---

## Example of `tsdown.config.ts`

```ts
import { defineConfig } from 'tsdown';

export default defineConfig([
  {
    entry: ['src/index.ts'],
    platform: 'node',
    format: ['esm'],
    dts: { build: true },
    clean: true,
    outDir: 'dist',
    sourcemap: true,
  },
]);
```

## Example of a `package.json` with `nx` targets configured:

```json
{
  "name": "@repo/project",
  "version": "0.21.1",
  "private": false,
  "description": "project description",
  "keywords": ["keywords-list"],
  "homepage": "https://github.com/spellbookx/devkit#readme",
  "bugs": {
    "url": "https://github.com/spellbookx/devkit/issues"
  },
  "repository": {
    "type": "git",
    "url": "git+https://github.com/spellbookx/devkit.git",
    "directory": "packages/prettier-config"
  },
  "license": "MIT",
  "type": "module",
  "exports": {
    "./package.json": "./package.json",
    ".": {
      "@spellbookx/source": "./src/index.ts",
      "types": "./dist/index.d.ts",
      "import": "./dist/index.js",
      "default": "./dist/index.js"
    }
  },
  "main": "./dist/index.js",
  "module": "./dist/index.js",
  "types": "./dist/index.d.ts",
  "files": ["dist", "LICENSE"],
  "dependencies": {
    "prettier-plugin-ini": "^1.3.0",
    "prettier-plugin-packagejson": "^2.5.19",
    "prettier-plugin-prisma": "^5.0.0",
    "prettier-plugin-properties": "^0.3.0",
    "prettier-plugin-sh": "^0.18.0",
    "prettier-plugin-toml": "^2.0.6",
    "tslib": "^2.3.0"
  },
  "devDependencies": {
    "@types/node": "^20.19.9",
    "tsdown": "^0.15.9",
    "typescript": "^5.9.3"
  },
  "peerDependencies": {
    "prettier": "^3.6.2"
  },
  "publishConfig": {
    "access": "public"
  },
  "nx": {
    "name": "prettier-config",
    "tags": ["scope:tool", "tool:prettier"],
    "targets": {
      "build": {
        "executor": "nx:run-commands",
        "inputs": ["production"],
        "outputs": ["{projectRoot}/dist"],
        "options": {
          "cwd": "{projectRoot}",
          "parallel": false,
          "commands": ["tsdown"]
        }
      },
      "watch": {
        "executor": "nx:run-commands",
        "inputs": ["default"],
        "options": {
          "cwd": "{projectRoot}",
          "commands": ["tsdown --watch"]
        }
      }
    }
  }
}
```

---

[⬅ Back to ADR Index](./README.md)
