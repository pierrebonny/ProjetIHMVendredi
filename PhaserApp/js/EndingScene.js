/**
 * Scene at the end game, showing the ranking.
 */
class EndingScene {
    constructor(client, race, prepareNewGame) {
        this.client = client;
        this.race = race;
        this.prepareNewGame = prepareNewGame;
        this.clockAvailable = true;
    }

    init() {
        game.stage.disableVisibilityChange = true;
    }

    preload() {
        game.load.image('background','assets/ending_background.png');
        game.load.image('team_blue', 'assets/team_blue.png');
        game.load.image('team_green', 'assets/team_green.png');
        game.load.image('team_red', 'assets/team_red.png');
        game.load.image('team_yellow', 'assets/team_yellow.png');
    }

    create() {
        // Background
        game.add.sprite(0,0,'background');

        // Fullscreen
        game.scale.fullScreenScaleMode = Phaser.ScaleManager.SHOW_ALL;
        game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        game.input.onDown.add(this.fullscreen, this);

        // Title
        let title = game.add.text(game.world.centerX, 70, "Partie terminée !", {fontSize:'126px', fill:'#ffffff'});
        title.anchor.set(0.5, 0.5);
        title.setShadow(3, 3, 'rgba(0,0,0,0.5)', 5);

        // Sub title
        title = game.add.text(game.world.centerX, 240, "Lancement d'une nouvelle partie dans", {fontSize:'32px', fill:'#ffffff'});
        title.anchor.set(0.5, 0.5);

        // Clock
        this.startTime = (new Date()).getSeconds();
        this.clock = game.add.graphics(game.world.centerX, 400);

        this.timeTxt = game.add.text(game.world.centerX, 375, "15", {fontSize:'48px', fill:'#ffffff'});
        this.timeTxt.anchor.set(0.5, 0.5);
        this.secondsTxt = game.add.text(game.world.centerX, 435, "SECONDES", {fontSize:'16px', fill:'#ffffff'});
        this.secondsTxt.anchor.set(0.5, 0.5);

        // Ranking
        let posY = 700;
        let elt;
        for (let color of this.race.getColorsRanking()) {
            elt = game.add.image(game.world.centerX-100, posY, "team_" + color);
            elt.anchor.set(0.5, 0.5);
            elt.height = 130;
            elt.width = 130;

            elt = game.add.text(game.world.centerX+100, posY, this.race.getTeamTime(color), {fontSize:'48px', fill: color});
            elt.anchor.set(0.5, 0.5);

            posY += 180;
        }

        // More info
        title = game.add.text(game.world.centerX, 1050, "Pour en savoir plus sur vos performances, consultez la tablette.",
            {fontSize:'32px', fill:'#ffffff'});
        title.anchor.set(0.5, 0.5);
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
            this.timeTxt.text = seconds;

            // Seconds without "s"
            if (seconds === 1) {
                this.secondsTxt.text = "SECONDE";
            }

            // Stop clock
            if (seconds <= 0) {
                this.clockAvailable = false;
                this.prepareNewGame();
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
