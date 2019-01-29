class Race {
    constructor() {
        this.teams = [];
    }

    addTeam(color) {
        this.teams.push(color);
    }

    removeTeam(color) {
        this.teams.splice(this.teams.indexOf(color), 1);
    }

    getColors() {
        return this.teams;
    }

    nbPlayers() {
        return this.teams.length;
    }
}