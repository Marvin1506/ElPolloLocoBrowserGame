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

    constructor () {
        this.loadImages(this.IMAGES);
    }

    setPercentage(percentage) {
        this.percentage = percentage;

        if(this.percentage == 100) {
            this.loadImages[5];
        }
    }
}