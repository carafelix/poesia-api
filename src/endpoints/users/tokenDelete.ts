import { contentJson, OpenAPIRoute } from 'chanfana'
import { Bindings } from 'types'
import z from 'zod'

export class TokenDelete extends OpenAPIRoute {
    schema = {
        tags: ['Users'],
        summary: 'Delete a list of API tokens',
        request: {
            body: contentJson(
                z.object({
                    tokens: z.array(z.string()).or(z.string()),
                }),
            ),
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
        const data = await this.getValidatedData<typeof this.schema>()

        let tokens = data.body.tokens
        if (!Array.isArray(tokens)) {
            tokens = [tokens]
        }
        for (let token of tokens) {
            await env.TOKENS_KV.delete(token)
        }
        return {
            success: true,
            result: {
                message: `Successfully deleted of the requested tokens`,
                tokens,
            },
        }
    }
}
