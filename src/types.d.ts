import { Poem } from 'db/zodSchemas'

export type Bindings = {
    POEMAS_DB: D1Database
    TOKENS_KV: KVNamespace
    RATE_LIMITER: any
    SUDO_SECRET: string
    XATA_API_KEY: string
    XATA_DB: string
}

declare module 'cloudflare:test' {
    interface ProvidedEnv extends Bindings {}
}
