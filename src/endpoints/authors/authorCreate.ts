import {
  DataOf,
  OpenAPIRoute,
  OpenAPIRouteSchema,
} from "@cloudflare/itty-router-openapi";
import { AuthorSchema, createAuthorSchema } from "db/zodSchemas";
import { authors } from "../../db/drizzle/schema";
import { drizzle } from "drizzle-orm/xata-http";
import { XataClient } from "../../db/xata";
import { Bindings } from "types";
import z from "zod";
export class AuthorCreate extends OpenAPIRoute {
  static schema: OpenAPIRouteSchema = {
    tags: ["Author"],
    summary: "Create a new Author",
    requestBody: createAuthorSchema,
    responses: {
      "200": {
        description: "Returns the created Author",
        schema: {
          author: AuthorSchema,
        },
      },
    },
  };

  async handle(
    request: Request,
    env: Bindings,
    context: any,
    data: DataOf<typeof AuthorCreate.schema> & {
      body: z.TypeOf<typeof createAuthorSchema>;
    },
  ) {
    const xata = new XataClient({
      branch: "dev",
      apiKey: env.XATA_API_KEY,
    });
    const db = drizzle(xata);

    const author = createAuthorSchema.parse(data.body);

    // this can be done with a onError??
    try {
      const result = await db.insert(authors).values(
        author,
      );
      return {
        author,
      };
    } catch (error) {
      delete error.requestId;
      return new Response(JSON.stringify(error), { status: error.status });
    }
  }
}
