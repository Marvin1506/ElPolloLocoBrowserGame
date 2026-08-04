let gameStarted = false;

document.addEventListener("fullscreenchange", () => {
    updateFullscreenIcon();
});

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

function toggleFullscreen() {
    if (!document.fullscreenElement) {
        const element = document.getElementById("game-content-fullscreen");
        enterFullscreen(element);
    } else {
        exitFullscreen();
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

function updateFullscreenIcon() {
    const fullscreenIcon = document.getElementById("fullscreen-icon");

    if (document.fullscreenElement) {
        fullscreenIcon.src = "./img/11_buttons/fullscreen_exit.svg";
    } else {
        fullscreenIcon.src = "./img/11_buttons/fullscreen.svg";
    }
}