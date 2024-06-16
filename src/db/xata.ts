// Generated by Xata Codegen 0.29.5. Please do not edit.
import { buildClient } from '@xata.io/client'
import type {
   BaseClientOptions,
   SchemaInference,
   XataRecord,
} from '@xata.io/client'

const tables = [
   {
      name: 'authors',
      columns: [
         {
            name: 'birth_year',
            type: 'int',
            notNull: false,
            unique: false,
            defaultValue: null,
         },
         {
            name: 'country',
            type: 'text',
            notNull: true,
            unique: false,
            defaultValue: null,
         },
         {
            name: 'death_year',
            type: 'int',
            notNull: false,
            unique: false,
            defaultValue: null,
         },
         {
            name: 'name',
            type: 'text',
            notNull: true,
            unique: true,
            defaultValue: null,
         },
         {
            name: 'xata_createdat',
            type: 'datetime',
            notNull: true,
            unique: false,
            defaultValue: 'now()',
         },
         {
            name: 'xata_id',
            type: 'text',
            notNull: true,
            unique: true,
            defaultValue: "('rec_'::text || (xata_private.xid())::text)",
         },
         {
            name: 'xata_updatedat',
            type: 'datetime',
            notNull: true,
            unique: false,
            defaultValue: 'now()',
         },
         {
            name: 'xata_version',
            type: 'int',
            notNull: true,
            unique: false,
            defaultValue: '0',
         },
      ],
   },
   {
      name: 'books',
      columns: [
         {
            name: 'author_name',
            type: 'text',
            notNull: true,
            unique: false,
            defaultValue: null,
         },
         {
            name: 'publish_year',
            type: 'int',
            notNull: false,
            unique: false,
            defaultValue: null,
         },
         {
            name: 'title',
            type: 'text',
            notNull: true,
            unique: false,
            defaultValue: null,
         },
         {
            name: 'xata_createdat',
            type: 'datetime',
            notNull: true,
            unique: false,
            defaultValue: 'now()',
         },
         {
            name: 'xata_id',
            type: 'text',
            notNull: true,
            unique: true,
            defaultValue: "('rec_'::text || (xata_private.xid())::text)",
         },
         {
            name: 'xata_updatedat',
            type: 'datetime',
            notNull: true,
            unique: false,
            defaultValue: 'now()',
         },
         {
            name: 'xata_version',
            type: 'int',
            notNull: true,
            unique: false,
            defaultValue: '0',
         },
      ],
   },
   {
      name: 'poems',
      columns: [
         {
            name: 'book_id',
            type: 'text',
            notNull: false,
            unique: false,
            defaultValue: null,
         },
         {
            name: 'book_title',
            type: 'text',
            notNull: false,
            unique: false,
            defaultValue: null,
         },
         {
            name: 'canon',
            type: 'bool',
            notNull: true,
            unique: false,
            defaultValue: 'false',
         },
         {
            name: 'subindex',
            type: 'int',
            notNull: false,
            unique: false,
            defaultValue: null,
         },
         {
            name: 'text',
            type: 'text',
            notNull: false,
            unique: false,
            defaultValue: null,
         },
         {
            name: 'title',
            type: 'text',
            notNull: false,
            unique: false,
            defaultValue: null,
         },
         {
            name: 'xata_createdat',
            type: 'datetime',
            notNull: true,
            unique: false,
            defaultValue: 'now()',
         },
         {
            name: 'xata_id',
            type: 'text',
            notNull: true,
            unique: true,
            defaultValue: "('rec_'::text || (xata_private.xid())::text)",
         },
         {
            name: 'xata_updatedat',
            type: 'datetime',
            notNull: true,
            unique: false,
            defaultValue: 'now()',
         },
         {
            name: 'xata_version',
            type: 'int',
            notNull: true,
            unique: false,
            defaultValue: '0',
         },
      ],
   },
] as const

export type SchemaTables = typeof tables
export type InferredTypes = SchemaInference<SchemaTables>

export type Authors = InferredTypes['authors']
export type AuthorsRecord = Authors & XataRecord

export type Books = InferredTypes['books']
export type BooksRecord = Books & XataRecord

export type Poems = InferredTypes['poems']
export type PoemsRecord = Poems & XataRecord

export type DatabaseSchema = {
   authors: AuthorsRecord
   books: BooksRecord
   poems: PoemsRecord
}

const DatabaseClient = buildClient()

const defaultOptions = {}

export class XataClient extends DatabaseClient<DatabaseSchema> {
   constructor(options?: BaseClientOptions) {
      super({ ...defaultOptions, ...options }, tables)
   }
}

let instance: XataClient | undefined = undefined

export const getXataClient = () => {
   if (instance) return instance

   instance = new XataClient()
   return instance
}
