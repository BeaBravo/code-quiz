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

var question3 = {
  question:
    "Which of the following methods can be used to display data in some form using JavaScript?",
  option1: "document.write()",
  option2: "console.log()",
  option3: "window.alert()",
  option4: "all of the above",
  correct: "option4",
};

var question4 = {
  question: "What is a function() known as when not defining a name for it?",
  option1: "undefined",
  option2: "anonymous",
  option3: "unnamed",
  option4: "this is not possible in JavaScript",
  correct: "option2",
};

var question5 = {
  question:
    "Which funtion is used to serialize an object into a JSON string in JavaScript",
  option1: "stringfy()",
  option2: "parse()",
  option3: "switch()",
  option4: "convert()",
  correct: "option1",
};

var question6 = {
  question: "How to stop an interval timer in JavaScript",
  option1: "clearTimer",
  option2: "stopInterval",
  option3: "clearInterval",
  option4: "stopTimer",
  correct: "option3",
};

var question7 = {
  question: "How do we write a comment in JavaScript",
  option1: "/**/",
  option2: "//",
  option3: "<!-- -->",
  option4: "all of the above",
  correct: "option2",
};

var questions = [
  question1,
  question2,
  question3,
  question4,
  question5,
  question6,
  question7,
];

//FUNCTIONS
function init() {
  timeLeft = 60;
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
  displayHighScores();
});

//INITIALIZATION
init();
