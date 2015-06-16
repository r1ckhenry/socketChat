// Setup Express App
var express = require('express');
var app = express();

// Allow access to Public file 
app.use(express.static(__dirname + '/public'));

// Create HTTP server for...
var http = require('http');
var server = http.createServer(app);

// Use views
app.set('views', './views');
app.set('view engine', 'ejs');

// Add home route
app.get('/', function(req,res) {
  res.render('index')
});

server.listen(3000);

// Setup socket.io server
var io = require('socket.io').listen(server)

io.sockets.on('connection', function(socket) {
  socket.emit('connected');

  socket.on('chat', function(data) {
    socket.broadcast.emit('chat', data)
  });

  socket.on('action', function(data) {
    socket.broadcast.emit('action', data);
  });

});
