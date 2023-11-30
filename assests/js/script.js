//Dependencies
var startButton = document.querySelector("#start-button");
var startPage = document.querySelector("#start-page");
var gamePage = document.querySelector("#quiz-questions");
var questionDisplay = document.querySelector("#current-question");
var choices = document.querySelector("#multiple-choice");
var option = choices.children;
var message = document.querySelector("#message");
var timerEl = document.querySelector("#time");

//Global variables
var answer;
var currentQuestion;
var index = 0;
var timeLeft;
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
}

//

function startTimer() {
  //start timer at 75 seconds
  var timerInterval = setInterval(function () {
    timeLeft--;
    timerEl.textContent = "time: " + timeLeft;
    if (timeLeft === 0) {
      clearInterval(timerInterval);
      return;
    }
  }, 1000);
}

function startQuiz() {
  //make start page disappear and question div appear
  startPage.setAttribute("style", "display:none");
  gamePage.setAttribute("style", "display:block");
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
  return currentQuestion;
}

function answerQuestion(event) {
  event.stopPropagation();
  console.log("you clicked an option");
  //click 1 of the 4 answers and save this as the answer
  answer = event.target;
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
    console.log("wrong");
    // take 7 seconds from time
    // timeLeft=timeLeft-7;
    // add a message on the screen
    message.textContent = "Incorrect!";
    message.setAttribute("style", "color:red");
  } else {
    console.log("that's right!!");
    // add a message on the screen
    message.textContent = "Correct!";
    message.setAttribute("style", "color:green");
  }
}

//USER INTERACTIONS

startButton.addEventListener("click", startQuiz);
choices.addEventListener("click", answerQuestion);

//INITIALIZATION
init();
