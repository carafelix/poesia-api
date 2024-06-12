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
import { countries } from "lib/countries";
import { z } from "zod";

export class AuthorList extends OpenAPIRoute {
  static schema: OpenAPIRouteSchema = {
    tags: ["Authors"],
    summary: "List Authors",
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
        description: "Returns a list of Authors",
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

    const { page, per_page, country } = data.query;

    const params = {
      limit: per_page,
      offset: page * per_page,
    };

    try {
      return await db.query.authors.findMany({
        ...params,
        ...{
          where(fields, oper) {
            return country in countries
              ? oper.eq(fields.country, country)
              : undefined;
          },
        },
      });
    } catch (error) {
      delete error.requestId;
      return new Response(JSON.stringify(error), { status: error.status });
    }
  }
}
