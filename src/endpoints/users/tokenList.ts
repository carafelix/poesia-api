import {
   DataOf,
   OpenAPIRoute,
   OpenAPIRouteSchema,
   Str,
} from '@cloudflare/itty-router-openapi'
import { Bindings } from 'types'
import z from 'zod'

export class TokenList extends OpenAPIRoute {
   static schema: OpenAPIRouteSchema = {
      tags: ['Users'],
      summary: 'List current API tokens',
      requestBody: z.object({
         tokensToDelete: z.array(z.string()).or(z.string()),
      }),
      responses: {
         '200': {
            description: 'Returns the created token',
            schema: {
               success: Boolean,
               result: {
                  token: new Str(),
               },
            },
         },
      },
   }

   async handle(
      request: Request,
      env: Bindings,
      context: any,
      data: DataOf<typeof TokenList.schema>,
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
