import { Hono } from 'hono'
import { bearerAuth } from 'hono/bearer-auth'
import { Bindings } from 'types';
import { api } from 'api';

const privilegedMethods = ['POST', 'PUT', 'PATCH', 'DELETE']

export default {
  async fetch(request: Request, env: Bindings, ctx: any) {
    const { success } = await env.RATE_LIMITER.limit({ key: "/*" });
    if (!success) {
      return new Response(`Failure: Too many Request's. Try again later.`, {
        status: 429,
      });
    }
    const app = new Hono()
    app.use('/token', async (c, next) => {
      const bearer = bearerAuth({ token: env.SUDO_SECRET })
      return bearer(c, next)
    })
    app.on(privilegedMethods, '/*', (c, next) => {
      const bearer = bearerAuth({
        verifyToken: async (token, c) => {
          if (token === env.SUDO_SECRET) return true;
          return await env.TOKENS_KV.get(token) ? true : false
        },
      })
      return bearer(c, next)
    })

    app.mount('/', api.handle)

    return await app.fetch(request, env, ctx)
  },
};

function simpleError(message: string) {
  return {
    success: false,
    error: message,
  }
}