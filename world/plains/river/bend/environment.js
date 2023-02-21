class Environment extends Entity {
    constructor(chamber, environment = null) {
        super(chamber);
        this.render();
    }

    onBeat() {
        
    }

    onRender = (self) => `<div class="environment"><h6>Environment</h6></div>`;
}