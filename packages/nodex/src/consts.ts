// Port
export const RESERVED_PORTS: Record<number, string> = {
  // Databases
  3306: 'MySQL',
  5432: 'PostgreSQL',
  6379: 'Redis',
  27_017: 'MongoDB',
  27_018: 'MongoDB shard/replica',
  9200: 'Elasticsearch',
  5601: 'Kibana',
  // Dev tools
  5173: 'Vite default port',
  8888: 'Jupyter Notebook',
  // AI / ML servers
  6006: 'TensorBoard',
  5000: 'MLflow (also common for Flask)',
  8265: 'Ray Dashboard',
  8787: 'Dask Dashboard',
  11_434: 'Ollama API',
};
export const DEFAULT_PORT = 4000;
export const MIN_PORT = 1024;
export const MAX_PORT = 65_535;
export const ALLOWED_PORTS = new Set([DEFAULT_PORT, 8000, 8080]);

// Node environment constants
export const NODE_ENV_VALUES = {
  DEVELOPMENT: 'development',
  PRODUCTION: 'production',
  TEST: 'test',
  STAGING: 'staging',
} as const;

// Log levels
export const LOG_LEVELS = {
  ERROR: 'error',
  WARN: 'warn',
  INFO: 'info',
  DEBUG: 'debug',
  TRACE: 'trace',
} as const;

// Error codes
export const ERROR_CODES = {
  VALIDATION_ERROR: 'VALIDATION_ERROR',
  CONFIG_ERROR: 'CONFIG_ERROR',
  INTERNAL_ERROR: 'INTERNAL_ERROR',
  NOT_FOUND: 'NOT_FOUND',
  UNAUTHORIZED: 'UNAUTHORIZED',
  FORBIDDEN: 'FORBIDDEN',
  BAD_REQUEST: 'BAD_REQUEST',
} as const;

// CORS config default values
export const DEFAULT_CORS_ORIGINS = [`http://localhost:${DEFAULT_PORT}`];
export const DEFAULT_CORS_METHODS = [
  'GET',
  'POST',
  'PUT',
  'DELETE',
  'OPTIONS',
] as const;
export const DEFAULT_CORS_ALLOWED_HEADERS = [
  'Content-Type',
  'Authorization',
  'Origin',
  'X-Requested-With',
];
export const DEFAULT_CORS_CREDENTIALS = true;
export const DEFAULT_CORS_OPTIONS_SUCCESS_STATUS = 204;
export const DEFAULT_CORS_ENABLED = true;
export const DEFAULT_CORS_OPTIONS = {
  enabled: DEFAULT_CORS_ENABLED,
  origin: DEFAULT_CORS_ORIGINS,
  methods: [...DEFAULT_CORS_METHODS],
  allowedHeaders: DEFAULT_CORS_ALLOWED_HEADERS,
  credentials: DEFAULT_CORS_CREDENTIALS,
  optionsSuccessStatus: DEFAULT_CORS_OPTIONS_SUCCESS_STATUS,
};
