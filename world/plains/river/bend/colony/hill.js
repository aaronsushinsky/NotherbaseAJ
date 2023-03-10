<%- include("./chamber.js"); %>

class Hill {
    constructor($parent, hill = null) {
        this.$div = $(`<div class="hill"><h5>Hill</h5></div>`);
        $parent.append(this.$div);

        if (hill) for (let i = 0; i < hill.chambers.length; i++) {
            this.addChild(new Chamber(this.$div, hill.chambers[i]));
        }

        if (this.children.length < 1) {
            this.addChild(new Chamber(this.$div));
        }
    }
}