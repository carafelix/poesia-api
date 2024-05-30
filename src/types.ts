import { DateTime, Str } from "@cloudflare/itty-router-openapi";
import { Env } from "hono";
export const Task = {
  name: new Str({ example: "lorem" }),
  slug: String,
  description: new Str({ required: false }),
  completed: Boolean,
  due_date: new DateTime(),
};
export type Bindings = {
  POEMAS_DB: D1Database;
  RATE_LIMITER: any;
  SUDO_SECRET: string;
}