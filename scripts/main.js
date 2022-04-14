'use strict';
const log = console.log;

const grid = document.querySelector("#grid");
const scoreDisplay = document.querySelector(".scoreDisplay");

/*
    Our snake is just an array!! Can you believe that?
*/

let width = 10;
let currentSnake = [2, 1, 0];
let currentIndex = 0, appleIndex = 0;

let score = 0;
let speed = 0.8;
let direction = 1;

let interval = 0;
let intervalTime = 0;

function createBoard() {
    for (let i = 0; i < 100; i++){
        const newGrid = document.createElement('div');
        newGrid.dataset.index = i;
        newGrid.classList.add('grid-div');
        grid.appendChild(newGrid);
    }
};

function startGame() {
    
    const squares = grid.querySelectorAll('div');

    // * Generates a random apple in the grid
    randomApple(squares);

    // * Intial setups
    direction = 1;
    intervalTime = 1000;
    
    currentIndex = 0;
    currentSnake = [2, 1, 0];
    
    scoreDisplay.textContent = score;

    // * Adding snake class to current snake
    currentSnake.forEach(idx => squares[idx].classList.add('snake'));

    // * Intervally moving the snake and taking necessary actions on move
    interval = setInterval(moveOutcome, intervalTime);

    // * Helper methods
    function randomApple(squares) {
        
        do {
            appleIndex = Math.floor(Math.random() * squares.length);
        } while (squares[appleIndex].classList.contains("snake"));
        
        squares[appleIndex].classList.add("apple");
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
    
    function eatApple (squares, tailIndex) {
        /*
            If tail of the snake has apple class,
                Remove the apple class
                Add snake class
                Push tail
                Generate random apple
                Increment score
                Update score
                clearInterval and update speed;
                Set new interval
        */

        if (squares[currentSnake[0]].classList.contains("apple")) {
            squares[currentSnake[0]].classList.remove("apple");
            squares[tailIndex].classList.add("snake");
            currentSnake.push(tailIndex);
            randomApple(squares);
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
        currentSnake.unshift(currentSnake[0] + direction);

        // * Current movement is done

        eatApple(squares, tailIndex);
        squares[currentSnake[0]].classList.add('snake');
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