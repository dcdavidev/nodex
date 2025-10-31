/**
 * Constants for NodeX application
 */

/**
 * Default port number
 * @default 3000
 */
export const DEFAULT_PORT = 3000;

/**
 * Minimum allowed port number
 * @default 1024
 */
export const MIN_PORT = 1024;

/**
 * Maximum allowed port number
 * @default 65535
 */
export const MAX_PORT = 65535;

/**
 * Node environment constants
 */
export const NODE_ENV_VALUES = {
  DEVELOPMENT: 'development',
  PRODUCTION: 'production',
  TEST: 'test',
  STAGING: 'staging',
} as const;

/**
 * Log levels
 */
export const LOG_LEVELS = {
  ERROR: 'error',
  WARN: 'warn',
  INFO: 'info',
  DEBUG: 'debug',
  TRACE: 'trace',
} as const;

/**
 * Error codes
 */
export const ERROR_CODES = {
  VALIDATION_ERROR: 'VALIDATION_ERROR',
  CONFIG_ERROR: 'CONFIG_ERROR',
  INTERNAL_ERROR: 'INTERNAL_ERROR',
  NOT_FOUND: 'NOT_FOUND',
  UNAUTHORIZED: 'UNAUTHORIZED',
  FORBIDDEN: 'FORBIDDEN',
  BAD_REQUEST: 'BAD_REQUEST',
} as const;
