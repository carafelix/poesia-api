import {
  DataOf,
  OpenAPIRoute,
  OpenAPIRouteSchema,
  Str,
} from "@cloudflare/itty-router-openapi";
import { Bindings } from "types";
import z from "zod";

export class TokenCreate extends OpenAPIRoute {
  static schema: OpenAPIRouteSchema = {
    tags: ["Users"],
    summary: "Create a new API token",
    request: {
      headers: z.object({
        authorization: z.string(),
      }),
    },
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
    data: DataOf<typeof TokenCreate.schema>,
  ) {
    
    const token = crypto.randomUUID()
    env.TOKENS_KV.put(token, JSON.stringify({ name: "dummy" }))

    return {
      success: true,
      result: {
        token
      },
    };
  }
}
