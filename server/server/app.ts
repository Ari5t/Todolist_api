import express from 'express'
import methodOverride from 'method-override'
import CORS from '../middleware/CORS'

import router from '../routes'

const app = express()

app.set('view engine', 'ejs')

app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(express.static('public'))
app.use(express.static('viwes'))
app.use(methodOverride('_method'))
app.use(CORS)

app.use(router)

export default app