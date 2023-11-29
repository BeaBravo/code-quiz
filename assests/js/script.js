//Dependencies
var startButton = document.querySelector("#start-button");
var startPage = document.querySelector("#start-page");
var questions = document.querySelectorAll(".Quiz-questions");
var random = document.getElementById;
// var answer = querySelector.("")
var nextQuestionAns = document.querySelector(".user-view");

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
  console.log(question1.question);
  console.log(question1.option1);
  console.log(questions);
}
function startQuiz() {
  //start timer
  //go to first question
}

//USER INTERACTIONS

startButton.addEventListener("click", startQuiz);

//INITIALIZATION
init();
