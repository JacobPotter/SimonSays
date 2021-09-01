var buttonColors=['red', 'green', 'blue','yellow'];
var gamePattern=[];
var userClickedPattern=[];

var started=false;
var level =0;
$(document).on('keypress', function () {
	if(!started) {
		$('#level-title').text('Level ' + level);
		nextSequence();
		started = true;
	}
});

$('.btn').on('click', function () {
	var userChosenColor = $(this).attr('id');
	userClickedPattern.push(userChosenColor);

	// console.log('User Pattern: '+userClickedPattern);
	animatePress(userChosenColor);
	playSound(userChosenColor);

	checkAnswer(userClickedPattern.length-1);
});

function checkAnswer(currentLevel) {
	console.log(currentLevel);
	if(userClickedPattern[currentLevel]===gamePattern[currentLevel]){

		console.log('success');

		if(userClickedPattern.length===gamePattern.length) {
			setTimeout(nextSequence,1000);
		}
	}else{
		console.log('wrong');

		playSound('wrong');

		$('body').addClass('game-over');
		setTimeout(function () { 
			$('body').removeClass('game-over');	
		},200);
		$('#level-title').text('Game Over, press any key to restart');
		startOver();
	}
}
	
function playSound(color) {
	var audio= new Audio('sounds/'+color+'.mp3');
	audio.play();
}

function nextSequence() {
	userClickedPattern=[];
	level++;
	$('#level-title').text('Level '+level);
	
	var randomNumber =Math.floor(Math.random() * 4);
	var randomChosenColor=buttonColors[randomNumber];
	gamePattern.push(randomChosenColor);
	
	console.log('Game Pattern: '+gamePattern);
	$('#'+randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
	playSound(randomChosenColor);
	
}
function animatePress(currentColor) {
	$('#'+currentColor).addClass('pressed');
	setTimeout(function () {
		$('#'+currentColor).removeClass('pressed');
	},100);
}

function startOver() {
	level=0;
	gamePattern=[];
	started=0;
}




