class Player {
    // méthode constructor
    constructor(teamColor, socket) {
        this.teamColor = teamColor;
        this.socket = socket;
    }

    getTeamColor(){
        return this.teamColor;
    }

}

module.exports = Player;
