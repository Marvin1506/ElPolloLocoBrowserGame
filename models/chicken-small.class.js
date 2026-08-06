/**
 * Represents a small chicken enemy.
 * Handles movement, walking animation, death animation
 * and randomly played chicken sounds.
*/
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

    /**
     * Creates a small chicken enemy.
     * Loads all animations, sets a random position and speed,
     * starts the animation loops and enables random chicken sounds.
    */
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

    /**
     * Starts the movement and animation loops.
    */
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

    /**
     * Marks the chicken as dead, stops its movement
     * and plays the death sound.
    */
    dieChickenSmall() {
        this.isDeadChickenSmall = true;
        this.currentImage = 0;
        this.speed = 0;
        playSound("./audio/chicken_dies.wav", 0.1);
    }

    /**
     * Plays chicken sounds at random intervals
     * while the chicken is alive.
    */
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