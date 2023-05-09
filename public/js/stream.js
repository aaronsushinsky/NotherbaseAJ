class Stream {
    constructor(id, settings) {
        this.$div = $(`.stream#${id}`);
        this.$source = $(`<div class="source"></div>`).appendTo(this.$div);
        this.$label = $(`<div class="label">No Streamer</div>`).appendTo(this.$div);
    }
}