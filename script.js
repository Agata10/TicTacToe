

const Player = (name, marker) => {
    const getName = () => name;
    const getMarker = () => marker;

    return {getName, getMarker};
}

const gameBoard = (() => {

    const board = ["", "", "", "", "", "", "", "", ""];

    const getBoard = (index) => {
        if(index > board.length) {
            return;
        }
        return board[index];
    }

    const setBoard = (index, marker) => {
        if(index > board.length) {
            return;
        }
        return board[index] = marker;
    }

    return{getBoard, setBoard};

})();

const gameController = (() => {

const playerX = Player('agata', "X");
const playerY = Player('dan', "Y");
let currentPlayer = playerX;
let isGameOver = false;






const checkIfIsGameOver = () => {
    for(let i = 0; i < 9; i++) {
        if(gameBoard.getBoard[i] === ""){
            isGameOver = false;
            console.log(gameBoard.getBoard[i]);
        }   
        }
        isGameOver = true;
        //displayController.displayWinner();   
        return isGameOver;
        
    }
    


const changePlayerTurn = () => {
    return currentPlayer = currentPlayer === playerX ? playerY : playerX;
}

const getCurrentPlayer = () => currentPlayer;
//square.textContent = gameBoard.getBoard(square.dataset.index);


return {changePlayerTurn, getCurrentPlayer, checkIfIsGameOver}

})();


const displayController = (() => {

    const cell = document.querySelectorAll(".cell");
    const textDisplay = document.querySelector(".winner");

    cell.forEach((square) => {
        square.addEventListener("click", () => {
                if(square.innerText === ""){
                square.innerText = gameBoard.setBoard(Number(`${square.dataset.index}`), gameController.getCurrentPlayer().getMarker());
                gameController.changePlayerTurn();
                displayTurnText();
                gameController.checkIfIsGameOver();
                } else {
                    return;
                }
        });

    });

    const displayTurnText = () => {
        textDisplay.innerText = `${gameController.getCurrentPlayer().getName()}'s turn`;
    };

    const displayWinner = () => {
        textDisplay.innerText = `${gameController.getCurrentPlayer().getName()} won this round!`;
    }

    return {displayWinner};

})();