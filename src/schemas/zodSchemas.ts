import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
import { poemas } from "./dbSchema";

const insertPoemaSchema = createInsertSchema(poemas);
export const selectPoemaSchema = createSelectSchema(poemas);