const Express = require('express')

const taskRouter = require('../routes/task-routers')
const apiRouter = require('../routes/api-routers')
const methodOverride = require('method-override')

const App = Express()

App.set('view engine', 'ejs')

App.use(Express.urlencoded({ extended: false }))
App.use(Express.static('styles'))
App.use(methodOverride('_method'))

App.use(taskRouter)
App.use(apiRouter)

module.exports = App