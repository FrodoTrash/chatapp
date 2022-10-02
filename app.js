const express = require('express');
const http = require('http');

const app = express()
const server = http.createServer(app)

// socket.io
const { Server } = require('socket.io')
const io = new Server(server)

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {

  socket.on('username', (username) => {
    console.log(username + ' connected')
    io.emit('chat message', username + ' = > Online')

    socket.on('chat message', (msg) => {
      io.emit('chat message', msg)
    })

    socket.on('disconnect', () => {
      console.log(username +' disconnected')
    })
  })

})

server.listen(3000, () =>{
  console.log('listen on *:3000')
})