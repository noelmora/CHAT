var express = require('express');
var socket = require('socket.io');

// App
var app = express();
var port = process.env.PORT || 4000; 
var server = app.listen(port, function(){
  console.log(`Server is running on port ${port}`);
});

// Archivos estáticos
app.use(express.static('public'));

// Socket setup
var io = socket(server);

io.on('connection', function(socket){
   console.log('Made socket connection', socket.id);

   // Handle chat event
   socket.on('chat', function(data){
    io.sockets.emit('chat', data);
   });

   // Handle typing event
   socket.on('typing', function(data){
    socket.broadcast.emit('typing', data);
   });
});
