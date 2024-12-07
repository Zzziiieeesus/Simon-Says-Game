// alert("it's working");
var buttonColours = ["red","blue","green","yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var started = false;

$(".btn").click(function(){
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);

    checkAnswer(userClickedPattern.length-1);
        //.length-1 para makuha yung last index

});

function nextSequence(){

    userClickedPattern = [];

    var randomNumber = Math.floor(Math.random()*4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);

    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

    playSound(randomChosenColour);
    
    level++;
    $("#level-title").text("Level " + level);

}

function playSound(name){
        var audio = new Audio("sounds/" + name + ".mp3");
        audio.play();
}

function animatePress(currentColor){
    $("#" + currentColor).addClass("pressed");
    
    setTimeout(function () {
        $("#" + currentColor).removeClass("pressed");
      }, 100);
}

$(document).keypress(function(){
   if(!started){
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
   }
});

function checkAnswer(currentLevel){
    if(gamePattern[currentLevel] === userClickedPattern[currentLevel]){
        console.log("success");
        if(userClickedPattern.length === gamePattern.length){
            setTimeout(function(){
                nextSequence();
            }, 1000);
        }
    }else{
        console.log("wrong");
        playSound("wrong");

        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        }, 200);

        $("#level-title").text("Game Over, Press Any Key to Restart");

        startOver();
    }
}

function startOver(){
    level = 0;
    gamePattern = [];
    started = false;
}