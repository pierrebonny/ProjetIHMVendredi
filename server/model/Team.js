class Team {

    constructor(color) {
        this.color = color;
        this.playersNumber = 0;
    }

    getColor(){
        return this.color;
    }

    addPlayer(player){
        this.player1 ? this.player2 = player : this.player1 = player;
        this.playersNumber++;
    }

    getPlayersNumber(){
        return this.playersNumber;
    }
}
module.exports = Team;
