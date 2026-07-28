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
        top: 110, //120 offset für pepe
        bottom: 30, //30
        left: 35, //40
        right: 30 //30
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

    constructor() {
        super().loadImage("img/4_enemie_boss_chicken/2_alert/G5.png");
        this.loadImages(this.IMAGES_WALK);
        this.loadImages(this.IMAGES_ATTACK);
        this.loadImages(this.IMAGES_ALERT);
        this.loadImages(this.IMAGES_DEAD);
        this.loadImages(this.IMAGES_HURT);
        this.x = 2600;
    }

    isDead() {
        return this.energy === 0;
    }

    animate() {
        this.animateImages();
        this.animateMovement();
    }

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

    animateMovement() {
        setInterval(() => {
            if (this.bossState === "walking" && !this.isDead() && !this.isHurt()) {
                this.moveLeft();
            }
        }, 1000 / 60);
    }

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

    startWalkingPhase() {
        this.bossState = "walking";
        this.walkPhaseStartTime = Date.now();
        this.walkDuration = 700 + Math.random() * 900;
        this.currentImage = 0;
        this.speed = 2;
    }

    handleWalkingPhase() {
        this.playAnimation(this.IMAGES_WALK);

        const walkTime = Date.now() - this.walkPhaseStartTime;

        if (walkTime >= this.walkDuration) {
            this.startAttackPhase();
        }
    }

    startAttackPhase() {
        this.bossState = "attacking";
        this.attackImageIndex = 0;
        this.speed = 0;
    }

    handleAttackPhase() {
        if (this.attackImageIndex < this.IMAGES_ATTACK.length) {
            const path = this.IMAGES_ATTACK[this.attackImageIndex];

            this.img = this.imageCache[path];
            this.attackImageIndex++;
            return;
        }

        this.startWalkingPhase();
    }

    handleDeadAnimation() {
        if (!this.deadAnimationStarted) {
            this.currentImage = 0;
            this.deadAnimationStarted = true;
        }

        this.playDeadAnimation(this.IMAGES_DEAD);
    }
}