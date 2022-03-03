const username = document.getElementById("username");
const saveScoreBtn = document.getElementById("saveScroreButton");
const mostRecentScore = localStorage.getItem("mostRecentScore");
const finalScore = document.getElementById("finalScore");
finalScore.innerText = mostRecentScore;
const highScores = JSON.parse(localStorage.getItem("highScores")) || [];

username.addEventListener("keyup", (e) => {
  console.log(username.value);
  saveScoreBtn.disabled = !username.value;
});

saveHighScore = (e) => {
  e.preventDefault();
  const score ={
    score: mostRecentScore,
    name: username.value
  }
  highScores.push(score);
  highScores.sort((a,b) => b.score - a.score);
  highScores.splice(5);

  localStorage.setItem("highScores", JSON.stringify(highScores));
  window.location.assign("/");
};

