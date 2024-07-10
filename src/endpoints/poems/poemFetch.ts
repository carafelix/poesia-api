import * as schema from '../../db/drizzle/schema'
import { XataClient } from '../../db/xata'
import { PoemSchema } from '../../db/zodSchemas'
import { drizzle } from 'drizzle-orm/xata-http'
import { Bindings } from 'types'
import { OpenAPIRoute } from 'chanfana'
import type { Context } from 'hono'
import { z } from 'zod'
export class PoemFetch extends OpenAPIRoute {
    schema = {
        tags: ['Poems'],
        summary: 'Find a Poem',
        request: {
            query: z.object({
                title: z.string().optional(),
                id: z.string().optional(),
                subindex: z.coerce
                    .number()
                    .min(1)
                    .optional()
                    .describe(
                        "If a Poem is part of a set, it's index inside it",
                    ),
            }),
        },
        /**
         * Implement:
         *  - author + title + subindex
         *  - author + book + title + subindex
         */
        responses: {
            '200': {
                description:
                    'Returns a Poem exact match or a list of fuzzy Poems',
                schema: {
                    poem: PoemSchema,
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
        let { id, title, subindex } = data.query
        subindex ??= 1
        title ??= ''
        id ??= ''
        try {
            const result = await db.query.poems.findFirst({
                orderBy: (poems) => poems.subindex,
                where: (poems, { eq, or, and }) =>
                    or(
                        eq(poems.xata_id, id),
                        and(
                            eq(poems.title, title.toUpperCase()),
                            eq(poems.subindex, subindex),
                        ),
                    ),
            })
            if (!result) {
                return new Response('No poem Found', { status: 404 })
            }
            return result
        } catch (error) {
            return new Response(JSON.stringify(data), { status: error.status })
        }
    }
}
