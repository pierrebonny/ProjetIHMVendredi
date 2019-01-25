/**
 * Scene containing the game and the boats
 */
class GameScene {
    constructor(client) {
        this.client = client;
        this.reactFromMovement = this.reactFromMovement.bind(this);
        this.velocity = 0;
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
        this.car = game.add.sprite(400,400,'boat');
        game.physics.p2.enable(this.car);
        this.car.body.angle = 90;

        this.cursors = game.input.keyboard.createCursorKeys();

        //Set Collision Groups
        this.car.body.setCollisionGroup(boatsCollisionGroup);
        this.car.body.collides([boatsCollisionGroup,separatorsCollisionGroup]);

        // Listeners
        this.client.listenMovement(this.reactFromMovement);
    }

    reactFromMovement(mov) {
        this.velocity += mov.speed;
        this.car.body.angularVelocity += mov.rotation;
        this.car.body.angularVelocity += (mov.rotation > 0) ? + mov.speed/100 : - mov.speed/100;
        console.log("VELOCITY", this.velocity, "ANGULAR_VELOCITY", this.car.body.angularVelocity);
    }

    update() {
        // Update velocity
        if (this.cursors.up.isDown && this.velocity <= 400) {
            this.velocity += 7;
        }
        else if (this.cursors.down.isDown && this.velocity >= -400) {
            this.velocity -= 7;
        }
        else {
            if (this.velocity >= 7)
                this.velocity -= 7;
            if (this.velocity <= -7)
                this.velocity += 7;
        }

        // Set X and Y speed of velocity
        this.car.body.velocity.x = this.velocity * Math.cos((this.car.angle-90)*0.01745);
        this.car.body.velocity.y = this.velocity * Math.sin((this.car.angle-90)*0.01745);

        // Rotation of boat
        /*if (this.cursors.left.isDown) {
            this.car.body.angularVelocity = -10*(this.velocity/1000);
        }
        else if (this.cursors.right.isDown) {
            this.car.body.angularVelocity = 10*(this.velocity/1000);
        }
        else {
            this.car.body.angularVelocity = 0;
        }*/
    }

    fullscreen() {
        if (game.scale.isFullScreen) {
            game.scale.stopFullScreen();
        } else {
            game.scale.startFullScreen(false);
        }
    }
}
