'use strict';
const log = console.log;

function main() {

    /* Returns live HTMLCollection of elements */
    const gameGrid = document.getElementById("game-grid");
    const grids = gameGrid.getElementsByTagName("div");

    /* Query selectors */
    const score = document.querySelector(".score");
    const startBtn = document.querySelector(".start-game");

    /* Variables */
    let score = 0;
    let speed = 0.9;
    const widthN = 10;
    let interval = 0;
    let direction = 1;
    let appleIndex = 0;
    let intervalTime = 0;
    let currentIndex = 0;
    const currentSnake = [2, 1, 0]; /* 2 -> Head, 1 -> Body, 0 -> Tail */

    /* Key codes */
    const UP_KEY = 38;
    const DOWN_KEY = 40;
    const LEFT_KEY = 37;
    const RIGHT_KEY = 39;


    /* Functions start here */
    function generateGameGrid (n) {
        for(let i = 0; i < n**2; i++){
            gameGrid.appendChild(document.createElement("div"));
        };
        grids[0].className = "snake";
        grids[6].className = "apple";
    };

    function manageKeyPress (e) {
        
        grids[currentIndex].classList.remove("snake");
        const keyCode = e.keyCode;

        switch(keyCode){

            case RIGHT_KEY:
                direction = 1;
                break;
            
            case UP_KEY:
                direction = -widthN;
                break;
            
            case LEFT_KEY:
                direction = -1;
                break;
            
            case DOWN_KEY:
                direction = widthN;
                break;
        }

    };

    generateGameGrid(widthN);
    document.addEventListener('keyup', manageKeyPress);
};

document.addEventListener("DOMContentLoaded", main);