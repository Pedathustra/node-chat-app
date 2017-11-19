
const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');
const {generateMessage,generateLocationMessage} = require('./utils/message')
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
     socket.emit('newMessage',generateMessage('Admin','Welcome to the chat app!'))

     socket.broadcast.emit('newMessage', generateMessage('Admin','A new user has joined.'));

    socket.on('createMessage', (message, callback)=>{
      console.log('createMessage',message);
      callback('This is from the server');
      io.emit('newMessage',generateMessage(message.from,message.text));
    });
    socket.on('createLocationMessage', (coords)=>{
        io.emit('newLocationMessage', generateLocationMessage('User', coords.latitude,coords.longitude));
    });

    socket.on('disconnect', ()=>{
      console.log('Client disconnected')
    });
});

server.listen(port, ()=>{
  console.log(`Server is up on port ${port}`)
});

module.exports ={app};
