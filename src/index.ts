import { Bindings } from 'types'
import { getRouter } from './router'

export default {
    async fetch(request: Request, env: Bindings, ctx: any) {
        const { success } = await env.RATE_LIMITER.limit({ key: '/*' })

        if (!success) {
            return new Response(
                `Failure: Too many Request's. Try again later.`,
                {
                    status: 429,
                },
            )
        }
        const app = getRouter(env)

        return await app.fetch(request, env, ctx)
    },
}
