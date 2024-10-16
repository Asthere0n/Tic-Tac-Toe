//Globar variables
const pageBackground = document.getElementById('layout')
const HeaderTitle = document.getElementById('title')
const Squares = document.querySelectorAll('.square')
const NewGameButton = document.getElementById('newGameButton')
let currentPlayer, newGame
const emptyBoard = [[0, 0, 0], [0, 0, 0], [0, 0, 0]]

console.log(Squares)


//Player class
class Player {
    constructor(name, color, mark) {
        this.name = name
        this.color = color
        this.mark = mark
    }

    previousMoves = []

    startTurn() {
        console.log(`is ${this.name}'s turn NOW!`)
        pageBackground.style.backgroundColor = this.color
        HeaderTitle.innerHTML = this.name
        if (this.previousMoves.length === 3){
            this.previousMoves[0].classList.add('forgetting')
        }
    }
}

//Game class
class TicTacToe {
    Player1 = new Player('Player1', 'red', 'X');
    Player2 = new Player('Player2', 'blue', 'O');
    board = [
        [document.getElementById('A1'), document.getElementById('A2'), document.getElementById('A3')],
        [document.getElementById('B1'), document.getElementById('B2'), document.getElementById('B3')],
        [document.getElementById('C1'), document.getElementById('C2'), document.getElementById('C3')]]

    //Drawing the board in screen
    drawBoard () {
    this.board.forEach()
    }

    //Checking for Win conditions
    checkVictory() {
        console.log('You Won!')
    }

    //End turn
    endTurn() {
        this.checkVictory()
        if (currentPlayer.previousMoves.length === 4){
            const forgottenSquare = currentPlayer.previousMoves.shift()
            forgottenSquare.innerHTML = ''
            forgottenSquare.classList.remove('forgetting')
        }
        if (currentPlayer == this.Player1) {
            currentPlayer = this.Player2
            currentPlayer.startTurn()
        } else {
            currentPlayer = this.Player1
            currentPlayer.startTurn()
        }
    }

    //Starting a new game
    startNewGame() {
        console.log('New Game started')
        newGame = new TicTacToe

        //Resetting the board
        for (let square of newGame.board) {
            square.innerHTML = ''
        }

        //Defining starting player at random
        if (Math.random() >= 0.5) {
            newGame.Player1.startTurn()
            currentPlayer = newGame.Player1
        } else {
            newGame.Player2.startTurn()
            currentPlayer = newGame.Player2
        }

    }
}

//Launching the game when pressing New Game Button
NewGameButton.addEventListener('click', () => {
    newGame = new TicTacToe
    newGame.startNewGame()
})

//Making a move
Squares.forEach((square) => {
    square.addEventListener('click', () => {
        //Making moves only if game has started already
        if (square.innerHTML === '' && currentPlayer != undefined) {
            square.innerHTML = currentPlayer.mark
            currentPlayer.previousMoves.push(square)
            console.log(currentPlayer.previousMoves)
            newGame.endTurn()
        }

    })
})


