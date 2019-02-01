class Race {
    constructor() {
        this.teams = [];
        this.start = 0;
        this.ranking = [];
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
    teamFinished(color) {
        this.ranking[this.ranking.length] = color;
    }

    nbTeamFinished() {
        return this.ranking.length;
    }
}