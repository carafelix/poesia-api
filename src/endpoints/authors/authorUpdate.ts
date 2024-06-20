import * as schema from '../../db/drizzle/schema'
import { XataClient } from '../../db/xata'
import { AuthorSchema, createAuthorSchema } from '../../db/zodSchemas'
import { contentJson, Obj, OpenAPIRoute, Str } from 'chanfana'
import { drizzle } from 'drizzle-orm/xata-http'
import { Bindings } from 'types'
import type { Context } from 'hono'

export class AuthorUpdate extends OpenAPIRoute {
   schema = {
      tags: ['Author'],
      summary: 'Update an Author',
      request: {
         params: Obj({
            name: Str(),
         }),
         body: contentJson(createAuthorSchema),
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

      const authorName = data.params.name

      // const author = await db.select().from(authors).where(
      //   eq(authors.name, decodeURIComponent(authorName)),
      // ).execute();

      // if (!result) {
      //   return new Response("Database insertion failed", { status: 503 });
      // }
      return {
         // author,
      }
   }
}
