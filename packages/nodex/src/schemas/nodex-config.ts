import { z } from 'zod';

import { DEFAULT_PORT } from '../consts.js';
import { PortSchema } from './port.js';

export const NodexConfigSchema = z.object({
  port: PortSchema.default(DEFAULT_PORT),
});

export type NodexConfigInput = z.input<typeof NodexConfigSchema>;
export type NodexConfigOutput = z.output<typeof NodexConfigSchema>;
