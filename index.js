var express = require('express');
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var port = process.env.PORT || 3000;


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
var names = [];
var people = 0
io.on('connection', function(socket){
	people++
	/* complited*/
	socket.on('chat_message', function(msg){
		io.emit('chat_message', msg);
	})

	
	socket.emit('connection', { text: 'you are now connected to chat server..' });
	//socket.broadcast.emit('connection', { text: 'user are now connected to chat server..' });
	//socket.emit('disconnect', { text: 'you are now disconnected from chat server..' });
	//io.sockets.emit('broadcast',{ user: names + ' clients connected!'});
	socket.broadcast.emit('hi');
	console.log('a user connected');

	socket.on('disconnect', function(msg){
		//console.log('disconnected ' + msg);
		io.emit('disconnect', msg);
		//io.emit('show_name', names);
	})
	/* complited*/
	socket.on('show_name', function(name){		
		names.push(name)		
		io.emit('show_name', {users:names, user:name, text:"Join ChatRoom"});
	})
	/* complited*/
	socket.on('write_message', function(write){	
		io.emit('write_message', write);
	})
});
http.listen(port, function() {
	console.log('listening on *:3000');
});