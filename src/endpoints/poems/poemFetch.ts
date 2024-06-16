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
            z.coerce.number().min(1).optional(),
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
         databaseURL: env.XATA_DB,
         apiKey: env.XATA_API_KEY,
      })

      const db = drizzle(xata, {
         schema,
      })
      let { id, title, subindex } = data.query
      subindex ??= -1
      try {
         const result = await db.query.poems.findFirst({
            orderBy: (poems) => poems.subindex,
            where: (poems, { eq, or, and }) => (
               or(
                  eq(poems.xata_id, id),
                  and(
                     eq(poems.title, title?.toUpperCase()),
                     eq(poems.subindex, subindex),
                  ),
               )
            ),
         })
         // result ??= same but without subindex
         if (!result) {
            return new Response('No poem Found', { status: 404 })
         }
         return result
      } catch (error) {
         return new Response(JSON.stringify(data), { status: error.status })
      }
   }
}
