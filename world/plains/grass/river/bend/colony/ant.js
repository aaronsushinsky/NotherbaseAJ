class Ant {
    constructor(ant = null) {
        this.state = "defend";

        this.variation = 1 + Math.floor(Math.random() * 5);

        this.resourceType = "food";
        this.resourcesHeld = 0;
        this.health = 10000;
        this.exertion = 10;
    }

    harvest = () => {
        this[`$${this.state}`].removeClass("selected");
        this.state = "harvest";
        this[`$${this.state}`].addClass("selected");
    }

    defend = () => {
        this[`$${this.state}`].removeClass("selected");
        this.state = "defend";
        this[`$${this.state}`].addClass("selected");
    }

    build = () => {
        this[`$${this.state}`].removeClass("selected");
        this.state = "build";
        this[`$${this.state}`].addClass("selected");
    }

    explore = () => {
        this[`$${this.state}`].removeClass("selected");
        this.state = "explore";
        this[`$${this.state}`].addClass("selected");
    }

    onBeat() {
        this.health -= this.exertion;
    }
}