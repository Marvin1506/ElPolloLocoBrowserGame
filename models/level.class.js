/**
 * Represents a game level containing all level objects.
*/
class Level {
    enemies;
    clouds;
    backgroundObjects;
    bottles;
    coins;
    level_end_x = 2260;

    /**
     * Creates a new game level.
     * @param {movableObject[]} enemies The enemies in the level.
     * @param {Cloud[]} clouds The background clouds.
     * @param {BackgroundObject[]} backgroundObjects The background objects.
     * @param {Bottle[]} bottles The collectible bottles.
     * @param {Coin[]} coins The collectible coins.
    */
    constructor(enemies, clouds, backgroundObjects, bottles, coins) {
        this.enemies = enemies;
        this.clouds = clouds;
        this.backgroundObjects = backgroundObjects;
        this.bottles = bottles;
        this.coins = coins;
    }
}