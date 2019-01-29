let game = new Phaser.Game(1920, 1080, Phaser.AUTO, document.getElementById('game'));
let client = new Client();
let race;

function prepareGame() {
    race = new Race();
    let launchingScene = new LaunchingScene(client, race, startGame);
    game.state.add('Launching', launchingScene, true);
}

function startGame() {
    let gameScene = new GameScene(client, race);
    game.state.add('Game', gameScene, true);
}

prepareGame();