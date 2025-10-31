import { z } from 'zod';
import { PortSchema } from './port.js';

export const NodexConfigSchema = z.object({
  port: PortSchema,
});

export type NodexConfigInput = z.input<typeof NodexConfigSchema>;
export type NodexConfigOutput = z.output<typeof NodexConfigSchema>;
