<%- include("./day.js"); %>

class Agenda {
    constructor(id) {
        this.id = id;
        this.days = [];
        this.date = new Date();
        this.tasks = [];
        
        this.render();

        base.do("load-schedule", { route: "/forest/eye/filter/office" }).then((res) => {
            base.do("load-shared-schedule", { route: "/forest/eye/filter/office" }).then((response) => {
                this.load([...res.data, ...response.data]);
            });
        });
    }

    render = () => {
        this.$div = $(`.agenda#${this.id}`);

        for (let i = 0; i < 7; i++) {
            this.days.push(new Day(this.$div, this.date, i));       
        }
    }

    load = (tasks) => {
        this.tasks = tasks;

        for (let i = 0; i < 7; i++) {
            this.days[i].load(this.tasks);        
        }
    }
}