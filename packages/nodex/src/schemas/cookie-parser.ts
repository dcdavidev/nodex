import type { CookieParseOptions } from 'cookie-parser';

import { z } from 'zod';

export const CookieParserOptionsSchema = z
  .union([z.boolean(), z.custom<CookieParseOptions>()])
  .optional()
  .default(true);

export type CookieParserOptionsInput = z.input<
  typeof CookieParserOptionsSchema
>;
export type CookieParserOptionsOutput = z.output<
  typeof CookieParserOptionsSchema
>;
