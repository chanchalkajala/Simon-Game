let gameSequence = [];
let userSequence = [];

let btns = ["red", "yellow", "green", "purple"];

let started = false;
let level = 0;
let highScore = 0; // 🆕 High score track karega

let h2 = document.querySelector("h2");
let h3 = document.querySelector("#high-score"); // 🆕 h3 select

document.addEventListener("keypress", function() {
    if (started == false) {
        console.log("game is started");
        started = true;
        levelUp();
    }
});

function btnFlash(btn) {
    btn.classList.add("flash");
    setTimeout(function(){
        btn.classList.remove("flash");
    }, 250);
}

function levelUp() {
    userSequence = [];
    level++;
    h2.innerText = `Level ${level}`;
    
    let randIdx = Math.floor(Math.random() * 4);
    let randColor = btns[randIdx];
    let randBtn = document.querySelector(`.btn.${randColor}`);
    gameSequence.push(randColor);

    console.log(gameSequence);
    btnFlash(randBtn);
}

function checkAns(idx) {
    if (userSequence[idx] === gameSequence[idx]) {
        if (userSequence.length === gameSequence.length) {
            setTimeout(levelUp, 1000);
            userSequence = [];
        }
    } else {
        // ✅ Update high score if needed
        if (level - 1 > highScore) {
            highScore = level - 1;
            h3.innerText = `High Score: ${highScore}`;
        }

        h2.innerHTML = `Game over! your score was <b>${level - 1}</b> <br>
         Press any key to start.`;
        document.querySelector("body").style.backgroundColor = "red";
        setTimeout(function() {
            document.querySelector("body").style.color = "white";
        }, 150)

        started = false;
        level = 0;
        gameSequence = [];
        userSequence = [];
    }
}

function btnPress() {
    let btn = this;
    btnFlash(btn);

    let userColor = btn.getAttribute("id");
    userSequence.push(userColor);

    checkAns(userSequence.length - 1);
}

let allBtns = document.querySelectorAll(".btn");
for (let button of allBtns) {
    button.addEventListener("click", btnPress);
}
