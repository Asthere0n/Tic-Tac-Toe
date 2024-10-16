//Globar variables
const pageBackground = document.getElementById('layout')
const HeaderTitle = document.getElementById('title')
const Squares = document.querySelectorAll('.square')
const NewGameButton = document.getElementById('newGameButton')
let currentPlayer, newGame

const emptyBoard = [[0,0,0],[0,0,0],[0,0,0]]


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
    }
}

//Game class
class TicTacToe {
    Player1 = new Player('Player1', 'red', 'X');
    Player2 = new Player('Player2', 'blue', 'O');
    board = Squares



    //Checking for Win conditions
    checkVictory(){
        console.log('You Won!')
    }

    //End turn
    endTurn(){
        this.checkVictory()
        if (currentPlayer == this.Player1){
            currentPlayer = this.Player2
            currentPlayer.startTurn()
        } else {
            currentPlayer = this.Player1
            currentPlayer.startTurn()
        }
    }


//Starting a new game
startNewGame(){
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
           newGame.endTurn()
        }

    })
})


