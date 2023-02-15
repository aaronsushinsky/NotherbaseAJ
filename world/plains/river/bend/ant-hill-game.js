<%- include("./colony.js"); %>

class AntHillGame extends Entity {
    constructor(colonies = []) {
        super();
        this.$div = $(".ant-hill-game");

        for (let i = 0; i < colonies.length; i++) {
            this.children.push(new Colony(this, colonies[i]));
        }

        if (this.children.length < 1) {
            this.children.push(new Colony(this));
        }
    }
}