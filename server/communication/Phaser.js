class Phaser {
    constructor(race, phaserClient){
        this.race = race;
        this.phaserClient = phaserClient;
    }

    setListeners (){
        this.phaserClient.on("FINISH", (data) => this.onFinish(data));
    }


    onFinish(data) {
        if(this.race.getStatsSocket()){
            this.race.getStatsSocket().emit("FINISH", data);
        }
        this.race.finishTeam(data.color);
    }
}
module.exports = Phaser;
