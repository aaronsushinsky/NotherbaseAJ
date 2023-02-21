<%- include("./environment.js"); %>
<%- include("./ant.js"); %>
<%- include("./resource.js"); %>

class Chamber extends Entity {
    constructor(hill, chamber = null) {
        super(hill);
        this.render();
        this.startingAntAmount = 5;

        if (chamber) {
            this.environment = new Environment(this, chamber.environment);
            this.children.push(this.environment);

            if (chamber.resources) for (let i = 0; i < chamber.resources.length; i++) {
                this.children.push(new Resource(this, chamber.resources[i]));
            }

            for (let i = 0; i < this.startingAntAmount; i++) {
                this.children.push(new Ant(this));
            }
        }
    }

    grab(type, amount) {

    }

    onRender = (self) => `<div class="chamber"><h5>Chamber</h5></div>`;
}