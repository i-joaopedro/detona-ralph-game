const state = {
    view:{
        squares: document.querySelectorAll(".square"),
        enemy: document.querySelector(".enemy"),
        timeLeft: document.querySelector("#time_left"),
        score: document.querySelector("#score")
    },
    values:{
        gameVelocity: 1000,
        hitPosition: 0,
        result: 0,
        curretTime: 60
    },
    actions:{      
        timerId: setInterval(randomSquare, 1000),
        countDownTimerId: setInterval(countDown, 1000)
    }
}

function countDown(){
    state.values.curretTime--;
    state.view.timeLeft.textContent = state.values.curretTime;
    if(state.values.curretTime <= 0){
        clearInterval(state.actions.countDownTimerId);
        clearInterval(state.actions.timerId);
        alert("Game Over!! O seu resultado foi: " + state.values.result + " pontos.");
    }
}

function playSound(){
    let audio = new Audio("./src/audios/hit.m4a");
    audio.volume = .1;
    audio.play();
}

function randomSquare(){
    state.view.squares.forEach((square) => square.classList.remove("enemy"));
    let randomNumber = Math.floor(Math.random() * 9);
    let randomSquare = state.view.squares[randomNumber];
    randomSquare.classList.add("enemy");
    state.values.hitPosition = randomSquare.id;
}

function addListenerHitBox(){
    state.view.squares.forEach((square) => {
        square.addEventListener("mousedown", () => {
            if(square.id === state.values.hitPosition){
                state.values.result++;
                state.view.score.textContent = state.values.result;
                state.values.hitPosition = null;
                playSound();
            }
        })
    });
}

function resetGame() {
    state.values.result = 0;
    state.view.score.textContent = state.values.result;
    state.values.curretTime = 60;
    state.view.timeLeft.textContent = state.values.curretTime;

    clearInterval(state.actions.timerId);
    clearInterval(state.actions.countDownTimerId);
    state.actions.timerId = setInterval(randomSquare, state.values.gameVelocity);
    state.actions.countDownTimerId = setInterval(countDown, 1000);
}

function main(){
    addListenerHitBox();
}

main();