class Entity {
    constructor() {
        this.children = [];
        this.parent = null;
        this.onRender = `<div></div>`;
    }

    beat() {
        for (let i = 0; i < this.children.length; i++) {
            this.children[i].beat();
        }
    }

    render() {
        for (let i = 0; i < this.children.length; i++) {
            this.children[i].render();
        }
    }
}