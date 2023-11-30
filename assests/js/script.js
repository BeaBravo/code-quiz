//Dependencies
var startButton = document.querySelector("#start-button");
var startPage = document.querySelector("#start-page");
var gamePage = document.querySelector("#quiz-questions");
var questionDisplay = document.querySelector("#current-question");
var choices = document.querySelector("#multiple-choice");

//Global variables
// questions as objects with the answers
var question1 = {
  question: "Arrays in JavaScript can be used to store ___.",
  option1: "1. numbers and strings",
  option2: "2. other arrays",
  option3: "3. booleans",
  option4: "4. all of the above",
  correct: "option4",
};

var question2 = {
  question:
    "Which of the following methods is used to access an HTML element by their id?",
  option1: '1. querySelector("#idOfElement")',
  option2: '2. getElementById("idOfElement")',
  option3: '3. querySelector(".idOfElement")',
  option4: "4. both 1 and 2 are correct",
  correct: "option4",
};

var questions = [question1, question2];

//FUNCTIONS
function init() {
  i = 1;
  console.log(question1["option" + i]);
  console.log(questions);
}

//
function startQuiz() {
  //make start page disappear and question div appear
  startPage.setAttribute("style", "display:none");
  gamePage.setAttribute("style", "display:block");
  //start timer
  //startTimer()
  //go to first question
  displayQuestion();
}

function displayQuestion() {
  //grab question from questions variable and make <li>
  // answer question and save the click with event.target
  var index = 0;
  var currentQuestion = questions[index];
  questionDisplay.textContent = currentQuestion.question;
  for (i = 1; i < 5; i++) {
    var option = document.createElement("li");
    option.textContent = currentQuestion["option" + i];
    choices.appendChild(option);
  }
}

//USER INTERACTIONS

startButton.addEventListener("click", startQuiz);

//INITIALIZATION
init();
