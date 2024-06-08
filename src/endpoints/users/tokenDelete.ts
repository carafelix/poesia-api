import {
  DataOf,
  OpenAPIRoute,
  OpenAPIRouteSchema,
  Str,
} from "@cloudflare/itty-router-openapi";
import { Bindings } from "types";
import z from "zod";

export class TokenDelete extends OpenAPIRoute {
  static schema: OpenAPIRouteSchema = {
    tags: ["Users"],
    summary: "Delete a list of API tokens",
    requestBody: z.object({
      tokens: z.array(z.string()).or(z.string()),
    }),
    responses: {
      "200": {
        description: "Returns the created token",
        schema: {
          success: Boolean,
          result: {
            token: new Str(),
          },
        },
      },
    },
  };

  async handle(
    request: Request,
    env: Bindings,
    context: any,
    data: DataOf<typeof TokenDelete.schema> & {
      body: {
        tokens: string | string[];
      };
    },
  ) {
    let tokens = data.body.tokens;
    if (!Array.isArray(tokens)) {
      tokens = [tokens];
    }
    for (let token of tokens) {
      await env.TOKENS_KV.delete(token);
    }
    return {
      success: true,
      result: {
        message: `Successfully deleted of the requested tokens`,
        tokens,
      },
    };
  }
}
