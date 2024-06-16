import {
   OpenAPIRoute,
   OpenAPIRouteSchema,
} from '@cloudflare/itty-router-openapi'
import { Task } from '../../types'

export class PoemCreate extends OpenAPIRoute {
   static schema: OpenAPIRouteSchema = {
      tags: ['Poem'],
      summary: 'Create a new Poem',
      requestBody: Task,
      responses: {
         '200': {
            description: 'Returns the created Poem',
            schema: {
               success: Boolean,
               result: {
                  task: Task,
               },
            },
         },
      },
   }

   async handle(
      request: Request,
      env: any,
      context: any,
      data: Record<string, any>,
   ) {
      // Retrieve the validated request body
      const taskToCreate = data.body

      // Implement your own object insertion here

      // return the new task
      return {
         success: true,
         task: {
            name: taskToCreate.name,
            slug: taskToCreate.slug,
            description: taskToCreate.description,
            completed: taskToCreate.completed,
            due_date: taskToCreate.due_date,
         },
      }
   }
}
