var http = require('http');
var fs = require('fs');
const Player = require("./Player");
const Team = require("./Team");
const Display = require("./Display");
const Mobile = require("../communication/Mobile");
const Phaser = require("../communication/Phaser");
const Stats = require("../communication/Stats");

class Race {
    constructor(){
        this.teams = [];
        this.players = new Map();
        this.server = this.initiateServer();
        this.stats = new Stats();
        this.io = require('socket.io').listen(this.server);
        this.listenToClients();
    }

    // Chargement du fichier index.html affiché au client
    initiateServer() {
        var server = http.createServer(function (req, res) {
            fs.readFile('./index.html', 'utf-8', function (error, content) {
                res.writeHead(200, {"Content-Type": "text/html"});
                res.end(content);
            });
        });

        server.listen(8080);
        return server;
    }

    listenToClients(){
        console.log("listening...");
        // Quand un client se connecte, on le note dans la console
        this.io.sockets.on('connection', (client) => {
            console.log("connect");
            client.on('CONNECTION', (data)=> {
                if(data.device === "Phaser") {
                    try {
                        let phaser = new Phaser(this);
                        phaser.setListeners(client);
                        this.display = new Display(client);
                        console.log('Phaser est connecté !');
                        client.emit("CONNECTION_STATE", {status: 1});
                    }
                    catch (e) {
                        client.emit("CONNECTION_STATE", {status: 0});
                    }
                }
                else if(data.device === "Mobile") {
                    try {
                        let mobile = new Mobile(this, client);
                        mobile.setListeners();
                        let player = new Player(data.color, client);
                        this.players.set(client.id, player);
                        console.log('Un joueur mobile est connecté !');
                        client.emit("CONNECTION_STATE", {status: 1});
                    }
                    catch (e) {
                        console.log(e);
                        client.emit("CONNECTION_STATE", {status: 0});
                    }
                }else if(data.device === "Stats") {
                    try {
                        this.stats = new Stats(this, client);
                        this.stats.setListeners();
                        client.emit("CONNECTION_STATE", {status: 1});
                        console.log("stats connectés");
                    }
                    catch (e) {
                        console.log(e);
                        client.emit("CONNECTION_STATE", {status: 0});
                    }
                }

                else {
                    client.emit("CONNECTION_STATE", {status: 0});
                }
            });
        });
    }

    getOrCreateTeam(color){
        for(let team of this.teams) {
            if(team.getColor() === color) {
                return team;
            }
        }
        let team = new Team(color);
        this.teams.push(team);
        return team;
    }

    getDisplay(){
        return this.display;
    }

    getStatsSocket(){
        return this.stats.getStatsClient();
    }

    launchStartChrono() {
        this.timerId = setInterval(function (){clearInterval(this.timerId); this.io.sockets.emit("START"); console.log("start")}.bind(this),15000)
    }

    getTimerId() {
        return this.timerId;
    }

    setTimerId(newTimerId){
        this.timerId = newTimerId;
    }
}
module.exports = Race;
