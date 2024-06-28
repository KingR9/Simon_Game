var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var started = false;
var level = 0;

$(document).keypress(function (){
    if(!started){
        $("h1").text("Level " + level);
        nextSequence();
        started = true;
    }
});

$(".btn").click(function(){
    var userChosenColor = $(this).attr("id");
    userClickedPattern.push(userChosenColor);
    playSound(userChosenColor);
    animatePress(userChosenColor);
    checkAnswer(userClickedPattern.length - 1);
});

function nextSequence(){
    userClickedPattern = [];
    var number = Math.floor(Math.random()*4);
    var randomChosenColor = buttonColors[number];
    gamePattern.push(randomChosenColor);
    $("h1").html("Level " + level);

    $("#" + randomChosenColor).fadeOut(100).fadeIn(100);
        playSound(randomChosenColor);

    level++;

}
function playSound(color){
    var audio = new Audio("sounds/" + color + ".mp3");
    audio.play();
}
function animatePress(color){
    $("#" + color).addClass("pressed");
    setTimeout(function(){
        $("#" + color).removeClass("pressed");

    }, 100);

}

function checkAnswer(currentLevel){
    if(gamePattern[currentLevel] === userClickedPattern[currentLevel]){
        console.log("success");
        if(userClickedPattern.length === gamePattern.length){
            setTimeout(function () {
                nextSequence();
              }, 1000);

        }
    }
    else {
        console.log("wrong");
        var audio = new Audio("sounds/wrong.mp3");
        audio.play();
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
    
        }, 200);
        $("h1").html("Game Over, Press Any Key to Restart");
        startOver();

    }

}
function startOver(){
    buttonColors = ["red", "blue", "green", "yellow"];
    gamePattern = [];
    userClickedPattern = [];
    started = false;
    level = 0;

}
