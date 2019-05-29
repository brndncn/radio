const express = require('express');
const app = express();

const http = require('http').createServer(app);
const io = require('socket.io')(http);
const path = require('path');


const PORT = process.env.PORT || 4000;

app.use('/static', express.static(path.join(__dirname, 'static')))

app.get('/', function(req, res) {
	res.sendFile(path.join(__dirname, '/index.html'));
});

io.on('connection', function(socket){
	console.log('a user connected');
	socket.on('disconnect', function() {
		console.log('a user disconnected');
	});
	socket.on('fragment', function(fragment) {
		socket.broadcast.emit('fragment', fragment);
	});
	socket.on('buffer', function(buffer) {
		socket.broadcast.emit('buffer', buffer);
	});
});

http.listen(PORT, function(){
	console.log('listening on *:' + PORT);
});
