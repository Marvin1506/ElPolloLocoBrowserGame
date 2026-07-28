let gameStarted = false;
let soundMuted = false;

function fullscreen() {
    let element = document.getElementById("game-content-fullscreen");
    enterFullscreen(element);
}

function enterFullscreen(element) {
    if (element.requestFullscreen) {
        element.requestFullscreen();
    } else if (element.msRequestFullscreen) {
        element.msRequestFullscreen();
    } else if (element.webkitRequestFullscreen) {
        element.webkitRequestFullscreen();
    }
}

function exitFullscreen() {
    if (document.exitFullscreen) {
        document.exitFullscreen();
    } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
    }
}

function startGame() {
    document.getElementById("start-screen").classList.add("display-none");

    if (!gameStarted) {
        gameStarted = true;
        initGame();
    }
}

function showControls() {
    document.getElementById("controls-screen").classList.remove("display-none");
    document.querySelector(".start-menu").classList.add("display-none");
}

function hideControls() {
    document.getElementById("controls-screen").classList.add("display-none");
    document.querySelector(".start-menu").classList.remove("display-none");
}

function toggleSound() {
    soundMuted = !soundMuted;

    console.log("Sound muted:", soundMuted);
}