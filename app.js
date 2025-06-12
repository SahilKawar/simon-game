let userSeq=[]; // we will add and check for the sequence
let gameSeq=[]; // we will add new color to this that user has generated

let btns = ["yellow","red", "purple", "green"];

let started = false;
let level =0;
let maxScore =0;
let h2 = document.querySelector("h2");


document.addEventListener("keypress",function() { // press any key on our window to start game
    if (started == false) {
    console.log("game started");
    started = true; // once game started then set true
    levelUp();
    }
});

function gameflash(btn){ // choose btn arg to perform funct
    btn.classList.add("flash"); // add flash through css
    setTimeout(function(){ // class is remove by set timeout in .25 seconds
        btn.classList.remove("flash");
    },250);
}
function userflash(btn){ // choose btn arg to perform funct
    btn.classList.add("userflash"); // add flash through css
    setTimeout(function(){ // class is remove by set timeout in .25 seconds
        btn.classList.remove("userflash");
    },250);
}

function levelUp(){ 
    userSeq = []; // after each level up user sequence is reset (to empty value)
    level++;// start level 1
    maxScore = Math.max(level, maxScore);
    h2.innerHTML  = `<b>Level ${level} </b> <br> Highest Score : ${maxScore}` ; // change h2 text

    let randIdx = Math.floor(Math.random() * 4); // generating rand index for game seq by js
    let randColor = btns[randIdx]; // choosing color through idx
    let randBtn = document.querySelector(`.${randColor}`); // we have selectd the class through $
    //console.log(randIdx);// now printing what game has selected
    //console.log(randColor);
    //console.log(randBtn);
    gameSeq.push(randColor);
    console.log(gameSeq);
    gameflash(randBtn); // flash what game has or the above funtion has generated for us randIdx, through which we have created randColor and then randBtn through query selector, we have selected it an 
}
function checkAns(idx){
    //console.log("curr level : " ,level); // we track level because it helps us to track and check for last added color in the sequences
    if(userSeq[idx]===gameSeq[idx]){
        if(userSeq.length == gameSeq.length){
            setTimeout(levelUp, 1000); // else we will wait to reach it to the last level, settimeout so that we know if their is same color one after another
        }
    }else{
        h2.innerHTML = `Game over! Your score was <b> ${level}</b> <br> Highest Score: ${maxScore} <br> Press any key to start`; // after game start we need to reset it and started is also true after true;
        // red background with timout and also print score
        document.querySelector("body").style.backgroundColor = "rgb(247, 163, 192)";
        setTimeout(function(){
            document.querySelector("body").style.backgroundColor = " #e9ecef";
        },350);
        reset();
    }
}
function btnPress(){
   // console.log(this); // we are printing the button class that we have clicked and what we need to do is to add this color to our sequences
    let btn = this;
    userflash(btn);
    userColor = btn.getAttribute("id"); // see html
    userSeq.push(userColor);
    checkAns(userSeq.length-1);
}
let allBtns = document.querySelectorAll(".btn");
for(btn of allBtns){
    btn.addEventListener("click",btnPress);
}
function reset(){
    started  = false;
    gameSeq = [];
    userSeq = [];
    level =0;
}