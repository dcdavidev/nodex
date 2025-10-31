import type { Server } from 'node:http';

import express, { type Application } from 'express';

export class Nodex {
  public app: Application;
  private server?: Server;

  private readonly port: number;

  constructor() {
    this.app = express();
    this.port = 4000;
  }

  public start(): Promise<void> {
    return new Promise((resolve) => {
      this.server = this.app.listen(this.port, () => {
        console.log(`Server running on port ${this.port}`);
        resolve();
      });
    });
  }

  public async shutdown(): Promise<void> {
    if (!this.server) {
      console.warn('Server not running.');
      return;
    }

    console.log('Shutdown initiated...');
    // TODO: close DB connections, clear cache, etc...

    return new Promise((resolve, reject) => {
      this.server!.close((err) => {
        if (err) {
          console.error('Error during server shutdown', err);
          reject(err);
          return;
        }
        console.log('Server stopped gracefully.');
        resolve();
      });
    });
  }
}
