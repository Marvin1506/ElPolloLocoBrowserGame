/**
 * Represents the base class for all drawable game objects.
 * Provides image loading, image caching, and drawing functionality.
*/
class DrawableObject {
    img;
    imageCache = {}; //savepoint of images that are already loaded
    currentImage = 0;
    x = 120;
    y = 280;
    height = 150;
    width = 100;
    offset = {
        top: 0, //120 offset für pepe
        bottom: 0, //30
        left: 0, //40
        right: 0 //30
    } 


    /**
     * Loads a single image from the given path.
     * @param {string} path The path to the image.
    */
    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }

    /**
     * Draws the object on the canvas.
     * @param {CanvasRenderingContext2D} ctx The canvas rendering context.
    */
    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }

    /**
     * Loads multiple images and stores them in the image cache.
     * @param {string[]} arr An array of image paths.
    */
    loadImages(arr) {
        arr.forEach((path) => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });
    }

    /**
     * Draws the collision and hitbox outlines for debugging purposes.
     * This method is intended for development and testing only.
     *
     * @param {CanvasRenderingContext2D} ctx The canvas rendering context.
    */
}