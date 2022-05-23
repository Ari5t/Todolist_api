const server = require('./http')
const App = require('./app');

const Task = require('../models/task')

const Server = require('socket.io').Server

const io = new Server(server)

io.on('connection', socket => {
  console.log('New connection', socket.id)

  socket.on('task:update', async ({ id, text }) => {
    await Task.findByIdAndUpdate(id, { text })

    socket.broadcast.emit('task:updated', { id, text })
  })
})

App.set('io', io)

module.exports = io