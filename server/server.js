
const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');
const {generateMessage,generateLocationMessage} = require('./utils/message')
const {isRealString} = require('./utils/validation')
const {Users} = require('./utils/users');

const port = process.env.PORT || 3000;

const publicPath = path.join(__dirname,'../public');
var app = express();
var server = http.createServer(app);
var io = socketIO(server); // this will be our web socket Server
                          // this is how we will talk back and forth server/client
var users = new Users(); //new instance
app.use(express.static(publicPath));

//io.on is a listener to open up connection between client/server
io.on('connect', (socket)=>{
  console.log('New user connected');

    socket.on('join',(params,callback)=>{
        if(!isRealString(params.name) || !isRealString(params.room)){
            return callback('Name and room are required.');
        }
        socket.join(params.room);//this is a place for people to be part of one room.
        users.removeUser(socket.id);//remove from any existing room
        users.addUser(socket.id, params.name, params.room);

        io.to(params.room).emit('updateUserList', users.getUserList(params.room));
        //socket.leave(params.room) //this will be to leave room

        //io.emit --> emits to every connect user
        //socket.broadcast.emit --> emits to everyone but the current users
        // socket.emit --> emits event to one user
        //--> to make these three work for a single room, need to chain...
          //io.emit.to('The Office Fans').emit
          //socket.broadcast.to('The Office Fans').emit

        socket.emit('newMessage',generateMessage('Admin','Welcome to the chat app!'))
        socket.broadcast.to(params.room).emit('newMessage', generateMessage('Admin',`${params.name} has joined!`));

        callback();
    });

    socket.on('createMessage', (message, callback)=>{
      var user = users.getUser(socket.id);

      if (user && isRealString(message.text)){
          io.to(user.room).emit('newMessage',generateMessage(user.name,message.text));
      }
      callback();
    });
    socket.on('createLocationMessage', (coords)=>{
        var user = users.getUser(socket.id);
        if(user){
          io.to(user.room).emit('newLocationMessage', generateLocationMessage(user.name, coords.latitude,coords.longitude));  
        }

    });

    socket.on('disconnect', ()=>{
      var user = users.removeUser(socket.id);
      if (user){
        io.to(user.room).emit('updateUserList', users.getUserList(user.room));
        io.to(user.room).emit('newMessage', generateMessage('Admin', `${user.name} has left`));
      }
    });
});

server.listen(port, ()=>{
  console.log(`Server is up on port ${port}`)
});

module.exports ={app};
