class Mobile {
    constructor(race, mobileClient){
        this.race = race;
        this.mobileClient = mobileClient;
    }

    setListeners (){
        this.mobileClient.on("ADD_PLAYER", () => this.onAddPlayer());
        this.mobileClient.on("MOVE", (data) => this.onMove(data));
    }

    onAddPlayer(){
        console.log("ADD_PLAYER");
        try {
            let player = this.race.players.get(this.mobileClient.id);
            let team = this.race.getOrCreateTeam(player.getTeamColor());
            team.addPlayer(player);
            this.mobileClient.emit("PLAYER_ADDED", {status: 1});
            console.log("emit player added");
            if(team.getPlayersNumber() === 2){
                this.mobileClient.emit("TEAM_READY");
                team.getPlayers()[0].getSocket().emit("TEAM_READY");
                this.race.getDisplay().getSocket().emit("ADD_TEAM", {color: team.getColor()});
                clearInterval(this.race.getTimerId());
                this.race.launchStartChrono();
            }
        } catch (e) {
            console.log(e);
            this.mobileClient.emit("PLAYER_ADDED", {status: 0});
        }
    }

    onMove(data) {
        this.race.getDisplay().getSocket().emit("MOVE",data)
    }

}
module.exports = Mobile;
