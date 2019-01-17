class Mobile {
    constructor(race){
        this.race = race;
    }

    setListeners (mobileClient){
        mobileClient.on("ADD_PLAYER", this.onAddPlayer(mobileClient));
    }

    onAddPlayer(mobileClient){
        console.log("ADD_PLAYER");
        try {
            let player = this.race.players.get(mobileClient.id);
            let team = this.race.getOrCreateTeam(player.getTeamColor());
            team.addPlayer(player);
            mobileClient.emit("PLAYER_ADDED", {status: 1});
            console.log("emit player added");
            if(team.getPlayersNumber() === 2){
                mobileClient.emit("TEAM_READY");
                team.player1.socket.emit("TEAM_READY");
                this.race.display.getSocket().emit("ADD_TEAM", {color: team.getColor()});
                mobileClient.broadcast.emit("START");
            }
        } catch (e) {
            console.log(e);
            mobileClient.emit("PLAYER_ADDED", {status: 0});
        }
    }

}
module.exports = Mobile;
