class movableObject {
    x = 120;
    y = 280;
    img;
    height = 150;
    width = 100;
    imageCache = {}; //savepoint of images that are already loaded
    currentImage = 0;
    speed = 0.15;
    otherDirection = false; //
    speedY = 0;
    acceleration = 2.5;

    applyGravity() {
        setInterval(() => {
            if (this.y < 150) {
            this.y -= this.speedY;
            this.speedY -= this.acceleration;
            }
        }, 1000 / 25);
    }

    isAboveGround() {
        return this.y < 150;
    }

    //loads the image of the object and sets the src of the image to the path of the image
    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }

    //turns the objects into imgs and pushes the already loaded imgs into the imageCache object array
    loadImages(arr) {
        arr.forEach((path) => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });
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
        console.log("Moving right");
    }

    //moves the object to the left by changing the x position of the object.
    moveLeft() {
        setInterval(() => {
            this.x -= this.speed;
        }, 1000 / 60);
    }
}

