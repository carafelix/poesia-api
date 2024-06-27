import * as schema from '../../db/drizzle/schema'
import { XataClient } from '../../db/xata'
import { PoemSchema } from '../../db/zodSchemas'
import { drizzle } from 'drizzle-orm/xata-http'
import { Bindings } from 'types'
import { OpenAPIRoute } from 'chanfana'
import type { Context } from 'hono'
import { z } from 'zod'
import { sql } from 'drizzle-orm'

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
            schema: {
               poem: PoemSchema,
            },
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
         schema,
      })

      let { length } = data.query
      length ??= 500
      try {
         const result = await db.query.poems.findMany({
            where(fields, { lte }) {
               return lte(fields.length, length)
            },
         })
         if (!result) {
            return new Response('No poem Found', { status: 404 })
         }
         return result[Math.floor(Math.random() * result.length)]
      } catch (error) {
         console.log(error)
         return new Response(JSON.stringify(data), { status: error.status })
      }
   }
}
