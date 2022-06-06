import express from 'express'
import methodOverride from 'method-override'

import router from '../routes'

const app = express()

app.set('view engine', 'ejs')

app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(express.static('public'))
app.use(express.static('viwes'))
app.use(methodOverride('_method'))

app.use(router)

export default app