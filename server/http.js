const http = require('http')

const App = require('./app')

const server = http.createServer(App)

const PORT = process.env.PORT ?? 3000;

server.listen(PORT, () => {
  console.log(`listening on *:${PORT}`)
})

module.exports = server