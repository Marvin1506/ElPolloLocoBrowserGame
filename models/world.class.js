/**
 * Represents the game world, manages the player, enemies, collisions, rendering, status bars and game logic.
*/
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

    /**
     * Creates a new game world, initializes the canvas, starts the render loop and connects all game objects.
     * @constructor
     * @param {HTMLCanvasElement} canvas - The game canvas.
     * @param {Keyboard} keyboard - The keyboard input handler.
    */
    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext("2d");
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
        this.run();
    }

    /**
     * Stops the game loop and rendering.
    */
    stop() {
        this.gameStopped = true;
        if (this.animationFrameId) {
            cancelAnimationFrame(this.animationFrameId);
            this.animationFrameId = null;
        }
    }

    /**
     * Assigns the world reference to all game objects.
    */
    setWorld() {
        this.character.world = this;
        this.level.enemies.forEach((enemy) => {
            enemy.world = this;
            if (enemy instanceof Endboss) {
                enemy.animate();
            }
        });
    }

    /**
     * Starts all game logic loops.
    */
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

    /**
     * Checks whether thrown bottles hit enemies.
    */
    checkBottleCollisionsWithEnemyChicken() {
        this.throwableObjects.forEach((bottle) => {
            this.level.enemies.forEach((enemy) => {
                this.handleBottleEnemyCollision(bottle, enemy);
            });
        });
    }

    /**
     * Handles the collision between a bottle and an enemy.
     * @param {ThrowableObject} bottle - The thrown bottle.
     * @param {movableObject} enemy - The enemy to check.
    */
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

    /**
     * Eliminates a normal chicken after a bottle hit.
     * @param {ThrowableObject} bottle - The thrown bottle.
     * @param {Chicken} enemy - The hit chicken.
    */
    hitChicken(bottle, enemy) {
        if (enemy.isDeadChicken) {
            return;
        }
        enemy.die();
        bottle.splash();
    }

    /**
     * Eliminates a small chicken after a bottle hit.
     * @param {ThrowableObject} bottle - The thrown bottle.
     * @param {ChickenSmall} enemy - The hit small chicken.
    */
    hitSmallChicken(bottle, enemy) {
        if (enemy.isDeadChickenSmall) {
            return;
        }
        enemy.dieChickenSmall();
        bottle.splash();
    }

    /**
     * Damages the end boss after a bottle hit.
     * @param {ThrowableObject} bottle - The thrown bottle.
     * @param {Endboss} enemy - The end boss.
    */
    hitEndboss(bottle, enemy) {
        if (enemy.isDead()) {
            return;
        }
        enemy.hit();
        playSound("./audio/boss_hurt.mp3", 0.05);
        this.statusBarBoss.setPercentage(enemy.energy);
        bottle.splash();
    }

    /**
     * Throws a bottle if available.
    */
    checkThrowObjects() {
        if (this.keyboard.D && this.statusBarBottles.percentage >= 20) {
            let bottle = new ThrowableObject(this.character.x + 40, this.character.y + 90, this.character.otherDirection);
            this.throwableObjects.push(bottle);
            this.statusBarBottles.setPercentage(this.statusBarBottles.percentage - 20);
            this.keyboard.D = false;
        }
    }

    /**
     * Checks whether the player collects bottles.
    */
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

    /**
     * Checks whether the player collects coins.
    */
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

    /**
     * Checks collisions between the player and enemies.
    */
    checkCollisions() {
        this.level.enemies.forEach((enemy) => {
            if (this.isEnemyDead(enemy)) return;
            if (this.character.isJumpingOn(enemy)) {
                this.handleEnemyJumpCollision(enemy);
                return;
            }
            if (!this.character.ignoreEnemyCollision && this.character.isColliding(enemy)) {
                this.handleCharacterCollision();
            }
        });
    }

    /**
     * Checks whether an enemy is already dead.
     * @param {movableObject} enemy - The enemy to check.
     * @returns {boolean} True if the enemy is dead.
    */
    isEnemyDead(enemy) {
        if (enemy instanceof Chicken) {
            return enemy.isDeadChicken;
        }
        if (enemy instanceof ChickenSmall) {
            return enemy.isDeadChickenSmall;
        }
        return false;
    }

    /**
     * Handles jumping on an enemy.
     * @param {movableObject} enemy - The enemy that was jumped on.
    */
    handleEnemyJumpCollision(enemy) {
        if (enemy instanceof Chicken) {
            enemy.die();
            this.handleJumpOnEnemy();
        } else if (enemy instanceof ChickenSmall) {
            enemy.dieChickenSmall();
            this.handleJumpOnEnemy();
        }
    }

    /**
     * Handles damage dealt to the player.
    */
    handleCharacterCollision() {
        if (this.character.takeDamage()) {
            this.statusBar.setPercentage(this.character.energy);
        }
    }

    /**
     * Applies the bounce effect after defeating an enemy.
    */
    handleJumpOnEnemy() {
        this.character.speedY = 20;
        this.character.ignoreEnemyCollision = true;
        setTimeout(() => {
            this.character.ignoreEnemyCollision = false;
        }, 300);
    }

    /**
     * Shows the boss health bar when the player reaches the boss area.
    */
    checkBossBarPosition() {
        if (this.character.x >= 2000) {
            this.statusBarBoss.visible = true;
        }
    }

    /**
     * Draws the complete game world.
    */
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

    /**
     * Clears the canvas.
    */
    clearCanvas() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    /**
     * Draws all scrolling world objects.
    */
    drawWorldObjects() {
        this.ctx.translate(this.camera_x, 0);
        this.addObjectsToMap(this.level.backgroundObjects);
        this.addObjectsToMap(this.level.clouds);
        this.addObjectsToMap(this.level.bottles);
        this.addObjectsToMap(this.level.coins);
        this.ctx.translate(-this.camera_x, 0);
    }

    /**
     * Draws all fixed user interface elements.
    */
    drawFixedObjects() {
        this.addToMap(this.statusBar);
        this.addToMap(this.statusBarCoins);
        this.addToMap(this.statusBarBottles);
        if (this.statusBarBoss.visible) {
            this.addToMap(this.statusBarBoss);
        }
    }

    /**
     * Draws all moving game objects.
    */
    drawGameObjects() {
        this.ctx.translate(this.camera_x, 0);
        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.throwableObjects);
        this.addToMap(this.character);
        this.ctx.translate(-this.camera_x, 0);
    }

    /**
     * Requests the next animation frame.
    */
    requestNextFrame() {
        this.animationFrameId = requestAnimationFrame(() => {
            this.draw();
        });
    }

    /**
     * Draws all visible objects from an array.
     * @param {Array<DrawableObject>} objects - Objects to draw.
    */
    addObjectsToMap(objects) { // add all objects in the array to the map with the addToMap function
        objects.forEach((object) => {
            if (this.isObjectVisible(object)) {
                this.addToMap(object);
            }
        });
    }

    /**
     * Checks whether an object is inside the visible area.
     * @param {DrawableObject} object - The object to check.
     * @returns {boolean} True if the object is visible.
    */
    isObjectVisible(object) {
        const screenLeft = -this.camera_x - 200;
        const screenRight = -this.camera_x + this.canvas.width + 200;
        return (object.x + object.width >= screenLeft &&object.x <= screenRight);
    }

    /**
     * Draws a single object on the canvas.
     * @param {DrawableObject} mo - The object to draw.
    */
    addToMap(mo) {
        if (mo.otherDirection) {
            this.flipImage(mo);
        }
        mo.draw(this.ctx);
        if (mo.otherDirection) {
            this.flipImageBack(mo);
        }
    }

    /**
     * Mirrors an object before drawing.
     * @param {DrawableObject} mo - The object to mirror.
    */
    flipImage(mo) {
        this.ctx.save();
        this.ctx.translate(mo.width, 0);
        this.ctx.scale(-1, 1);
        mo.x = mo.x * -1;
    }

    /**
     * Restores the canvas after mirroring an object.
     * @param {DrawableObject} mo - The mirrored object.
    */
    flipImageBack(mo) {
        mo.x = mo.x * -1;
        this.ctx.restore();
    }
}