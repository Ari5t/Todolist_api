const express = require('express');
const mongoose = require('mongoose');
const http = require('http')

const Task = require('./models/task');
const taskRouter = require('./routes/task-routers');
const apiRouter = require('./routes/api-routers');
const methodOverride = require('method-override');

const app = express();
const PORT = 3000;
const db = 'mongodb+srv://Yaroslav:qwerrewq@clus.mnkjs.mongodb.net/NodeTask?retryWrites=true&w=majority';

const server = http.createServer(app)
const Server = require('socket.io').Server
const io = new Server(server)

mongoose
  .connect(db, { useNewUrlParser: true, useUnifiedTopology: true})
  .then(() => console.log('Connected to DB'))
  .catch((error) => console.log(error));

app.set('view engine', 'ejs');
app.set('io', io)

app.use(express.urlencoded({extended: false }));
app.use(express.static('public'));
app.use(express.static('viwes'));
app.use(methodOverride('_method'));

io.on('connection', socket => {
  console.log('New connection', socket.id)

  socket.on('task:create', async ({ text }) => {

    const task = new Task({ text });
    const id = task._id

    await task.save()

    socket.broadcast.emit('task:created', { id, text })
  })

  socket.on('task:update', async ({ id, text }) => {
    await Task.findByIdAndUpdate(id, { text })

    socket.broadcast.emit('task:updated', { id, text })
  })

  socket.on('task:delete', async({id}) => {
    await Task.findByIdAndDelete(id)

    socket.broadcast.emit('task:deleted', {id})
  })
})

server.listen(PORT, (error) => {
    error ? console.log(error) : console.log(`listening port ${PORT}`);
  });

app.use(taskRouter);
app.use(apiRouter);

module.exports = io
