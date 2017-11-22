var socket = io();

function scrollToBottom(){
  //selectors
  var messages = jQuery('#messages');
  var newMessage = messages.children('li:last-child')
  //Heights
  var clientHeight = messages.prop('clientHeight');
  var scrollTop = messages.prop('scrollTop');
  var scrollHeight = messages.prop('scrollHeight');
  var newMessageHeight = newMessage.innerHeight();
  var lastMassageHeight = newMessage.prev().innerHeight();

  if(clientHeight + scrollTop + newMessageHeight + lastMassageHeight >= scrollHeight){
    messages.scrollTop(scrollHeight);
  }
}


socket.on('connect', function() {
  var params = jQuery.deparam(window.location.search); //turns this into an Object
  socket.emit('join', params, function(err){
        if(err){
            alert(err);
            window.location.href="/";
        }else{
            console.log('no error with login')
        }
  });
});
socket.on('disconnect',function() {
  console.log('Disconnected from server')
});

socket.on('updateUserList', function(users){
  var ol = jQuery('<ol></ol>');

   users.forEach(function(user){
       ol.append(jQuery('<li></li>').text(user));
   });

   jQuery('#users').html(ol);
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
  scrollToBottom();
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
    scrollToBottom();

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
