<%- include("./environment.js"); %>
<%- include("./ant.js"); %>
<%- include("./resource.js"); %>

class Chamber extends Entity {
    constructor(chamber = null) {
        super();

        //init
        this.antLimit = 50;
        this.ants = 5;
        this.environment = null;
        this.resources = [];

        if (chamber) {
            this.environment = new Environment(chamber.environment);
            this.addChild(this.environment);

            if (chamber.resources) for (let i = 0; i < chamber.resources.length; i++) {
                let newResource = new Resource(chamber.resources[i]);
                this.resources.push(newResource);
                this.addChild(newResource);
            }
        }
    }

    grab(type, amount) {

    }

    onBeat = () => {
        let harvesters = [];

        this.ants.forEach((ant) => {
            if (ant.state === "harvest" && harvesters.length < this.harvesterLimit) {
                harvesters.push(this.removeChild(ant));
            }
        });


    }

    onRender = () => `<div class="chamber">
            <h5>Chamber</h5>
            <input type="range" class="ants" max="${this.antLimit}" min="0" value="${this.ants}">${this.ants}</input>
        </div>`;
}