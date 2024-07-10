import { SELF } from 'cloudflare:test'
import { describe, expect, it } from 'vitest'

describe('Authors Endpoints', () => {
    describe('List', async () => {
        it('Basic', async () => {
            const response = await SELF.fetch('http://example.com/autores')
            expect(await response.json()).containSubset([
                {
                    name: 'José Lezama Lima',
                },
            ])
        })
    })
    // it('only list author that match a certain country', () => {
    // })
    // it('only list author born after x date', () => {
    // })
    // it('only list author born before x date', () => {
    // })
    // it('only list author that died after x date', () => {
    // })
    // it('only list author that died before x date', () => {
    // })
    // it('only list author lived between x-y date', () => {
    // })
})
