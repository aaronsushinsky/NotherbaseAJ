<%- include("./environment.js"); %>
<%- include("./ant.js"); %>
<%- include("./resource.js"); %>

class Chamber extends Entity {
    constructor(chamber = null) {
        super();
        this.startingAntAmount = 5;

        if (chamber) {
            this.environment = new Environment(chamber.environment);
            this.addChild(this.environment);

            if (chamber.resources) for (let i = 0; i < chamber.resources.length; i++) {
                this.addChild(new Resource(chamber.resources[i]));
            }

            for (let i = 0; i < this.startingAntAmount; i++) {
                this.addChild(new Ant());
            }
        }
    }

    grab(type, amount) {

    }

    onRender = () => `<div class="chamber"><h5>Chamber</h5></div>`;
}