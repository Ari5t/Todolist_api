import express from 'express'
import methodOverride from 'method-override'

import taskRouter from '../routes/task-routers'
import apiRouter from '../routes/api-routers'

const app = express()

app.set('view engine', 'ejs')

app.use(express.urlencoded({ extended: false }))
app.use(express.static('public'))
app.use(express.static('viwes'))
app.use(methodOverride('_method'))

app.use(taskRouter)
app.use(apiRouter)

export default app