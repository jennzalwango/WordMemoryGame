
//declare the round, get session storage for round
let round = parseInt(sessionStorage.getItem("round")) || 1;
//determine the number of words to show
let wordCount = round;

//the timer increase based per round
let displayTime = 3 +(round -1) *2;

//get timer element
const getTimerElementCount = document.querySelector(".timerCount");

//do the count down
let timeLeft = displayTime;
const countDown= setInterval(()=>{
    let secs = timeLeft.toString().padStart(2, "0");
    getTimerElementCount.innerHTML=`Timer: 00:${secs}`;

    //decrease time
    timeLeft--;

    //check decrease of time
    if(timeLeft < 0){
        clearInterval(countDown);
    }

}, 1000);

//use fetch to get the random words
fetch(`./api/getGameWords.php?count=${wordCount}`)
.then(res => res.json())
.then(words => {
    //save words for later validation
    sessionStorage.setItem("words", JSON.stringify(
        words
    ));
    //get word container
    const wordContainer = document.getElementById('gameWordsContainer');
    wordContainer.innerHTML = ""; //clear anything that could be inside

    // loop through each word card
    words.forEach((word, index ) => {
        let div = document.createElement("div");
        div.className = "wordCard";
        div.innerText = word;
        
        //put animation, delay, stagger effect
        div.style.animationDelay = `${index * 0.2}s`;
        // append to the word container
        wordContainer.appendChild(div);

    });

    //set the time off and then redirect to game input.html
    setTimeout(() => {
        window.location.href= "gameInput.html";
        
    }, displayTime * 1000 );
})
.catch(err => console.log("Failed to load words:", err));
