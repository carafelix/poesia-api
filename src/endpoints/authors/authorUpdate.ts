import {
  DataOf,
  OpenAPIRoute,
  OpenAPIRouteSchema,
  Path,
  Str,
} from "@cloudflare/itty-router-openapi";
// import {
//   AuthorSchema,
//   createAuthor,
//   createAuthorSchema,
//   dummy,
// } from "schemas/zodSchemas";
import { DatabaseSchema } from "../../db/xata";
import z from "zod";
import { drizzle } from "drizzle-orm/xata-http";
import { XataClient } from "../../db/xata";
import { Bindings } from "types";
import { authors } from "db/drizzle/schema";
import { eq } from "drizzle-orm";

export class AuthorUpdate extends OpenAPIRoute {
  static schema: OpenAPIRouteSchema = {
    tags: ["Author"],
    summary: "Update an Author",
    parameters: {
      name: Path(Str),
    },
    // requestBody: z.object({}), // createAuthorSchema,
    responses: {
      "200": {
        description: "Returns the created Author",
        schema: {
          // author: AuthorSchema,
        },
      },
    },
  };

  async handle(
    request: Request,
    env: Bindings,
    context: any,
    data: DataOf<typeof AuthorUpdate.schema> & {
      // body: z.TypeOf<typeof createAuthorSchema>;
    },
  ) {
    const body = await request.json() as Record<any, any>;
    const params = data.params;
    const xata = new XataClient({
      branch: "dev",
      apiKey: env.XATA_API_KEY,
    });
    const db = drizzle(xata);
    const author = body;
    // const author = AuthorSchema.parse(author);

    const result = await db.select().from(authors).where(
      eq(author.name, decodeURIComponent(params.name)),
    ).execute();
    // if (!result) {
    //   return new Response("Database insertion failed", { status: 503 });
    // }
    return {
      author,
    };
  }
}
