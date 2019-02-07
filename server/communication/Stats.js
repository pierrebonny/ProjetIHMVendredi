class Stats {
    constructor(race, statsClient){
        this.race = race;
        this._statsClient = statsClient;
    }

    setListeners (){

    }


    getStatsClient() {
        return this._statsClient;
    }

}
module.exports = Stats;
