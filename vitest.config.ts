import { defineWorkersConfig } from '@cloudflare/vitest-pool-workers/config'

export default defineWorkersConfig({
   test: {
      coverage: {
         provider: 'istanbul',
         reporter: ['lcov'],
      },
      poolOptions: {
         workers: {
            main: './src/index.ts',
            wrangler: { configPath: './wrangler.toml' },
         },
      },
   },
})
