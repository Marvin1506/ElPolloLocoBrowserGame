class movableObject extends DrawableObject {
    speed = 0.15;
    otherDirection = false; //
    speedY = 0;
    acceleration = 2.5;
    energy = 100;
    lastHit = 0;
    //offset object will be added later for correct collision position

    applyGravity() {
        setInterval(() => {
            if (this.isAboveGround() || this.speedY > 0) {
            this.y -= this.speedY;
            this.speedY -= this.acceleration;
            }
        }, 1000 / 25);
    }

    isAboveGround() {
        return this.y < 150;
    }

    drawFrame(ctx) {
        if(this instanceof Character || this instanceof Chicken){
            ctx.beginPath();
            ctx.lineWidth = "2";
            ctx.strokeStyle = "blue";
            ctx.rect(this.x, this.y, this.width, this.height);
            ctx.stroke();
        }
    }

    // character.isColliding(chicken)
    isColliding(mo) {
        return this.x + this.width > mo.x &&
        this.y + this.height > mo.y &&
        this.x < mo.x + mo.width &&
        this.y < mo.y + mo.height;
    }

    hit() {
        this.energy -= 20;
        if(this.energy < 0) {
            this.energy = 0;
        } else {
            this.lastHit = new Date().getTime();
        }
    }

    isHurt() {
        let timePassed = new Date().getTime() - this.lastHit; // difference in ms
        timePassed = timePassed / 1000; //difference in s
        return timePassed < 0.5; //time of the true return
    }

    isDead() {
        return this.energy == 0;
    }

    //plays the animation of the object by changing the image of the object
    playAnimation(images) {
        let i = this.currentImage % images.length; // for loop that resets and begins again when the last image is reached
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }

    //moves the object to the right by changing the x position of the object.
    moveRight() {
        this.x += this.speed;
    }

    //moves the object to the left by changing the x position of the object.
    moveLeft() {
        this.x -= this.speed;
    }

    jump() {
        this.speedY = 30;
    }
}

