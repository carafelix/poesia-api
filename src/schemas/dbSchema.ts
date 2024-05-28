import {
  index,
  integer,
  sqliteTable,
  text,
  uniqueIndex,
} from "drizzle-orm/sqlite-core";

export const autor = sqliteTable("autores", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name"),
});

export const poema = sqliteTable("poemas", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  title: text("titulo"),
  autor: integer("autor_id").references(() => autor.id),
  libro: integer("book_id").references(() => libro.id),
  texto: text("texto"),
});

export const libro = sqliteTable("libros", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  titulo: text("titulo"),
  autor: integer("autor_id").references(() => autor.id),
});
