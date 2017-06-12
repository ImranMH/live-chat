

$(function(){

	 var name = localStorage.getItem('name');
	 
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
if (name == null || name == "null") {
		  name = 'annaimiuos';
		}	 
	
	$('.user').text(name);
	$('.log_out').on('click', function() {
		localStorage.setItem('name', "");
		name = null;
		location.reload()

	})
		
			var socket = io();
			
				$('form').submit(function(){
					var message = $('#m').val();
					if(message) {
				  	socket.emit('chat_message',{user: name, msg: message} );
				  	$('#m').val('');
				  	$('#m').attr('placeholder', "Enter Message");
				  	return false;
			  	}
			  });
			
			  	

		  
			 var users = [];
			 var uniqueUsers =[]; 		
		  	socket.on('chat_message', function(msg){

		  	$('#messages').append($('<li>').html('<span class="userMsg">'+ msg.user+'</span> : '+ msg.msg));
		  	
		  	users.push(msg.user);
		  	
		  	$.each(users, function(i, el){
		  		if($.inArray(el,uniqueUsers)=== -1){
		  			uniqueUsers.push(el)
		  		}
		  	})

		  	$('.list').children().remove()
		  	uniqueUsers.map(user => {
		  		$('.list').append($('<li>').text(user));
		  	})	

		  	window.scrollTo(0, document.body.scrollHeight);
		  });
		})

// function nnnddd() {
// 	$('#addName').on('click', function() {
// 			name = $('#name').val()
// 			return name
// 	})
// }
// nnnddd()

