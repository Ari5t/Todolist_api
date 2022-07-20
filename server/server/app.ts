import express from 'express'
import methodOverride from 'method-override'
import cors from 'cors'
import path from 'path'

import router from '../routes'

const app = express()

app.set('view engine', 'ejs')

app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(express.static('public'))
app.use('/socket.io', express.static(path.resolve(__dirname, '..', 'node_modules', 'socket.io', 'client-dist')))
app.use(express.static('viwes'))
app.use(methodOverride('_method'))
app.use(cors())

app.use(router)

export default app