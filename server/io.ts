import { Server } from 'socket.io'
import server from './http'
import app from './app'

const io = new Server(server)

app.set('io', io)

export default io