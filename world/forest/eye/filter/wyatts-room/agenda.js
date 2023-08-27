<%- include("./day.js"); %>

class Agenda {
    constructor(id) {
        this.id = id;
        this.days = [];
        this.date = new Date();
        this.tasks = [];
        
        this.render();

        base.do("load-schedule", { route: "/forest/eye/filter/office" }).then((res) => {
            this.load(res.data);
        });
    }

    render = () => {
        this.$div = $(`.agenda#${this.id}`);

        this.$week = $(`<section class="week"></section>`).appendTo(this.$div);
        for (let i = 0; i < 7; i++) {
            this.days.push(new Day(this.$week, this.date, i));       
        }
    }

    load = (tasks) => {
        this.tasks = [...tasks.userTasks, ...tasks.sharedTasks];

        for (let i = 0; i < 7; i++) {
            this.days[i].load(this.tasks);        
        }
    }
}