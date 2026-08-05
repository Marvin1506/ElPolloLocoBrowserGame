/**
 * Represents a throwable salsa bottle.
*/
class ThrowableObject extends movableObject {
    
    IMAGES_THROWING = [
        "img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png",
        "img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png",
        "img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png",
        "img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png",
    ];

    IMAGES_HITTING = [
        "img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png",
        "img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png",
        "img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png",
        "img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png",
        "img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png",
        "img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png",
    ];

    offset = {
        top: 20, //120 offset für pepe
        bottom: 20, //30
        left: 20, //40
        right: 20 //30
    } 

    hasHit = false;

    /**
     * Creates a new throwable bottle.
     *
     * @param {number} x The starting x position.
     * @param {number} y The starting y position.
     * @param {boolean} otherDirection Indicates whether the bottle is thrown to the left.
    */
    constructor(x, y, otherDirection) {
        super().loadImage("img/6_salsa_bottle/salsa_bottle.png");
        this.loadImages(this.IMAGES_THROWING);
        this.loadImages(this.IMAGES_HITTING);
        
        this.x = x;
        this.y = y;
        this.otherDirection = otherDirection;
        this.height = 80;
        this.width = 80;
        
        this.throw();
    }

    /**
     * Throws the bottle by applying gravity, movement, and animations.
     * @returns {void}
    */
    throw() {
        this.speedY = 30;
        this.applyGravity();
        this.startMovement();
        this.startAnimation();
    }

    /**
     * Starts the bottle movement.
     * @returns {void}
    */
    startMovement() {
        setInterval(() => {
            if (!this.hasHit) {
                if (this.otherDirection) {
                    this.x -= 10;
                } else {
                    this.x += 10;
                }
            }
        }, 25);
    }

    /**
     * Starts the bottle animation.
     * @returns {void}
    */
    startAnimation() {
        setInterval(() => {
            if (this.hasHit) {
                this.playAnimation(this.IMAGES_HITTING);
            } else {
                this.playAnimation(this.IMAGES_THROWING);
            }
        }, 80);
    }

    /**
     * Plays the bottle splash animation after a collision.
     * @returns {void}
    */
    splash() {
        this.hasHit = true;
        this.speedY = 0;
        this.currentImage = 0;
        playSound("./audio/bottle_hit.wav", 0.1);
    }
}