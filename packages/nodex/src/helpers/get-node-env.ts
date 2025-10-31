import { ValidationError } from '../errors/validation-error.js';
import { NODE_ENVS, NodeEnvSchema, type NodeEnv } from '../schemas/node-env.js';

/**
 * Parses NODE_ENV value from process.env
 * @returns {NodeEnv} The validated NODE_ENV string.
 * @throws {ValidationError} Error when not correctly defined.
 */
export function getNodeEnv(): NodeEnv {
  const rawNodeEnv = process.env.NODE_ENV;
  const result = NodeEnvSchema.safeParse(rawNodeEnv);

  if (!result.success) {
    throw new ValidationError('Invalid Node Env', result.error, {
      provided: rawNodeEnv,
      expected: NODE_ENVS.join('|'),
    });
  }

  return result.data;
}
