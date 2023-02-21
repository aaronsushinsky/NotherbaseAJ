class Ant extends Entity {
    constructor(chamber, ant = null) {
        super(chamber);
        this.render();
        this.$main = this.$div.find(".main");
        this.$controls = this.$div.find(".controls");
        this.$amount = this.$div.find("input");

        this.$do = this.$div.find("#do");
        this.$do.click(this.flipToControls);

        this.$cancel = this.$div.find("#cancel");
        this.$cancel.click(this.flipToMain);

        this.$grab = this.$div.find("#grab");
        this.$grab.click(this.grab);

        this.$drop = this.$div.find("#drop");
        this.$drop.click(this.drop);

        this.$move = this.$div.find("#move");
        this.$move.click(this.move);

        this.resourceType = "food";
        this.resourcesHeld = 0;
        this.health = 10000;
        this.exertion = 10;
    }

    flipToControls = () => {
        this.$main.addClass("invisible");
        this.$controls.removeClass("invisible");
    }

    flipToMain = () => {
        this.$controls.addClass("invisible");
        this.$main.removeClass("invisible");
    }

    grab = () => {
        let result = this.parent.grab(this.resourceType, this.$amount.val());

        this.resourcesHeld += result;
    }

    drop = () => {
        let result = this.$amount.val();
        if (result > this.resourcesHeld) result = this.resourcesHeld;
        this.resourcesHeld -= result;
        
        this.parent.drop(this.resourceType, result);
    }

    move = () => {
        this.parent.move(this);
    }

    onBeat() {
        this.health -= this.exertion;
    }

    onRender = () => `<div class="ant">
                            <h6>Ant</h6>
                            <div class="main">
                                <button id="do">Do</button>
                            </div>
                            <div class="invisible controls">
                                <button id="cancel">Cancel</button>
                                <input type="number">
                                <button id="grab">Grab</button>
                                <button id="drop">Drop</button>
                                <button id="move">Move</button>
                            </div>
                        </div>`;
}