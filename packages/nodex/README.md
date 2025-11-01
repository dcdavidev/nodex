# @dcdavidev/nodex

An extensible and robust Express.js backend framework, designed for effortless customization and rapid deployment.

---

## Project Overview

**dcdavidev/nodex** is an extensible and robust Express.js backend framework designed for effortless customization and rapid deployment. It provides a structured and modular approach to building backend applications with Express, featuring built-in support for essential middleware and configuration management.

---

## Key Features

- **Express app instantiation** with typed configuration validation.
- Seamless setup of key middlewares including security headers (Helmet), CORS, compression, cookie parsing, rate limiting, session management, and more.
- Centralized error handling middleware.
- Integrated logging support using **pino**.
- Graceful server startup and shutdown with optional async cleanup tasks.
- Strongly typed configuration schemas built with **zod**.
- Modular middleware configuration functions for easy customization.
- Support for authentication using Passport.js.
- Protection against HTTP Parameter Pollution (HPP).
- Rate limiting to mitigate abuse and DoS attacks.
- Built-in session management with configurable cookie options.

---

## Installation

Install the package via npm:

```bash
npm install @dcdavidev/nodex
```

---

## Usage Example

```ts
import { Nodex } from '@dcdavidev/nodex';

const nodex = new Nodex({ port: 4000 });

await nodex.start();

// Optional: graceful shutdown with cleanup chores
await nodex.shutdown(async () => {
  // e.g., close DB connections, clear cache
});
```

---

## Middleware Configuration

The framework includes modular configuration functions for popular Express middleware:

- `configureHelmet` — adds security-related HTTP headers with Helmet.
- `configureCors` — sets up Cross-Origin Resource Sharing with customizable origins and methods.
- `configureCompression` — enables HTTP response compression.
- `configureCookieParser` — parses cookies with optional secrets.
- `configureRateLimit` — protects endpoints from excessive requests.
- `configureSession` — manages user sessions with customizable cookie options.
- `configureHpp` — guards against HTTP Parameter Pollution attacks.
- `configurePassport` — integrates Passport.js authentication middleware.
- Centralized `errorHandler` middleware for consistent JSON error responses and logging.

These middlewares are automatically applied based on the validated Nodex configuration schema (`NodexConfigSchema`), which uses **zod** for runtime and compile-time validation.

---

## Configuration Schema

The configuration object includes:

- `port`: Server port (default 3000).
- `helmet`: Enable or disable Helmet security middleware.
- `cors`: CORS settings including allowed origins and headers.
- `compression`: Enable HTTP compression.
- `rateLimit`: Rate limiting options.
- `cookieParser`: Options or boolean to enable cookie parsing.
- `hpp`: HTTP Parameter Pollution protection settings.
- `session`: Session management options including cookie security.
- `passport`: Passport.js configuration or disable.

Example config:

```ts
export const config = {
  port: 3000,
  helmet: true,
  cors: { origin: ['https://example.com'], methods: ['GET', 'POST'] },
  compression: true,
  rateLimit: { max: 100, windowMs: 60000 },
  cookieParser: true,
  hpp: true,
  session: { secret: 'your-secret', resave: false, saveUninitialized: false },
  passport: false,
};
```

## License

This project is licensed under the MIT License.

**Copyright (c) 2025 Davide Di Criscito**

For the full details, see the [LICENSE](./LICENSE) file.
