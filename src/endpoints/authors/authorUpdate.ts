import {
  DataOf,
  OpenAPIRoute,
  OpenAPIRouteSchema,
  Path,
  Str,
} from "@cloudflare/itty-router-openapi";
import z from "zod";
import * as schema from "db/drizzle/schema";

import { AuthorSchema, createAuthorSchema } from "db/zodSchemas";
import { drizzle } from "drizzle-orm/xata-http";
import { XataClient } from "../../db/xata";
import { Bindings } from "types";

export class AuthorUpdate extends OpenAPIRoute {
  static schema: OpenAPIRouteSchema = {
    tags: ["Author"],
    summary: "Update an Author",
    parameters: {
      name: Path(Str),
    },
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
    data: DataOf<typeof AuthorUpdate.schema> & {
      body: z.TypeOf<typeof createAuthorSchema>;
    },
  ) {
    const xata = new XataClient({
      branch: "dev",
      apiKey: env.XATA_API_KEY,
    });
    const db = drizzle(xata, { schema });

    const authorName = data.params.name;

    // const author = await db.select().from(authors).where(
    //   eq(authors.name, decodeURIComponent(authorName)),
    // ).execute();

    // if (!result) {
    //   return new Response("Database insertion failed", { status: 503 });
    // }
    return {
      // author,
    };
  }
}
