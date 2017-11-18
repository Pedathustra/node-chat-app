var socket = io();

socket.on('connect', function() {
  console.log('connected to server');
});
socket.on('disconnect',function() {
  console.log('Disconnected from server')
});

//this is the listener for the custom call for email, which is emitted on server side.
//data emitted from server is sent as first argument used in function. In this case "email"
socket.on('newEmail', function(email){
  console.log('New email',email)
});
//
//createMessages

socket.on('newMessage', function(message){
  console.log('newMessage',message)
});
