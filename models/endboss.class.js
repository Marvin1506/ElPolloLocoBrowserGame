class Endboss extends movableObject {

    height = 400;
    width = 250;
    y = 50;
    energy = 100;

    offset = {
        top: 110, //120 offset für pepe
        bottom: 30, //30
        left: 35, //40
        right: 30 //30
    } 

    IMAGES_WALKING = [
        "img/4_enemie_boss_chicken/2_alert/G5.png",
        "img/4_enemie_boss_chicken/2_alert/G6.png",
        "img/4_enemie_boss_chicken/2_alert/G7.png",
        "img/4_enemie_boss_chicken/2_alert/G8.png",
        "img/4_enemie_boss_chicken/2_alert/G9.png",
        "img/4_enemie_boss_chicken/2_alert/G10.png",
        "img/4_enemie_boss_chicken/2_alert/G11.png",
        "img/4_enemie_boss_chicken/2_alert/G12.png",
    ];

    IMAGES_DEAD = [
        "img/4_enemie_boss_chicken/5_dead/G24.png",
        "img/4_enemie_boss_chicken/5_dead/G25.png",
        "img/4_enemie_boss_chicken/5_dead/G26.png",
    ];

    constructor() {
        super().loadImage("img/4_enemie_boss_chicken/2_alert/G5.png");
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_DEAD);
        this.x = 2600;

        this.animate();
    }

    hit() {
        this.energy -= 20;
        if (this.energy < 0) {
            this.energy = 0;
        }
    }

    isDead() {
        return this.energy === 0;
    }

    animate() {
        setInterval(() => {
            if (this.isDead()) {
                if(!this.deadAnimationStarted){
                    this.currentImage = 0;
                    this.deadAnimationStarted = true;
                }
                this.playDeadAnimation(this.IMAGES_DEAD);
            } else {
                this.playAnimation(this.IMAGES_WALKING);
            }
        }, 200);
    }

}