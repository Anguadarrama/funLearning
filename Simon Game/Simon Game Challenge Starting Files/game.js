//Empty Arrays
var userClickPattern = [];
var gamePattern = [];
//Array for button Colors
var buttonColours = ["red", "blue", "green", "yellow"];


//Function that generates random number
 function nextSequence(){
   //when nextSequence is triggered, this will help reset the userClickPattern to an empty array ready for the next level
   userClickPattern = [];
   //will incriment the level variable as well as modify the h1 header as the level advances
   level++;
   $("#level-title").text("Level" + level);

   var randomNum = Math.floor(Math.random()*4);
   //Variable that will choose random colour from Colour Array
   var randomChosenColour = buttonColours[randomNum];
   gamePattern.push(randomChosenColour);
   //flashing the color of the following color
   $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
   //play the corresponding mp3 to the color that flashes
   playSound(randomChosenColour);
};


//jquery to detect when any buttons are clicked and trigger function
$(".btn").click(function(){
  var userChosenColour = $(this).attr("id");
  userClickPattern.push(userChosenColour);

  playSound(userChosenColour); //plays the sound for the color clicked
  animatePress(userChosenColour); //animation for button(s) which are clicked
  checkAnswer(userClickPattern.length-1); //checkAnswer will be called after user clicks on an option passing in the index of the the last answer in the sequence


  console.log(userClickPattern);
});


//function will take single input that will animate the buttons on click or sequence
function animatePress(currentColour){
  $("#" + currentColour).addClass("pressed");

  setTimeout(function(){
    $("#" + currentColour).removeClass("pressed"); // AFTER KEY IS HIGHLIGHTED, IT WILL TIMEOUT, REMOVING THE PRESSED CLASS
  }, 100);
}


//vars started and level are starting placeholders for the game
var started = false;
var level = 0;

//jQuery Statemet that helps detect the keypress and initiate the game
$(document).keypress(function(){
  if(!started){ //if started is not FALSE, start game
    $("#level-title").text("Level" + level); //h1 text is modified to match the corresponding level
    nextSequence(); // recalls the nextSequence function
    started = true; // game continues to play 
  }
});

//Function that will take an input with the current level
function checkAnswer(currentLevel) {
  //IF statement to check if the most recent user answer is the same as the game pattern, if so log "success", if not log "wrong"
  if (gamePattern[currentLevel] === userClickPattern[currentLevel]){
    console.log("Success!");
    //IF the user got the most recent answer right, then check that they have finished their sequence with another IF statement
    if (userClickPattern.length === gamePattern.length){

      //call next sequence after 1000 of a millisecond delay
      setTimeout(function() {
        nextSequence();
      }, 1000);
    }

  } else {
    console.log("Wrong");
    //play the wrong.mp3 file when the wrong color is chosen
    playSound("wrong");
    //function that will add the CSS class game-over and fade it out when wrong color is chosen
    $("body").addClass("game-over");
    setTimeout(function(){
      $("body").removeClass("game-over");
    }, 200);
    //h1 with id #level-title will be modified to "Game Over, Press Any Key to Restart"
    $("#level-title").text("Game Over, Press Any Key to Restart");

    startOver();
  }
}


//Function that will take any input put into it, and will locate sound file if
//available and play the sound corresponding to it
function playSound(name) {

  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();

}

//function that will restart the game
function startOver() {
  //All the level, gamePattern, and started values are reset so the game can be reset
  level = 0;
  gamePattern = [];
  started = false;
}
