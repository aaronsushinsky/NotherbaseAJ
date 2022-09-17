class Entity {
    constructor(id, ground) {
        this.$ground = $(ground);
        this.id = id;
        this.timeout = null;
        this.$div = $(`<div class="${className}" id="${id}"></div>`).appendTo(this.$ground);
        this.beatRate = 1;
        this.position = [0, 0];
        this.animation = "linear";

        this.update();
    }

    moveTo(position) {
        this.position = position;
    }

    snapTo(position) {
        this.position = position;
    }

    update = () => {
        this.beat();
        this.render();
        this.timeout = setTimeout(this.update, this.beat * 1000);
    }

    beat = () => {}

    render = () => {}
}