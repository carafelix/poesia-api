import {
  DataOf,
  OpenAPIRoute,
  OpenAPIRouteSchema,
  Query,
} from "@cloudflare/itty-router-openapi";
import * as schema from "db/drizzle/schema";
import { XataClient } from "db/xata";
import { BookSchema, PoemSchema } from "db/zodSchemas";
import { drizzle } from "drizzle-orm/xata-http";
import { Bindings } from "types";
import { z } from "zod";
export class PoemsList extends OpenAPIRoute {
  static schema: OpenAPIRouteSchema = {
    tags: ["Poems"],
    summary: "List Poems",
    parameters: {
      page: Query(
        z.coerce.number().min(0).default(0),
        {
          description: "Page number",
        },
      ),
      per_page: Query(z.coerce.number().min(0).max(40).default(20), {
        description: "Amount of Poems per page. Max 40",
      }),
      // implement filtering by author, country, book, etc

      // author: Query(
      //   z.string().optional(),
      //   {
      //     description: "Country to filter",
      //   },
      // ),
    },
    responses: {
      "200": {
        description: "Returns a list of Poems",
        schema: {
          poems: [PoemSchema],
        },
      },
    },
  };

  async handle(
    request: Request,
    env: Bindings,
    context: any,
    data: DataOf<typeof PoemsList.schema>,
  ) {
    const xata = new XataClient({
      branch: "dev",
      apiKey: env.XATA_API_KEY,
    });

    const db = drizzle(xata, {
      schema,
    });

    const { page, per_page } = data.query;

    const params = {
      limit: per_page,
      offset: page * per_page,
    };

    try {
      return await db.query.books.findMany(params);
    } catch (error) {
      delete error.requestId;
      return new Response(JSON.stringify(error), { status: error.status });
    }
  }
}
