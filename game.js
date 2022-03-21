const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName("choice-text"));
const progressText = document.getElementById("progressText");
const scoreText = document.getElementById("score");
const progressBarFull = document.getElementById("progressBarFull");

let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];
let questions = [];
fetch("https://opentdb.com/api.php?amount=10&category=9&difficulty=medium&type=multiple").then(res =>{
  return res.json();
}).then(loadedQuestions =>{
  loadedQuestions.results.map(loadedQuestion =>{
    const formattedQuestion = {
      question:loadedQuestion.questions,
    };
    const answerChoices = [...loadedQuestion.incorrect_answers];
    formattedQuestion.answer =Math.f
  });
  questions = loadedQuestions;
  startGame();
}).catch(err =>{
  console.error(err);
});

//CONSTANTS
const CORRECT_BONUS = 10;
const MAX_QUESTIONS = 3;

startGame = () => {
  questionCounter = 0;
  score = 0;
  //[...] spread operator full copies the data from the array.
  //https://youtu.be/zZdQGs62cR8?list=PLDlWc9AfQBfZIkdVaOQXi1tizJeNJipEx&t=486
  availableQuestions = [...questions];
  getNewQuestion();
};

getNewQuestion = () => {
  if (availableQuestions.length === 0 || questionCounter >= MAX_QUESTIONS) {
    localStorage.setItem("mostRecentScore", score);
    //go to the end page
    return window.location.assign("/end.html");
  }
  questionCounter++;
  //questionCounterText.innerText = questionCounter+"/"+MAX_QUESTIONS;
  progressText.innerText = `Question ${questionCounter}/${MAX_QUESTIONS}`;
 
  //update the progress bar
  progressBarFull.style.width = `${(questionCounter / MAX_QUESTIONS) * 100}%`;
  const questionIndex = Math.floor(Math.random() * availableQuestions.length);
  currentQuestion = availableQuestions[questionIndex];
  question.innerText = currentQuestion.question;

  choices.forEach((choice) => {
    const number = choice.dataset["number"];
    choice.innerText = currentQuestion["choice" + number];
  });

  availableQuestions.splice(questionIndex, 1);

  acceptingAnswers = true;
};

choices.forEach((choice) => {
  choice.addEventListener("click", (e) => {
    if (!acceptingAnswers) return;
    acceptingAnswers = false;
    const selectedChoice = e.target;
    const selectedAnswer = selectedChoice.dataset["number"];

    let classToApply = "incorrect";
    if (selectedAnswer == currentQuestion.answer) {
      classToApply = "correct";
    }

    if (classToApply === "correct") {
      incrementScore()
    }

    selectedChoice.parentElement.classList.add(classToApply);
    setTimeout(() => {
      selectedChoice.parentElement.classList.remove(classToApply);
      getNewQuestion();
    }, 1000);
  });
});

incrementScore = () => {
  score += CORRECT_BONUS;
  scoreText.innerText = score;
};
