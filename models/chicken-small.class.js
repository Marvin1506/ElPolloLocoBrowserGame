class ChickenSmall extends movableObject{
    y = 378;
    height = 40;
    width = 50;
    isDeadChickenSmall = false;
    static lastX = 70;

    IMAGES_WALKING = [
        "img/3_enemies_chicken/chicken_small/1_walk/1_w.png",
        "img/3_enemies_chicken/chicken_small/1_walk/2_w.png",
        "img/3_enemies_chicken/chicken_small/1_walk/3_w.png",
    ];

    IMAGES_DEAD = [
        "img/3_enemies_chicken/chicken_small/2_dead/dead.png",
    ];

     offset = {
        top: 3,
        bottom: 3,
        left: 3,
        right: 3,
    } 

    constructor() {
        super().loadImage("img/3_enemies_chicken/chicken_small/1_walk/1_w.png");
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_DEAD);
        this.animate();
        this.x = Math.min(ChickenSmall.lastX + 220 + Math.random() * 300, 2200);
        ChickenSmall.lastX = this.x;
        this.speed = 0.2 + Math.random() * 0.25;
        this.animate();
        this.startRandomChickenSounds();
    }

    animate() {
        setInterval(() => {
            this.moveLeft();
        }, 1000 / 60);

        setInterval(() => {
            if (this.isDeadChickenSmall) {
                this.playAnimation(this.IMAGES_DEAD);
            } else {
                this.playAnimation(this.IMAGES_WALKING);
            }
        }, 200);
    }

    dieChickenSmall() {
        this.isDeadChickenSmall = true;
        this.currentImage = 0;
        this.speed = 0;
        playSound("./audio/chicken_dies.wav", 0.1);
    }

    startRandomChickenSounds() {
        const randomDelay = 2500 + Math.random() * 5000;

        setTimeout(() => {
            if (!this.isDeadChickenSmall) {
                playSmallChickenSound();
            }

            this.startRandomChickenSounds();
        }, randomDelay);
    }
}