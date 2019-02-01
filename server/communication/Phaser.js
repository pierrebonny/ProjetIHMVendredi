class Phaser {
    constructor(race, phaserClient){
        this.race = race;
        this.phaserClient = phaserClient;
    }

    setListeners (phaserClient){
        this.phaserClient.on("FINISH", (data) => this.onFinish(data));
    }


    onFinish(data){
        this.race.getStatsSocket().emit("FINISH", data);
    }
}
module.exports = Phaser;
