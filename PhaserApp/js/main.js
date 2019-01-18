let game = new Phaser.Game(1920, 1080, Phaser.AUTO, document.getElementById('game'));
let client = new Client();

function prepareGame() {
    let launchingScene = new LaunchingScene(client, startTest);
    game.state.add('Launching', launchingScene, true);
}

function startGame() {
    let gameScene = new GameScene(client);
    game.state.add('Game', gameScene, true);
}

function startTest() {
    let s = new TestScene(client);
    game.state.add('Test', s, true);
}

prepareGame();
