import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { poem } from "./dbSchema";

const insertPoemSchema = createInsertSchema(poem);
export const selectPoemaSchema = createSelectSchema(poem);
