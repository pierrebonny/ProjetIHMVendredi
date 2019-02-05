class Race {
    constructor() {
        this.teams = [];
        this.start = 0;
        this.ranking = [];
        this.times = {};
    }

    /* Teams */
    addTeam(color) {
        this.teams.push(color);
    }

    removeTeam(color) {
        this.teams.splice(this.teams.indexOf(color), 1);
    }

    getColors() {
        return this.teams;
    }

    getBoatPosition(color) {
        return this.teams.indexOf(color);
    }

    nbPlayers() {
        return this.teams.length;
    }

    /* Time */
    startRace() {
        this.start = Date.now();
    }

    getStartTime() {
        return this.start;
    }

    /* Ranking */
    teamFinished(color, time) {
        this.ranking[this.ranking.length] = color;
        this.times[color] = time;
    }

    nbTeamFinished() {
        return this.ranking.length;
    }

    getColorsRanking() {
        return this.ranking;
    }

    getTeamTime(color) {
        return this.times[color];
    }

    /* Ending */
    allFinished() {
        return this.teams.length === this.ranking.length;
    }
}