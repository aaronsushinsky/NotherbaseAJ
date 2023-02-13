class AntHillGame {
    constructor() {
        this.colonies = [];

        this.beat();
    }

    load(colonies) {
        this.colonies = colonies;
    }

    beat() {
        for (let i = 0; i < this.colonies.length; i++) {
            this.colonies[i].beat();
        }
    }
}