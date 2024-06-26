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
   describe('Data Endpoints', () => {
      describe('Authors', () => {
         it('list all authors', async () => {
            const response = await SELF.fetch('http://example.com/autores')
            expect(await response.json()).containSubset([{
               name: 'José Lezama Lima',
            }])
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
   })
})
