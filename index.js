const info = document.querySelector(".info");
const boxes = document.querySelectorAll(".box");
const gamebtn = document.querySelector(".btn");

let currentPlayer;
let gameGrid;

const winningPosition = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];

function initgame(){
    currentPlayer = "X";
    gameGrid = ["","","","","","","","",""];
    boxes.forEach((box,index)=>{
        box.innerText = "";
        boxes[index].style.pointerEvents = "all";
        box.classList = `box box${index+1}`;
    });
    gamebtn.classList.remove("active");
    info.innerText = `Current Player - ${currentPlayer}`;
}
initgame();

function swapPlayer(){
    if(currentPlayer === "X"){
        currentPlayer = "O";
    }
    else{
        currentPlayer = "X";
    }
    info.innerText = `Current Player - ${currentPlayer}`;
}

function CheckGameOver(){
    let answer = "";
    winningPosition.forEach((position) =>{
        if((gameGrid[position[0]] !== "" || gameGrid[position[1]] !== "" || gameGrid[position[2]] !== "" ) &&
         (gameGrid[position[0]] === gameGrid[position[1]] && gameGrid[position[1]] === gameGrid[position[2]])){
            if(gameGrid[position[0]] === "O"){
                answer = "O";
            }   
            else{
                answer = "X";
            }

            boxes.forEach((box)=>{
                box.style.pointerEvents = "none";
            })
            boxes[position[0]].classList.add("win");
            boxes[position[1]].classList.add("win");
            boxes[position[2]].classList.add("win");
        }
    });
    if(answer !== ""){
        info.innerText = `Winning Player - ${answer}`;
        gamebtn.classList.add("active");
        return;
    }

    let fillCount = 0;
    gameGrid.forEach((box)=>{
        if(box !== ""){
            fillCount++;
        }
    });
    if(fillCount === 9){
        info.innerText = "Game tied !";
        gamebtn.classList.add("active");
    }
}
function handleClick(index){
    if(gameGrid[index] === ""){
        boxes[index].innerText = currentPlayer;
        gameGrid[index] = currentPlayer;
        boxes[index].style.pointerEvents = "none";
        swapPlayer();
        CheckGameOver();
    }
}

boxes.forEach((box,index) => {
    box.addEventListener("click",()=>{
        handleClick(index);
    });
});

gamebtn.addEventListener("click",initgame);