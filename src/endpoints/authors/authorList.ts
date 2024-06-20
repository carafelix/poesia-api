import * as schema from '../../db/drizzle/schema'
import { XataClient } from '../../db/xata'
import { AuthorSchema } from '../../db/zodSchemas'
import { drizzle } from 'drizzle-orm/xata-http'
import { Bindings } from 'types'
import { OpenAPIRoute } from 'chanfana'
import { z } from 'zod'
import { countries } from '../../lib/countries'
import type { Context } from 'hono'

export class AuthorList extends OpenAPIRoute {
   schema = {
      tags: ['Authors'],
      summary: 'List Authors',
      request: {
         query: z.object({
            page: z.coerce.number().min(0).default(0).describe('Page index'),
            per_page: z.coerce.number().min(0).max(40).default(20).describe(
               'Amount of Authors per page. Max 40',
            ),
            country: z.string().optional().describe('Country to filter'),
         }),
      },
      responses: {
         '200': {
            description: 'Returns a list of Authors',
            schema: {
               authors: [AuthorSchema],
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

      const { page, per_page, country } = data.query

      const params = {
         limit: per_page,
         offset: page * per_page,
      }

      try {
         return await db.query.authors.findMany({
            ...params,
            ...{
               where(fields, { eq, isNotNull }) {
                  if (country) {
                     return country.toLowerCase() in countries
                        ? eq(fields.country, country.toLowerCase())
                        : undefined
                  } else isNotNull(fields.xata_id) // always true
               },
            },
         })
      } catch (error) {
         delete error.requestId
         return new Response(JSON.stringify(error), { status: error.status })
      }
   }
}
