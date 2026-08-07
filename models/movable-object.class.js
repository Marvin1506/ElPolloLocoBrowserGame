/**
 * Represents a movable game object with physics, collisions, and animations.
*/
class movableObject extends DrawableObject {
    speed = 0.15;
    otherDirection = false; //
    speedY = 0;
    acceleration = 2.5;
    energy = 100;
    lastHit = 0;
    deadAnimationStarted = false;
    groundY = 152;
    y = 152;

    /**
     * Applies gravity to the object.
    */
    applyGravity() {
        setInterval(() => {
            if (this.isAboveGround() || this.speedY > 0) {
            this.y -= this.speedY;
            this.speedY -= this.acceleration;
            }

            if (this.y > 152 && !(this instanceof ThrowableObject)) {
                this.y = 152;
                this.speedY = 0;
            }
        }, 1000 / 25);
    }

    /**
     * Checks whether the object is above the ground.
     * @returns {boolean} True if the object is above the ground.
    */
    isAboveGround() {
        if(this instanceof ThrowableObject) {
            return true; // true will be returned and the object can fall throught the ground
        } else{
            return this.y < 150; // object can not fall under the ground
        }
    }

    /**
     * Checks whether this object is colliding with another object.
     * @param {movableObject} mo The object to check for a collision.
     * @returns {boolean} True if the objects are colliding.
    */
    isColliding(mo) {
        return this.x + this.width - this.offset.right > mo.x + mo.offset.left &&
        this.y + this.height - this.offset.bottom > mo.y + mo.offset.top &&
        this.x + this.offset.left < mo.x + mo.width - mo.offset.right &&
        this.y + this.offset.top < mo.y + mo.height - mo.offset.bottom;
    }

    /**
     * Checks whether the character is jumping on top of an enemy.
     * @param {movableObject} enemy The enemy to check against.
     * @returns {boolean} True if the character lands on the enemy.
    */
    isJumpingOn(enemy) {
        return this.speedY < 0 &&
            this.x + this.width - this.offset.right > enemy.x + enemy.offset.left &&
            this.x + this.offset.left < enemy.x + enemy.width - enemy.offset.right &&
            this.y + this.height - this.offset.bottom >= enemy.y + enemy.offset.top &&
        this.y + this.height - this.offset.bottom <= enemy.y + enemy.offset.top + 20;
    }

    /**
     * Reduces the object's energy after taking damage.
    */
    hit() {
        this.energy -= 20;

        if (this.energy <= 0) {
            this.energy = 0;
            return;
        }

        this.lastHit = Date.now();
    }

    /**
     * Checks whether the object is currently hurt.
     * @returns {boolean} True if the hurt animation should be played.
    */
    isHurt() {
        let timePassed = new Date().getTime() - this.lastHit; // difference in ms
        timePassed = timePassed / 1000; //difference in s
        return timePassed < 0.5; //time of the true return
    }

    /**
     * Checks whether the object is dead.
     * @returns {boolean} True if the object's energy is zero.
    */
    isDead() {
        return this.energy <= 0;
    }

    /**
     * Plays a looping animation.
     * @param {string[]} images The animation image paths.
    */
    playAnimation(images) {
        let i = this.currentImage % images.length; // for loop that resets and begins again when the last image is reached
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }

    /**
     * Plays a non-looping death animation.
     * @param {string[]} images The death animation image paths.
    */
    playDeadAnimation(images) {
        if (this.currentImage < images.length) {
            let path = images[this.currentImage];
            this.img = this.imageCache[path];
            this.currentImage++;
        } else {
            this.img = this.imageCache[images[images.length - 1]];
        }
    }

    /**
     * Moves the object to the right.
    */
    moveRight() {
        this.x += this.speed;
    }

    /**
     * Moves the object to the left.
    */
    moveLeft() {
        this.x -= this.speed;
    }

    /**
     * Makes the object jump.
    */
    jump() {
        this.speedY = 23.0;
    }
}

