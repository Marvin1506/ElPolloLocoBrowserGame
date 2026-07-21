class Bottle extends DrawableObject {

    IMAGES_BOTTLES = [
        "img/6_salsa_bottle/1_salsa_bottle_on_ground.png",
        "img/6_salsa_bottle/2_salsa_bottle_on_ground.png",
    ];

    width = 80;
    height = 80;
    x = 150;
    y = 350;

    constructor() {
        super();
        const randomImage = this.IMAGES_BOTTLES[Math.floor(Math.random() * this.IMAGES_BOTTLES.length)];
        this.loadImage(randomImage);
        this.x = 200 + Math.random() * 500;
        this.y = 350;
    }
}