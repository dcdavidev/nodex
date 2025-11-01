import type { HelmetOptions } from 'helmet';

import { z } from 'zod';

export const HelmetOptionsSchema = z.union([
  z.boolean(),
  z.custom<HelmetOptions>(),
]);

export type HelmetOptionsInput = z.input<typeof HelmetOptionsSchema>;
export type HelmetOptionsOutput = z.output<typeof HelmetOptionsSchema>;
