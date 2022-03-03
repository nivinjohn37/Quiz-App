const highScoresList = document.getElementById("highScoresList");
const highScores = JSON.parse(localStorage.getItem("highScores")) || [];

highScores.map(score => {
  const li = document.createElement("li");
  li.innerText = `${score.name} - ${score.score}`;
  highScoresList.appendChild(li);
});