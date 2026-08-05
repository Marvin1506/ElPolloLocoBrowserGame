/**
 * Represents a collectible coin in the game.
*/
class Coin extends movableObject {

    IMAGES_COIN = [
        "img/8_coin/coin_1.png",
        "img/8_coin/coin_2.png",
    ];

    offset = {
        top: 0,
        bottom: 0,
        left: 0,
        right: 0
    } 

    width = 100;
    height = 100;
    x = 150;
    y = 350;
    static lastX = 200;

    /**
     * Creates a coin with a random position and starts its animation.
    */
    constructor() {
        super().loadImage("img/8_coin/coin_1.png");
        this.loadImages(this.IMAGES_COIN);
        this.x = Math.min(Coin.lastX + 180 + Math.random() * 300, 2000);
        Coin.lastX = this.x;
        this.y = 250 + (Math.random() * 200 - 100);
        this.animate();
    }

    /**
     * Starts the coin animation.
     * @returns {void}
    */
    animate() {
        setInterval(() => {
            this.playAnimation(this.IMAGES_COIN);
        }, 400);
    }
}