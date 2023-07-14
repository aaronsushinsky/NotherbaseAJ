<%- include("./month.js"); %>

class Calendar {
    constructor(id) {
        this.id = id;
        this.months = [];
        this.date = new Date();
        
        this.render();
    }

    render = () => {
        this.$div = $(`.calendar#${this.id}`);

        this.$year = $(`<section class="year"></section>`).appendTo(this.$div);

        for (let i = 0; i < 12; i++) {
            this.months.push(new Month(this.$year, this.date, i));       
        }
    }

    load = (tasks) => {
        this.tasks = tasks;

        for (let i = 0; i < 12; i++) {
            this.months[i].load(this.tasks);        
        }
    }
}