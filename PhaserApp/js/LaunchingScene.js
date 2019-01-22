/**
 * Scene before launching the game
 */
class LaunchingScene {
    constructor(client, startGame) {
        this.client = client;
        this.startGame = startGame;
        this.addTeam = this.addTeam.bind(this);
        this.removeTeam = this.removeTeam.bind(this);
    }

    init() {
        game.stage.disableVisibilityChange = true;
    }

    preload() {
        game.load.image('background','assets/kayak_background.png');
        game.load.image('sprite','assets/sprites/sprite.png');
        game.load.image('team_blue', 'assets/team_blue.png');
        game.load.image('team_green', 'assets/team_green.png');
        game.load.image('team_red', 'assets/team_red.png');
        game.load.image('team_yellow', 'assets/team_yellow.png');
    }

    create() {
        game.add.sprite(0,0,'background');

        // Boats
        const teamColors = ["blue", "green", "red", "yellow"];
        this.teamImages = {};
        this.teamTexts = {};

        let x = 1750;
        let y = 370;
        let image;
        let text;
        for (const team of teamColors) {
            image = game.add.image(x, y, "team_" + team);
            text = game.add.text(x - 150, y + 50, 'Prêts', { fontSize: '32px', fill: team });

            image.height = 150;
            image.width = 150;
            image.visible = false;
            text.visible = false;

            this.teamImages[team] = image;
            this.teamTexts[team] = text;
            y += 175;
        }

        // Clock
        this.clock = game.add.graphics(game.world.centerX, 130);

        this.timeTxt = game.add.text(game.world.centerX, 110, "00", {fontSize:'48px', fill:'#000000'});
        this.timeTxt.anchor.set(0.5, 0.5);
        this.timeTxt.visible = false;
        this.secondsTxt = game.add.text(game.world.centerX, 170, "SECONDES", {fontSize:'16px', fill:'#000000'});
        this.secondsTxt.anchor.set(0.5, 0.5);
        this.secondsTxt.visible = false;

        // Listeners
        this.client.listenAddTeam(this.addTeam);
        this.client.listenRemoveTeam(this.removeTeam);
        this.client.listenStart(this.startGame);
    }

    update() {
        if (this.startTime !== undefined) {
            let currentTime = new Date();
            let seconds = currentTime.getSeconds() - this.startTime;
            let ratio = seconds/15;
            let angle = (ratio * 360);
            if (angle === 0) angle = 1;

            // fudge it so the circle completes
            angle = angle - 0.0001;

            // clear the graphic
            this.clock.clear();

            // draw the circle
            this.clock.moveTo(game.world.centerX, game.world.centerY);
            this.clock.beginFill(0xFFFFFFFF,0.1);
            this.clock.drawCircle(0, 0, 278);
            this.clock.endFill();

            // draw the arc
            this.clock.lineStyle(15, 0xff9933);
            this.clock.arc(0, 0, 100, game.math['degToRad'](-89.999), game.math['degToRad'](-89.999 + angle), false);
            this.timeTxt.text = ('00'+(15-seconds)).slice(-2);
        }
    }

    addTeam(color) {
        this.teamImages[color].visible = true;
        this.teamTexts[color].visible = true;

        this.launchTimer();
    }

    removeTeam(color) {
        this.teamImages[color].visible = false;
        this.teamTexts[color].visible = false;

        this.cutTimer();
    }

    launchTimer() {
        let currentTime = new Date();
        this.startTime = currentTime.getSeconds();
        this.timeTxt.visible = true;
        this.secondsTxt.visible = true;
    }

    cutTimer() {
        this.startTime = undefined;
        this.timeTxt.visible = false;
        this.secondsTxt.visible = false;
    }
}