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
   var li = jQuery('<li></li>');
   li.text(`${message.from}: ${message.text}`);

   jQuery('#messages').append(li);
});

socket.on('welcomeMessage', function(message){
  console.log(message)
});
socket.on('newUser', function(message){
  console.log(message)
});

jQuery('#message-form').on('submit',function(e){
  e.preventDefault();
  console.log('here')

  socket.emit('createMessage',{
    from: "User",
    text: jQuery('[name=message]').val()
    } , function(){

  });
});
var locationButton = jQuery('#send-location');
  locationButton.on('click', function(){
    if(!navigator.geolocation){
      return('Geolocation not supported by your browser!')
    }
    navigator.geolocation.getCurrentPosition(function (position){
        socket.emit('createLocationMessage',{
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        })
    }, function(){
      alert('Unable to fetch location.')
    });
});
