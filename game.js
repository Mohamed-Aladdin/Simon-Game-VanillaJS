const buttonColors = ["red", "blue", "green", "yellow"];

let gamePattern = [];
let userClickedPattern = [];

let level = 0;
let started = false;

function nextSequence() {
  userClickedPattern = [];

  $("h1").text(`Level ${level}`);
  level++;

  randomNumber = Math.floor(Math.random() * 4);
  randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);

  $(`#${randomChosenColor}`).fadeIn(100).fadeOut(100).fadeIn(100);

  playSound(randomChosenColor);
}

function playSound(name) {
  let audio = new Audio(`sounds/${name}.mp3`);
  audio.play();
}

function animatePress(currentColor) {
  $(`#${currentColor}`).addClass("pressed");

  setTimeout(function() {
    $(`#${currentColor}`).removeClass("pressed");
  }, 100)
}

function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(nextSequence, 1000);
    }
  } else {
    playSound("wrong");
    $("body").addClass("game-over");

    $("h1").text("Game Over, Press Any Key to Restart");

    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 200);

    startOver();
  }
}

function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}

$(document).on("keydown", function() {
  if (!started) {
    $("h1").text(`Level ${level}`);
    nextSequence();
    started = true;
  }
});

$(".btn").on("click", function (event) {
  userChosenColor = event.target.id;
  userClickedPattern.push(userChosenColor);

  playSound(userChosenColor);
  animatePress(userChosenColor);

  checkAnswer(userClickedPattern.length - 1);
});