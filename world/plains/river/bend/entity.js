class Entity {
    constructor() {
        this.children = [];
        this.parent = null;

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
        if (this.parent) this.$div = $(this.onRender()).appendTo(this.parent.$div);

        for (let i = 0; i < this.children.length; i++) {
            this.children[i].render();
        }
    }
}