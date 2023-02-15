<%- include("./environment.js"); %>
<%- include("./ant.js"); %>
<%- include("./resource.js"); %>

class Chamber extends Entity {
    constructor(hill, chamber = null) {
        super();
        this.parent = hill;

        // if (chamber) {
        //     this.children.push(new Environment(this, chamber.environment));

        //     for (let i = 0; i < chamber.resources.length; i++) {
        //         this.children.push(new Resource(this, chamber.resources[i]));
        //     }

        //     for (let i = 0; i < chamber.ants.length; i++) {
        //         this.children.push(new Ant(this, chamber.ants[i]));
        //     }
        // }
    }

    onRender = (self) => `<div class="chamber"><h5>Chamber</h5></div>`;
}