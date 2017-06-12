var express = require('express');
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);


app.get('/', function(req, res){
	res.sendFile(__dirname + '/index.html');
});
app.use('/assets', express.static('assets'))

/*io.on('connection', function(socket) {
	//console.log('a user connected');
	socket.broadcast.emit('hi');
	socket.on('chat message', function(msg){
		io.emit('chat message', msg);
	});
	// socket.on('disconnect', function(){
	// 	console.log("a user is disconnected");
	// })
})*/

io.on('connection', function(socket){
	socket.on('chat_message', function(msg){
		console.log('message:' +msg.user);
		io.emit('chat_message', msg);
	})
	//io.emit('chat_message', { for: 'everyone' });
	
	socket.broadcast.emit('hi');
	console.log('a user connected');

	socket.on('disconnect', function(msg){
		console.log('disconnected ' + msg);
	})
});
http.listen(3000, function() {
	console.log('listening on *:3000');
});