import {
  OpenAPIRoute,
  OpenAPIRouteSchema,
  Query,
} from "@cloudflare/itty-router-openapi";
import { Task } from "../../types";

export class AuthorFetch extends OpenAPIRoute {
  static schema: OpenAPIRouteSchema = {
    tags: ["Authors"],
    summary: "List Authors",
    parameters: {
      page: Query(Number, {
        description: "Page number",
        default: 0,
      }),
    },
    responses: {
      "200": {
        description: "Returns a list of tasks",
        schema: {},
      },
    },
  };

  async handle(
    request: Request,
    env: any,
    context: any,
    data: Record<string, any>,
  ) {
    // Retrieve the validated parameters
    const { page, isCompleted } = data.query;

    // Implement your own object list here

    return {
      success: true,
      tasks: [
        {
          name: "Clean my room",
          slug: "clean-room",
          description: null,
          completed: false,
          due_date: "2025-01-05",
        },
        {
          name: "Build something awesome with Cloudflare Workers",
          slug: "cloudflare-workers",
          description: "Lorem Ipsum",
          completed: true,
          due_date: "2022-12-24",
        },
      ],
    };
  }
}
