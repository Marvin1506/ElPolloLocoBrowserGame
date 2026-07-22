class Chicken extends movableObject{
    y = 360;
    height = 60;
    width = 80;
    isDeadChicken = false;

    IMAGES_WALKING = [
        "img/3_enemies_chicken/chicken_normal/1_walk/1_w.png",
        "img/3_enemies_chicken/chicken_normal/1_walk/2_w.png",
        "img/3_enemies_chicken/chicken_normal/1_walk/3_w.png",
    ];

    IMAGES_DEAD = [
        "img/3_enemies_chicken/chicken_normal/2_dead/dead.png",
    ];

     offset = {
        top: 0, //120 offset für pepe
        bottom: 0, //30
        left: 0, //40
        right: 0 //30
    } 

    constructor() {
        super().loadImage("img/3_enemies_chicken/chicken_normal/1_walk/1_w.png");
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_DEAD);
        this.animate();
        this.x = 200 + Math.random() * 500;
        this.speed = 0.15 + Math.random() * 0.25;
        this.animate();
    }

    animate() {
        setInterval(() => {
            this.moveLeft();
        }, 1000 / 60);

        setInterval(() => {
            if (this.isDeadChicken) {
                this.playAnimation(this.IMAGES_DEAD);
            } else {
                this.playAnimation(this.IMAGES_WALKING);
            }
        }, 200);
    }

    die() {
        this.isDeadChicken = true;
        this.currentImage = 0;
        this.speed = 0;
    }
}