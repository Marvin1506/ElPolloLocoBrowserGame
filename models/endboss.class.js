/**
 * Represents the final boss enemy in the game.
*/
class Endboss extends movableObject {

    height = 400;
    width = 250;
    y = 50;
    energy = 100;
    speedY = 0;
    speed = 0.5;

    bossActivated = false;
    bossState = "waiting";
    attackImageIndex = 0;
    walkPhaseStartTime = 0;

    offset = {
        top: 110,
        bottom: 30,
        left: 35,
        right: 30
    }

    IMAGES_WALK = [
        "img/4_enemie_boss_chicken/1_walk/G1.png",
        "img/4_enemie_boss_chicken/1_walk/G2.png",
        "img/4_enemie_boss_chicken/1_walk/G3.png",
        "img/4_enemie_boss_chicken/1_walk/G4.png",
    ];

    IMAGES_ALERT = [
        "img/4_enemie_boss_chicken/2_alert/G5.png",
        "img/4_enemie_boss_chicken/2_alert/G6.png",
        "img/4_enemie_boss_chicken/2_alert/G7.png",
        "img/4_enemie_boss_chicken/2_alert/G8.png",
        "img/4_enemie_boss_chicken/2_alert/G9.png",
        "img/4_enemie_boss_chicken/2_alert/G10.png",
        "img/4_enemie_boss_chicken/2_alert/G11.png",
        "img/4_enemie_boss_chicken/2_alert/G12.png",
    ];

    IMAGES_ATTACK = [
        "img/4_enemie_boss_chicken/3_attack/G13.png",
        "img/4_enemie_boss_chicken/3_attack/G14.png",
        "img/4_enemie_boss_chicken/3_attack/G15.png",
        "img/4_enemie_boss_chicken/3_attack/G16.png",
        "img/4_enemie_boss_chicken/3_attack/G17.png",
        "img/4_enemie_boss_chicken/3_attack/G18.png",
        "img/4_enemie_boss_chicken/3_attack/G19.png",
        "img/4_enemie_boss_chicken/3_attack/G20.png",
    ];

    IMAGES_DEAD = [
        "img/4_enemie_boss_chicken/5_dead/G24.png",
        "img/4_enemie_boss_chicken/5_dead/G25.png",
        "img/4_enemie_boss_chicken/5_dead/G26.png",
    ];

    IMAGES_HURT = [
        "img/4_enemie_boss_chicken/4_hurt/G21.png",
        "img/4_enemie_boss_chicken/4_hurt/G22.png",
        "img/4_enemie_boss_chicken/4_hurt/G23.png",
    ];

    /**
     * Creates the end boss and loads all required images.
    */
    constructor() {
        super().loadImage("img/4_enemie_boss_chicken/2_alert/G5.png");
        this.loadImages(this.IMAGES_WALK);
        this.loadImages(this.IMAGES_ATTACK);
        this.loadImages(this.IMAGES_ALERT);
        this.loadImages(this.IMAGES_DEAD);
        this.loadImages(this.IMAGES_HURT);
        this.x = 2600;
    }

    /**
     * Checks whether the boss is dead.
     * @returns {boolean} True if the boss has no energy left.
    */
    isDead() {
        return this.energy === 0;
    }

    /**
     * Starts the boss movement and animation loops.
    */
    animate() {
        this.animateImages();
        this.animateMovement();
    }

    /**
     * Starts the boss image animation loop.
    */
    animateImages() {
        setInterval(() => {
            if (this.isDead()) {
                this.handleDeadAnimation();
                return;
            }
            if (this.isHurt()) {
                this.playAnimation(this.IMAGES_HURT);
                return;
            }
            this.handleBossImages();
        }, 100);
    }

    /**
     * Starts the boss movement loop.
    */
    animateMovement() {
        setInterval(() => {
            if (this.bossState === "walking" && !this.isDead() && !this.isHurt()) {
                this.moveLeft();
            }
        }, 1000 / 60);
    }

    /**
     * Updates the boss animation based on its current state.
    */
    handleBossImages() {
        const pepeX = this.world.character.x;

        if (this.isWaitingForPepe(pepeX)) {
            return;
        }

        if (this.bossState === "walking") {
            this.handleWalkingPhase();
            return;
        }

        if (this.bossState === "attacking") {
            this.handleAttackPhase();
        }
    }

    /**
     * Checks whether the boss should remain idle until the player reaches it.
     * @param {number} pepeX The player's current x position.
     * @returns {boolean} True if the boss should remain waiting.
    */
    isWaitingForPepe(pepeX) {
        if (!this.bossActivated && pepeX >= 2000) {
            this.bossActivated = true;
            this.startWalkingPhase();
        }

        if (!this.bossActivated) {
            this.playAnimation(this.IMAGES_ALERT);
            return true;
        }

        return false;
    }

    /**
     * Starts the walking phase of the boss.
    */
    startWalkingPhase() {
        this.bossState = "walking";
        this.walkPhaseStartTime = Date.now();
        this.walkDuration = 700 + Math.random() * 900;
        this.currentImage = 0;
        this.speed = 2;
    }

    /**
     * Handles the walking animation and switches to the attack phase when finished.
    */
    handleWalkingPhase() {
        this.playAnimation(this.IMAGES_WALK);

        const walkTime = Date.now() - this.walkPhaseStartTime;

        if (walkTime >= this.walkDuration) {
            this.startAttackPhase();
        }
    }

    /**
     * Starts the boss attack phase.
    */
    startAttackPhase() {
        this.bossState = "attacking";
        this.attackImageIndex = 0;
        this.speed = 0;
    }

    /**
     * Plays the boss attack animation.
    */
    handleAttackPhase() {
        if (this.attackImageIndex < this.IMAGES_ATTACK.length) {
            const path = this.IMAGES_ATTACK[this.attackImageIndex];

            this.img = this.imageCache[path];
            this.attackImageIndex++;
            return;
        }

        this.startWalkingPhase();
    }

    /**
     * Plays the boss death animation and ends the game when finished.
    */
    handleDeadAnimation() {
        if (!this.deadAnimationStarted) {
            this.currentImage = 0;
            this.deadAnimationStarted = true;
        }

        this.playDeadAnimation(this.IMAGES_DEAD);
            if (this.currentImage === 2 ) {
                setTimeout(() => {
                showGameWonScreen();
                stopGame();
            }, 700);
        }
    }

}