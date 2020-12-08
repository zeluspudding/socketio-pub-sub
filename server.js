// // Setup basic express server
var express = require('express');
var app = express();
var path = require('path');
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var port = process.env.PORT || 3000;
// const io = require('socket.io')(3000);

server.listen(port, () => {
  console.log('Server listening at port %d', port);
});

// Routing
app.use(express.static(path.join(__dirname, 'public')));

/* Define the server */
io.on('connection', function(socket) {

	/* For now we only have one canvas */
	socket.join("drawing/canvas1");

	socket.on('message', (message) => {
		/* In this simplified example we only have drawing commands */
		io.in('drawing/canvas1').send(message);
	});
});
