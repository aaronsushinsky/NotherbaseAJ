class Ant extends Entity {
    constructor(ant = null) {
        super();

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

    onRender = () => {
        this.$div = $(`<div class="ant">
                        <img src="/img/ant-hill/${this.variation}.png"></img>
                        <div class="controls">
                            <button id="harvest">Harvest</button>
                            <button id="defend">Defend</button>
                            <button id="build">Build</button>
                            <button id="explore">Explore</button>
                        </div>
                    </div>`);

        this.$controls = this.$div.find(".controls");

        this.$harvest = this.$div.find("#harvest");
        this.$harvest.click(this.harvest);

        this.$defend = this.$div.find("#defend");
        this.$defend.click(this.defend);

        this.$build = this.$div.find("#build");
        this.$build.click(this.build);

        this.$explore = this.$div.find("#explore");
        this.$explore.click(this.explore);

        this[`$${this.state}`].addClass("selected");

        return this.$div;
    }
}