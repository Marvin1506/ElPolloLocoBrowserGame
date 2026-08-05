/**
 * Represents a background image in the game world(the desert).
 * Background objects are static elements that create the scrolling scenery.
*/
class BackgroundObject extends movableObject {

    width = 720;
    height = 480;

    /**
     * Creates a new background object.
     *
     * @param {string} imagePath - Path to the background image.
     * @param {number} x - Horizontal position of the background object.
     * @param {number} y - Vertical position (currently overridden).
    */
    constructor(imagePath, x, y) {
        super().loadImage(imagePath);
        this.x = x;
        this.y = 480 - this.height;
    }
}