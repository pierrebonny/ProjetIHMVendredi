let game = new Phaser.Game(24*32, 17*32, Phaser.AUTO, document.getElementById('game'));
let client = new Client();

function prepareGame() {
    let launchingScene = new LaunchingScene(client, startTest);
    game.state.add('Launching', launchingScene);
    game.state.start('Launching');
}

function startGame() {
    let gameScene = new GameScene(client);
    game.state.add('Game', gameScene);
    game.state.start('Game');
}

function startTest() {
    let s = new TestScene();
    game.state.add('Test', s);
    game.state.start('Test');
}

prepareGame();
