import type { Server } from 'node:http';

import express, { type Application } from 'express';

import type { Logger } from 'pino';

import { DEFAULT_PORT } from './consts.js';
import { ValidationError } from './errors/validation-error.js';
import { logger } from './logger.js';
import { configureCompression } from './middlewares/compression.js';
import { configureCookieParser } from './middlewares/cookie-parser.ts.js';
import { configureCors } from './middlewares/cors.js';
import { errorHandler } from './middlewares/error-handler.js';
import { configureHelmet } from './middlewares/helmet.js';
import { configureHpp } from './middlewares/hpp.js';
import { configureRateLimit } from './middlewares/rate-limit.js';
import {
  type NodexConfigInput,
  type NodexConfigOutput,
  NodexConfigSchema,
} from './schemas/nodex-config.js';

/**
 * Main application class for the Nodex server.
 *
 * Handles Express app instantiation, configuration validation,
 * middleware setup, logging, error handling, server startup, and graceful shutdown.
 */
export class Nodex {
  public app: Application;
  private server?: Server;
  private readonly config: NodexConfigOutput;
  private readonly logger: Logger;

  /**
   * Constructs a new Nodex server instance.
   * Initializes the Express app, logger, validates and stores configuration, and applies middlewares.
   * @param config Configuration input for Nodex, validated by NodexConfigSchema.
   * @example
   * const nodex = new Nodex({ port: 3000 });
   */
  constructor(config: NodexConfigInput) {
    this.app = express();
    this.logger = this.setupLogger(this.app);

    this.config = this.setupConfig(config);
    this.setupMiddlewares();
  }

  // --- LOGGER ---

  /**
   * Sets up and attaches the logger to the given Express application.
   * @param app Express application.
   * @returns Logger instance to use in Nodex.
   * @example
   * const logger = this.setupLogger(app);
   */
  private setupLogger(app: Application) {
    app.set('logger', logger);
    return logger;
  }

  /**
   * Provides access to the application's logger instance.
   * @returns Logger instance.
   * @example
   * const log = nodex.getLogger();
   */
  public getLogger() {
    return this.logger;
  }

  // --- Error Handling ---

  /**
   * Attaches error event listener to the server.
   * Logs server errors using the application's logger.
   * @example
   * this.setupErrorHandling();
   */
  private setupErrorHandling() {
    this.server?.on('error', (err) => {
      this.logger.error(err, 'Server error:');
    });
  }

  // --- Nodex Config ---

  /**
   * Validates the provided config using NodexConfigSchema.
   * Throws ValidationError if validation fails.
   * @param config Raw configuration input for Nodex.
   * @returns Validated configuration.
   * @throws {ValidationError} If configuration is invalid.
   * @example
   * const config = this.setupConfig(rawConfig);
   */
  private setupConfig(config: NodexConfigInput): NodexConfigOutput {
    const logger = this.getLogger();
    const result = NodexConfigSchema.safeParse(config);

    if (!result.success) {
      logger.error(result.error, 'Invalid Nodex configuration');
      throw new ValidationError('Invalid Nodex configuration', result.error);
    }

    return result.data;
  }

  /**
   * Returns the validated Nodex configuration.
   * @returns NodexConfigOutput object.
   * @example
   * const config = nodex.getConfig();
   */
  public getConfig(): NodexConfigOutput {
    return this.config;
  }

  // --- Middlewares ---

  /**
   * Sets up Express middlewares for the application.
   * Currently applies the helmet security middleware.
   * @example
   * this.setupMiddlewares();
   */
  private setupMiddlewares() {
    // Helmet
    configureHelmet(this.app, this.config);

    // CORS
    configureCors(this.app, this.config);

    // Body Parsers
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));

    // cookie-parser
    configureCookieParser(this.app, this.config);

    // compression
    configureCompression(this.app, this.config);

    // express-rate-limit
    configureRateLimit(this.app, this.config);

    // hpp
    configureHpp(this.app, this.config);

    // TODO: csurf - CSRF protection (usually after HPP)
    // TODO: express-session - Session management (should be before passport)
    // TODO: passport - Authentication middleware (after session)
    // TODO: celebrate/joi - Validation middleware (usually early)
    // TODO: multer - multipart/form-data (file upload, before routes)
    // TODO: method-override - HTTP method override (depends on your forms)
    // TODO: serve-static - serve static files
    // TODO: serve-favicon - serve site favicon

    // Error Handler (keep it last)
    this.app.use(errorHandler);
  }

  // --- Nodex Start Helper ---

  /**
   * Starts the Nodex server and listens on the specified port.
   * Resolves when the server is ready.
   * @returns Promise that resolves once server is running.
   * @example
   * await nodex.start();
   */
  public start(): Promise<void> {
    const logger = this.getLogger();
    const { port } = this.getConfig();

    return new Promise((resolve) => {
      this.server = this.app.listen(port, () => {
        if (port === DEFAULT_PORT) {
          logger.info(`Server running on default port ${port}`);
        } else {
          logger.info(`Server running on port ${port}`);
        }
        resolve();
      });
      this.setupErrorHandling();
    });
  }

  // --- Nodex Graceful Shutdown ---

  /**
   * Gracefully shuts down the Nodex server.
   * Stops accepting new connections and closes existing ones.
   * @returns Promise that resolves when the server has stopped.
   * @example
   * await nodex.shutdown();
   */
  public async shutdown(): Promise<void> {
    const logger = this.getLogger();

    if (!this.server) {
      logger.warn('Server not running.');
      return;
    }

    logger.info('Shutdown initiated...');
    // TODO: close DB connections, clear cache, etc...

    return new Promise((resolve, reject) => {
      this.server!.close((err) => {
        if (err) {
          logger.error(err, 'Error during server shutdown');
          reject(err);
          return;
        }
        logger.info('Server stopped gracefully.');
        resolve();
      });
    });
  }
}
