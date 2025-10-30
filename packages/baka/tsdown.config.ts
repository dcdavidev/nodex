import { defineConfig } from 'tsdown';

export default defineConfig([
  {
    entry: ['src/index.ts'],
    platform: 'node',
    format: ['esm'],
    dts: { build: true },
    clean: true,
    outDir: 'dist',
    sourcemap: true,
  },
]);
