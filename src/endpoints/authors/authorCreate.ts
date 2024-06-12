import {
  DataOf,
  OpenAPIRoute,
  OpenAPIRouteSchema,
} from "@cloudflare/itty-router-openapi";
// import {
//   AuthorSchema,
//   createAuthor,
//   createAuthorSchema,
//   dummy,
// } from "schemas/zodSchemas";
import { authors } from "../../db/drizzle/schema";
import { drizzle } from "drizzle-orm/xata-http";
import { XataClient } from "../../db/xata";
import { Bindings } from "types";

export class AuthorCreate extends OpenAPIRoute {
  static schema: OpenAPIRouteSchema = {
    tags: ["Author"],
    summary: "Create a new Author",
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
    data: DataOf<typeof AuthorCreate.schema> & {
      // body: z.TypeOf<typeof createAuthorSchema>;
    },
  ) {
    const body = await request.json() as Record<any, any>;
    const xata = new XataClient({
      branch: "dev",
      apiKey: env.XATA_API_KEY,
    });
    const db = drizzle(xata);
    const author = body;
    // const author = AuthorSchema.parse(author);

    const result = await db.insert(authors).values(
      author as typeof authors.$inferInsert,
    );
    // if (!result) {
    //   return new Response("Database insertion failed", { status: 503 });
    // }
    return {
      author,
    };
  }
}
