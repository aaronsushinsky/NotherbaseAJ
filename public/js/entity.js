class Weed {
    constructor(ground, className, id) {
        this.$ground = $(`.${ground}`);
        this.id = id;
        this.class = className;
        this.timeout = null;
        this.$div = $(`<div class="${className}" id="${id}"></div>`).appendTo(this.$ground);

        this.update();
    }

    update = () {
        this.render();
        this.timeout = setTimeout(this.update, this.beat);
    }

    render = () => {}
}