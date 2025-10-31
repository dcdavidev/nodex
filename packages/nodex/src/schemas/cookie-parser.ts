import { z } from 'zod';

export const CookieParserOptionsSchema = z
  .union([
    z.boolean(),
    z.object({
      secret: z.union([z.string(), z.array(z.string())]).optional(),
      options: z
        .object({
          decode: z
            .function({
              input: [z.string()],
              output: z.string(),
            })
            .optional(),
        })
        .optional(),
    }),
  ])
  .optional()
  .default(true);

export type CookieParserOptionsInput = z.input<
  typeof CookieParserOptionsSchema
>;
export type CookieParserOptionsOutput = z.output<
  typeof CookieParserOptionsSchema
>;
