import {
  bigint,
  boolean,
  integer,
  pgTable,
  text,
  timestamp,
  unique,
  uniqueIndex,
} from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";

export const authors = pgTable("authors", {
  // You can use { mode: "bigint" } if numbers are exceeding js number limitations
  birth_year: bigint("birth_year", { mode: "number" }),
  // You can use { mode: "bigint" } if numbers are exceeding js number limitations
  death_year: bigint("death_year", { mode: "number" }),
  xata_id: text("xata_id").default(
    `('rec_'::text || (xata_private.xid())::text)`,
  ).notNull(),
  xata_version: integer("xata_version").default(0).notNull(),
  xata_createdat: timestamp("xata_createdat", {
    withTimezone: true,
    mode: "string",
  }).defaultNow().notNull(),
  xata_updatedat: timestamp("xata_updatedat", {
    withTimezone: true,
    mode: "string",
  }).defaultNow().notNull(),
  name: text("name").notNull(),
  country: text("country").notNull(),
}, (table) => {
  return {
    _pgroll_new_authors_xata_id_key: uniqueIndex(
      "_pgroll_new_authors_xata_id_key",
    ).using("btree", table.xata_id),
    name_unique: uniqueIndex("authors_name_unique").using("btree", table.name),
    authors_name_unique: unique("authors_name_unique").on(table.name),
  };
});

export const books = pgTable("books", {
  // You can use { mode: "bigint" } if numbers are exceeding js number limitations
  publish_year: bigint("publish_year", { mode: "number" }),
  xata_version: integer("xata_version").default(0).notNull(),
  xata_createdat: timestamp("xata_createdat", {
    withTimezone: true,
    mode: "string",
  }).defaultNow().notNull(),
  xata_updatedat: timestamp("xata_updatedat", {
    withTimezone: true,
    mode: "string",
  }).defaultNow().notNull(),
  xata_id: text("xata_id").default(
    `('rec_'::text || (xata_private.xid())::text)`,
  ).notNull(),
  author_id: text("author_id").notNull(),
  author_name: text("author_name").notNull(),
  title: text("title").notNull(),
}, (table) => {
  return {
    _pgroll_new_books_xata_id_key: uniqueIndex("_pgroll_new_books_xata_id_key")
      .using("btree", table.xata_id),
  };
});

export const poems = pgTable("poems", {
  title: text("title"),
  text: text("text"),
  book_title: text("book_title"),
  book_id: text("book_id"),
  // You can use { mode: "bigint" } if numbers are exceeding js number limitations
  subindex: bigint("subindex", { mode: "number" }),
  xata_id: text("xata_id").default(
    `('rec_'::text || (xata_private.xid())::text)`,
  ).notNull(),
  xata_version: integer("xata_version").default(0).notNull(),
  xata_createdat: timestamp("xata_createdat", {
    withTimezone: true,
    mode: "string",
  }).defaultNow().notNull(),
  xata_updatedat: timestamp("xata_updatedat", {
    withTimezone: true,
    mode: "string",
  }).defaultNow().notNull(),
  canon: boolean("canon").default(false).notNull(),
}, (table) => {
  return {
    _pgroll_new_poems_xata_id_key: uniqueIndex("_pgroll_new_poems_xata_id_key")
      .using("btree", table.xata_id),
  };
});
