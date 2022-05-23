const express = require('express');
const mongoose = require('mongoose');

const { Server } = require("socket.io");

const http = require('http');

const app = express();
const PORT = process.env.PORT ?? 3000;
const db = 'mongodb+srv://Yaroslav:qwerrewq@clus.mnkjs.mongodb.net/NodeTask?retryWrites=true&w=majority'

mongoose
  .connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then((res) => console.log('Connected to DB'))
  .catch((error) => console.log(error));



const server = http.createServer(app)

const io = new Server(server);

io.on('connection', (socket) => {
  console.log('a user connected');
});

server.listen(PORT, (error) => {
  error ? console.log(error) : console.log(`listening port ${PORT}`);
});