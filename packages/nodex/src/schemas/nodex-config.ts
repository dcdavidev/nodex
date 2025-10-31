import { z } from 'zod';

import { CompressionOptionsSchema } from './compression.js';
import { CorsOptionsSchema } from './cors.js';
import { HelmetOptionsSchema } from './helmet.js';
import { PortSchema } from './port.js';

export const NodexConfigSchema = z.object({
  port: PortSchema,
  helmet: HelmetOptionsSchema,
  cors: CorsOptionsSchema,
  compression: CompressionOptionsSchema,
});

export type NodexConfigInput = z.input<typeof NodexConfigSchema>;
export type NodexConfigOutput = z.output<typeof NodexConfigSchema>;
