class Player {
    // méthode constructor
    constructor(teamColor, socket) {
        this.teamColor = teamColor;
        this.socket = socket;
    }

    getTeamColor(){
        return this.teamColor;
    }

    getSocket() {
        return this.socket;
    }

}

module.exports = Player;
