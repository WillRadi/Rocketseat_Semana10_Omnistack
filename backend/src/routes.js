const { Router } = require('express')
const DevController = require('./controllers/DevController')
const SearchController = require('./controllers/SearchController')

const routes = Router()

/**
 * Parâmetros p os métodos REST:
 * Query Params: { pratiacamente só no GET } request.query(filtros, ordenação, paginação, ...), são parâmetros passados via url
 * Route Params: request.params (identifica recurso p alteração (put) ou exclusão (delete) - /users/:id)
 * Body: request.body (dados p criação (POST) ou edição (PUT) de um recurso)
 */

routes.get('/search', SearchController.index)
routes.get('/devs', DevController.index)
routes.post('/devs', DevController.store)
routes.put('/devs/:id', DevController.update)
routes.delete('/devs/:id', DevController.destroy)

module.exports = routes