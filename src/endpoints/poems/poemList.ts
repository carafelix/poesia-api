import * as schema from '../../db/drizzle/schema'
import { XataClient } from '../../db/xata'
import { PoemSchema } from '../../db/zodSchemas'
import { OpenAPIRoute } from 'chanfana'
import { drizzle } from 'drizzle-orm/xata-http'
import { Bindings } from 'types'
import type { Context } from 'hono'
import { z } from 'zod'
export class PoemsList extends OpenAPIRoute {
    schema = {
        tags: ['Poems'],
        summary: 'List Poems',

        request: {
            query: z.object({
                page: z.coerce
                    .number()
                    .min(0)
                    .default(0)
                    .describe('Page index'),
                per_page: z.coerce
                    .number()
                    .min(0)
                    .max(40)
                    .default(20)
                    .describe('Amount of Poems per page. Max 40'),
            }),
            // implement filtering by author, country, book, etc

            // author: Query(
            //   z.string().optional(),
            //   {
            //     description: "Country to filter",
            //   },
            // ),
        },
        responses: {
            '200': {
                description: 'Returns a list of Poems',
                schema: {
                    poems: [PoemSchema],
                },
            },
        },
    }

    async handle(ctx: Context, env: Bindings) {
        const data = await this.getValidatedData<typeof this.schema>()
        const xata = new XataClient({
            branch: 'dev',
            databaseURL: ctx.env.XATA_DB,
            apiKey: ctx.env.XATA_API_KEY,
        })

        const db = drizzle(xata, {
            schema,
        })

        const { page, per_page } = data.query

        const params = {
            limit: per_page,
            offset: page * per_page,
        }

        try {
            return await db.query.poems.findMany(params)
        } catch (error) {
            return new Response(JSON.stringify(error), { status: error.status })
        }
    }
}
