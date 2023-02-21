class Resource extends Entity {
    constructor(chamber, resource = null) {
        super(chamber);
        this.render();
    }

    onBeat() {
        
    }

    onRender = (self) => `<div class="resource"><h6>resource</h6></div>`;
}