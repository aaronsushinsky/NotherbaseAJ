class Scheduler {
    constructor(id) {
        this.id = id;
        this.$div = $(`.scheduler#${this.id}`);

        this.currentItem = -1;
        this.items = [];
        
        this.render();
        this.load();
    }

    render = () => {
        this.$list = $(`<ul></ul>`).appendTo(this.$div);
        
        this.$content = $(`<section class="content"></section>`).appendTo(this.$div);

        this.$read = $(`<article class="read"></article>`).appendTo(this.$content);
        this.$readDate = $(`<h5 class="date">1/1/1900</h5>`).appendTo(this.$read);
        this.$readTitle = $(`<h5 class="title">Task Title</h5>`).appendTo(this.$read);
        this.$readDescription = $(`<p class="description">Task Description</p>`).appendTo(this.$read);
        this.$readRecurring = $(`<p class="recurring">Recurring Details</h5>`).appendTo(this.$read);

        this.$edit = $(`<article class="edit invisible"></article>`).appendTo(this.$content);
        this.$editTitle = $(`<input type="text" class="title">Task Title</input>`).appendTo(this.$edit);

        this.$filters = $(`<section class="filters invisible"></section>`).appendTo(this.$content);
        this.$titleFilter = $(`<input type="text"></input>`).appendTo(this.$filters);
    }

    renderItems = () => {
        this.$list.empty();

        for (let i = 0; i < this.items.length; i++) {
            if (this.filter(this.items[i])) {
                let newItem = $(`<li>${this.items[i].title}</li>`).appendTo(this.$list);
                newItem.click(() => {
                    this.select(i);
                })
            }
        }
    }

    filter(item) {
        return true;
    }

    select(which) {
        this.currentItem = which;
    }

    load = async () => {
        base.load(`${this.id}-scheduler`).then((res) => {
            this.items = res.items;
            this.renderItems();
        });
    }
}