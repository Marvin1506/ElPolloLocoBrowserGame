class World {
    character = new Character();
    level = level1;
    canvas;
    ctx;
    keyboard;
    camera_x = 0;
    statusBar = new StatusBar();
    statusBarCoins = new StatusBarCoins();
    statusBarBottles = new StatusBarBottles();
    statusBarBoss = new StatusBarBoss();

    throwableObjects = [];

    constructor(canvas, keyboard) { // canvas and keyboard are passed as parameters to the constructor function
        this.ctx = canvas.getContext("2d");
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
        this.run();
    }

    setWorld() {    // set the world property of the character to the current instance of the World class so that the character can access the properties and methods of the World class
        this.character.world = this;
         this.level.enemies.forEach(enemy => {
            enemy.world = this;
        });
    }

    run() {
        setInterval(() => {
            this.checkPepeJumpCollision();
        }, 1000 / 120);
        setInterval(() => {
            this.checkCollisions();
        }, 200);
         setInterval(() => {
            this.checkThrowObjects();
        }, 100);
        setInterval(() => {
            this.checkBottleCollisions();
            this.checkCoinCollisions();
        }, 100);
         setInterval(() => {
            this.checkBottleCollisionsWithEnemyChicken();
        }, 1000 / 60);
        setInterval(() => {
            this.checkBossBarPosition();
        }, 100);
    }

    checkBottleCollisionsWithEnemyChicken() {
        this.throwableObjects.forEach((bottle) => {
            this.level.enemies.forEach((enemy) => {
                if (enemy instanceof Chicken && !enemy.isDeadChicken && !bottle.hasHit && bottle.isColliding(enemy)) {
                    enemy.die();
                    bottle.splash();
                } else if(enemy instanceof ChickenSmall && !enemy.isDeadChickenSmall && !bottle.hasHit && bottle.isColliding(enemy)) {
                    enemy.dieChickenSmall();
                    bottle.splash();
                } else if (enemy instanceof Endboss && !enemy.isDeadChickenSmall && !bottle.hasHit && bottle.isColliding(enemy)) {
                    enemy.hit();
                    this.statusBarBoss.setPercentage(enemy.energy);
                    bottle.splash();
                }
            });
        });
    }

    checkThrowObjects() {
        if (this.keyboard.D && this.statusBarBottles.percentage >= 20) {

            let bottle = new ThrowableObject(this.character.x + 40, this.character.y + 90, this.character.otherDirection);

            this.throwableObjects.push(bottle);

            this.statusBarBottles.setPercentage(this.statusBarBottles.percentage - 20);

            this.keyboard.D = false;
        }
    }

    checkBottleCollisions() {
        this.level.bottles.forEach((bottle, index) => {
            if (this.character.isColliding(bottle)) {
                let newPercentage = Math.min(
                    this.statusBarBottles.percentage + 20,
                    100
                );

                this.statusBarBottles.setPercentage(newPercentage);
                this.level.bottles.splice(index, 1);
            }
        });
    }

    checkCoinCollisions() {
        this.level.coins.forEach((coin, index) => {
            if (this.character.isColliding(coin)) {
                let newPercentage = Math.min(
                    this.statusBarCoins.percentage + 20,
                    100
                );

                this.statusBarCoins.setPercentage(newPercentage);
                this.level.coins.splice(index, 1);
            }
        });
    }

    checkCollisions() {
        if (this.character.ignoreEnemyCollision) {
            return;
        }
        this.level.enemies.forEach( (enemy) => {
            if(!enemy.isDeadChicken && !enemy.isDeadChickenSmall && this.character.isColliding(enemy)) {
                this.character.hit();
                this.statusBar.setPercentage(this.character.energy);
                //console.log("Collision with character", this.character.energy);
            }
        });
    }

    checkPepeJumpCollision() {
        this.level.enemies.forEach((enemy) => {
            if (this.character.isJumpingOn(enemy)) {
                if (enemy instanceof Chicken && !enemy.isDeadChicken) {
                    enemy.die();
                    this.handleJumpOnEnemy();
                } else if (enemy instanceof ChickenSmall && !enemy.isDeadChickenSmall) {
                    enemy.dieChickenSmall();
                    this.handleJumpOnEnemy();
                }
            }
        });
    }

    handleJumpOnEnemy() {
        this.character.speedY = 20;
        this.character.ignoreEnemyCollision = true;

        setTimeout(() => {
            this.character.ignoreEnemyCollision = false;
        }, 150);
    }

    checkBossBarPosition() {
        if (this.character.x >= 2000) {
            this.statusBarBoss.visible = true;
        }
    }

    draw() {

        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height); // delete everything on the canvas and start from scratch

        this.ctx.translate(this.camera_x, 0);   //change the origin of the canvas to the right by camera_x pixels
        
        this.addObjectsToMap(this.level.backgroundObjects); //add all background objects to the map
        this.addObjectsToMap(this.level.clouds);
        this.addObjectsToMap(this.level.bottles);
        this.addObjectsToMap(this.level.coins);

        this.ctx.translate(-this.camera_x, 0);
        // ----Space for fixed objects----
        this.addToMap(this.statusBar);
        this.addToMap(this.statusBarCoins);
        this.addToMap(this.statusBarBottles);
        if (this.statusBarBoss.visible) {
            this.addToMap(this.statusBarBoss);
        }
        this.ctx.translate(this.camera_x, 0);

        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.throwableObjects);
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
            this.flipImage(mo);
        }

        mo.draw(this.ctx); // draw the image of the object on the canvas at the specified position and size (uses gpu)
        //mo.drawFrame(this.ctx); // draw the frame of the object on the canvas for collision detection

        if (mo.otherDirection) {
            this.flipImageBack(mo);
        }
    }

    flipImage(mo) { // add a single object to the map and saves the current state of an object character turns so that it can be restored later with no spaces etc.
        this.ctx.save();
        this.ctx.translate(mo.width, 0);
        this.ctx.scale(-1, 1);
        mo.x = mo.x * -1;
    }

    flipImageBack(mo) { // 
        mo.x = mo.x * -1;
        this.ctx.restore();
    }

}