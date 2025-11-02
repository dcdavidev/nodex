import path from 'node:path';
import { fileURLToPath } from 'node:url';

import express from 'express';

import favicon from 'serve-favicon';
import { Nodex } from '@dcdavidev/nodex';

const $filename = fileURLToPath(import.meta.url);
const $dirname = path.dirname($filename);

const favicons = path.join($dirname, '..', 'favicons');

const demo = new Nodex({
  port: 4000,
  cors: {
    origin: ['http://localhost:4000'],
  },
  helmet: {
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'none'"],
        connectSrc: ["'self'", 'http://localhost:4000'],
      },
    },
  },
});

const app = demo.getApp();

(async () => {
  await demo.start();

  // General Favicons
  app.use(express.static(favicons));

  // favicon.ico
  app.use(favicon(path.join(favicons, 'favicon.ico')));

  // Routes
  app.get('/', (_req, res) => {
    res.json({ hello: 'world' });
  });

  process.on('SIGINT', async () => {
    await demo.shutdown();
    process.exit(0);
  });
})();
