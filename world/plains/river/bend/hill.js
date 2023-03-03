<%- include("./chamber.js"); %>

class Hill extends Entity {
    constructor(hill = null) {
        super();

        if (hill) for (let i = 0; i < hill.chambers.length; i++) {
            this.addChild(new Chamber(hill.chambers[i]));
        }

        if (this.children.length < 1) {
            this.addChild(new Chamber());
        }
    }

    onRender = () => `<div class="hill"><h5>Hill</h5></div>`;
}