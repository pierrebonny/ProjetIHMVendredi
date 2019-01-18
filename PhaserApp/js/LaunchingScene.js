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
        game.load.tilemap('map', 'assets/map/example_map.json', null, Phaser.Tilemap.TILED_JSON);
        game.load.spritesheet('tileset', 'assets/map/tilesheet.png',32,32);
        game.load.image('sprite','assets/sprites/sprite.png');
        this.message = game.add.text(16, 16, 'score: 0', { fontSize: '32px', fill: '#000' });
    }

    create() {
        const map = game.add.tilemap('map');
        map.addTilesetImage('tilesheet', 'tileset'); // tilesheet is the key of the tileset in map's JSON file
        let layer;
        for (let i = 0; i < map.layers.length; i++) {
            layer = map.createLayer(i);
        }
        layer.inputEnabled = true; // Allows clicking on the map ; it's enough to do it on the last layer
        layer.events.onInputUp.add(this.getCoordinates, this);

        this.client.listenTeam(this.changeMessage);
        this.client.listenStart(this.startGame);
    }

    getCoordinates(layer, pointer) {
        console.log("[LAUNCHING] send coords", pointer.worldX, pointer.worldY);
    }

    changeMessage(message) {
        this.message.text = message;
    }
}