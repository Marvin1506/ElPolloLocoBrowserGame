class Bottle extends DrawableObject {
    width = 80;
    height = 80;
    x = 150;
    y = 350;

    constructor() {
        super().loadImage("img/6_salsa_bottle/1_salsa_bottle_on_ground.png");
        this.x = 200 + Math.random() * 500;
        this.y = 350;
    }
}