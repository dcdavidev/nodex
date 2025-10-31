import type { Server } from 'node:http';

import express, { type Application } from 'express';
import type { Logger } from 'pino';
import helmet from 'helmet';

import { logger } from './logger.js';

export class Nodex {
  public app: Application;
  private server?: Server;

  private readonly logger: Logger;
  private readonly port: number;

  constructor() {
    this.app = express();
    this.logger = this.setupLogger(this.app);

    this.port = 4000;

    this.setupMiddleware();
  }

  private setupLogger(app: Application) {
    app.set('logger', logger);

    return logger;
  }

  public getLogger() {
    return this.logger;
  }

  private setupErrorHandling() {
    this.server?.on('error', (err) => {
      this.logger.error(err, 'Server error:');
    });
  }

  private setupMiddleware() {
    this.app.use(helmet());
  }

  public start(): Promise<void> {
    const logger = this.getLogger();

    return new Promise((resolve) => {
      this.server = this.app.listen(this.port, () => {
        logger.info(`Server running on port ${this.port}`);
        resolve();
      });

      this.setupErrorHandling();
    });
  }

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
