let gameStarted = false;

/**
 * Updates the fullscreen icon whenever the fullscreen state changes.
 */
document.addEventListener("fullscreenchange", () => {
    updateFullscreenIcon();
});

/**
 * Starts fullscreen mode for the game container.
 * @returns {void}
 */
function fullscreen() {
    let element = document.getElementById("game-content-fullscreen");
    enterFullscreen(element);
}

/**
 * Requests fullscreen mode for the given HTML element.
 * Includes prefixed fallbacks for older browsers.
 * @param {HTMLElement} element - Element that should enter fullscreen mode.
 * @returns {void}
 */
function enterFullscreen(element) {
    if (element.requestFullscreen) {
        element.requestFullscreen();
    } else if (element.msRequestFullscreen) {
        element.msRequestFullscreen();
    } else if (element.webkitRequestFullscreen) {
        element.webkitRequestFullscreen();
    }
}

/**
 * Toggles fullscreen mode on and off.
 *
 * @returns {void}
 */
function toggleFullscreen() {
    if (!document.fullscreenElement) {
        const element = document.getElementById("game-content-fullscreen");
        enterFullscreen(element);
    } else {
        exitFullscreen();
    }
}

/**
 * Exits fullscreen mode.
 * Includes prefixed fallbacks for older browsers.
 * @returns {void}
 */
function exitFullscreen() {
    if (document.exitFullscreen) {
        document.exitFullscreen();
    } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
    }
}

/**
 * Starts the game by hiding the start screen and creating the game world.
 * Prevents the game from being initialized more than once.
 * @returns {void}
 */
function startGame() {
    document.getElementById("start-screen").classList.add("display-none");

    if (!gameStarted) {
        gameStarted = true;
        initGame();
    }
}

/**
 * Displays the controls screen and hides the start menu.
 * @returns {void}
 */
function showControls() {
    document.getElementById("controls-screen").classList.remove("display-none");
    document.querySelector(".start-menu").classList.add("display-none");
}

/**
 * Hides the controls screen and shows the start menu.
 * @returns {void}
 */
function hideControls() {
    document.getElementById("controls-screen").classList.add("display-none");
    document.querySelector(".start-menu").classList.remove("display-none");
}

/**
 * Updates the fullscreen button icon depending on the current fullscreen state.
 * @returns {void}
 */
function updateFullscreenIcon() {
    const fullscreenIcon = document.getElementById("fullscreen-icon");

    if (document.fullscreenElement) {
        fullscreenIcon.src = "./img/11_buttons/fullscreen_exit.svg";
    } else {
        fullscreenIcon.src = "./img/11_buttons/fullscreen.svg";
    }
}