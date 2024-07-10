import { fromHono } from 'chanfana'
import { Hono } from 'hono'
import { bearerAuth } from 'hono/bearer-auth'
import type { Bindings } from 'types'
import {
    // PoemCreate,
    // PoemDelete,
    PoemFetch,
    PoemRandom,
    PoemsList,
} from './endpoints/poems/poem'
import {
    AuthorCreate,
    // AuthorDelete,
    // AuthorFetch,
    AuthorList,
    AuthorUpdate,
} from './endpoints/authors/author'
import { TokenCreate, TokenDelete, TokenList } from './endpoints/users/users'
import { BooksList } from './endpoints/books/book'

const privilegedMethods = ['POST', 'PUT', 'PATCH', 'DELETE']

export function getRouter(env: Bindings) {
    const app = new Hono()
    const openapi = fromHono(app, {
        docs_url: '/',
        redoc_url: '/docs',
    })

    app.use('/token/*', async (c, next) => {
        const bearer = bearerAuth({ token: env.SUDO_SECRET })
        return bearer(c, next)
    })
    app.on(privilegedMethods, '/*', (c, next) => {
        const bearer = bearerAuth({
            verifyToken: async (token, c) => {
                if (token === env.SUDO_SECRET) return true
                return (await env.TOKENS_KV.get(token)) ? true : false
            },
        })
        return bearer(c, next)
    })

    // this are not real real!
    openapi.get('/token', TokenCreate) // return a list of all poems, query params for limits, lexicographically ordered?
    openapi.delete('/token', TokenDelete) // return a list of all poems, query params for limits, lexicographically ordered?
    openapi.get('/token/all', TokenList) // return a list of all poems, query params for limits, lexicographically ordered?

    openapi.get('/poemas', PoemsList) // return a list of all poems, query params for limits, lexicographically ordered?
    openapi.get('/autores', AuthorList) // return a list of authors,			 ", 					"
    openapi.get('/libros', BooksList) // return a list of books, 				 ",						"

    openapi.put('/autores', AuthorCreate)
    // openapi.patch("/autores/:name", AuthorUpdate);
    openapi.get('/poema', PoemFetch) // id > autor/libro/nombre > autor/nombre > libro/nombre > nombre. Siempre retorna una lista, de modo que si hay collision, siempre es result[0] o lo q se quiera hacer con ello
    openapi.get('/poemarandom', PoemRandom) // id > autor/libro/nombre > autor/nombre > libro/nombre > nombre. Siempre retorna una lista, de modo que si hay collision, siempre es result[0] o lo q se quiera hacer con ello
    // openapi.post("/poema", PoemCreate); // needs to check book, author, pre-exist etc
    // openapi.delete("/poema/:id", PoemDelete);

    // openapi.get("/:autor", AuthorFetch); // return a list of books with all poems of each books
    // openapi.get("/:autor/:libro", BookFetch); // return all poems from a single book

    return app
}
