const X_CLASS = 'x'                 // const X_CLASS = 'x'
const CIRCLE_CLASS = 'circle'       // const CIRCLE_CLASS = 'circle'
const WINNING_COMBINATIONS = [      // const WINNING_COMBINATIONS = [
  [0, 1, 2],                        //     [0, 1, 2],
  [3, 4, 5],                        //     [3, 4, 5],
  [6, 7, 8],                        //     [6, 7, 8],
  [0, 3, 6],                        //     [0, 3, 6],
  [1, 4, 7],                        //     [1, 4, 7],
  [2, 5, 8],                        //     [2, 5, 8],
  [0, 4, 8],                        //     [0, 4, 8],
  [2, 4, 6]                   //     [2, 4, 6]

]
// ]

const cellElements = document.querySelectorAll('[data-cell]')
const board = document.getElementById('board')
const winningMessageElement = document.getElementById('winningMessage')
const restartButton = document.getElementById('restartButton')
const winningMessageTextElement = document.querySelector('[data-winning-message-text]')
let circleTurn

startGame()

restartButton.addEventListener('click', startGame)


function startGame() {
    circleTurn = false
    cellElements.forEach(cell => {
        cell.classList.remove(X_CLASS)
        cell.classList.remove(CIRCLE_CLASS)
        cell.removeEventListener('click', handleClick)
        // This will only fire the event listener once
        cell.addEventListener('click', handleClick, { once: true })
    })
    setBoardHoverClass()
    winningMessageElement.classList.remove('show')
}

//  function handleClick(e) -> This would indicate whether the user has clicked on the cells
function handleClick(e) {
    const cell = e.target
    const currentClass = circleTurn ? CIRCLE_CLASS : X_CLASS
    placeMark(cell, currentClass)
    if (checkWin(currentClass)) {
        endGame(false)
    } else if (isDraw()) {
        endGame(true)
    } else {
        swapTurns()
        setBoardHoverClass()
    }
}
function endGame(draw) {
    if (draw) {
        winningMessageTextElement.innerText = 'Draw!'
    }
    else {
        winningMessageTextElement.innerText = `${circleTurn ? "O's" : "X's"} Wins! `
    }
    winningMessageElement.classList.add('show')
}

function isDraw() {
    return [...cellElements].every(cell => {
        return cell.classList.contains(X_CLASS) || cell.classList.contains(CIRCLE_CLASS)
    })
}

function placeMark(cell, currentClass) {
    cell.classList.add(currentClass)
}


function swapTurns() {
    circleTurn = !circleTurn
}


function setBoardHoverClass() {
    board.classList.remove(X_CLASS)
    board.classList.remove(CIRCLE_CLASS)
    if (circleTurn) {
        board.classList.add(CIRCLE_CLASS)
    } else {
        board.classList.add(X_CLASS)
    }
}



function checkWin(currentClass) {
    return WINNING_COMBINATIONS.some(combination => {
        //This will return true if any of the values inside are true
        return combination.every(index => {
            return cellElements[index].classList.contains(currentClass)//If the current class is in all three of the elements inside of the combination then we are a winner
        })
    })
}