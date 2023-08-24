

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

    const resetBoard = () => {
        for(let i = 0; i < board.length; i++) {
            board[i] = "";
        }
        return board;
    }

    return{getBoard, setBoard, resetBoard};

})();

const gameController = (() => {

const playerX = Player('agata', "X");
const playerY = Player('dan', "Y");
let currentPlayer = playerX;
let isGameOver = false;

const playGame = () => {

    if(checkWin(getCurrentPlayer().getMarker())) {
        isGameOver = true;
        displayController.displayWinner(getCurrentPlayer().getMarker());
        return;
    }
    changePlayerTurn();
    displayController.displayTurnText();
}

const checkWin = (player) => {
const winArray = [
    [0, 4, 8],
    [2, 4, 6],
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8]
];

    return winArray.some(combination => {
        return combination.every(index => {
            return gameBoard.getBoard(index) === player;
        });
    });
  
}

const getIsGameOver = () => isGameOver;

const changePlayerTurn = () => {
    return currentPlayer = currentPlayer === playerX ? playerY : playerX;
};

const getCurrentPlayer = () => currentPlayer;

const gameReset = () => {
    isGameOver = false;
}

return {getCurrentPlayer, playGame, getIsGameOver, gameReset};

})();


const displayController = (() => {

    const cell = document.querySelectorAll(".cell");
    const textDisplay = document.querySelector(".winner");
    const resetBtn = document.querySelector("#resetBtn");

    cell.forEach((square) => {
        square.addEventListener("click", () => {
                if(square.innerText === "" && !gameController.getIsGameOver()){
                square.innerText = gameBoard.setBoard(Number(`${square.dataset.index}`), gameController.getCurrentPlayer().getMarker());
                gameController.playGame();
                } else {
                    return;
                }
        });

    });

    resetBtn.addEventListener("click", () => {
        gameBoard.resetBoard();
        for(let i = 0; i < cell.length; i++) {
            cell[i].innerText = "";
        }
        textDisplay.innerText = "";
        gameController.gameReset();
    });
    

    const displayTurnText = () => {
        textDisplay.innerText = `${gameController.getCurrentPlayer().getName()}'s turn`;
    };

    const displayWinner = () => {
        textDisplay.innerText = `${gameController.getCurrentPlayer().getName()} won this round!`;
    };

    return {displayWinner, displayTurnText};

})();