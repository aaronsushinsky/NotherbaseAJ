class Field extends Entity {
    constructor(game, field = null) {
        super(game);
        this.render();
    }

    onRender = () => `<div class="field"><h4>Field</h4></div>`;
}