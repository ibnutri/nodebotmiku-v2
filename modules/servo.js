var five = require("johnny-five");
var keypress = require("keypress");
var board = new five.Board({
	port: '/dev/cu.NodeBotMiku-DevB'
});
board.on("ready", function(){
	var servo1 = new five.Servo({
	  pin: 6,
	  range: [0, 180],
	  startAt: 120
	});
	servo1.sweep();
	this.on("exit", function(){
		servo1.stop();
	});
});
