let Entity = require("./entity");

class Plant extends Entity {
    constructor(id, ground, position) {
        super(id, ground)
        this.$div = $(id);
        this.animation = "none";
        this.moveTo(position);
    }
}