/**
 * Scene containing the game and the boats
 */
class GameScene {
    constructor(client) {
        this.client = client;
    }

    init() {
        game.stage.disableVisibilityChange = true;
    }

    preload() {
        /*game.load.tilemap('map', 'assets/map/example_map.json', null, Phaser.Tilemap.TILED_JSON);
        game.load.spritesheet('tileset', 'assets/map/tilesheet.png',32,32);
        game.load.image('sprite','assets/sprites/sprite.png');*/
        game.add.text(52, 52, 'message', { fontSize: '32px', fill: '#000' });
    }

    create() {
        this.playerMap = {};

        //const testKey = game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
        //testKey.onDown.add(Client.sendTest, this);

        const map = game.add.tilemap('map');
        map.addTilesetImage('tilesheet', 'tileset'); // tilesheet is the key of the tileset in map's JSON file
        let layer;
        for (let i = 0; i < map.layers.length; i++) {
            layer = map.createLayer(i);
        }
        layer.inputEnabled = true; // Allows clicking on the map ; it's enough to do it on the last layer
        layer.events.onInputUp.add(this.getCoordinates, this);
        //Client.askNewPlayer();
    }

    getCoordinates(layer, pointer) {
        console.log("[GAME] send coords", pointer.worldX, pointer.worldY);
    }

    addNewPlayer(id, x, y) {
        this.playerMap[id] = game.add.sprite(x, y, 'sprite');
    }

    movePlayer(id, x, y) {
        let player = this.playerMap[id];
        let distance = Phaser.Math.distance(player.x, player.y, x, y);
        let tween = game.add.tween(player);
        let duration = distance*10;
        tween.to({x:x,y:y}, duration);
        tween.start();
    }

    removePlayer(id) {
        this.playerMap[id].destroy();
        delete this.playerMap[id];
    }
}