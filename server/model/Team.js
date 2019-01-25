class Team {

    constructor(color) {
        this.color = color;
        this.players = [];
    }

    getColor(){
        return this.color;
    }

    addPlayer(player){
        this.players.push(player);
    }

    getPlayersNumber(){
        return this.players.length;
    }

    getPlayers() {
        return this.players;
    }
}
module.exports = Team;
