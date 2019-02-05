/**
 * Scene at the end game
 */
class EndingScene {
    constructor(client, race) {
        this.client = client;
        this.race = race;
        this.clockAvailable = true;
    }

    init() {
        game.stage.disableVisibilityChange = true;
    }

    preload() {
        game.load.image('background','assets/ending_background.png');
    }

    create() {
        // Background
        game.add.sprite(0,0,'background');

        // Fullscreen
        game.scale.fullScreenScaleMode = Phaser.ScaleManager.SHOW_ALL;
        game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        game.input.onDown.add(this.fullscreen, this);

        // Title
        game.add.text(game.world.centerX - 350, 30, "Partie terminée !", {fontSize:'96px', fill:'#ffffff'});

        // Clock
        this.startTime = (new Date()).getSeconds();
        this.clock = game.add.graphics(game.world.centerX, 380);

        this.timeTxt = game.add.text(game.world.centerX, 360, "00", {fontSize:'48px', fill:'#ffffff'});
        this.timeTxt.anchor.set(0.5, 0.5);
        this.secondsTxt = game.add.text(game.world.centerX, 420, "SECONDES", {fontSize:'16px', fill:'#ffffff'});
        this.secondsTxt.anchor.set(0.5, 0.5);
    }

    update() {
        if (this.clockAvailable) {
            // Time
            let seconds = (15 - ((new Date()).getSeconds() - this.startTime)) % 60;
            let ratio = (15 - seconds)/15;

            // Angle
            let angle = (ratio * 360);
            if (angle === 0) angle = 1;
            angle = angle - 0.0001;

            // Clear the graphic
            this.clock.clear();

            // Draw the circle
            this.clock.moveTo(game.world.centerX, game.world.centerY);
            this.clock.beginFill(0xFFFFFFFF,0.1);
            this.clock.drawCircle(0, 0, 278);
            this.clock.endFill();

            // Draw the arc
            this.clock.lineStyle(15, 0xff9933);
            this.clock.arc(0, 0, 100, game.math['degToRad'](-89.999), game.math['degToRad'](-89.999 + angle), false);
            this.timeTxt.text = ('00'+seconds).slice(-2);

            // Stop clock
            if (seconds === 0) {
                this.clockAvailable = false;
            }
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
