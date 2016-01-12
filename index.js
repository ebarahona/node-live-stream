const express = require('express');
const app = express();
const http = require('http').Server(app);
const http2 = require('http');
const io = require('socket.io').listen(http);
const fs = require('fs');
const events = require('events')
const EE = new events.EventEmitter();

var port = process.env.PORT || 8888;

app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res){
	res.redirect('index.html');
});

http.listen(port,function(){
	console.log('started');
});

io.on('connection', function(socket){
	socket.on('stream', function(data){
		socket.broadcast.emit('stream', data);
	})
})


 var ffmpegServer = http2.createServer(function(req, res) {
   req.on('data', function(data) {

     var frame = new Buffer(data).toString('base64');

     io.sockets.emit('canvas', frame);

   })
 }).listen(3000);


// EE.on('incomingData', function(frameData) {
//   console.log(frameDataexk);
// });




// var PORT = 33333;
// var HOST = '127.0.0.1';

// var dgram = require('dgram');
// var server = dgram.createSocket('udp4');

// server.on('listening', function () {
//     var address = server.address();
//     console.log('UDP Server listening on ' + address.address + ":" + address.port);
// });

// server.on('message', function (message, remote) {
//     console.log(message);

// });

// server.bind(PORT, HOST);