import { defineConfig } from 'vitest/config';


export default defineConfig( { test: {
  include: [ './test/**/*.test.ts' ],
  logHeapUsage: true,
  typecheck: { enabled: true }
} } );
