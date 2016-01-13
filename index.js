const express = require('express');
const app = express();
const http = require('http').Server(app);
const http2 = require('http');
const io = require('socket.io').listen(http);
const fs = require('fs');
const events = require('events')

var port = process.env.PORT || 8888;

app.use(express.static(__dirname + '/public'));

// 
app.get('/', function(req, res) {
	res.redirect('link.html');
})
// 
app.get('/video', function(req, res) {
  res.redirect('video.html');
});

// 
app.post('/videoin', function(req, res) {
	  req.on('data', function(data) {
  		var frame = new Buffer(data).toString('base64');
    	io.sockets.emit('canvas', frame);
  });
});

http.listen(port, function() {
  console.log('started');
});

io.on('connection', function(socket) {
  socket.on('stream', function(data) {
    socket.broadcast.emit('stream', data);
  });
});





// var PORT = 3000;
// var HOST = '127.0.0.1';

// var dgram = require('dgram');
// var server = dgram.createSocket('udp4');

// server.on('listening', function() {
//   var address = server.address();
//   console.log('UDP Server listening on ' + address.address + ":" + address.port);
// });

// server.on('message', function(data, remote) {

//   var frame = new Buffer(data).toString('base64');
//   io.sockets.emit('canvas', frame);

// });

// server.bind(PORT, HOST);