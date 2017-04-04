var socket = require('socket.io-client')('http://ch4t.ga');
const readline = require('readline');

const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout
});

const config = {
	username: 'jrm',
	color: '5'
	};
	
rl.on('line', (input) => { sendmsg(input);});
	
socket.on('connect', function(){ 
	socket.emit('add user', config.username);
	log('connected as '+config.username);
});
	 
socket.on('new message', function (data) { log(data.timestamp+": "+data.username+": "+data.message); });

socket.on('disconnect', function(){ log("You've been disconnected!!! REEEEE!"); });
 
socket.on('login', function (data) {
	log(data.numUsers+" Users Online" );
	log(data.userlist);
});
function sendmsg(message)
{
	var data = {username: config.username,message: message,customcolor: config.color,timestamp: 0};
    socket.emit('new message',data);
}
var log = function(str){console.log(str);};
