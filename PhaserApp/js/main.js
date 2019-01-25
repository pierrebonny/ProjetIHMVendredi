let game = new Phaser.Game(1920, 1080, Phaser.AUTO, document.getElementById('game'));
let client = new Client();

function prepareGame() {
    let launchingScene = new LaunchingScene(client, startGame);
    game.state.add('Launching', launchingScene, true);
}

function startGame() {
    let gameScene = new GameScene(client);
    game.state.add('Game', gameScene, true);
}

prepareGame();