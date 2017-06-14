

$(function(){

	 	var name = localStorage.getItem('name');
	 

	 /* set wel come message and user................................*/
		if (!name) {
			$('.oldUser').hide()
			$('.log_out').hide()
			$('#addName').on('click', function() {
				var name = $('#name').val()
				localStorage.setItem('name', name);
				$('.newUser').hide();
				$('.oldUser').show()
				location.reload()
			})
		} else {
			$('.newUser').hide();
			$('.oldUser').show()
		}
		/* end of set wel come message and user................................*/

			$('.user').text(name);

			// log out for reset user ...................
			$('.log_out').on('click', function() {
				localStorage.setItem('name', "");
				name = null;
				location.reload()
			})
		
						
				var socket = io();
				/* show online list..................................*/
			 	var uniqueUsers =[];
			 	
		if(name) {
				
			  socket.emit('show_name',name );
				var $messageEl = $('#m');
			  socket.on('show_name', function showUser(res){
			  	// users.push(users);
		  		
			  	$.each(res.users, function(i, el){
			  		if($.inArray(el,uniqueUsers)=== -1){
			  			uniqueUsers.push(el)
			  		}
			  	})
			  	//var newUser = +' '+ res.text;
			  	//console.log(newUser);
			  	var dt = new Date();
			  	var hour = dt.getHours() < 10 ? '0'+dt.getHours() : dt.getHours()
			  	var minute = dt.getMinutes() < 10 ? '0'+dt.getMinutes() : dt.getMinutes()
			  	var second = dt.getSeconds() < 10 ? '0'+dt.getSeconds() : dt.getSeconds()
					//var time = dt.getHours() + ":" + dt.getMinutes() + ":" + dt.getSeconds();
					var time = hour + ":" + minute + ":" + second;
			  	var activeUserLength = uniqueUsers.length
			  	$('.list').children().remove()
			  	$('.online').text(activeUserLength)
			  	//$('.flashuser').text(newUser)
			  	$('.log').append($('<li>').html('<span class="time">'+ time +'</span> : <span class="user">'+ res.user +'</span> : '+ res.text));
			  	uniqueUsers.map(user => {
			  		if(user){
			  			$('.list').append($('<li>').text(user));
			  		} 		  		
			  	})
			  })
			  /* end of show online list..................................*/

			  /*  key stock functionalities.............................................*/
			  	$messageEl.on('keypress', function() {
			  		socket.emit('write_message',{user: name, msg: "writting now ...."} );
			  	})
			  	 socket.on('write_message', function(msg){
			  	 	var showMsg = msg.user+':'+msg.msg;
			  	 	if (msg.user !== name) {
			  	 		$('p.chat_write').html(showMsg)
			  	 	}
				  })

			   /*  message functionalities.............................................*/
			   // send message to server
			  	$('form').submit(function(){
						
						var message = $messageEl.val()
						if(message) {
							
					  	socket.emit('chat_message',{user: name, msg: message} );
					  	$messageEl.val('');
					  	$messageEl.attr('placeholder', "Enter Message");
					  	
					  	return false;
				  	}
				  });

				 	// receive message from server	
			  	socket.on('chat_message', function(msg){
			  	var dt = new Date();
			  	var hour = dt.getHours() < 10 ? '0'+dt.getHours() : dt.getHours()
			  	var minute = dt.getMinutes() < 10 ? '0'+dt.getMinutes() : dt.getMinutes()
			  	var second = dt.getSeconds() < 10 ? '0'+dt.getSeconds() : dt.getSeconds()
			
					var time = hour + ":" + minute + ":" + second;
			  	$('#messages').append($('<li>').html('<span class="time">'+ time +'</span>:  <span class="userMsg">'+ msg.user+'</span> : '+ msg.msg));
			  	$('p.chat_write').html('');
			  	window.scrollTo(0, document.body.scrollHeight);
			  });
			   /* end of  message.............................................*/	


			  socket.on('disconnect', function(msg){
			  	var status = 'you are now disconnected from chat server..';
			  	$('.disconnectmsg').text(msg)
			  	//console.log(msg);
			  })
			  socket.on('broadcast', function(msg){
			  	
			  	console.log(msg);
			  })

			  socket.on('connection', function(msg){
			  	$('.messageFromServer').text(msg.text)
			  	//showUser()
			  })
		 }	

		})

// function nnnddd() {
// 	$('#addName').on('click', function() {
// 			name = $('#name').val()
// 			return name
// 	})
// }
// nnnddd()

