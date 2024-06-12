import { DateTime, Str } from "@cloudflare/itty-router-openapi";

export const Task = {
  name: new Str({ example: "lorem" }),
  slug: String,
  description: new Str({ required: false }),
  completed: Boolean,
  due_date: new DateTime(),
};

export type Bindings = {
  POEMAS_DB: D1Database;
  TOKENS_KV: KVNamespace;
  RATE_LIMITER: any;
  SUDO_SECRET: string;
  XATA_API_KEY: string;
  XATA_CONNECT: string;
};
