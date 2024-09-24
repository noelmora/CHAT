var express = require('express');
var socket = require('socket.io');

//app
var app = express();
var server = app.listen(4000, function(){
  console.log('Server is running on port 4000');    
});

//archivos estaticos
app.use(express.static('public'));

//socket setup
var io = socket(server);

io.on('connection', function(socket){
   console.log('made socket connection', socket.id);

   //handle chat event
   socket.on('chat', function(data){
    io.sockets.emit('chat', data);
   });

   // Handle typing event
   socket.on('typing', function(data){
    socket.broadcast.emit('typing', data);
   });
   
});