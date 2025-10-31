import { z } from 'zod';

export const NODE_ENVS = [
  'development',
  'testing',
  'staging',
  'production',
] as const;

export const NodeEnvSchema = z.enum(NODE_ENVS);

export const NodeEnvEnum = NodeEnvSchema.enum;

export type NodeEnv = z.infer<typeof NodeEnvSchema>;
