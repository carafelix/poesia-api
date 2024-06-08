import {
  boolean,
  char,
  index,
  integer,
  json,
  pgTable,
  text,
  timestamp,
  uniqueIndex,
} from "drizzle-orm/pg-core";
import { Poem } from "./zodSchemas";

export const apiUser = pgTable("api_user", {
  id: char("id", { length: 26 }).primaryKey(),
  uploadedPoems: json("uploaded_poems").$type<string[]>(), // reference to the contained poems id's
});

export const author = pgTable("authores", {
  id: char("id", { length: 26 }).primaryKey(),

  name: text("name"),
  country: text("country"),
  birthDate: integer("birth_date"),
  deathDate: integer("death_date"),

  createdAt: timestamp("created_at"),
  createdBy: timestamp("created_by"),
  lastModifiedAt: timestamp("last_modified_at"),
  lastModifiedBy: integer("last_modified_by").references(() => apiUser.id),
}, (table) => {
  return {
    nameIndex: index("name_idx").on(table.name),
    countryIndex: index("country_idx").on(table.country),
    birthDateIndex: uniqueIndex("birth_date_idx").on(table.birthDate),
    createdAtIndex: uniqueIndex("created_at_idx").on(table.createdAt),
  };
});

export const poem = pgTable("poems", {
  id: char("id", { length: 26 }).primaryKey(),
  canon: boolean("canon"),

  title: text("title").notNull(),
  author: integer("author_id").references(() => author.id).notNull(),
  book: integer("book_id").references(() => book.id),
  content: text("content").notNull(),
  dedication: text("dedication"),
  quote: text("quote"),

  createdAt: timestamp("created_at"),
  createdBy: timestamp("created_by"),
  lastModifiedAt: timestamp("last_modified_at"),
  lastModifiedBy: integer("last_modified_by").references(() => apiUser.id),
}, (table) => {
  return {
    titleIndex: index("name_idx").on(table.title),
    bookIndex: index("book_idx").on(table.book),
    authorIndex: index("author_idx").on(table.author),
    createdAtIndex: uniqueIndex("created_at_idx").on(table.createdAt),
  };
});

export const book = pgTable("books", {
  id: char("id", { length: 26 }).primaryKey(),

  title: text("title"),
  author: integer("author_id").references(() => author.id),
  poems: json("poems").$type<Record<number, any>>(), // reference to the contained poems id's

  createdAt: timestamp("created_at"),
  createdBy: timestamp("created_by"),
  lastModifiedAt: timestamp("last_modified_at"),
  lastModifiedBy: integer("last_modified_by").references(() => apiUser.id),
}, (table) => {
  return {
    titleIndex: index("name_idx").on(table.title),
    authorIndex: index("author_idx").on(table.author),
    createdAtIndex: uniqueIndex("created_at_idx").on(table.createdAt),
  };
});

export const poemBackup = pgTable("poem_past", {
  id: char("id", { length: 26 }).primaryKey().references(() => poem.id),
  // should be read-only after first write
  _original: json("original").$type<Poem>(),
  past: json("past").$type<Poem>(),
});
