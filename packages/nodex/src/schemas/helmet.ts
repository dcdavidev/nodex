import { z } from 'zod';

export const HelmetOptionsSchema = z.boolean().optional().default(true);

export type HelmetOptionsInput = z.input<typeof HelmetOptionsSchema>;
export type HelmetOptionsOutput = z.output<typeof HelmetOptionsSchema>;
