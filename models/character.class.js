class Character extends movableObject {
    height = 280;
    y = 60; // 150
    speed = 10;
    world;
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

    constructor() {
        super().loadImage("img/2_character_pepe/2_walk/W-21.png");
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_JUMPING);
        this.animate();
        this.applyGravity();
    }

    animate() {
        // how quick the character moves and takes the keyboard input
        setInterval( () => {
            if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x) {
                this.x += this.speed;
                this.otherDirection = false;
            }
            if (this.world.keyboard.LEFT && this.x > -620) {
                this.x -= this.speed;
                this.otherDirection = true;
            }
            if(this.world.keyboard.UP && !this.isAboveGround()) {
                this.speedY = 30;
            }

            this.world.camera_x = -this.x + 100;
        }, 1000 / 60); // fps

        setInterval( () => {
            if(this.isAboveGround()) {
                this.playAnimation(this.IMAGES_JUMPING);
            }   else {
            if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
                //walk animation how often the image changes
                this.playAnimation(this.IMAGES_WALKING);
                }
            }
        }, 50);
    }

    jump() {

    }
}