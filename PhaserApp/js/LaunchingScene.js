/**
 * Scene before launching the game
 */
class LaunchingScene {
    constructor(client, startGame) {
        this.client = client;
        this.startGame = startGame;
        this.changeMessage = this.changeMessage.bind(this);
    }

    init() {
        game.stage.disableVisibilityChange = true;
    }

    preload() {
        game.load.spritesheet('background','assets/kayak_background.png');
        game.load.tilemap('map', 'assets/map/example_map.json', null, Phaser.Tilemap.TILED_JSON);
        game.load.spritesheet('tileset', 'assets/map/tilesheet.png',32,32);
        game.load.image('sprite','assets/sprites/sprite.png');
    }

    create() {
        let map = game.add.sprite(0,0,'background');
        /*const map = game.add.tilemap('map');
        map.addTilesetImage('tilesheet', 'tileset'); // tilesheet is the key of the tileset in map's JSON file
        let layer;
        for (let i = 0; i < map.layers.length; i++) {
            layer = map.createLayer(i);
        }
        layer.inputEnabled = true; // Allows clicking on the map ; it's enough to do it on the last layer
        layer.events.onInputUp.add(this.getCoordinates, this);*/

        // Message
        this.message = game.add.text(16, 16, 'Miaou', { fontSize: '32px', fill: '#000' });

        // Listeners
        this.client.listenAddTeam(this.changeMessage);
        this.client.listenRemoveTeam(this.changeMessage);
        this.client.listenStart(this.startGame);
    }

    getCoordinates(layer, pointer) {
        console.log("[LAUNCHING] coords", pointer.worldX, pointer.worldY);
    }

    changeMessage(message) {
        this.message.text = message;
    }
}