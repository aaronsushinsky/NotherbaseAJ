<%- include("./month.js"); %>

class Calendar {
    constructor(id) {
        this.id = id;
        this.months = [];
        this.date = new Date();
        this.tasks = [];
        
        this.render();
        
        base.do("load-schedule", { route: "/forest/eye/filter/office" }).then((res) => {
            this.userTasks = res.data;

            base.do("load-shared-schedule", { route: "/forest/eye/filter/office" }).then((resp) => {
                this.sharedTasks = resp.data;
                console.log(this.userTasks, this.sharedTasks);
                this.load();
            });
        });
    }

    render = () => {
        this.$div = $(`.calendar#${this.id}`);

        for (let i = 0; i < 12; i++) {
            this.months.push(new Month(this.$div, this.date, i));       
        }
    }

    load = (tasks = this.userTasks, shared = this.sharedTasks) => {
        this.userTasks = this.userTasks;
        this.sharedTasks = this.sharedTasks

        for (let i = 0; i < 12; i++) {
            this.months[i].load([...this.userTasks, ...this.sharedTasks]);        
        }
    }
}