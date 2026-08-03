class Bottle extends DrawableObject {

    IMAGES_BOTTLES = [
        "img/6_salsa_bottle/1_salsa_bottle_on_ground.png",
        "img/6_salsa_bottle/2_salsa_bottle_on_ground.png",
    ];

    offset = {
        top: 16, //120 offset für pepe
        bottom: 10, //30
        left: 20, //40
        right: 20 //30
    } 

    width = 80;
    height = 80;
    x = 150;
    y = 350;
    static lastX = 70;

    constructor() {
        super();
        const randomImage = this.IMAGES_BOTTLES[Math.floor(Math.random() * this.IMAGES_BOTTLES.length)];
        this.loadImage(randomImage);
        this.x = Math.min(Bottle.lastX + 150 + Math.random() * 200, 2100);
        Bottle.lastX = this.x;

        this.y = 350;
    }
}