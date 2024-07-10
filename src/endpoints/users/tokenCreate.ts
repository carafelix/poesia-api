import { OpenAPIRoute } from 'chanfana'
import { Bindings } from 'types'
import z from 'zod'

export class TokenCreate extends OpenAPIRoute {
    schema = {
        tags: ['Users'],
        summary: 'Create a new API token',
        request: {
            headers: z.object({
                authorization: z.string(),
            }),
        },
        responses: {
            '200': {
                description: 'Returns the created token',
                schema: {
                    success: Boolean,
                    result: {
                        token: z.string(),
                    },
                },
            },
        },
    }

    async handle(request: Request, env: Bindings, context: any) {
        const token = crypto.randomUUID()
        env.TOKENS_KV.put(
            token,
            JSON.stringify({
                name: 'dummy',
                email: 'dummy@example',
                authLevel: 10,
                webID: 'someID',
            }),
        )

        return {
            success: true,
            result: {
                token,
            },
        }
    }
}
