/**
 * Represents the bottle status bar displayed on the screen.
*/
class StatusBarBottles extends DrawableObject {

    IMAGES = [
        "img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/0.png",
        "img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/20.png",
        "img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/40.png",
        "img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/60.png",
        "img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/80.png",
        "img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/100.png",
    ];

    percentage = 0;

    /**
     * Creates the bottle status bar and loads its images.
    */
    constructor () {
        super();
        this.loadImages(this.IMAGES);
        this.x = 0;
        this.y = 65;
        this.setPercentage(0);
        this.width = 200;
        this.height = 60;
    }

    /**
     * Updates the displayed bottle percentage.
     * @param {number} percentage The current bottle percentage.
    */
    setPercentage(percentage) {
        this.percentage = percentage;
        let path = this.IMAGES[this.resolveImageIndex()];
        this.img = this.imageCache[path]; //loads picture
    }


    /**
     * Returns the image index that matches the current bottle percentage.
     * @returns {number} The image index for the current bottle level.
    */
    resolveImageIndex() {
        if (this.percentage >= 100) {
            return 5;
        } else if (this.percentage >= 80) {
            return 4;
        } else if (this.percentage >= 60) {
            return 3;
        } else if (this.percentage >= 40) {
            return 2;
        } else if (this.percentage >= 20) {
            return 1;
        } else {
            return 0;
        }
    }
}