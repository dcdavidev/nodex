import { z } from 'zod';

import { CorsOptionsSchema } from './cors.js';
import { HelmetOptionsSchema } from './helmet.js';
import { PortSchema } from './port.js';

export const NodexConfigSchema = z.object({
  port: PortSchema,
  helmet: HelmetOptionsSchema,
  cors: CorsOptionsSchema,
});

export type NodexConfigInput = z.input<typeof NodexConfigSchema>;
export type NodexConfigOutput = z.output<typeof NodexConfigSchema>;
