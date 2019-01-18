class TestScene {
    constructor() {
        this.velocity = 0;
    }

    preload() {
        game.load.spritesheet('map','assets/map.jpg');
        game.load.spritesheet('car','assets/car.png');
        game.load.spritesheet('building','assets/building.png');
        game.load.physics("collision","assets/collision.json");
    }

    create() {
        /*Enable Phyics Engine*/
        game.physics.startSystem(Phaser.Physics.P2JS);
        /*Adding Map*/
        let map = game.add.sprite(0,0,'map');
        /*Adding car*/
        this.car = game.add.sprite(570,100,'car');
        game.physics.p2.enable(this.car);
        this.car.body.angle = 90;

        this.cursors = game.input.keyboard.createCursorKeys();

        /*Create Collision Groups*/
        let carCollisionGroup = game.physics.p2.createCollisionGroup();
        let buildingCollisionGroup = game.physics.p2.createCollisionGroup();
        game.physics.p2.updateBoundsCollisionGroup();

        /*Adding Building*/
        let building = game.add.sprite(640,420,'building');
        game.physics.p2.enable(building);
        building.body.kinematic = true; //Building is static
        building.body.clearShapes(); //Remove standard Bounding Box
        building.body.loadPolygon('collision','building'); //Load Bounding Box from Physics Editor File

        //Set Collision Groups
        this.car.body.setCollisionGroup(carCollisionGroup);
        building.body.setCollisionGroup(buildingCollisionGroup);

        //Set Collision
        this.car.body.collides([carCollisionGroup,buildingCollisionGroup]);
        building.body.collides([buildingCollisionGroup,carCollisionGroup]);
    }

    update() {
        /*Update Velocity*/
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

        /*Set X and Y Speed of Velocity*/
        this.car.body.velocity.x = this.velocity * Math.cos((this.car.angle-90)*0.01745);
        this.car.body.velocity.y = this.velocity * Math.sin((this.car.angle-90)*0.01745);

        /*Rotation of Car*/
        if (this.cursors.left.isDown)
            this.car.body.angularVelocity = -10*(this.velocity/1000);
        else if (this.cursors.right.isDown)
            this.car.body.angularVelocity = 10*(this.velocity/1000);
        else
            this.car.body.angularVelocity = 0;
    }
}
