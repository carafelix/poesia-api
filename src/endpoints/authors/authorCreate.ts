import * as schema from '../../db/drizzle/schema'
import { XataClient } from '../../db/xata'
import { AuthorSchema, createAuthorSchema } from '../../db/zodSchemas'
import { contentJson, OpenAPIRoute } from 'chanfana'
import { drizzle } from 'drizzle-orm/xata-http'
import { Bindings } from 'types'
import type { Context } from 'hono'
export class AuthorCreate extends OpenAPIRoute {
   schema = {
      tags: ['Authors'],
      summary: 'Create a new Author',
      request: {
         body: contentJson(
            createAuthorSchema,
         ),
      },
      responses: {
         '200': {
            description: 'Returns the created Author',
            schema: {
               author: AuthorSchema,
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
      const db = drizzle(xata, { schema })

      const author = createAuthorSchema.parse(data.body)

      // this can be done with a onError??
      try {
         const result = await db.insert(schema.authors).values(
            author,
         )
         return {
            author,
         }
      } catch (error) {
         delete error.requestId
         return new Response(JSON.stringify(error), { status: error.status })
      }
   }
}
