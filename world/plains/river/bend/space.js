<%- include("./entity.js"); %>

class Space {
    constructor() {
        this.children = [];
        this.$div = null;
    }

    set(parent) {
        this.$div = $(".ant-hill-game");
    }

    addChild(child) {
        this.children.push(child);
        child.setParent(this);
    }

    removeChild() {
        this.children[which].setParent(null);
        return this.children.splice(which, 1);
    }

    onBeat = () => null;

    beat = () => {
        for (let i = 0; i < this.children.length; i++) this.children[i].beat();
        this.onBeat();
    }
}