import './environment.js';

class Colony {
    constructor() {
        this.environment = new Eenvironment();
        this.resources = [];
        this.ants = [];
        this.predators = [];
    }

    beat() {
        for (let i = 0; i < this.resources.length; i++) {
            this.resources[i].beat();
        }

        for (let i = 0; i < this.ants.length; i++) {
            this.ants[i].beat();
        }

        this.environment.beat();
    }

    render() {
        for (let i = 0; i < this.resources.length; i++) {
            this.resources[i].render();
        }

        for (let i = 0; i < this.ants.length; i++) {
            this.ants[i].render();
        }

        this.environment.render();
    }
}