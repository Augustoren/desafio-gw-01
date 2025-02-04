const routes = require('express').Router()

const UserController = require('./controllers/UserController')

routes.get('/users', UserController.index)
routes.post('/users', UserController.store)

module.exports = routes