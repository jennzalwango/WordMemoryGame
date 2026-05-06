function loadGameAnalytics() {
    //use fetch to call the php file
    fetch("./api/admin/getGameAnalytics.php", {
        method: "GET",
    })
    .then(res => res.json()) // response in json, and the data
    .then(data => {

        document.getElementById("totalGames").innerText = data.total_games.total_games;
        document.getElementById("highestScore").innerText = data.highest.highest;
        document.getElementById("avgScore").innerText = Math.round(data.average.avg_score);

        const list = document.getElementById("topScoresList");
        list.innerHTML = "";
        data.top_scores.forEach(s => {
            let li = document.createElement("li");
            li.innerText = s.score;
            list.appendChild(li);
        });
    });
}

document.addEventListener("DOMContentLoaded", loadGameAnalytics);
