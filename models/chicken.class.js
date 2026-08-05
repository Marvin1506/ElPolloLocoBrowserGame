/**
 * Represents a chicken enemy.
 * Handles movement, walking animation, death animation
 * and randomly played chicken sounds.
*/
class Chicken extends movableObject{
    y = 360;
    height = 60;
    width = 80;
    isDeadChicken = false;
    static lastX = 100;

    IMAGES_WALKING = [
        "img/3_enemies_chicken/chicken_normal/1_walk/1_w.png",
        "img/3_enemies_chicken/chicken_normal/1_walk/2_w.png",
        "img/3_enemies_chicken/chicken_normal/1_walk/3_w.png",
    ];

    IMAGES_DEAD = [
        "img/3_enemies_chicken/chicken_normal/2_dead/dead.png",
    ];

     offset = {
        top: 5,
        bottom: 5,
        left: 5,
        right: 5,
    } 

    /**
     * Creates a chicken enemy.
     * Loads all animations, sets a random position and speed,
     * starts the animation loops and enables random chicken sounds.
    */
    constructor() {
        super().loadImage("img/3_enemies_chicken/chicken_normal/1_walk/1_w.png");
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_DEAD);
        this.x = Math.min(Chicken.lastX + 210 + Math.random() * 300, 2200);
        Chicken.lastX = this.x;

        this.speed = 0.15 + Math.random() * 0.25;
        this.animate();
        this.startRandomChickenSounds();
    }

    /**
     * Starts the chicken's movement and animation loops.
     * @returns {void}
    */
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

    /**
     * Kills the chicken, stops its movement, and plays the death sound.
     * @returns {void}
    */
    die() {
        this.isDeadChicken = true;
        this.currentImage = 0;
        this.speed = 0;
        playSound("./audio/chicken_dies.wav", 0.1);
    }

    /**
     * Starts the random chicken sound loop.
     * @returns {void}
    */
    startRandomChickenSounds() {
        const randomDelay = 2000 + Math.random() * 6000;

        setTimeout(() => {
            if (!this.isDeadChicken) {
                playChickenSound();
            }

            this.startRandomChickenSounds();
        }, randomDelay);
    }
}