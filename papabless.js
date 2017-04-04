var socket = require('socket.io-client')('http://ch4t.ga');

var blessed = require('blessed');

var contrib = require('blessed-contrib');

var screen = blessed.screen({  
    // Example of optional settings:
     autoPadding: true,
    smartCSR: true

});

screen.title = 'ch4t.ga'; 

const config = {
	username: 'bert',
	color: '5'
	};

var messages = contrib.log({  
	title: "ch4t.ga",
  parent: screen,
  width: '100%',
  height: '95%',
  top: 'top',
  left: 'center',
  align: 'left',
  fg: 'blue',
  border: {
    type: 'line'
  },
  selectedBg: 'green'
});

var input = blessed.textbox({
    parent: screen,
    inputOnFocus: true,
    name: 'input',
    input: true,
    bottom: 0,
    left: 0,
    height: '5%',
    width: '100%',
    style: {
        fg: 'white',
        bg: 'black',
        focus: {
            bg: 'black',
            fg: 'white'
        }
    }
});

screen.append(input);

screen.append(messages);	

screen.render(); 

input.focus();

screen.key(['escape', 'q', 'C-c'], function(ch, key) {  
  return process.exit(0);
});

socket.on('login',function(data){
	msgs = data.messages;
	
	msgs.forEach(function(msg){
		
		messages.addItem(msg.username +": "+msg.message);
		
		});
		
	input.focus();
	
});

socket.on('connect', function(data){ 
	socket.emit('add user', config.username);
	
	
});
	 
socket.on('new message', function (data) { 
	
	messages.addItem(data.username +": "+data.message);
	
	});

socket.on('disconnect', function(){ 
	
	});
 
socket.on('login', function (data) {


});

function sendmsg(message)
{
	var data = {username: config.username,message: message,customcolor: config.color,timestamp: 0};
    socket.emit('new message',data);
}

var log = function(str){
	
	console.log(str);
	
	};
	
input.on('submit', function(){
	
	var msg = this.value;
	messages.addItem(config.username+": "+msg);
	sendmsg(msg);
	this.clearValue();
	input.focus();
	
	});
