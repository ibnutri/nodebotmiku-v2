/*
	#NodeBots
	Differential Drive Remotely operated robot.
	using 2 gearmotor and l9110s motordriver

	Pin Configuration:

	l9910s  --> arduino
	AIA 		6 left forward
	AIB 		5 left backward
	BIA 		10 right forward
	BIB 		9 right backward
*/

var five = require("johnny-five");
var keypress = require("keypress");
var board = new five.Board({
	port: '/dev/cu.NodeBotMiku-DevB'
});
var motorSpeed = (5);
var motorAIA = 6;
var motorAIB = 5;
var motorBIA = 10;
var motorBIB = 9;

board.on("ready", function(){
	var led13 = new five.Led(13);
	led13.on();
	var AIA = new five.Pin({
		pin: motorAIA,
		mode: 3, //PWM
	});
	var AIB = new five.Pin({
		pin: motorAIB,
		mode: 3, //PWM
	});

	var BIA = new five.Pin({
		pin: motorBIA,
		mode: 3, //PWM
	});
	var BIB = new five.Pin({
		pin: motorBIB,
		mode: 3, //PWM
	});
	
	process.stdin.resume();
	process.stdin.setEncoding("utf8");
	process.stdin.setRawMode(true);

	process.stdin.on("keypress", function(ch, key) {
		if ( key.name === 'left' ) {    
			resetMotor();
	    	AIB.write(motorSpeed); // left backward
	    	BIA.write(motorSpeed); // right forward
	    	setStopTwoSecond();
	    }
	    if( key.name === 'right' ){
	    	resetMotor();
			AIA.write(motorSpeed); // left forward
			BIB.write(motorSpeed); // right backward
			setStopTwoSecond();
	    }
	    if( key.name === 'down' ){
	    	resetMotor();
	    	AIB.write(motorSpeed); // left backward
			BIB.write(motorSpeed); // right backward
			setStopTwoSecond();
	    }
	    if( key.name === 'up' ){
	    	resetMotor();
	    	AIA.write(motorSpeed); // left forward
	    	BIA.write(motorSpeed); // right forward
	    	setStopTwoSecond();
	    }
	});
	function resetMotor(){
			led13.off();
	    	AIA.write(0);
	    	AIB.write(0);
	    	BIA.write(0);
	    	BIB.write(0);
	}
	function setStopTwoSecond(){
		setTimeout(function(){
			resetMotor();
		}, 500);
	}
	this.on("exit", function(){
		resetMotor();
	});
});
