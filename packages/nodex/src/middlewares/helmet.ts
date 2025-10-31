import type { Application } from 'express';
import helmet from 'helmet';

import type { NodexConfigOutput } from '../schemas/nodex-config.js';

/**
 * Configures the Helmet middleware in an Express app.
 *
 * If the `helmet` setting in `config` is `true` (or missing, given the default of `true`), the Helmet middleware is added to enhance the security of HTTP headers.
 * @param app The Express Application instance on which to apply Helmet.
 * @param config Typed project configuration from which the Helmet option is read.
 *
 * @returns The Express Application instance (`app`) if Helmet is enable, otherwise `undefined` if it is disabled.+.
 *
 * @example
 * private setupMiddlewares() {
 *    configureHelmet(this.app, this.config);
 * }
 */
export function configureHelmet(app: Application, config: NodexConfigOutput) {
  const { helmet: isHelmetEnabled } = config;

  if (!isHelmetEnabled) {
    return;
  }

  return app.use(helmet());
}
