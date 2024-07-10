import { SELF } from 'cloudflare:test'
import { describe, expect, it, assert } from 'vitest'

describe('Poems Endpoints', () => {
    describe('List', () => {
        it('Basic', async () => {
            const response = await SELF.fetch('http://example.com/poemas')
            const json = await response.json()
            expect(json).containSubset([
                {
                    title: 'LAS HORAS REGLADAS',
                },
            ])
        })
        it('Should return the amount of poems determined in the per_page param', async () => {
            const response = await SELF.fetch(
                'http://example.com/poemas?per_page=5'
            )
            const json = await response.json()
            expect(json).toHaveLength(5)
        })
        it('Should paginate', async () => {
            const page1 = await SELF.fetch(
                'http://example.com/poemas?page=1&per_page=2'
            )
            const json1 = await page1.json()

            const page2 = await SELF.fetch(
                'http://example.com/poemas?page=2&per_page=2'
            )
            const json2 = await page2.json()

            expect(json1).not.containSubset(json2)
        })
    })
    describe('Fetch', () => {
        it('Find the first poem when multiple have the same title', async () => {
            const response = await SELF.fetch(
                'http://example.com/poema?title=dador'
            )
            expect(await response.json()).containSubset({
                title: 'DADOR',
                subindex: 1,
            })
        })
        it('Find the subindexed poem when multiple have the same title', async () => {
            const response = await SELF.fetch(
                'http://example.com/poema?title=dador&subindex=3'
            )
            expect(await response.json()).containSubset({
                title: 'DADOR',
                subindex: 3,
            })
        })
        it('Find by id', async () => {
            const response = await SELF.fetch(
                'http://example.com/poema?id=rec_cpkejg8v9iqcnjbc1pu0'
            )
            expect(await response.json()).containSubset({
                title: 'AGUA DEL ESPEJO',
                xata_id: 'rec_cpkejg8v9iqcnjbc1pu0',
            })
        })
        it('Prioritize id over everything', async () => {
            const response = await SELF.fetch(
                'http://example.com/poema?id=rec_cpkejg8v9iqcnjbc1pu0&title=DADOR'
            )
            expect(await response.json()).containSubset({
                title: 'AGUA DEL ESPEJO',
                xata_id: 'rec_cpkejg8v9iqcnjbc1pu0',
            })
        })
    })
})
