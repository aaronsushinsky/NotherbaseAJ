<%- include("./space.js"); %>
<%- include("./colony.js"); %>
<%- include("./field.js"); %>

class AntHillGame extends Space {
    constructor(colonies = []) {
        super();
        this.$div = $(".ant-hill-game");

        for (let i = 0; i < colonies.length; i++) {
            this.addChild(new Colony(colonies[i]));
        }

        if (this.children.length < 1) {
            this.addChild(new Colony());
        }

        this.addChild(new Field());
    }    
}