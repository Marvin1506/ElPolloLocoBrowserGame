/**
 * Represents the player's health bar displayed on the screen.
*/
class StatusBar extends DrawableObject {

    IMAGES = [
        "img/7_statusbars/1_statusbar/2_statusbar_health/green/0.png",
        "img/7_statusbars/1_statusbar/2_statusbar_health/green/20.png",
        "img/7_statusbars/1_statusbar/2_statusbar_health/green/40.png",
        "img/7_statusbars/1_statusbar/2_statusbar_health/green/60.png",
        "img/7_statusbars/1_statusbar/2_statusbar_health/green/80.png",
        "img/7_statusbars/1_statusbar/2_statusbar_health/green/100.png",
    ];

    percentage = 100;

    /**
     * Creates the health status bar and loads its images.
    */
    constructor () {
        super();
        this.loadImages(this.IMAGES);
        this.x = 0;
        this.y = -20;
        this.setPercentage(100);
        this.width = 200;
        this.height = 60;
    }

    /**
     * Updates the displayed health percentage.
     * @param {number} percentage The player's current health percentage.
     * @returns {void}
    */
    setPercentage(percentage) {
        this.percentage = percentage;
        let path = this.IMAGES[this.resolveImageIndex()];
        this.img = this.imageCache[path]; //loads picture
    }

    /**
     * Returns the image index that matches the current health percentage.
     * @returns {number} The image index for the current health level.
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