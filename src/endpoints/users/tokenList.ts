import { contentJson, OpenAPIRoute } from 'chanfana'
import { Bindings } from 'types'
import z from 'zod'

export class TokenList extends OpenAPIRoute {
   schema = {
      tags: ['Users'],
      summary: 'List current API tokens',
      request: {
         body: contentJson(z.object({
            tokensToDelete: z.array(z.string()).or(z.string()),
         })),
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

   async handle(
      request: Request,
      env: Bindings,
      context: any,
   ) {
      const tokens = (await env.TOKENS_KV.list()).keys
      return {
         success: true,
         result: {
            message: `List of all tokens`,
            tokens,
         },
      }
   }
}
