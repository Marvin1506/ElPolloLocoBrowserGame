/**
 * Represents the playable character Pepe.
 * Handles player movement, animations, damage, idle behavior,
 * sound effects and camera positioning.
*/
class Character extends movableObject {
    height = 280;
    y = 65; // 150
    speed = 10;
    world;
    ignoreEnemyCollision;
    lastDamageTime = 0;
    damageCooldown = 700;
    snoringSound = null;
    isSnoring = false;
    lostScreenScheduled = false;

    offset = {
        top: 120,
        bottom: 30,
        left: 35,
        right: 30
    } 
    IMAGES_WALKING = [
        "img/2_character_pepe/2_walk/W-21.png",
        "img/2_character_pepe/2_walk/W-22.png",
        "img/2_character_pepe/2_walk/W-23.png",
        "img/2_character_pepe/2_walk/W-24.png",
        "img/2_character_pepe/2_walk/W-25.png",
        "img/2_character_pepe/2_walk/W-26.png"
    ];

    IMAGES_JUMPING = [
        "img/2_character_pepe/3_jump/J-31.png",
        "img/2_character_pepe/3_jump/J-32.png",
        "img/2_character_pepe/3_jump/J-33.png",
        "img/2_character_pepe/3_jump/J-34.png",
        "img/2_character_pepe/3_jump/J-35.png",
        "img/2_character_pepe/3_jump/J-36.png",
        "img/2_character_pepe/3_jump/J-37.png",
        "img/2_character_pepe/3_jump/J-38.png",
        "img/2_character_pepe/3_jump/J-39.png",
    ];

    IMAGES_DEAD = [
        "img/2_character_pepe/5_dead/D-51.png",
        "img/2_character_pepe/5_dead/D-52.png",
        "img/2_character_pepe/5_dead/D-53.png",
        "img/2_character_pepe/5_dead/D-54.png",
        "img/2_character_pepe/5_dead/D-55.png",
        "img/2_character_pepe/5_dead/D-56.png",
        "img/2_character_pepe/5_dead/D-57.png",
    ];

    IMAGES_HURT = [
        "img/2_character_pepe/4_hurt/H-41.png",
        "img/2_character_pepe/4_hurt/H-42.png",
        "img/2_character_pepe/4_hurt/H-43.png",
    ];

    IMAGES_IDLE = [
        "img/2_character_pepe/1_idle/idle/I-1.png",
        "img/2_character_pepe/1_idle/idle/I-2.png",
        "img/2_character_pepe/1_idle/idle/I-3.png",
        "img/2_character_pepe/1_idle/idle/I-4.png",
        "img/2_character_pepe/1_idle/idle/I-5.png",
        "img/2_character_pepe/1_idle/idle/I-6.png",
        "img/2_character_pepe/1_idle/idle/I-7.png",
        "img/2_character_pepe/1_idle/idle/I-8.png",
        "img/2_character_pepe/1_idle/idle/I-9.png",
        "img/2_character_pepe/1_idle/idle/I-10.png",
    ];

    IMAGES_AFK = [
        "img/2_character_pepe/1_idle/long_idle/I-11.png",
        "img/2_character_pepe/1_idle/long_idle/I-12.png",
        "img/2_character_pepe/1_idle/long_idle/I-13.png",
        "img/2_character_pepe/1_idle/long_idle/I-14.png",
        "img/2_character_pepe/1_idle/long_idle/I-15.png",
        "img/2_character_pepe/1_idle/long_idle/I-16.png",
        "img/2_character_pepe/1_idle/long_idle/I-17.png",
        "img/2_character_pepe/1_idle/long_idle/I-18.png",
        "img/2_character_pepe/1_idle/long_idle/I-19.png",
        "img/2_character_pepe/1_idle/long_idle/I-20.png",
    ];

    /**
     * Creates the playable character.
     * Loads all character images and starts movement,
     * animation and gravity handling.
    */
    constructor() {
        super().loadImage("img/2_character_pepe/2_walk/W-21.png");
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_JUMPING);
        this.loadImages(this.IMAGES_DEAD);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_IDLE);
        this.loadImages(this.IMAGES_AFK);
        this.animate();
        this.applyGravity();
    }

    /**
     * Checks whether the character is currently idle.
     * @returns {boolean} True if no input was detected recently.
    */
    isIdle() {
        return Date.now() - this.lastInput > 10;
    }

     /**
     * Checks whether the character has been inactive for a longer period.
     * @returns {boolean} True if no input was detected for at least ten seconds.
    */
    isLongAfk() {
        return Date.now() - this.lastInput > 10000;
    }

    /**
     * Checks whether the damage cooldown has expired.
     * @returns {boolean} True if the character can receive damage.
    */
    canTakeDamage() {
        return Date.now() - this.lastDamageTime >= this.damageCooldown;
    }

    /**
     * Applies damage to the character if the cooldown has expired.
     * @returns {boolean} True if damage was applied, otherwise false.
    */
    takeDamage() {
        if (!this.canTakeDamage()) {
            return false;
        }

        this.hit();
        this.lastDamageTime = Date.now();

        return true;
    }

    /**
     * Starts the looping snoring sound.
     * No new sound is started while Pepe is already snoring
     * or while the game is muted.
    */
    startSnoring() {
        if (this.isSnoring || soundMuted) {
            return;
        }

        this.isSnoring = true;
        this.snoringSound = new Audio("./audio/pepe_snoring.wav");
        this.snoringSound.volume = 0.03;
        this.snoringSound.loop = true;
        this.snoringSound.play();

        activeSounds.push(this.snoringSound);
    }

    /**
     * Stops the snoring sound and removes it from the active sound list.
    */
    stopSnoring() {
        if (!this.snoringSound) {
            return;
        }

        this.snoringSound.pause();
        removeActiveSound(this.snoringSound);

        this.snoringSound = null;
        this.isSnoring = false;
    }

    /**
     * Starts the character movement and animation loops.
    */
    animate() {
        this.startMovementLoop();
        this.startCharacterAnimationLoop();
    }

    /**
     * Starts the movement loop at approximately 60 updates per second.
    */
    startMovementLoop() {
        setInterval(() => {
            this.handleMovement();
        }, 1000 / 60);
    }

    /**
     * Handles player input, movement, jumping and camera positioning.
    */
    handleMovement() {
        this.updateLastInput();
        this.moveCharacter();
        this.handleJump();
        this.updateCamera();
    }

    /**
     * Updates the timestamp of the most recent player input.
    */
    updateLastInput() {
        if (this.world.keyboard.RIGHT ||
            this.world.keyboard.LEFT ||
            this.world.keyboard.SPACE ||
            this.world.keyboard.D
        ) {
            this.lastInput = Date.now();
        }
    }

    /**
     * Moves the character horizontally based on the keyboard state.
    */
    moveCharacter() {
        if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x) {
            this.moveRight();
            this.otherDirection = false;
        }

        if (this.world.keyboard.LEFT && this.x > -620) {
            this.moveLeft();
            this.otherDirection = true;
        }
    }

    /**
     * Makes the character jump when the jump key is pressed
     * and the character is standing on the ground.
    */
    handleJump() {
        if (!this.world.keyboard.SPACE || this.isAboveGround()) {
            return;
        }

        this.jump();
        playSound("./audio/Pepe_Jump.wav", 0.1);
    }

    /**
     * Updates the horizontal camera position relative to the character.
    */
    updateCamera() {
        this.world.camera_x = -this.x + 100;
    }


    /**
     * Starts the character animation loop.
    */
    startCharacterAnimationLoop() {
        setInterval(() => {
            this.updateCharacterAnimation();
        }, 100);
    }

    /**
     * Selects the correct animation based on the current character state.
    */
    updateCharacterAnimation() {
        if (this.isDead()) {
            this.handleDeadAnimation();
        } else if (this.isHurt()) {
            this.handleHurtAnimation();
        } else if (this.isAboveGround()) {
            this.handleJumpAnimation();
        } else {
            this.handleGroundAnimation();
        }
    }

    /**
     * Handles the character's death animation and game-over sequence.
    */
    handleDeadAnimation() {
        this.startDeadAnimation();
        this.playDeadAnimation(this.IMAGES_DEAD);
        this.stopSnoring();
        this.showLostScreenAfterDeath();
    }

    /**
     * Initializes the death animation and plays the death sound once.
    */
    startDeadAnimation() {
        if (this.deadAnimationStarted) {
            return;
        }

        this.currentImage = 0;
        this.deadAnimationStarted = true;
        this.speed = 0;
        playSound("./audio/Pepe_death.mp3", 0.03);
    }

    /**
     * Plays the hurt animation and damage sound.
    */
    handleHurtAnimation() {
        this.playAnimation(this.IMAGES_HURT);
        playSound("./audio/Pepe_gets_dmg.oga", 0.03);
        this.stopSnoring();
    }

    /**
     * Plays the jump animation and stops the snoring sound.
    */
    handleJumpAnimation() {
        this.playAnimation(this.IMAGES_JUMPING);
        this.stopSnoring();
    }

    /**
     * Selects the correct animation while the character is on the ground.
    */
    handleGroundAnimation() {
        if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
            this.handleWalkAnimation();
        } else if (this.isLongAfk()) {
            this.handleAfkAnimation();
        } else if (this.isIdle()) {
            this.playAnimation(this.IMAGES_IDLE);
        }
    }

    /**
     * Plays the walking animation and stops the snoring sound.
    */
    handleWalkAnimation() {
        this.playAnimation(this.IMAGES_WALKING);
        this.stopSnoring();
    }

    /**
     * Plays the long-idle animation and starts the snoring sound.
    */
    handleAfkAnimation() {
        this.playAnimation(this.IMAGES_AFK);
        this.startSnoring();
    }

    /**
     * Schedules the game-lost screen after the final death frame.
     * The screen is scheduled only once.
    */
    showLostScreenAfterDeath() {
        if (this.currentImage !== 6 || this.lostScreenScheduled) {
            return;
        }

        this.lostScreenScheduled = true;

        setTimeout(() => {
            showGameLostScreen();
        }, 500);
    }
}