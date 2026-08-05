let canvas;
let world;
let keyboard = new Keyboard();
let gameState = "start";
let chickenSoundIsPlaying = false;
let smallChickenSoundIsPlaying = false;
let soundMuted = false;
const leftBtn = document.getElementById("left");
const rightBtn = document.getElementById("right");
const jumpBtn = document.getElementById("jump");
const throwBtn = document.getElementById("throw");
const activeSounds = [];
const backgroundMusic = new Audio("./audio/mfcc-mexican-mexican-mexico-mariachi-music-290633.mp3");
const muteButton = document.getElementById("mute-button");
const fullscreenButton = document.getElementById("fullscreen-button");
backgroundMusic.volume = 0.005;
backgroundMusic.loop = true;

function init() {
    canvas = document.getElementById("canvas");
    const mobileFlexBox = document.getElementById("mobile-button-flexbox");
    mobileFlexBox.classList.add("display-none");
    document.addEventListener("click",() => {
        backgroundMusic.play();
    }, { once: true });
}

function initGame() {
    startNewGame();
}

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

function startNewGame() {
    initLevel();
    world = new World(canvas, keyboard);
    gameStarted = true;
    gameState = "playing";
    muteButton.classList.remove("display-none");
    fullscreenButton.classList.remove("display-none");
    document.getElementById("mobile-button-flexbox").classList.remove("display-none");
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

function toggleSound() {
    soundMuted = !soundMuted;

    backgroundMusic.muted = soundMuted;

    activeSounds.forEach(sound => {
        sound.muted = soundMuted;
    });

    updateSoundIcon();
}

function playSound(soundPath, volume) {
    if (soundMuted) {
        return;
    }
    const sound = new Audio(soundPath);
    sound.volume = volume;
    activeSounds.push(sound);

    sound.play().catch(error => {
        console.warn("Sound konnte nicht abgespielt werden:", error);
    });
    sound.addEventListener("ended", () => {
        removeActiveSound(sound);
    });
}

function removeActiveSound(sound) {
    const soundIndex = activeSounds.indexOf(sound);

    if (soundIndex !== -1) {
        activeSounds.splice(soundIndex, 1);
    }
}

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

function updateSoundIcon() {
    const soundIcon = document.getElementById("sound-icon");
    const soundButton = document.getElementById("mute-button-start");

    soundIcon.src = soundMuted ? "./img/11_buttons/muted.svg" : "./img/11_buttons/sound_on.svg";
    
    if (soundButton) {
        if (soundMuted) {
            soundButton.style.background = "rgba(220, 53, 69, 0.95)";
        } else {
            soundButton.style.background = "rgba(255, 170, 0, 0.85)";
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
    event.preventDefault();
    keyboard.LEFT = true;
});

leftBtn.addEventListener("touchend", (event) => {
    event.preventDefault();
    keyboard.LEFT = false;
});

rightBtn.addEventListener("touchstart", (event) => {
    event.preventDefault();
    keyboard.RIGHT = true;
});

rightBtn.addEventListener("touchend", (event) => {
    event.preventDefault();
    keyboard.RIGHT = false;
});

jumpBtn.addEventListener("touchstart", (event) => {
    event.preventDefault();
    keyboard.SPACE = true;
});

jumpBtn.addEventListener("touchend", (event) => {
    event.preventDefault();
    keyboard.SPACE = false;
});

throwBtn.addEventListener("touchstart", (event) => {
    event.preventDefault();
    keyboard.D = true;
});

throwBtn.addEventListener("touchend", (event) => {
    event.preventDefault();
    keyboard.D = false;
});

function showGameWonScreen() {
    gameState = "won";
    const restartScreenPicture = document.getElementById("won-screen");
    const restartScreenPictureDiv = document.getElementById("end-screen");
    const restartButton = document.getElementById("restart-button");
    const canvas = document.getElementById("canvas");
    const mobileFlexBox = document.getElementById("mobile-button-flexbox");
    restartScreenPicture.classList.remove("display-none");
    restartScreenPictureDiv.classList.remove("display-none");
    restartButton.classList.remove("display-none");
    canvas.classList.add("opacity");
    mobileFlexBox.classList.add("display-none");
    playSound("./audio/win_sound.mp3", 0.1);
    muteButton.classList.add("display-none");
    fullscreenButton.classList.add("display-none");
    closeFullscreenAfterGame();
}

function hideGameWonScreen() {
    const restartScreenPicture = document.getElementById("won-screen");
    const restartScreenPictureDiv = document.getElementById("end-screen");
    const restartButton = document.getElementById("restart-button");
    const canvas = document.getElementById("canvas");
    const mobileFlexBox = document.getElementById("mobile-button-flexbox");
    restartScreenPicture.classList.add("display-none");
    restartScreenPictureDiv.classList.add("display-none");
    restartButton.classList.add("display-none");
    canvas.classList.remove("opacity");
    mobileFlexBox.classList.remove("display-none");
}

function showGameLostScreen() {
    gameState = "lost";
    const restartScreenPicture = document.getElementById("lost-screen");
    const restartScreenPictureDiv = document.getElementById("end-screen");
    const restartButton = document.getElementById("restart-button");
    const canvas = document.getElementById("canvas");
    const mobileFlexBox = document.getElementById("mobile-button-flexbox");
    restartScreenPicture.classList.remove("display-none");
    restartScreenPictureDiv.classList.remove("display-none");
    restartButton.classList.remove("display-none");
    canvas.classList.add("opacity");
    mobileFlexBox.classList.add("display-none");
    muteButton.classList.add("display-none");
    fullscreenButton.classList.add("display-none");
    closeFullscreenAfterGame();
}

function hideGameLostScreen() {
    const restartScreenPicture = document.getElementById("lost-screen");
    const restartScreenPictureDiv = document.getElementById("end-screen");
    const restartButton = document.getElementById("restart-button");
    const canvas = document.getElementById("canvas");
    const mobileFlexBox = document.getElementById("mobile-button-flexbox");
    restartScreenPicture.classList.add("display-none");
    restartScreenPictureDiv.classList.add("display-none");
    restartButton.classList.add("display-none");
    canvas.classList.remove("opacity");
    mobileFlexBox.classList.remove("display-none");
}

function closeFullscreenAfterGame() {
    if (document.fullscreenElement) {
        exitFullscreen();
    }
}