import {
   createExecutionContext,
   env,
   waitOnExecutionContext,
   //@ts-expect-error
} from 'cloudflare:test'
import { describe, expect, it } from 'vitest'
import worker from '../src/index'

describe('API Tests', () => {
   describe('UI endpoints', () => {
      it('SwaggerUI is mounted on /', async () => {
         const request = new Request('http://example.com/')
         const ctx = createExecutionContext()
         const response = await worker.fetch(request, env, ctx)
         await waitOnExecutionContext(ctx)
         expect(await response.text()).toContain('<title>SwaggerUI</title')
      })
      it('ReDocs is mounted on /docs', async () => {
         const request = new Request('http://example.com/docs')
         const ctx = createExecutionContext()
         const response = await worker.fetch(request, env, ctx)
         await waitOnExecutionContext(ctx)
         expect(await response.text()).toContain('<title>ReDocUI</title')
      })
   })
   describe('Data Endpoints', () => {
      describe('Authors', () => {
         it('list all authors', async () => {
            const request = new Request('http://example.com/autores')
            const ctx = createExecutionContext()
            const response = await worker.fetch(request, env, ctx)
            await waitOnExecutionContext(ctx)
            expect(await response.json()).containSubset([{
               name: 'José Lezama Lima',
            }])
         })
         it('only list author that match a certain country', () => {
         })
         it('only list author born after x date', () => {
         })
         it('only list author born before x date', () => {
         })
         it('only list author that died after x date', () => {
         })
         it('only list author that died before x date', () => {
         })
         it('only list author lived between x-y date', () => {
         })
      })
   })
})
