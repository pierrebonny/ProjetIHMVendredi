/**
 * Scene containing the game and the boats
 */
class GameScene {
    constructor(client) {
        this.client = client;
        this.reactFromMovement = this.reactFromMovement.bind(this);
        this.boats = {};
    }

    preload() {
        game.load.spritesheet('background','assets/lake.png');
        game.load.spritesheet('boat','assets/canoe_blue.png');
        game.load.image('buoy', 'assets/buoy.png');
        game.load.image('strip', 'assets/white.png');
        game.load.image('separator', 'assets/separator.png');
    }

    create() {
        // Background
        game.add.sprite(0,0,'background');

        // Fullscreen
        game.scale.fullScreenScaleMode = Phaser.ScaleManager.SHOW_ALL;
        game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        game.input.onDown.add(this.fullscreen, this);

        // Physics
        game.physics.startSystem(Phaser.Physics.P2JS);

        // Buoys
        for (let y = 170; y <= 970; y += 400) {
            for (let x = 100; x < 1900; x += 100) {
                game.add.image(x, y, "buoy");
            }
        }

        // Strip
        game.add.image(1760, 168, "strip");

        // Collision groups
        let boatsCollisionGroup = game.physics.p2.createCollisionGroup();
        let separatorsCollisionGroup = game.physics.p2.createCollisionGroup();
        game.physics.p2.updateBoundsCollisionGroup();

        // Separators
        let separators = game.add.group();
        separators.enableBody = true;
        separators.physicsBodyType = Phaser.Physics.P2JS;

        let sep;
        for (let y = 170; y <= 970; y += 400) {
            sep = game.add.sprite(1920/2, y+32/2, "separator");
            sep.visible = false;
            game.physics.p2.enable(sep);
            sep.body.kinematic = true;
            sep.body.setCollisionGroup(separatorsCollisionGroup);
            sep.body.collides([separatorsCollisionGroup, boatsCollisionGroup]);
        }

        // Boat
        let boat;
        this.colors = ["blue", "yellow"];
        for (let i = 1; i <= 2; i++) {
            boat = new Boat(200, 400*i);
            boat.getBoat().body.setCollisionGroup(boatsCollisionGroup);
            boat.getBoat().body.collides([boatsCollisionGroup, separatorsCollisionGroup]);
            this.boats[this.colors[i-1]] = boat;
        }

        // Listeners
        this.client.listenMovement(this.reactFromMovement);
        this.cursors = game.input.keyboard.createCursorKeys();
    }

    reactFromMovement(mov) {
        this.boats[mov.color].reactFromMovement(mov)
    }

    update() {
        for (let color of this.colors) {
            this.boats[color].update(this.cursors);
        }
    }

    fullscreen() {
        if (game.scale.isFullScreen) {
            game.scale.stopFullScreen();
        } else {
            game.scale.startFullScreen(false);
        }
    }
}
