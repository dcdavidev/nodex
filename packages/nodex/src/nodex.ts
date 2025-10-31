import type { Server } from 'node:http';

import express, { type Application } from 'express';
import type { Logger } from 'pino';
import helmet from 'helmet';

import { logger } from './logger.js';
import {
  NodexConfigSchema,
  type NodexConfigInput,
  type NodexConfigOutput,
} from './schemas/nodex-config.js';
import { ValidationError } from './errors/validation-error.js';

export class Nodex {
  public app: Application;
  private server?: Server;
  private readonly config: NodexConfigOutput;
  private readonly logger: Logger;

  constructor(config: NodexConfigInput) {
    this.app = express();
    this.logger = this.setupLogger(this.app);

    this.config = this.setupConfig(config);
    this.setupMiddlewares();
  }

  // --- LOGGER ---
  private setupLogger(app: Application) {
    app.set('logger', logger);

    return logger;
  }

  public getLogger() {
    return this.logger;
  }

  // --- Error Handling ---
  private setupErrorHandling() {
    this.server?.on('error', (err) => {
      this.logger.error(err, 'Server error:');
    });
  }

  // --- Nodex Config ---
  private setupConfig(config: NodexConfigInput): NodexConfigOutput {
    const logger = this.getLogger();
    const result = NodexConfigSchema.safeParse(config);

    if (!result.success) {
      logger.error(result.error, 'Invalid Nodex configuration');
      throw new ValidationError('Invalid Nodex configuration', result.error);
    }

    return result.data;
  }

  public getConfig(): NodexConfigOutput {
    return this.config;
  }

  // --- Middlewares ---
  private setupMiddlewares() {
    this.app.use(helmet());
  }

  // --- Nodex Start Helper ---
  public start(): Promise<void> {
    const logger = this.getLogger();
    const { port } = this.getConfig();

    return new Promise((resolve) => {
      this.server = this.app.listen(port, () => {
        logger.info(`Server running on port ${port}`);
        resolve();
      });

      this.setupErrorHandling();
    });
  }

  // Nodex Graceful Shutdown ---
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
