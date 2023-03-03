class Entity {
    constructor() {
        this.children = [];
        this.parent = null;
        this.$div = $(this.onRender());
    }

    setParent(parent) {
        this.parent = parent;
        this.render();
    }

    addChild(child) {
        this.children.push(child);
        child.setParent(this);
    }

    removeChild(which) {
        let i = this.children.indexOf(which);
        this.children[i].setParent(null);
        return this.children.splice(i, 1);
    }

    onBeat = () => null;
    
    onRender = () => `<div>Entity</div>`;

    render() {
        if (this.$div) this.$div.remove();
        this.$div = $(this.onRender());
        if (this.parent) this.parent.$div.append(this.$div);
        for (let i = 0; i < this.children.length; i++) this.children[i].render();
    }

    beat = () => {
        for (let i = 0; i < this.children.length; i++) this.children[i].beat();
        this.onBeat();
    }
}