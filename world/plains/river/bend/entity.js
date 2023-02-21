class Entity {
    constructor(parent = null) {
        this.children = [];
        this.parent = parent;
        this.$div = null;
    }

    onBeat = () => null;
    
    onRender = () => null;

    beat = () => {
        this.onBeat();

        for (let i = 0; i < this.children.length; i++) {
            this.children[i].beat();
        }
    }

    render = () => {
        if (this.parent) {
            this.$div = $(this.onRender());
            this.parent.$div.append(this.$div);
        }
    }
}