<%- include("./chamber.js"); %>

class Hill extends Entity {
    constructor(colony, hill = null) {
        super();
        this.parent = colony;

        if (hill) for (let i = 0; i < hill.chambers.length; i++) {
            this.children.push(new Chamber(this, hill.chambers[i]));
        }

        if (this.children.length < 1) {
            this.children.push(new Chamber(this));
        }
    }

    onRender = (self) => `<div class="hill"><h5>Hill</h5></div>`;
}