const Player = (name, marker) => {
    const getName = () => name;
    const getMarker = () => marker;

    return {getName, getMarker};
}

const gameBoard = (() => {

    const board = ["", "", "", "", "", "", "", "", ""];

    const getBoard = (index) => {
        if (index > board.length) {
            return;
        }
        return board[index];
    }

    const setBoard = (index, marker) => {
        if (index > board.length) {
            return;
        }
        return board[index] = marker;
    }

    const resetBoard = () => {
        for (let i = 0; i < board.length; i++) {
            board[i] = "";
        }
        return board;
    }

    return {getBoard, setBoard, resetBoard};

})();

const displayController = (() => {

    const cell = document.querySelectorAll(".cell");
    const textDisplay = document.querySelector(".winner");
    const resetBtn = document.querySelector("#resetBtn");
    const playerXinput = document.querySelector("#player1");
    const playerYinput = document.querySelector("#player2");
    const startBtn = document.querySelector("#startBtn");

        resetBtn.addEventListener("click", () => {
        gameBoard.resetBoard();
        for (let i = 0; i < cell.length; i++) {
            cell[i].innerText = "";
        }
        textDisplay.innerText = "";
        playerXinput.value = "";
        playerYinput.value = "";
        gameController.gameReset();
        location.reload();
    });

    startBtn.addEventListener("click", () => {
            if(playerXinput.value !== "" && playerYinput.value !== ""){
            displayTurnText();
            handleClick();
            } else {
                alert("Please enter both players names!");
                return;
            }
    });

    document.addEventListener("keypress", (event) => {
        if(event.key === "Enter") {
            event.preventDefault();
            startBtn.click();
        }
    });

    const handleClick = () => {
        cell.forEach((square) => {
            square.addEventListener("click", () => {
                if (square.innerText === "" && !gameController.getIsGameOver()) {
                    square.innerText = gameBoard.setBoard(Number(`${square.dataset.index}`), gameController.getCurrentPlayer().getMarker());
                    gameController.playGame();  
                } else {
                    return;
                }
            });
        });
    };

    const displayTurnText = () => {
        if(gameController.getCurrentPlayer().getName() === "Player X"){
            textDisplay.innerText = `${playerXinput.value}'s turn`;
        } else {
            textDisplay.innerText = `${playerYinput.value}'s turn`;
        }
    };

    const displayWinner = () => {
        if(gameController.getCurrentPlayer().getName() === "Player X"){
            textDisplay.innerText = `${playerXinput.value} won this round!`;
        } else {
            textDisplay.innerText = `${playerYinput.value} won this round!`; 
        }
    };

    const displayDraw = () => {
        textDisplay.innerText = "DRAW!";
    };

    return {displayWinner, displayTurnText, displayDraw};

})();

const gameController = (() => {
    const playerX = Player("Player X", "X");
    const playerY  = Player("Player Y", "Y");
    let currentPlayer = playerX;
    let isGameOver = false;
    let countRound = 0;

    const playGame = () => {
        if (checkWin(getCurrentPlayer().getMarker())) {
            isGameOver = true;
            displayController.displayWinner();
            return;
        }
        changePlayerTurn();
        displayController.displayTurnText();
        countRound++;

        if (countRound === 9) {
            displayController.displayDraw();
            return;
        }
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
        countRound = 0;
    }

    return { getCurrentPlayer, playGame, getIsGameOver, gameReset };

})();

