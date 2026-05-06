
/* add new word */
function addNewWord() {
    const word = document.getElementById("newWord").value.trim();

    if (!word) {
        document.getElementById("message").innerText = "Please enter a word.";
        return;
    }

    fetch("./api/admin/addWords.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ word: word })
    })
    .then(res => res.json())
    .then(data => {
        document.getElementById("message").innerText = data.message;
        document.getElementById("newWord").value = ""; // clear input after save
    })
    .catch(function () {
        document.getElementById("message").innerText = "Failed to add word.";
    });
}