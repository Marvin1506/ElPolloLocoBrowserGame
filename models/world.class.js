class World {
    character = new Character();
    level = level1;
    canvas;
    ctx;
    keyboard;
    camera_x = 0;
    animationFrameId;
    gameStopped = false;

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

    stop() {
        this.gameStopped = true;

        if (this.animationFrameId) {
            cancelAnimationFrame(this.animationFrameId);
            this.animationFrameId = null;
        }
    }

    setWorld() {
        this.character.world = this;

        this.level.enemies.forEach((enemy) => {
            enemy.world = this;

            if (enemy instanceof Endboss) {
                enemy.animate();
            }
        });
    }

    run() {
        setInterval(() => {
            this.checkCollisions();
            this.checkBottleCollisionsWithEnemyChicken();
        }, 1000 / 60);
        setInterval(() => {
            this.checkThrowObjects();
            this.checkBottleCollisions();
            this.checkCoinCollisions();
            this.checkBossBarPosition();
        }, 100);
    }

    checkBottleCollisionsWithEnemyChicken() {
        this.throwableObjects.forEach((bottle) => {
            this.level.enemies.forEach((enemy) => {
                this.handleBottleEnemyCollision(bottle, enemy);
            });
        });
    }

    handleBottleEnemyCollision(bottle, enemy) {
        if (bottle.hasHit || !bottle.isColliding(enemy)) {
            return;
        }

        if (enemy instanceof Chicken) {
            this.hitChicken(bottle, enemy);
        } else if (enemy instanceof ChickenSmall) {
            this.hitSmallChicken(bottle, enemy);
        } else if (enemy instanceof Endboss) {
            this.hitEndboss(bottle, enemy);
        }
    }

    hitChicken(bottle, enemy) {
        if (enemy.isDeadChicken) {
            return;
        }

        enemy.die();
        bottle.splash();
    }

    hitSmallChicken(bottle, enemy) {
        if (enemy.isDeadChickenSmall) {
            return;
        }

        enemy.dieChickenSmall();
        bottle.splash();
    }

    hitEndboss(bottle, enemy) {
        if (enemy.isDead()) {
            return;
        }

        enemy.hit();
        playSound("./audio/boss_hurt.mp3", 0.05);
        this.statusBarBoss.setPercentage(enemy.energy);
        bottle.splash();
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
                let newPercentage = Math.min(this.statusBarBottles.percentage + 20, 100);
                this.statusBarBottles.setPercentage(newPercentage);
                this.level.bottles.splice(index, 1);
                playSound("./audio/bottle_collected.mp3", 0.2);
            }
        });
    }

    checkCoinCollisions() {
        this.level.coins.forEach((coin, index) => {
            if (this.character.isColliding(coin)) {
                let newPercentage = Math.min(this.statusBarCoins.percentage + 20, 100);
                playSound("./audio/coin_collected.wav", 0.05);
                this.statusBarCoins.setPercentage(newPercentage);
                this.level.coins.splice(index, 1);
            }
        });
    }

    checkCollisions() {
        this.level.enemies.forEach((enemy) => {
            if (this.isEnemyDead(enemy)) {
                return;
            }
            if (this.character.isJumpingOn(enemy)) {
                this.handleEnemyJumpCollision(enemy);
            } else if (
                !this.character.ignoreEnemyCollision &&
                this.character.isColliding(enemy)
            ) {
                this.handleCharacterCollision();
            }
        });
    }

    isEnemyDead(enemy) {
        if (enemy instanceof Chicken) {
            return enemy.isDeadChicken;
        }

        if (enemy instanceof ChickenSmall) {
            return enemy.isDeadChickenSmall;
        }

        return false;
    }

    handleEnemyJumpCollision(enemy) {
        if (enemy instanceof Chicken) {
            enemy.die();
            this.handleJumpOnEnemy();
        } else if (enemy instanceof ChickenSmall) {
            enemy.dieChickenSmall();
            this.handleJumpOnEnemy();
        }
    }

    handleCharacterCollision() {
        if (this.character.takeDamage()) {
            this.statusBar.setPercentage(this.character.energy);
        }
    }

    handleJumpOnEnemy() {
        this.character.speedY = 20;
        this.character.ignoreEnemyCollision = true;

        setTimeout(() => {
            this.character.ignoreEnemyCollision = false;
        }, 300);
    }

    checkBossBarPosition() {
        if (this.character.x >= 2000) {
            this.statusBarBoss.visible = true;
        }
    }

    draw() {
        if (this.gameStopped) {
            return;
        }

        this.clearCanvas();
        this.drawWorldObjects();
        this.drawFixedObjects();
        this.drawGameObjects();
        this.requestNextFrame();
    }

    clearCanvas() {
        this.ctx.clearRect(
            0,
            0,
            this.canvas.width,
            this.canvas.height
        );
    }

    drawWorldObjects() {
        this.ctx.translate(this.camera_x, 0);
        this.addObjectsToMap(this.level.backgroundObjects);
        this.addObjectsToMap(this.level.clouds);
        this.addObjectsToMap(this.level.bottles);
        this.addObjectsToMap(this.level.coins);
        this.ctx.translate(-this.camera_x, 0);
    }

    drawFixedObjects() {
        this.addToMap(this.statusBar);
        this.addToMap(this.statusBarCoins);
        this.addToMap(this.statusBarBottles);

        if (this.statusBarBoss.visible) {
            this.addToMap(this.statusBarBoss);
        }
    }

    drawGameObjects() {
        this.ctx.translate(this.camera_x, 0);
        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.throwableObjects);
        this.addToMap(this.character);
        this.ctx.translate(-this.camera_x, 0);
    }

    requestNextFrame() {
        this.animationFrameId = requestAnimationFrame(() => {
            this.draw();
        });
    }

    addObjectsToMap(objects) { // add all objects in the array to the map with the addToMap function
        objects.forEach((object) => {
            if (this.isObjectVisible(object)) {
                this.addToMap(object);
            }
        });
    }

    isObjectVisible(object) {
        const screenLeft = -this.camera_x - 200;
        const screenRight = -this.camera_x + this.canvas.width + 200;

        return (
            object.x + object.width >= screenLeft &&
            object.x <= screenRight
        );
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