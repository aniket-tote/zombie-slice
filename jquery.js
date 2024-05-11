//jquery.js
var playing = false;
var score;
var trialsLeft;
var step;
var action; //used for setInterval
var zombies = [
  "z1",
  "z2",
  "z3",
  "z4",
  "z5",
  "z6",
  "z7",
  "z8",
  "z8",
  "z9",
  "z10",
];
$(function () {
  //click on start reset button

  $("#startreset").click(function () {
    //we are playing
    if (playing == true) {
      //reload page
      location.reload();
    } else {
      //we are not playing
      playing = true; //game initiated

      //set score to 0
      score = 0; //set score to 0
      $("#scorevalue").html(score);

      //show trials left
      $("#trialsLeft").show();
      trialsLeft = 3;
      addHearts();

      //hide game over box
      $("#gameOver").hide();

      //change button text to reset game
      $("#startreset").html("Reset Game");

      //start sending zombies
      startAction();
    }
  });

  //slice a zombie

  $("#zombie1").mouseover(function () {
    score++;
    $("#scorevalue").html(score); //update score
    //    document.getElementById("slicesound").play();
    $("#slicesound")[0].play(); //play sound

    //stop zombie
    clearInterval(action);

    //hide zombie
    $("#zombie1").hide("explode", 500); //slice zombie

    //send new zombie
    setTimeout(startAction, 800);
  });

  //functions

  //fill trialLeft box with hearts

  function addHearts() {
    $("#trialsLeft").empty();
    for (i = 0; i < trialsLeft; i++) {
      $("#trialsLeft").append('<img src="images/heart.png" class="life">');
    }
  }

  //start sending zombies

  function startAction() {
    //generate a zombie
    $("#zombie1").show();
    chooseZombie(); //choose a random zombie
    $("#zombie1").css({ left: Math.round(550 * Math.random()), top: -50 }); //random position

    //generate a random step
    step = 1 + Math.round(8 * Math.random()); // change step

    // Move zombie down by one step every 10ms
    action = setInterval(function () {
      //move zombie by one step
      $("#zombie1").css("top", $("#zombie1").position().top + step);

      //check if the zombie is too low
      if ($("#zombie1").position().top > $("#zombiesContainer").height()) {
        //check if we have trials left
        if (trialsLeft > 1) {
          //generate a zombie
          $("#zombie1").show();
          chooseZombie(); //choose a random zombie
          $("#zombie1").css({
            left: Math.round(550 * Math.random()),
            top: -50,
          }); //random position

          //generate a random step
          step = 1 + Math.round(10 * Math.random()); // change step

          //reduce trials by one
          trialsLeft--;

          //populate trialsLeft box
          addHearts();
        } else {
          // game over
          playing = false; //we are not playing anymore
          $("#startreset").html("Start Game"); // change button to Start Game
          $("#gameOver").show();
          $("#gameOver").html(
            "<p>Game Over!</p><p>Your score is " + score + "</p>"
          );
          $("#trialsLeft").hide();
          stopAction();
        }
      }
    }, 10);
  }

  // generate a random zombie

  function chooseZombie() {
    $("#zombie1").attr(
      "src",
      "images/" + zombies[Math.round(10 * Math.random())] + ".png"
    );
  }

  //Stop dropping zombies

  function stopAction() {
    clearInterval(action);
    $("#zombie1").hide();
  }
});
