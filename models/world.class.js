class World {
    character = new Character();
    level = level1;
    canvas;
    ctx;
    keyboard;
    camera_x = 0;


    constructor(canvas, keyboard) { // canvas and keyboard are passed as parameters to the constructor function
        this.ctx = canvas.getContext("2d");
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
    }

    setWorld() {    // set the world property of the character to the current instance of the World class so that the character can access the properties and methods of the World class
        this.character.world = this;
    }

    draw() {

        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height); // delete everything on the canvas and start from scratch

        this.ctx.translate(this.camera_x, 0);   //change the origin of the canvas to the right by camera_x pixels
        
        this.addObjectsToMap(this.level.backgroundObjects); //add all background objects to the map
        this.addObjectsToMap(this.level.clouds);    
        this.addObjectsToMap(this.level.enemies);
        this.addToMap(this.character);

        this.ctx.translate(-this.camera_x, 0);

        let self = this; // save the current context of the canvas in a variable called self, so that it can be used inside the requestAnimationFrame function
        requestAnimationFrame(function() {
            self.draw();
        });
    }

    addObjectsToMap(objects) {  // add all objects in the array to the map with the addToMap function
        objects.forEach(object => {
            this.addToMap(object);
        })
    }

    addToMap(mo) {  // add a single object to the map and saves the current state of an object character turns so that it can be restored later with no spaces etc.
        if (mo.otherDirection) {
            this.ctx.save();
            this.ctx.translate(mo.width, 0);
            this.ctx.scale(-1, 1);
            mo.x = mo.x * -1;
        }

        this.ctx.drawImage(mo.img, mo.x, mo.y, mo.width, mo.height); // draw the image of the object on the canvas at the specified position and size (uses gpu)
        this.ctx.beginPath();
        this.ctx.lineWidth = "2";
        this.ctx.strokeStyle = "blue";
        this.ctx.rect(mo.x, mo.y, mo.width, mo.height);
        this.ctx.stroke();

        if (mo.otherDirection) {
             mo.x = mo.x * -1;
            this.ctx.restore();
        }
    }
}