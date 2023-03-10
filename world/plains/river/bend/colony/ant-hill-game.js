<%- include("./colony.js"); %>
<%- include("./field.js"); %>

class AntHillGame {
    constructor(colonies = []) {
        this.$div = $(".ant-hill-game");

        if (colonies.length < 1) {
            this.colony = new Colony(this.$div);
        }
        else for (let i = 0; i < colonies.length; i++) {
            this.colony = new Colony(this.$div, colonies[i]);
        }        

        this.field = new Field(this.$div);
    }
}