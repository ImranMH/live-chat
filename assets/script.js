$(function(){
			var socket = io();
		  
		  $('form').submit(function(){
		  	socket.emit('chat_message', $('#m').val());
		  	$('#m').val('');
		  	$('#m').attr('placeholder', "mew msg");
		  	return false;
		  });

		  socket.on('chat_message', function(msg){
		  	console.log("here we are")
		  	$('#messages').append($('<li>').text(msg));
		  	window.scrollTo(0, document.body.scrollHeight);
		  });
		})