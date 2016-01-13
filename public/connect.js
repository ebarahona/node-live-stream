
var connect = null;

$(document).bind('ready', function () {
	console.log("streamClient ready!");	
	connect = new Connect('',"");
	connect.initSocket();
});

//--
function Connect(serverIP, serverPort) {
	this.socket = null;
	this.serverIP = serverIP;
	this.serverPort = serverPort;
}

// --
// open web socket
Connect.prototype.initSocket = function() {

    this.socket = io.connect(window.location.orgin);

	// on connection to server
	this.socket.on('connect', function() {
	    console.log("socket connected to http://"+window.location.orgin);
	});

	//read video stream
	this.socket.on('canvas', function(data) {
		//console.log(data);
		try {

			// draw(incoming);
			// console.log('incoming');

			// function draw(data) {

			// 	setTimeout(function(){
			// 		console.log('should draw');
			// 		// 1. method: draw on canvas
			// 		var canvas = document.getElementById('videostream');
			// 		var context = canvas.getContext('2d');
			// 		var imageObj = new Image();
			// 		imageObj.src = "data:image/jpeg;base64,"+data;
			// 		imageObj.onload = function(){
			// 			context.height = imageObj.height;
			// 			context.width = imageObj.width;
			// 			context.drawImage(imageObj,0,0,context.width,context.height);
			// 		}

			// 	},33);
			// };
	
			// 2. method: draw as CSS background
			$('#videostream').css('background', 'transparent url(data:image/jpeg;base64,'+data+') top left / 100% 100% no-repeat');
		} catch(e){
			console.log(e);
		 }
	});

	this.socket.on('disconnect', function(exception) {
		console.log("socket disconnect");
		//this.disconnect(true);
		//this.destroy();
	});
};