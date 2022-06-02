import { Server } from 'socket.io'

import Task from '../models/task'
import server from './http'
import app from './app'

const io = new Server(server)

app.set('io', io)

io.on('connection', socket => {
  console.log('New connection', socket.id)

  socket.on('task:create', async ({ text }) => {
    const task = new Task({ text });
    const id = task._id;

    socket.broadcast.emit("task:created", { id, text });

    await task.save();
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

export default io