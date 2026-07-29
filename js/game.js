let canvas;
let world;
let keyboard = new Keyboard();
const leftBtn = document.getElementById("left");
const rightBtn = document.getElementById("right");
const jumpBtn = document.getElementById("jump");
const throwBtn = document.getElementById("throw");

function init() {
    canvas = document.getElementById("canvas");
}

function initGame() {
    startNewGame();
}

function restartGame(event) {
    event.currentTarget.blur();
    stopGame();
    startNewGame();
}

function startNewGame() {
    initLevel();
    world = new World(canvas, keyboard);
    gameStarted = true;
}

function stopGame() {
    if (world) {
        world.stop();
    }
    stopAllIntervals();
    resetKeyboard();
    clearCanvas();
    world = null;
    gameStarted = false;
}

function resetKeyboard() {
    keyboard.LEFT = false;
    keyboard.RIGHT = false;
    keyboard.UP = false;
    keyboard.DOWN = false;
    keyboard.SPACE = false;
    keyboard.D = false;
}

function clearCanvas() {
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function stopAllIntervals() {
    for (let i = 1; i < 9999; i++) window.clearInterval(i);
}

window.addEventListener("keydown", (event) => { // event listener that listens for keydown events and sets the corresponding property of the keyboard object to true when the key is pressed
    if (event.code == "ArrowRight") {
        keyboard.RIGHT = true;
    }
    if (event.code == "ArrowLeft") {
        keyboard.LEFT = true;
    }
    if (event.code == "ArrowUp") {
        keyboard.UP = true;
    }
    if (event.code == "ArrowDown") {
        keyboard.DOWN = true;
    }
    if (event.code == "Space") {
        keyboard.SPACE = true;
    }
    if (event.code == "KeyD") {
        keyboard.D = true;
    }
});

window.addEventListener("keyup", (event) => {
    if (event.code == "ArrowRight") {
        keyboard.RIGHT = false;
    }
    if (event.code == "ArrowLeft") {
        keyboard.LEFT = false;
    }
    if (event.code == "ArrowUp") {
        keyboard.UP = false;
    }
    if (event.code == "ArrowDown") {
        keyboard.DOWN = false;
    }
    if (event.code == "Space") {
        keyboard.SPACE = false;
    }
    if (event.code == "KeyD") {
        keyboard.D = false;
    }
});

leftBtn.addEventListener("touchstart", () => {
    event.preventDefault();
    keyboard.LEFT = true;
});

leftBtn.addEventListener("touchend", () => {
    event.preventDefault();
    keyboard.LEFT = false;
});

rightBtn.addEventListener("touchstart", () => {
    event.preventDefault();
    keyboard.RIGHT = true;
});

rightBtn.addEventListener("touchend", () => {
    event.preventDefault();
    keyboard.RIGHT = false;
});

jumpBtn.addEventListener("touchstart", () => {
    event.preventDefault();
    keyboard.SPACE = true;
});

jumpBtn.addEventListener("touchend", () => {
    event.preventDefault();
    keyboard.SPACE = false;
});

throwBtn.addEventListener("touchstart", () => {
    event.preventDefault();
    keyboard.D = true;
});

throwBtn.addEventListener("touchend", () => {
    event.preventDefault();
    keyboard.D = false;
});