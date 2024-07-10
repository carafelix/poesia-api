import { SELF } from 'cloudflare:test'
import { describe, expect, it, assert } from 'vitest'

describe('Books Endpoints', () => {
    describe('List', () => {
        it('Basic', async () => {
            const response = await SELF.fetch('http://example.com/libros')
            const json = await response.json()
            expect(json).containSubset([
                {
                    title: 'Fragmentos a su imán',
                },
            ])
        })
        it('Should return the amount of books determined in the per_page param', async () => {
            const response = await SELF.fetch(
                'http://example.com/libros?per_page=5'
            )
            const json = await response.json()
            expect(json).toHaveLength(5)
        })
        it('Should paginate', async () => {
            const page1 = await SELF.fetch(
                'http://example.com/libros?page=1&per_page=2'
            )
            const json1 = await page1.json()
            const page2 = await SELF.fetch(
                'http://example.com/libros?page=2&per_page=2'
            )
            const json2 = await page2.json()
            expect(json1).not.containSubset(json2)
        })
    })
})
