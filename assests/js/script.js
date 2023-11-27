var startButton = document.querySelector("#start-button");
var startPage = document.querySelector("#start-page");
var questions = document.querySelectorAll(".Quiz-questions");
var answered = document.querySelectorAll("#choices");
var nextQuestionAns = document.querySelector(".user-view");
var index = 0;
var currentQuestion;

console.log("display", questions[0].style);
console.log(answered);
function startQuiz(event) {
  event.stopPropagation();
  //this is where the timer will start
  startPage.setAttribute("style", "display:none"); //start page will disappear

  //it will display question 1
  questions[0].setAttribute("style", "display:block");
}

function nextQuestion(direction) {
  index = index + direction;
  if (index == questions.length - 1) {
    return;
  }
  currentQuestion = questions[index];
  questions[index - 1].setAttribute("style", "display:none");
  currentQuestion.setAttribute("style", "display:block");
  console.log("current question is " + (index + 1));
  console.log("index", index);
}

startButton.addEventListener("click", startQuiz);

nextQuestionAns.addEventListener("click", function (event) {
  event.stopPropagation();
  nextQuestion(1);
});
