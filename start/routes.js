'use strict'

const Route = use('Route')

Route.post('/users', 'UserController.create')
Route.post('/sessions', 'SessionController.create')

Route.resource('times', 'TimeController')
  .apiOnly()
  .middleware('auth')
