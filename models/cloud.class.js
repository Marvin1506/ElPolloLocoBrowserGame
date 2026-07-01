class Cloud extends movableObject{
    y = 0;
    height = 300;
    width = 720;
    constructor() {
        super().loadImage("img/5_background/layers/4_clouds/1.png");

        this.x = Math.random() * 100;
        this.animate();

    }

    animate() {
        setInterval(() => {
            this.x -= 0.15;
        }, 1000 / 60);
    }
    
}