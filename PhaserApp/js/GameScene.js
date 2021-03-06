/**
 * Scene containing the game and the boats
 */
class GameScene {
    constructor(client, race, finishGame) {
        this.client = client;
        this.race = race;
        this.finishGame = finishGame;
        this.reactFromMovement = this.reactFromMovement.bind(this);
        this.boats = {};
        this.bars = [];
    }

    preload() {
        game.load.spritesheet('background','assets/lake.png');
        game.load.spritesheet('boat_blue','assets/canoe_blue.png');
        game.load.spritesheet('boat_green','assets/canoe_green.png');
        game.load.spritesheet('boat_red','assets/canoe_red.png');
        game.load.spritesheet('boat_yellow','assets/canoe_yellow.png');
        game.load.image('buoy', 'assets/buoy.png');
        game.load.image('strip', 'assets/white.png');
        game.load.image('separator', 'assets/separator.png');
        game.load.image('chrono_blue', 'assets/chrono_blue.png');
        game.load.image('chrono_green', 'assets/chrono_green.png');
        game.load.image('chrono_red', 'assets/chrono_red.png');
        game.load.image('chrono_yellow', 'assets/chrono_yellow.png');
        game.load.image('3', 'assets/3.png');
        game.load.image('2', 'assets/2.png');
        game.load.image('1', 'assets/1.png');
        game.load.image('go', 'assets/go.png');
        game.load.image('finished', 'assets/finished.png');
        game.load.audio("mario", "assets/startSound.ogg");
        game.load.audio("first", "assets/first.ogg");
        game.load.audio("second", "assets/second.ogg");
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

        // Boats
        let boat;
        let color;
        for (let i = 1; i <= this.race.nbPlayers(); i++) {
            color = this.race.getColors()[i-1];
            boat = new Boat(80, 400*i, color, this.finishDetected.bind(this));
            boat.getBoat().body.setCollisionGroup(boatsCollisionGroup);
            boat.getBoat().body.collides([boatsCollisionGroup, separatorsCollisionGroup]);
            this.boats[color] = boat;
        }

        // Chrono
        this.chronoTexts = {};
        for (let i = 0; i < this.race.nbPlayers(); i++) {
            color = this.race.getColors()[i];
            game.add.image(20 + i*300, 20, "chrono_"+color);
            this.chronoTexts[color] = game.add.text(90 + i*300, 32, '0:00', { fontSize: '32px', fill: '#000' });
        }

        // Bars
        let barConfig;
        let x;
        let y;
        for (let i = 0; i < this.race.nbPlayers(); i++) {
            color = this.race.getColors()[i];
            x = 1200 + 300*i;
            y = 50;

            barConfig = { x: x, y: y, width: 200, height: 30, bg: {color: '#333333'}, bar: {color: color} };
            this.bars[2*i+1] = new HealthBar(game, barConfig);
            this.bars[2*i+1].setPercent(0);
            game.add.text(x-15, y-15, "J1", {fontSize:'24px', fill:'#ffffff'});

            y += 50;

            barConfig = { x: x, y: y, width: 200, height: 30, bg: {color: '#333333'}, bar: {color: color} };
            this.bars[2+2*i] = new HealthBar(game, barConfig);
            this.bars[2+2*i].setPercent(0);
            game.add.text(x-15, y-15, "J2", {fontSize:'24px', fill:'#ffffff'});
        }

        // Listeners
        this.client.listenMovement(this.reactFromMovement);
        this.cursors = game.input.keyboard.createCursorKeys();

        // Start race
        this.imgState = 5;
        this.img = game.add.image(game.world.centerX, game.world.centerY, "3");
        this.img.anchor.set(0.5, 0.5);
        setTimeout(() => game.add.audio("mario").play(), 500);
        game.time.events.repeat(Phaser.Timer.SECOND * 0.9, 5, this.startRace, this);
    }

    reactFromMovement(mov) {
        if (this.race.getStartTime() !== 0 && this.race.getStartTime() !== undefined) {
            this.boats[mov.color].reactFromMovement(mov);
            this.bars[mov.id].setPercent(mov.performance);
        }
    }

    update() {
        if (this.race.getStartTime() !== 0 && this.race.getStartTime() !== undefined) {
            for (let color of this.race.getColors()) {
                this.boats[color].update(this.cursors);
                if (!this.boats[color].hasFinished()) {
                    this.chronoTexts[color].text = this.formatTime((Date.now() - this.race.getStartTime())/1000);
                }
            }
        }
    }

    formatTime(s) {
        return s.toString().replace(".", ":");
    }

    fullscreen() {
        if (game.scale.isFullScreen) {
            game.scale.stopFullScreen();
        } else {
            game.scale.startFullScreen(false);
        }
    }

    finishDetected(color, boatPositions) {
        // Audio
        if (this.race.nbTeamFinished() === 0) {
            game.add.audio("first").play()
        } else {
            game.add.audio("second").play()
        }

        // Image
        game.add.image(game.world.centerX-244, 260 + 400*this.race.getBoatPosition(color), "finished");

        this.race.teamFinished(color, this.chronoTexts[color].text);
        this.client.sendFinished(color, boatPositions, this.chronoTexts[color].text);

        // Detect race ending
        if (this.race.allFinished()) {
            setTimeout(() => this.finishGame(), 5000);
        }
    }

    startRace() {
        switch (this.imgState) {
            case 5:
                this.imgState--;
                break;
            case 4:
                this.img.destroy();
                this.img = game.add.image(game.world.centerX, game.world.centerY, "2");
                this.img.anchor.set(0.5, 0.5);
                this.imgState--;
                break;
            case 3:
                this.img.destroy();
                this.img = game.add.image(game.world.centerX, game.world.centerY, "1");
                this.img.anchor.set(0.5, 0.5);
                this.imgState--;
                break;
            case 2:
                this.img.destroy();
                this.img = game.add.image(game.world.centerX, game.world.centerY, "go");
                this.img.anchor.set(0.5, 0.5);
                this.imgState--;
                break;
            case 1:
                this.img.destroy();
                this.race.startRace();
        }
    }
}
