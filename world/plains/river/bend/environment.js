class Environment extends Entity {
    constructor(environment = null) {
        super();
    }

    onBeat() {
        
    }

    onRender = () => `<div class="environment"><h6>Environment</h6></div>`;
}