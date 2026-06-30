class World {
    character = new Character();
    enemies = [
        new Chicken(),
        new Chicken(),
        new Chicken(),
    ];
    canvas;
    ctx;

    constructor(canvas) {
        this.ctx = canvas.getContext("2d");
        this.canvas = canvas;
        this.draw();
    }

    draw() {

        //deletes the img character of pepe
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        //generates the img character of pepe
        this.ctx.drawImage(this.character.img, this.character.x, this.character.y, this.character.height, this.character.width);
        //generates chicken img of enemies chicken
        this.enemies.forEach(enemy => {
            this.ctx.drawImage(enemy.img, enemy.x, enemy.y, enemy.height, enemy.width);
        })

        //draw will call multiple times, depends on gpu
        let self = this;
        requestAnimationFrame(function() {
            self.draw();
        });
    }
}