class Coin extends movableObject {

    IMAGES_COIN = [
        "img/8_coin/coin_1.png",
        "img/8_coin/coin_2.png",
    ];

    offset = {
        top: 0, //120 offset für pepe
        bottom: 0, //30
        left: 0, //40
        right: 0 //30
    } 

    width = 100;
    height = 100;
    x = 150;
    y = 350;
    static lastX = 200;

    constructor() {
        super().loadImage("img/8_coin/coin_1.png");
        this.loadImages(this.IMAGES_COIN);
        this.x = Coin.lastX + 180 + Math.random() * 300;
        Coin.lastX = this.x;
        this.y = 250 + (Math.random() * 200 - 100);
        this.animate();
    }

    animate() {
        setInterval(() => {
            this.playAnimation(this.IMAGES_COIN);
        }, 400);
    }
}