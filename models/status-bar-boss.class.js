/**
 * Represents the boss health bar displayed on the screen.
*/
class StatusBarBoss extends DrawableObject {
    visible = false;

    IMAGES = [
        "img/7_statusbars/2_statusbar_endboss/green/green0.png",
        "img/7_statusbars/2_statusbar_endboss/green/green20.png",
        "img/7_statusbars/2_statusbar_endboss/green/green40.png",
        "img/7_statusbars/2_statusbar_endboss/green/green60.png",
        "img/7_statusbars/2_statusbar_endboss/green/green80.png",
        "img/7_statusbars/2_statusbar_endboss/green/green100.png",
    ];

    percentage = 100;

    /**
     * Creates the boss health bar and loads its images.
    */
    constructor () {
        super();
        this.loadImages(this.IMAGES);
        this.x = 500;
        this.y = 0;
        this.setPercentage(100);
        this.width = 200;
        this.height = 60;
    }

    /**
     * Updates the displayed health percentage of the boss.
     * @param {number} percentage The boss's current health percentage.
     * @returns {void}
    */
    setPercentage(percentage) {
        this.percentage = percentage;
        let path = this.IMAGES[this.resolveImageIndex()];
        this.img = this.imageCache[path]; //loads picture
    }

    /**
     * Returns the index of the image that matches the current health percentage.
     * @returns {number} The image index for the current health state.
    */
    resolveImageIndex() {
        if (this.percentage == 100) {
            return 5;
        } else if (this.percentage > 80) {
            return 4;
        } else if (this.percentage > 60){
            return 3;
        } else if (this.percentage > 40){
            return 2;
        } else if (this.percentage > 20){
            return 1;
        } else{
            return 0;
        }
    }
}