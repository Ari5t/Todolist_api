const express = require('express');
const mongoose = require('mongoose');
const { Server } = require("socket.io");

const taskRouter = require('./routes/task-routers');
const apiRouter = require('./routes/api-routers');
const methodOverride = require('method-override');

const app = express();
const PORT = 3000;
const db = 'mongodb+srv://Yaroslav:qwerrewq@clus.mnkjs.mongodb.net/NodeTask?retryWrites=true&w=majority';

mongoose
  .connect(db, { useNewUrlParser: true, useUnifiedTopology: true})
  .then(() => console.log('Connected to DB'))
  .catch((error) => console.log(error));

app.set('view engine', 'ejs');

app.use(express.urlencoded({extended: false }));
app.use(express.static('styles'));
app.use(express.static('node_modules'));
app.use(methodOverride('_method'));

const server = require('http').createServer(app);
const io = new Server(server)

io.on('connection', (socket) => {
  console.log('a user connected');
});

app.listen(PORT, (error) => {
    error ? console.log(error) : console.log(`listening port ${PORT}`);
  });

app.use(taskRouter);
app.use(apiRouter);

