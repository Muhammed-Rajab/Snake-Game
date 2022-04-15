'use strict';
const log = console.log;

const grid = document.querySelector("#grid");
const scoreDisplay = document.querySelector(".scoreDisplay");

/*
    Our snake is just an array!! Can you believe that?
*/

let width = 10;
let currentSnake = [2, 1, 0];
let currentIndex = 0, peachIndex = 0;

let score = 0;
let speed = 0.8;
let direction = 1;

let interval = 0;
let intervalTime = 0;

function createBoard() {

    let rowNo = 1;

    for (let i = 0; i < 100; i++){
        const newGrid = document.createElement('div');
        newGrid.dataset.index = i;
        newGrid.classList.add('grid-div');
        grid.appendChild(newGrid);
        
        newGrid.style.background = (i+rowNo) % 2 === 0 ? "#a2d149" : "#aad751";

        (i+1) % 10 === 0 ? rowNo++ : "";
    }
};

function startGame() {
    
    const squares = grid.querySelectorAll('div');

    // * Generates a random peach in the grid
    randompeach(squares);

    // * Intial setups
    direction = 1;
    intervalTime = 800;
    
    currentIndex = 0;
    currentSnake = [2, 1, 0];
    
    scoreDisplay.textContent = score;

    // * Adding snake class to current snake
    currentSnake.forEach(idx => squares[idx].classList.add('snake'));
    squares[currentSnake[0]].classList.add('head');
    squares[currentSnake.slice(-1)].classList.add('tail');

    // * Intervally moving the snake and taking necessary actions on move
    interval = setInterval(moveOutcome, intervalTime);

    // * Helper methods
    function randompeach(squares) {
        
        do {
            peachIndex = Math.floor(Math.random() * squares.length);
        } while (squares[peachIndex].classList.contains("snake") && !currentSnake.includes(peachIndex));
        
        // squares[peachIndex].textContent = "🍆";
        squares[peachIndex].textContent = "🍑";
        squares[peachIndex].classList.add("peach");
    };

    function control(e) {
        log("key pressed", )
        switch(e.keyCode) {
            
            case 39: // Right
                direction = 1;
                break;
            case 38: // Up
                direction = -width;
                break;
            case 37: // Left
                direction = -1;
                break;
            case 40: // Down
                direction = +width;
                break;
        }
    }
    
    function eatpeach (squares, tailIndex) {
        /*
            If tail of the snake has peach class,
                Remove the peach class
                Add snake class
                Push tail
                Generate random peach
                Increment score
                Update score
                clearInterval and update speed;
                Set new interval
        */

        if (squares[currentSnake[0]].classList.contains("peach")) {
            squares[currentSnake[0]].classList.remove("peach");
            squares[currentSnake[0]].textContent = "";
            squares[tailIndex].classList.add("snake");
            currentSnake.push(tailIndex);
            randompeach(squares);
            scoreDisplay.textContent = ++score;
            clearInterval(interval);
            intervalTime *= speed;
            interval = setInterval(moveOutcome, intervalTime);
        }
    }

    function checkForHits(squares) {
        
        const  hitBottomWall = currentSnake[0] + width >= width*width && direction === width;

        const hitRightWall = currentSnake[0] % width === width - 1 && direction === 1;

        const hitLeftWall = currentSnake[0] % width === 0 && direction === -1;

        const hitTopWall = currentSnake[0] - width <= 0 && direction === -width;

        const hitBody = squares[currentSnake[0] + direction].classList.contains("snake");
        // const hitBody = false;

        if (hitBody || hitBottomWall || hitLeftWall || hitRightWall || hitTopWall) {
            return true;
        } else {
            return false;
        }
    };

    function moveSnake(squares) {
        
        let tailIndex = currentSnake.pop();
        log(tailIndex);
        
        squares[tailIndex].classList.remove("snake");
        
        squares[tailIndex].classList.remove("tail");
        squares[currentSnake[0]].classList.remove("head");

        currentSnake.unshift(currentSnake[0] + direction);

        // * Current movement is done

        eatpeach(squares, tailIndex);
        squares[currentSnake[0]].classList.add('snake');
        
        squares[currentSnake[0]].classList.add('head');
        squares[currentSnake.slice(-1)].classList.add('tail');
    };

    function moveOutcome(){
        
        // const squares = document.querySelectorAll(".grid div");
        const squares = document.getElementsByClassName("grid-div");

        /*
            TODO: Check if got hit
            
            If hit something
                Stop game
            Else
                Move snake
        */

        if (checkForHits(squares)) {
            alert("You hit something");
            return clearInterval(interval);
        } else {
            moveSnake(squares);
        }
    };

    window.addEventListener("keyup", control);
};

document.addEventListener("DOMContentLoaded", function() {
    createBoard();
    startGame();
});

document.querySelector('.restart-btn').addEventListener('click', () => {
    window.location.reload();
});