import {
  DataOf,
  OpenAPIRoute,
  OpenAPIRouteSchema,
  Query,
} from "@cloudflare/itty-router-openapi";
import * as schema from "db/drizzle/schema";
import { XataClient } from "db/xata";
import { AuthorSchema } from "db/zodSchemas";
import { drizzle } from "drizzle-orm/xata-http";
import { Bindings } from "types";
import { z } from "zod";

export class AuthorList extends OpenAPIRoute {
  static schema: OpenAPIRouteSchema = {
    tags: ["Tasks"],
    summary: "List Tasks",
    parameters: {
      page: Query(
        z.coerce.number().min(0).default(0),
        {
          description: "Page number",
        },
      ),
      per_page: Query(z.coerce.number().min(0).max(40).default(20), {
        description: "Amount of Authors per page. Max 40",
      }),
      country: Query(
        z.string().optional(),
        {
          description: "Country to filter",
        },
      ),
    },
    responses: {
      "200": {
        description: "Returns a list of tasks",
        schema: {
          authors: [AuthorSchema],
        },
      },
    },
  };

  async handle(
    request: Request,
    env: Bindings,
    context: any,
    data: DataOf<typeof AuthorList.schema>,
  ) {
    const xata = new XataClient({
      branch: "dev",
      apiKey: env.XATA_API_KEY,
    });

    const db = drizzle(xata, {
      schema,
    });

    const { page, per_page } = data.query;

    // try {
    const result = await db.query.authors.findMany(
      {
        limit: per_page,
        offset: page * per_page,
      },
    );
    console.log(result);
    // } catch (error) {
    // }

    return {};
  }
}
