let gameSeq = [];
let userSeq = [];

let btns = ["yellow","red","purple","green"];

let started = false;
let level = 0;
let hScore = 0;

let h2 = document.querySelector("h2");
let highScore = document.querySelector("#highScore");
highScore.innerHTML = `Highest Score : ${hScore}`;

// Reset level, Score as the new game starts
function reset(){
    if(level-1>hScore){
        hScore = level -1;
    }
    highScore.innerHTML = `Highest Score : ${hScore}`;
    started = false;
    gameSeq = [];
    userSeq = [];
    level = 0;
}

document.addEventListener("keypress",function(event){
    if (started == false){
        started = true;
        levelUp();
    }
});

// Box flashed by the system(game)
function gameFlash(btn){
    btn.classList.add("flash");
    setTimeout(function(){
        btn.classList.remove("flash")
    }, 200);
}

// Box flashed by user as he clicks on button
function userFlash(btn){
    btn.classList.add("darkGreen");
    setTimeout(function(){
        btn.classList.remove("darkGreen")
    }, 200);
}

// Increase Level by 1 as user correctly clicks the correct of boxes
function levelUp(){
    userSeq = [];
    level++;
    h2.innerText = `Level ${level}`;

    let randIdx = Math.floor(Math.random()*4);
    let randColor = btns[randIdx];
    let randBtn = document.querySelector(`.${randColor}`);
    gameSeq.push(randColor);
    gameFlash(randBtn);
}

// Every time user click on boxes check whether he clicked the right sequences of boxes or not
function checkAns(idx){
    console.log("game seq : ",gameSeq)
    if(gameSeq[idx] === userSeq[idx]){
        if(userSeq.length === gameSeq.length){
            setTimeout(levelUp,1000);
        }
    } else{
        h2.innerHTML = `Game Over! Your score was <b>${level-1}</b><br>Press any key to start`;
        document.querySelector("body").classList.add("red");
        setTimeout(function(){
            document.querySelector("body").classList.remove("red")
        } ,150);
        
        reset();
    }
}

// Called whenever any of the boxes(buttons) are clicked by user
function btnPress(){
    let btn = this;
    userFlash(btn);
    userColor = btn.getAttribute("id");
    userSeq.push(userColor);
    checkAns(userSeq.length-1);
}

let allBtns = document.querySelectorAll(".btn");

for(btn of allBtns){
    btn.addEventListener("click",btnPress)
}