let boxes = document.querySelectorAll(".box");
let newgamebtn = document.querySelector(".new-button")
let playAgainbtn = document.querySelector(".reset-button");
let resultcontainer = document.querySelector(".result-container");
let resultwinner = document.querySelector(".result");

let chanceO = true;
let count = 0; 

const patternWin = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8],
];
//Function to reset the game
const resetGame = () => {
    chanceO = true;
    count = 0;
    enableboxes();
    resultcontainer.classList.add("hide");

};

//Game logic
boxes.forEach((box) => {
    box.addEventListener("click", () => {
        console.log("box was clicked");
        if (chanceO)//turn of player 0
        {
            box.innerText = "O";
            chanceO = false;
        }
        else //turn of player X
        {
            box.innerText = "X";
            chanceO = true;
        }
        box.disabled = true;
        count++;

        let isWinner = winnerCheck();

        if (count === 9 && !isWinner) {
            gameDraw();
        }

    })
});

//Function to track a game draw.
const gameDraw = () => {
    resultwinner.innerText = `Game was a Draw.`;
    resultcontainer.classList.remove("hide");
    disableboxes();
};

//Function to disable the boxes once the game is completed.

const disableboxes = () => {
    for (let box of boxes) {
        box.disabled = true;
    }
};
//Function to enable the boxes once the game commences.
const enableboxes = () => {
    for (let box of boxes) {
        box.disabled = false;
        box.innerText = "";
    }
};
const showWinner = (winner) => {
    resultwinner.innerText = `Congratulations, Winner is ${winner}!!`;
    resultcontainer.classList.remove("hide");
    disableboxes();

};

//To check the winner

function winnerCheck() {
    for (let pattern of patternWin) {
        let val1 = boxes[pattern[0]].innerText;
        let val2 = boxes[pattern[1]].innerText;
        let val3 = boxes[pattern[2]].innerText;
        if (val1 != "" && val2 != "" && val3 != "") {
            if (val1 == val2 && val2 == val3) {
                console.log("You Won");
                showWinner(val1);
                return true;
            }
        }
    }
}

//To start a new game
newgamebtn.addEventListener("click", resetGame);

// To reset the game
playAgainbtn.addEventListener("click", resetGame);
