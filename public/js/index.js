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
  var template = jQuery('#message-template').html();
 var formattedTime=moment(message.createdAt).format('h:mm a');
  var html = Mustache.render(template, {
    text: message.text,
    from: message.from,
    createdAt: formattedTime
  });
  jQuery('#messages').append(html);

  //
  //  var li = jQuery('<li></li>');
  //  li.text(`${message.from} ${formattedTime}: ${message.text}`);
  //
  //  jQuery('#messages').append(li);
});

socket.on('newLocationMessage', function(message){
    var formattedTime=moment(message.createdAt).format('h:mm a');
    var template = jQuery('#location-message-template').html();
    var html = Mustache.render(template,{
        url: message.url,
        createdAt: formattedTime,
        from: message.from

    });
    jQuery('#messages').append(html);


    // var li = jQuery('<li></li>');
    // var a = jQuery('<a target="_blank">My current location</a>')

    // li.text(`${message.from} ${formattedTime}: `);
    // a.attr('href', message.url);
    // li.append(a);
    // jQuery('#messages').append(li);
  }
)

socket.on('welcomeMessage', function(message){
  console.log(message)
});
socket.on('newUser', function(message){
  console.log(message)
});

jQuery('#message-form').on('submit',function(e){
  e.preventDefault();
  var messageTextBox=jQuery('[name=message]');

  socket.emit('createMessage',{
    from: "User",
    text: messageTextBox.val()
    } , function(){
        messageTextBox.val('');
  });
});

var locationButton = jQuery('#send-location');
  locationButton.on('click', function(){
    if(!navigator.geolocation){
      return('Geolocation not supported by your browser!')
    }
    locationButton.attr('disabled', 'disabled').text('Sending location...');
    navigator.geolocation.getCurrentPosition(function (position){
      console.log(position)
      locationButton.removeAttr('disabled').text('Send location');
        socket.emit('createLocationMessage',{
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          accuracy: position.coords.accuracy
        })
    }, function(){
      locationButton.removeAttr('disabled').text('Send location');
      alert('Unable to fetch location.')
    });
});
