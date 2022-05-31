import express, { response } from 'express'
import { Server } from 'socket.io'

import 'dotenv/config'

import mongoose from 'mongoose'
import http from 'http'

import methodOverride from 'method-override'

import Task from './models/task'
import taskRouter from './routes/task-routers'
import apiRouter from './routes/api-routers'

const app = express()
const PORT = process.env.PORT || 3000

const server = http.createServer(app)
const io = new Server(server)

try{
  mongoose.connect(`${process.env.DB_URL}`)
  // , { useNewUrlParser: true, useUnifiedTopology: true }
  console.log('Connected to DB')
}catch (error){
  res: response.status(500).json({ error })
}

app.set('view engine', 'ejs')
app.set('io', io)

app.use(express.urlencoded({ extended: false }))
app.use(express.static('public'))
app.use(express.static('viwes'))
app.use(methodOverride('_method'))

io.on('connection', socket => {
  console.log('New connection', socket.id)

  socket.on('task:create', async ({ text }) => {

    const task = new Task({ text })
    const id = task._id

    await task.save()

    socket.broadcast.emit('task:created', { id, text })
  })

  socket.on('task:update', async ({ id, text }) => {
    await Task.findByIdAndUpdate(id, { text })

    socket.broadcast.emit('task:updated', { id, text })
  })

  socket.on('task:delete', async ({ id }) => {
    await Task.findByIdAndDelete(id)

    socket.broadcast.emit('task:deleted', { id })
  })
})

server.listen(PORT, () => {
  try{
    console.log(`listening port ${PORT}`)
  }catch(error){
    console.log(error)
  }

  

  // error ? console.log(error) : console.log(`listening port ${PORT}`)
})

app.use(taskRouter)
app.use(apiRouter)