import { sqliteTable, text, integer, uniqueIndex } from 'drizzle-orm/sqlite-core';
import { ULIDFactory, ulidFactory } from 'ulid-workers';

type Ulid = ReturnType<ULIDFactory>

export const autores = sqliteTable('autores', {
    id: integer('id').primaryKey(),
    name: text('name'),
  }
);

export const poemas = sqliteTable('poemas', {
  id: integer('id').primaryKey(),
  name: text('name'),
  countryId: integer('country_id').references(() => autores.id),
})

export const libros = sqliteTable('libros', {
  id: integer('id').primaryKey(),
  fullName: text('full_name'),
  phone: text('phone'),
})