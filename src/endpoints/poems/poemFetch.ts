import {
   DataOf,
   OpenAPIRoute,
   OpenAPIRouteSchema,
   Query,
} from '@cloudflare/itty-router-openapi'
import * as schema from 'db/drizzle/schema'
import { XataClient } from 'db/xata'
import { PoemSchema } from 'db/zodSchemas'
import { drizzle } from 'drizzle-orm/xata-http'
import { Bindings } from 'types'
import { z } from 'zod'
export class PoemFetch extends OpenAPIRoute {
   static schema: OpenAPIRouteSchema = {
      tags: ['Poems'],
      summary: 'Find a Poem',
      parameters: {
         title: Query(z.string().optional()),
         id: Query(z.string().optional()),
         subindex: Query(
            z.coerce.number().min(1).default(1),
            {
               description: "If a Poem is part of a set, it's index inside it",
            },
         ),
         /**
          * Implement:
          *  - author + title + subindex
          *  - author + book + title + subindex
          */
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
      request: Request,
      env: Bindings,
      context: any,
      data: DataOf<typeof PoemFetch.schema>,
   ) {
      const xata = new XataClient({
         branch: 'dev',
         apiKey: env.XATA_API_KEY,
      })

      const db = drizzle(xata, {
         schema,
      })

      const { id, title, subindex } = data.query
      try {
         const result = await db.query.poems.findFirst({
            where(fields, oper) {
               return oper.or(
                  oper.eq(fields.book_id, id),
                  oper.and(
                     oper.eq(fields.title, title.toUpperCase()),
                     oper.eq(fields.subindex, subindex),
                  ),
                  oper.eq(fields.title, title.toUpperCase()),
               )
            },
         })
         return result
      } catch (error) {
         delete error.requestId
         return new Response(JSON.stringify(error), { status: error.status })
      }
   }
}
