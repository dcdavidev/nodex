import { z } from 'zod';

export const ErrorMetadataSchema = z
  .object({
    code: z.string().min(1, 'Error code cannot be empty'),
    cause: z.unknown().optional(),
    context: z.record(z.unknown()).optional(),
  })
  .strict();

export type ErrorMetadata = z.infer<typeof ErrorMetadataSchema>;
export type ErrorMetadataInput = z.input<typeof ErrorMetadataSchema>;
export type ErrorMetadataOutput = z.output<typeof ErrorMetadataSchema>;
