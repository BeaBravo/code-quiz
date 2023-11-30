//Dependencies
var startButton = document.querySelector("#start-button");
var startPage = document.querySelector("#start-page");
var gamePage = document.querySelector("#quiz-questions");
var questionDisplay = document.querySelector("#current-question");
var choices = document.querySelector("#multiple-choice");
var option = choices.children;
var message = document.querySelector("#message");
var timerEl = document.querySelector("#time");
var afterWindow = document.querySelector("#after-game-window");
var afterMessage = document.querySelector("#after-message");
var highScoresPage = document.querySelector("#highscores-window");
var afterButton = document.querySelector("#after-button");
var inputEl = document.querySelector("#initals");
var highScoreForm = document.querySelector("#highscore-form");
var highScoreList = document.querySelector("#highscore-list");
var viewHighScores = document.querySelector("#highscores");

//Global variables
var answer;
var currentQuestion;
var index = 0; //this is the index for the questions.
var timeLeft;
var score;
var storedScores = JSON.parse(localStorage.getItem("highscores"));
var initials;
var highscores = [];
// questions as objects with the answers
var question1 = {
  question: "Arrays in JavaScript can be used to store ___.",
  option1: "numbers and strings",
  option2: "other arrays",
  option3: "booleans",
  option4: "all of the above",
  correct: "option4",
};

var question2 = {
  question:
    "Which of the following methods is used to access an HTML element by their id?",
  option1: '.querySelector("#idOfElement")',
  option2: '.getElementById("idOfElement")',
  option3: '.querySelector(".idOfElement")',
  option4: "both 1 and 2 are correct",
  correct: "option4",
};

var questions = [question1, question2];

//FUNCTIONS
function init() {
  timeLeft = 10;
  timerEl.textContent = "time: " + timeLeft;
  message.textContent = "";
  afterMessage.nextSibling.textContent = "";

  if (storedScores !== null) {
    highscores = storedScores;
  }
}

//

function startTimer() {
  //start timer at 75 seconds
  var timerInterval = setInterval(function () {
    timeLeft--;
    timerEl.textContent = "time: " + timeLeft;
    if (timeLeft <= 0) {
      timeLeft = 0;
      timerEl.textContent = "time: " + timeLeft;
      clearInterval(timerInterval);
      gameOver();
      return;
    }

    if (index === questions.length && timeLeft > 0) {
      //this means you answered all the questions, you win the game
      clearInterval(timerInterval);
      winGame();
      return;
    }
  }, 1000);
}

function startQuiz() {
  //make start page disappear and question div appear
  startPage.setAttribute("style", "display:none");
  gamePage.setAttribute("style", "display:flex");
  //start timer
  startTimer();
  //go to first question
  displayQuestion();
}

function displayQuestion() {
  //grab question from questions variable and make <li>
  // answer question and save the click with event.targe
  currentQuestion = questions[index];
  var li = 0;
  questionDisplay.textContent = currentQuestion.question;
  for (i = 1; i < 5; i++) {
    option[li].textContent = currentQuestion["option" + i];
    li++;
  }
  console.log(currentQuestion.question);
  return currentQuestion;
}

function answerQuestion() {
  //click 1 of the 4 answers and save this as the answer

  //check if correct
  checkAnswer();

  //goes to the next question
  index++;
  if (index >= questions.length) {
    return;
  }
  displayQuestion();
}

function checkAnswer() {
  if (answer.textContent !== currentQuestion[currentQuestion.correct]) {
    // take 10 seconds from time
    timeLeft = timeLeft - 10;
    // add a message on the screen
    message.textContent = "Incorrect!";
    message.setAttribute("style", "color:red");
  } else {
    // add a message on the screen
    message.textContent = "Correct!";
    message.setAttribute("style", "color:green");
  }
}

function gameOver() {
  gamePage.setAttribute("style", "display:none");
  afterWindow.setAttribute("style", "");
  afterMessage.textContent = "Time is up! GAME OVER";
}

function winGame() {
  //save highscore
  gamePage.setAttribute("style", "display:none");
  afterWindow.setAttribute("style", "");
  highScoreForm.setAttribute("style", "");
  afterMessage.textContent = "Nicely done! You won!";
  afterMessage.nextSibling.textContent = "Your final score is: " + timeLeft;
  //need to save in local storage with JSON
  //show highscores
  displayHighScores();
}

function saveHighScore() {
  score = {
    initials: initials,
    time: timeLeft,
  };

  highscores.push(score);
  inputEl.value = "";

  localStorage.setItem("highscores", JSON.stringify(highscores));
  displayHighScores();
}

function displayHighScores() {
  highScoresPage.setAttribute("style", "");

  highScoreList.innerHTML = "";

  for (var i = 0; i < highscores.length; i++) {
    var li = document.createElement("li");
    li.setAttribute("class", "HS-item");
    li.textContent =
      highscores[i].initials + " - " + highscores[i].time + " seconds";

    highScoreList.appendChild(li);
  }
}

function playAgain() {
  index = 0;
  startPage.setAttribute("style", "");
  gamePage.setAttribute("style", "display:none");
  afterWindow.setAttribute("style", "display:none");
  highScoresPage.setAttribute("style", "display:none");
  init();
}

//USER INTERACTIONS

startButton.addEventListener("click", function (event) {
  event.stopPropagation();
  startQuiz();
});
choices.addEventListener("click", function (event) {
  event.stopPropagation();
  answer = event.target;
  answerQuestion();
});

afterButton.addEventListener("click", function (event) {
  event.stopPropagation();
  playAgain();
});

highScoreForm.addEventListener("submit", function (event) {
  event.preventDefault();
  event.stopPropagation();
  initials = inputEl.value.trim();

  if (initials === "") {
    return;
  } else {
    inputEl.disabled = true;
  }

  saveHighScore();
  return initials;
});

viewHighScores.addEventListener("click", function (event) {
  event.stopPropagation();
  startPage.setAttribute("style", "display:none");
  displayHighScores();
});

//INITIALIZATION
init();
