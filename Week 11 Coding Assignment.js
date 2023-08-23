//These will be the arrays to hold the winning combo along with empty arrays to hold player combinations
const squares = Array.from(document.querySelectorAll(".square"));
const winner = [[1, 2, 3], [4, 5, 6], [7, 8, 9], [1, 5, 9], [3, 5, 7], [1, 4, 7], [2, 5, 8], [3, 6, 9]];
let player1 = [], player2 = [], count = 0;

//This is the function to check the array to determine the winning combo
function check(array) {
    let finalResult = false; 
    for(let item of winner) {
        let result = item.every(val => array.indexOf(val) !== -1);
        if(result) {
            finalResult = true; 
        }
    } return finalResult;
}

//This is a function to create a button to restart the game
function winningPlayer(wp){
    const game = document.createElement("div");
    const player =  document.createTextNode(wp); 
    const replay = document.createElement("button");
    game.classList.add("winner");
    game.appendChild(player);
    replay.appendChild(document.createTextNode("Restart"));
    replay.onclick = function() { restart() };
    game.appendChild(replay);
    document.body.appendChild(game);
}

//This is a function to add the X's and O's and display the game winner
function turn() {
    if(this.classList == "square") {
        count++; 
        if(count%2 !== 0) {
            this.classList.add("X");
            player1.push(Number(this.dataset.index));
            if(check(player1)) {
                winningPlayer("Congrats player one you win");
                return true;
            }
        }else {
            this.classList.add("O"); 
            player2.push(Number(this.dataset.index));
            if(check(player2)) {
                winningPlayer("Congrats player two you win");
                return true;
            }
        }
        if(count === 9) {
            winningPlayer("It's a Draw"); 
        }
    }
}

//This is a function to add X's and O's when clicking the mouse
squares.forEach(square => square.addEventListener("click", turn));

//This is a function to clear the board and restart
function restart(){
    const newBoard = document.querySelector(".winner"); 
    player1 = [];
    player2 = []; 
    count = 0;
    newBoard.remove(); 
    [].forEach.call(squares, function(reset) {
        reset.classList.remove("X");
        reset.classList.remove("O");
    });
}