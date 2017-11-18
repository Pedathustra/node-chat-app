
const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io')
const port = process.env.PORT || 3000;

const publicPath = path.join(__dirname,'../public');
var app = express();
var server = http.createServer(app);
var io = socketIO(server); // this will be our web socket Server
                          // this is how we will talk back and forth server/client
app.use(express.static(publicPath));

//io.on is a listener to open up connection between client/server
io.on('connect', (socket)=>{
  console.log('New user connected');
    socket.emit('newEmail',{
      from:'pebbles@example.com',
      text: 'Yo yo!',
      createAt: 123
    });
    socket.emit('newMessage',{
        from: "sophie",
        text: "behold my awesomeness",
        createdAt: 666
    });

    socket.on('createMessage', (message)=>{
      console.log('createMessage',message);
    })

    socket.on('disconnect', ()=>{
      console.log('Client disconnected')
    });
});

server.listen(port, ()=>{
  console.log(`Server is up on port ${port}`)
});

module.exports ={app};
