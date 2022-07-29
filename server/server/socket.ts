import socket_task from '../services/SoketTask'
import io from './io'

io.on('connection', socket => {
  console.log('New connection', socket.id)

  socket.on('task:create', async ({ text }) => {

    socket_task.create(text)

  })

  socket.on('task:update', async ({ _id, text }) => {

    socket_task.update(text, _id)

  })

  socket.on('task:delete', async ({ _id }) => {

    socket_task.delete(_id)

  })
})