
document.getElementById("startBtn").addEventListener('click', startGame);


function startGame() {
    //reset the game state once user clicks start
    sessionStorage.setItem("score", 0);
    sessionStorage.setItem("round", 1);
    sessionStorage.removeItem("words");

    //get game session from the database

    fetch("./api/startWordGame.php")
    .then(res => {
        if (!res.ok) {
            throw new Error("HTTP error " + res.status);
        }

        return res.json();
    })
    .then(data => {
        if (data.error) {
            throw new Error(data.error); //get actual name error, helps when incase of any failure
        }

        sessionStorage.setItem("game_id", data.game_id);
        window.location.href = "game.html";
    })
    .catch(err => {
        console.error("REAL ERROR:", err);
    });

}
