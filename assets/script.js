

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
			  }	
			  socket.on('show_name', function showUser(users){
			  	// console.log("shoow name"+user);
			  	// users.push(user);
		  	
			  	$.each(users, function(i, el){
			  		if($.inArray(el,uniqueUsers)=== -1){
			  			uniqueUsers.push(el)
			  		}
			  	})
			  	var activeUserLength = uniqueUsers.length
			  	$('.list').children().remove()
			  	$('.online').text(activeUserLength)

			  	uniqueUsers.map(user => {
			  		if(user){
			  			$('.list').append($('<li>').text(user));
			  		} 		  		
			  	})
			  })
		  /* end of show online list..................................*/

		   /*  message functionalities.............................................*/
		   // send message to server
		  	$('form').submit(function(){
					var $messageEl = $('#m');
					var message =$messageEl.val()
					if(message) {
				  	socket.emit('chat_message',{user: name, msg: message} );
				  	$messageEl.val('');
				  	$messageEl.attr('placeholder', "Enter Message");
				  	return false;
			  	}
			  });

			 	// receive message from server	
		  	socket.on('chat_message', function(msg){

		  	$('#messages').append($('<li>').html('<span class="userMsg">'+ msg.user+'</span> : '+ msg.msg));
		  	
		  	/*users.push(msg.user);
		  	
		  	$.each(users, function(i, el){
		  		if($.inArray(el,uniqueUsers)=== -1){
		  			uniqueUsers.push(el)
		  		}
		  	})

		  	$('.list').children().remove()
		  	uniqueUsers.map(user => {
		  		if(user){
		  			$('.list').append($('<li>').text(user));
		  		} else {
		  			$('.list').append($('<p>').text("No Active User"));
		  		}
		  		
		  	})	*/

		  	window.scrollTo(0, document.body.scrollHeight);
		  });
		   /* end of  message.............................................*/	


		  socket.on('disconnect', function(msg){
		  	console.log('discommttt'+msg);
		  	//showUser()
		  })
		  socket.on('connection', function(msg){
		  	console.log(msg);
		  	//showUser()
		  })	
		})

// function nnnddd() {
// 	$('#addName').on('click', function() {
// 			name = $('#name').val()
// 			return name
// 	})
// }
// nnnddd()

