/**
 * Represents a moving background cloud in the game.
*/
class Cloud extends movableObject{
    y = 0;
    height = 300;
    width = 720;
    
    /**
     * Creates a cloud with a random starting position that moves to the left.
    */
    constructor() {
        super().loadImage("img/5_background/layers/4_clouds/1.png");

        this.x = Math.random() * 100;
        this.animate();

    }

    /**
     * Starts the cloud movement animation.
    */
    animate() {
        setInterval(() => {
            this.moveLeft();
        }, 1000 / 60);
    }
    
}