//Globar variables
const pageBackground = document.getElementById('layout')
const HeaderTitle = document.getElementById('headerTitle')
const Squares = document.querySelectorAll('.square')
const NewGameButton = document.querySelectorAll('.newGameButton')
const VictoryPopUp = document.getElementById('VictoryPopUp')
let currentPlayer, newGame
let Victory = false



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

        //Indicates whose turn is it
        pageBackground.style.backgroundColor = this.color
        HeaderTitle.innerHTML = this.name

        //Indicates wich square is going to be Forgotten after your next pick
        if (this.previousMoves.length === 3) {
            this.previousMoves[0].classList.add('forgetting')
        }
    }
}

//Game class
class TicTacToe {
    Player1 = new Player('Player1', 'red', 'X');
    Player2 = new Player('Player2', 'blue', 'O');


    //Checking for Win conditions
    checkVictory() {
        const winningPositions = [
            ['A1', 'A2', 'A3'],
            ['B1', 'B2', 'B3'],
            ['C1', 'C2', 'C3'],
            ['A1', 'B1', 'C1'],
            ['A2', 'B2', 'C2'],
            ['A3', 'B3', 'C3'],
            ['A1', 'B2', 'C3'],
            ['C1', 'B2', 'A3']
        ]


        for (let position of winningPositions) {
            if (position.every(id => currentPlayer.previousMoves.some(square => square.id === id))) {
                return true;
            }
        }
        return false;
    }

    //End turn
    endTurn() {
        //Removes the forgotten squared
        if (currentPlayer.previousMoves.length === 4) {
            const forgottenSquare = currentPlayer.previousMoves.shift()
            forgottenSquare.innerHTML = ''
            forgottenSquare.classList.remove('forgetting')
        }

        //Checks if that was a winning move. 
        if (this.checkVictory()){
            Victory = true
            VictoryPopUp.classList.add('show')
            pageBackground.style.backgroundColor = '#f8ba00'
            HeaderTitle.innerHTML = "//GAME OVER"
            HeaderTitle.style.color = "black"
            console.log(`${currentPlayer.name} WON!`)
            console.log(currentPlayer.previousMoves)
            currentPlayer.previousMoves.forEach((square)=>{
                square.classList.add('win')
            }
            );
        }

        // If no-one won yet then start next player Turn
        if (currentPlayer == this.Player1 && Victory === false) {
            currentPlayer = this.Player2
            currentPlayer.startTurn()
        } else if (currentPlayer == this.Player2 && Victory === false){
            currentPlayer = this.Player1
            currentPlayer.startTurn()
        }
    }

    //Starting a new game
    startNewGame() {
        console.log('New Game started')
        Victory=false
        HeaderTitle.style.color = "white"
        newGame = new TicTacToe

        //Resetting the board
        for (let square of Squares) {
            square.innerHTML = ''
            square.classList.remove('forgetting')
            square.classList.remove('win')
            VictoryPopUp.classList.remove('show')
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
NewGameButton.forEach((button) => {
    button.addEventListener('click', () => {
        newGame = new TicTacToe
        newGame.startNewGame()
    })
})

//Making a move
Squares.forEach((square) => {
    square.addEventListener('click', () => {
        //Making moves only if game has started already
        if (square.innerHTML === '' && currentPlayer != undefined && Victory === false) {
            square.innerHTML = currentPlayer.mark
            currentPlayer.previousMoves.push(square)
            console.log(currentPlayer.previousMoves)
            newGame.endTurn()
        }

    })
})


