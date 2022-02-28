const username = document.getElementById("username");
const saveScoreBtn = document.getElementById("saveScroreButton");
const mostRecentScore = localStorage.getItem("mostRecentScore");
const finalScore = document.getElementById("finalScore");
finalScore.innerText = mostRecentScore;

username.addEventListener("keyup", (e) => {
  console.log(username.value);
  saveScoreBtn.disabled = !username.value;
});

saveHighScore = (e) => {
  e.preventDefault();
};
