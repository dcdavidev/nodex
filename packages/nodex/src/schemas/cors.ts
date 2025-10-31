import { z } from 'zod';

import {
  DEFAULT_CORS_ALLOWED_HEADERS,
  DEFAULT_CORS_CREDENTIALS,
  DEFAULT_CORS_METHODS,
  DEFAULT_CORS_OPTIONS,
  DEFAULT_CORS_OPTIONS_SUCCESS_STATUS,
  DEFAULT_CORS_ORIGINS,
} from '../consts/cors.js';

export const CorsOptionsSchema = z
  .union([
    z.boolean(),
    z.object({
      enabled: z.boolean().default(true),
      origin: z.array(z.url()).optional().default(DEFAULT_CORS_ORIGINS),
      methods: z
        .array(z.enum(DEFAULT_CORS_METHODS))
        .optional()
        .default([...DEFAULT_CORS_METHODS]),
      allowedHeaders: z
        .array(z.string())
        .optional()
        .default(DEFAULT_CORS_ALLOWED_HEADERS),
      credentials: z.boolean().optional().default(DEFAULT_CORS_CREDENTIALS),
      optionsSuccessStatus: z
        .number()
        .int()
        .optional()
        .default(DEFAULT_CORS_OPTIONS_SUCCESS_STATUS),
    }),
  ])
  .optional()
  .default(DEFAULT_CORS_OPTIONS);

export type CorsOptionsInput = z.input<typeof CorsOptionsSchema>;
export type CorsOptionsOutput = z.output<typeof CorsOptionsSchema>;
