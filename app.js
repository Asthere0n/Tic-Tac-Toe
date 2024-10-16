//Globar variables
const pageBackground = document.getElementById('layout')
const  HeaderTitle = document.getElementById('title')
const Squares = document.querySelectorAll('.square')
const NewGameButton = document.getElementById('newGameButton')


//Player class
class Player {
    constructor (name, color, mark){
        this.name = name
        this.color = color
        this.mark = mark
    }
    startTurn(){
        console.log(`is ${this.name}'s turn NOW!`)
        pageBackground.style.backgroundColor = this.color
        HeaderTitle.innerHTML = this.name

    }
    newMove(){
        Squares.forEach((square) => {
            square.addEventListener('click',()=>{
                if (square.innerHTML === ''){
                    square.innerHTML = this.mark
                }
            })
        })
    }


}

//Game class
class TicTacToe {
    Player1 = new Player ('Player1', 'red', 'X');
    Player2 = new Player ('Player2', 'blue', 'O');
    board = [[0,0,0],[0,0,0],[0,0,0]];
    startNewGame (){
        console.log('New Game started')
        if (Math.random () >= 0.5){
            this.Player1.startTurn()
        } else {
            this.Player2.startTurn()
        }
    }
}


//Start a new object game and launch it
NewGameButton.addEventListener('click', ()=>{
    const newGame = new TicTacToe
    newGame.startNewGame()
})



