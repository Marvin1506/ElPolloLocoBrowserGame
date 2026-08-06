let canvas;
let world;
let keyboard = new Keyboard();
let gameState = "start";
let chickenSoundIsPlaying = false;
let smallChickenSoundIsPlaying = false;
let soundMuted = localStorage.getItem("soundMuted") === "true";
const leftBtn = document.getElementById("left");
const rightBtn = document.getElementById("right");
const jumpBtn = document.getElementById("jump");
const throwBtn = document.getElementById("throw");
const activeSounds = [];
const backgroundMusic = new Audio("./audio/mfcc-mexican-mexican-mexico-mariachi-music-290633.mp3");
const muteButton = document.getElementById("mute-button");
const fullscreenButton = document.getElementById("fullscreen-button");
const restartScreenPicture = document.getElementById("lost-screen");
const restartScreenPictureWin = document.getElementById("won-screen");
const restartScreenPictureDiv = document.getElementById("end-screen");
const restartButton = document.getElementById("restart-button");
const mobileFlexBox = document.getElementById("mobile-button-flexbox");
backgroundMusic.volume = 0.005;
backgroundMusic.loop = true;

/**
 * Initializes the canvas, hides the mobile controls and starts the background music after the user's first click.
 * The click listener is required because browsers usually block audio playback until the user interacts with the page.
*/
function init() {
    canvas = document.getElementById("canvas");
    const mobileFlexBox = document.getElementById("mobile-button-flexbox");
    mobileFlexBox.classList.add("display-none");
    updateSoundState();
    updateSoundIcon();
    document.addEventListener("click",() => {
        backgroundMusic.play();
    }, { once: true });
}


/**
 * Initializes and starts a new game.
*/
function initGame() {
    startNewGame();
}

/**
 * Restarts the game after a win or loss.
 * The current end screen is hidden, the previous game is stopped and
 * a new game instance is created.
 * @param {MouseEvent} event - Click event from the restart button.
*/
function restartGame(event) {
    event.currentTarget.blur();
    if (gameState === "won") {
        hideGameWonScreen();
    } else if (gameState === "lost") {
        hideGameLostScreen();
    }
    stopGame();
    startNewGame();
}


/**
 * Creates a new level and a new world instance.
 * It also updates the game state and displays the available game controls.
*/
function startNewGame() {
    initLevel();
    world = new World(canvas, keyboard);
    gameStarted = true;
    gameState = "playing";
    muteButton.classList.remove("display-none");
    fullscreenButton.classList.remove("display-none");
    document.getElementById("mobile-button-flexbox").classList.remove("display-none");
}

/**
 * Stops the current game and resets its resources.
 * The animation frame and intervals are stopped, the keyboard state is
 * reset and the canvas is cleared.
*/
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

/**
 * Resets all keyboard input states.
*/
function resetKeyboard() {
    keyboard.LEFT = false;
    keyboard.RIGHT = false;
    keyboard.UP = false;
    keyboard.DOWN = false;
    keyboard.SPACE = false;
    keyboard.D = false;
}

/**
 * Clears the complete game canvas.
*/
function clearCanvas() {
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

/**
 * Clears all active JavaScript intervals within the selected ID range.
*/
function stopAllIntervals() {
    for (let i = 1; i < 9999; i++) window.clearInterval(i);
}

/**
 * Toggles all game audio between muted and unmuted.
 * The setting is applied to the background music and all currently active sound effects.
 * Toggles the sound icons.
*/
function toggleSound() {
    soundMuted = !soundMuted;
    localStorage.setItem("soundMuted", soundMuted);
    updateSoundState();
    updateSoundIcon();
}

/**
 * Updates the muted state of the background music and all active sounds.
 * The state is determined by the global soundMuted variable.
*/
function updateSoundState() {
    backgroundMusic.muted = soundMuted;
    activeSounds.forEach(sound => {
        sound.muted = soundMuted;
    });
}

/**
 * Creates and plays a sound effect.
 * The sound is added to the active sound list and removed after playback.
 * No sound is created while the game is muted.
 * @param {string} soundPath - Relative path to the audio file.
 * @param {number} volume - Playback volume between 0 and 1.
*/
function playSound(soundPath, volume) {
    if (soundMuted) {
        return;
    }
    const sound = new Audio(soundPath);
    sound.volume = volume;
    activeSounds.push(sound);
    sound.play();
    sound.addEventListener("ended", () => {
        removeActiveSound(sound);
    });
}

/**
 * Removes an audio object from the active sound list.
 * @param {HTMLAudioElement} sound - Audio object that should be removed.
*/
function removeActiveSound(sound) {
    const soundIndex = activeSounds.indexOf(sound);
    if (soundIndex !== -1) {
        activeSounds.splice(soundIndex, 1);
    }
}

/**
 * Plays the sound of a normal chicken.
 * The sound only starts while the game is running and while no other
 * normal chicken sound is currently playing.
*/
function playChickenSound() {
    if (soundMuted || gameState !== "playing" || chickenSoundIsPlaying) {
        return;
    }
    chickenSoundIsPlaying = true;
    const sound = new Audio("./audio/chicken_sound.mp3");
    sound.volume = 0.04;
    activeSounds.push(sound);
    sound.play();
    sound.addEventListener("ended", () => {
        chickenSoundIsPlaying = false;
        removeActiveSound(sound);
    });
}

/**
 * Plays the sound of a small chicken.
 * The sound only starts while the game is running and while no other
 * small chicken sound is currently playing.
*/
function playSmallChickenSound() {
    if (soundMuted || gameState !== "playing" || smallChickenSoundIsPlaying) {
        return;
    }
    smallChickenSoundIsPlaying = true;
    const sound = new Audio("./audio/baby_chicken_sound.mp3");
    sound.volume = 0.1;
    activeSounds.push(sound);
    sound.play();
    sound.addEventListener("ended", () => {
        smallChickenSoundIsPlaying = false;
        removeActiveSound(sound);
    });
}

/**
 * Updates the sound icon and the background color of the start-screen
 * mute button.
*/
function updateSoundIcon() {
    const soundIcon = document.getElementById("sound-icon");
    const soundButton = document.getElementById("mute-button-start");
    const startIcon = document.getElementById("sound-icon-start");
    soundIcon.src = soundMuted ? "./img/11_buttons/muted.svg" : "./img/11_buttons/sound_on.svg";
    startIcon.src = soundMuted ? "./img/11_buttons/muted.svg" : "./img/11_buttons/sound_on.svg";
    if (soundButton) {
        if (soundMuted) {
            soundIcon.src = "./img/11_buttons/muted.svg";
            soundButton.style.background = "rgba(220, 53, 69, 0.95)";
        } else {
            soundIcon.src = "./img/11_buttons/sound_on.svg";
            soundButton.style.background = "rgba(238, 138, 45, 0.95)";
        }
    }
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
        event.preventDefault();
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

leftBtn.addEventListener("touchstart", (event) => {
    preventTouchDefault(event);
    keyboard.LEFT = true;
}, { passive: false });

leftBtn.addEventListener("touchend", (event) => {
    preventTouchDefault(event);
    keyboard.LEFT = false;
}, { passive: false });

rightBtn.addEventListener("touchstart", (event) => {
    preventTouchDefault(event);
    keyboard.RIGHT = true;
}, { passive: false });

rightBtn.addEventListener("touchend", (event) => {
    preventTouchDefault(event);
    keyboard.RIGHT = false;
}, { passive: false });

jumpBtn.addEventListener("touchstart", (event) => {
    preventTouchDefault(event);
    keyboard.SPACE = true;
}, { passive: false });

jumpBtn.addEventListener("touchend", (event) => {
    preventTouchDefault(event);
    keyboard.SPACE = false;
}, { passive: false });

throwBtn.addEventListener("touchstart", (event) => {
    preventTouchDefault(event);
    keyboard.D = true;
}, { passive: false });

throwBtn.addEventListener("touchend", (event) => {
    preventTouchDefault(event);
    keyboard.D = false;
}, { passive: false });


/**
 * Prevents the browser's default touch behavior when the event is cancelable.
 * @param {TouchEvent} event - Touch event triggered by a control button.
*/
function preventTouchDefault(event) {
    if (event.cancelable) {
        event.preventDefault();
    }
}

/**
 * Displays the game-won screen and hides the game controls.
*/
function showGameWonScreen() {
    gameState = "won";
    const canvas = document.getElementById("canvas");
    restartScreenPictureWin.classList.remove("display-none");
    restartScreenPictureDiv.classList.remove("display-none");
    restartButton.classList.remove("display-none");
    canvas.classList.add("opacity");
    mobileFlexBox.classList.add("display-none");
    playSound("./audio/win_sound.mp3", 0.1);
    muteButton.classList.add("display-none");
    fullscreenButton.classList.add("display-none");
    closeFullscreenAfterGame();
}

/**
 * Hides the game-won screen and restores the game display.
*/
function hideGameWonScreen() {
    const canvas = document.getElementById("canvas");
    restartScreenPictureWin.classList.add("display-none");
    restartScreenPictureDiv.classList.add("display-none");
    restartButton.classList.add("display-none");
    canvas.classList.remove("opacity");
    mobileFlexBox.classList.remove("display-none");
}

/** 
 * Displays the game-lost screen and hides the game controls.
*/
function showGameLostScreen() {
    const canvas = document.getElementById("canvas");
    gameState = "lost";
    restartScreenPicture.classList.remove("display-none");
    restartScreenPictureDiv.classList.remove("display-none");
    restartButton.classList.remove("display-none");
    canvas.classList.add("opacity");
    mobileFlexBox.classList.add("display-none");
    muteButton.classList.add("display-none");
    fullscreenButton.classList.add("display-none");
    closeFullscreenAfterGame();
}

/**
 * Hides the game-lost screen and restores the game display.
*/
function hideGameLostScreen() {
    const canvas = document.getElementById("canvas");
    restartScreenPicture.classList.add("display-none");
    restartScreenPictureDiv.classList.add("display-none");
    restartButton.classList.add("display-none");
    canvas.classList.remove("opacity");
    mobileFlexBox.classList.remove("display-none");
}

/**
 * Leaves fullscreen mode after the game has ended.
*/
function closeFullscreenAfterGame() {
    if (document.fullscreenElement) {
        exitFullscreen();
    }
}