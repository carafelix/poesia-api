import * as tables from '../../db/drizzle/schema'
import { XataClient } from '../../db/xata'
import { PoemResponseSchema, PoemSchema } from '../../db/zodSchemas'
import { drizzle } from 'drizzle-orm/xata-http'
import { Bindings } from 'types'
import { OpenAPIRoute, contentJson } from 'chanfana'
import type { Context } from 'hono'
import { z } from 'zod'
import { lte, eq } from 'drizzle-orm'

export class PoemRandom extends OpenAPIRoute {
   schema = {
      tags: ['Poems'],
      summary: 'Find a Poem',
      request: {
         query: z.object({
            length: z.coerce.number().min(1).optional().describe(
               'Max character length for the poem',
            ),
         }),
      },
      responses: {
         '200': {
            description: 'Returns a Poem exact match or a list of fuzzy Poems',
            ...contentJson(PoemResponseSchema)
         },
      },
   }

   async handle(
      ctx: Context,
      env: Bindings,
   ) {
      const data = await this.getValidatedData<typeof this.schema>()
      const xata = new XataClient({
         branch: 'dev',
         databaseURL: ctx.env.XATA_DB,
         apiKey: ctx.env.XATA_API_KEY,
      })

      const db = drizzle(xata, {
         schema: tables,
      })

      let { length } = data.query
      length ??= 3000
      try {
         const poems = await db.select({
            poemTitle: tables.poems.title,
            poemSubindex: tables.poems.subindex,
            poemText: tables.poems.text,
            bookTitle: tables.books.title,
            authorName: tables.authors.name
         })
            .from(tables.poems)
            .where(lte(tables.poems.length, length))
            .leftJoin(tables.books, eq(tables.books.xata_id, tables.poems.book))
            .leftJoin(tables.authors, eq(tables.authors.xata_id, tables.books.author))
            .execute()

         const poem = poems[Math.floor(Math.random() * poems.length)]

         if (!poem) {
            return new Response('No Poem correctly Found', { status: 404 })
         }

         return poem
      } catch (error) {
         console.log(error)
         return new Response(JSON.stringify(data), { status: error.status })
      }
   }
}
