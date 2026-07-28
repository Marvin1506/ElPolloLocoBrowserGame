class DrawableObject {
    img;
    imageCache = {}; //savepoint of images that are already loaded
    currentImage = 0;
    x = 120;
    y = 280;
    height = 150;
    width = 100;
    offset = {
        top: 0, //120 offset für pepe
        bottom: 0, //30
        left: 0, //40
        right: 0 //30
    } 


    //loads the image of the object and sets the src of the image to the path of the image
    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }

    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }

    //turns the objects into imgs and pushes the already loaded imgs into the imageCache object array
    loadImages(arr) {
        arr.forEach((path) => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });
    }

    /*drawFrame(ctx) {
        if(this instanceof Character || this instanceof ThrowableObject || this instanceof Endboss){
            ctx.beginPath();
            ctx.lineWidth = "2";
            ctx.strokeStyle = "blue";
            ctx.rect(this.x, this.y, this.width, this.height);
            ctx.stroke();

            ctx.beginPath();
            ctx.strokeStyle = "red";
            ctx.lineWidth = "3";
            ctx.rect(
            this.x + this.offset.left,
            this.y + this.offset.top,
            this.width - this.offset.left - this.offset.right,
            this.height - this.offset.top - this.offset.bottom
            );
            ctx.stroke();
        }
    }*/
}