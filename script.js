const Gameboard = (() => {
    const board = ["", "", "", "", "", "", "", "", ""];

    const getBoard = () => board;

    const resetBoard = () => {
        for(let i = 0; i < 9; i++) {
               board[i] = ""; 
        }
        return board;
    };

    return {getBoard, resetBoard};
})();

function Player(name, sign) {
    this.name = name;
    this.sign = sign;

    const getName = () => name;
    const getSign = () => sign;

    return {getName, getSign};
}

const GameController = (() => {
    const playerXnameInput = document.querySelector("#player1");
    const playerYnameInput = document.querySelector("#player2");
    const text = document.querySelector(".turn");
    
    
    const start = () => {
        const playerXname = playerXnameInput.value;
        const playerYname = playerYnameInput.value;
        const playerX = Player(playerXname, "X");
        const playerY = Player(playerYname, "Y");

        let currentPlayer = playerX;

        console.log(`${playerX.getName()}`);

        if(currentPlayer == playerX){
            text.innerHTML = `${playerX.getName()}'s turn`;
        } else {
            text.innerHTML = `${playerY.getName()}'s turn`;
        }
    }
  
    return{start};

})();



const DisplayController = (() => {
    const cell = document.querySelectorAll(".cell"); 
    const startBtn = document.querySelector("#startBtn");

    startBtn.addEventListener("click", () => GameController.start());

    const updateScreen = () => {
    for(let i = 0; i < cell.length; i++){
        cell[i].textContent = "X";
    }
    };

    updateScreen();

    return {updateScreen}
  
})();
    


