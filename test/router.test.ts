import { SELF } from 'cloudflare:test'
import { describe, expect, it } from 'vitest'

describe('API Tests', () => {
    describe('UI endpoints', () => {
        it('SwaggerUI is mounted on /', async () => {
            const response = await SELF.fetch('http://example.com/')
            expect(await response.text()).toContain('<title>SwaggerUI</title')
        })
        it('ReDocs is mounted on /docs', async () => {
            const response = await SELF.fetch('http://example.com/docs')
            expect(await response.text()).toContain('<title>ReDocUI</title')
        })
    })
})
