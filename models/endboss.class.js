class Endboss extends movableObject {

    height = 400;
    width = 250;
    y = 50;
    energy = 100;
    speedY = 0;


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
        this.speed = 0.15 + Math.random() * 0.25;
        this.animate();
    }

    isDead() {
        return this.energy === 0;
    }

    animate() {
        setInterval(() => {
            if (this.isDead()) {
                this.handleDeadAnimation();
                return;
            }

            if (this.isHurt()) {
                this.playAnimation(this.IMAGES_HURT);
                return;
            }

            this.handleBossAnimation();
        }, 200);
    }

    handleBossAnimation() {
        const pepeX = this.world.character.x;

        // Pepe hat den Endboss-Bereich noch nicht erreicht
        if (pepeX < 2000) {
            this.playAnimation(this.IMAGES_ALERT);
            return;
        }

        // Start des 2-sekündigen Laufens
        if (!this.walkStarted) {
            this.walkStarted = true;
            this.walkStartTime = Date.now();
            this.currentImage = 0;
        }

        const walkDuration = Date.now() - this.walkStartTime;

        // Zwei Sekunden laufen
        if (walkDuration < 2000) {
            this.playAnimation(this.IMAGES_WALK);
            this.moveLeft();
            return;
        }

        // Alert einmal vollständig abspielen
        if (!this.alertStarted) {
            this.alertStarted = true;
            this.currentImage = 0;
        }

        if (!this.alertAnimationFinished()) {
            this.playAnimation(this.IMAGES_ALERT);
            return;
        }

        // Danach dauerhaft angreifen
        if (!this.attackStarted) {
            this.attackStarted = true;
            this.currentImage = 0;
        }

        this.playAnimation(this.IMAGES_ATTACK);
    }

    alertAnimationFinished() {
        return this.currentImage >= this.IMAGES_ALERT.length;
    }

    handleDeadAnimation() {
        if (!this.deadAnimationStarted) {
            this.currentImage = 0;
            this.deadAnimationStarted = true;
        }

        this.playDeadAnimation(this.IMAGES_DEAD);
    }
}