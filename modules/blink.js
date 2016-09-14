var five = require("johnny-five");
var keypress = require("keypress");
var board = new five.Board({
	port: '/dev/cu.NodeBotMiku-DevB'
});
board.on("ready", function(){
	var led = new five.Led(13);
	
	process.stdin.resume();
	process.stdin.setEncoding("utf8");
	process.stdin.setRawMode(true);

	process.stdin.on("keypress", function(ch, key) {
		if ( key.name === 'left' ) {
	        led.toggle();
	    }
	    if( key.name === 'right' ){
	    	led.off();
	    }
	});
	this.on("exit", function(){
		console.log('exit');
		led.off();
	});
});