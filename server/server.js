
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
     socket.emit('welcomeMessage',{
       from: 'Admin',
       text: "Welcome to the chat app!",
      createdAt: new Date().getTime()
     })
     socket.broadcast.emit('newUser',{
         from: 'Admin',
         text: `New user, , joined`,
         createdAt: new Date().getTime()
     });

    socket.on('createMessage', (message)=>{
      console.log('createMessage',message);
      io.emit('newMessage',{
          from: message.from,
          text: message.text,
          createdAt: new Date().getTime()
      });
      //this broadcasts the message to everyone but the sender
      //good for messages like "Larry has joined chat"
      // socket.broadcast.emit('newMessage',{
      //     from: message.from,
      //     text: message.text,
      //     createdAt: new Date().getTime()
      // });
    });

    socket.on('disconnect', ()=>{
      console.log('Client disconnected')
    });
});

server.listen(port, ()=>{
  console.log(`Server is up on port ${port}`)
});

module.exports ={app};
