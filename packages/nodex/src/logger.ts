import pino from 'pino';
import pretty from 'pino-pretty';
import { isDevelopment } from './helpers/is-development.js';

const prettyStream = pretty({
  colorize: true,
  levelFirst: true,
  translateTime: true,
  ignore: 'pid,hostname',
  singleLine: true,
});

export const logger = isDevelopment ? pino(prettyStream) : pino();
