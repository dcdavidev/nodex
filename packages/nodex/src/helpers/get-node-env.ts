import { ValidationError } from '../errors/validation-error.js';
import { NODE_ENVS, type NodeEnv, NodeEnvSchema } from '../schemas/node-env.js';

/**
 * Parses the `NODE_ENV` environment variable from `process.env`.
 * @returns {NodeEnv} The validated environment value.
 * @throws {ValidationError} Thrown if `NODE_ENV` is invalid or not defined according to schema.
 *
 * @example
 * // Example usage:
 * const env = getNodeEnv();
 * // env will be one of 'production', 'development', etc.
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
