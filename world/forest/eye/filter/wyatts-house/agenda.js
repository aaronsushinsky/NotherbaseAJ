<%- include("./day.js"); %>

class Agenda {
    constructor(id) {
        this.id = id;
        this.days = [];
        this.date = new Date();
        this.userTasks = [];
        this.sharedTasks = [];
        this.allTasks = [];
        
        this.render();
    }

    render = () => {
        this.$div = $(`.agenda#${this.id}`);

        this.$week = $(`<section class="week"></section>`).appendTo(this.$div);
        for (let i = 0; i < 7; i++) {
            this.days.push(new Day(this.$week, this.date, i));       
        }
    }

    load = (tasks) => {
        this.userTasks = tasks;
        this.allTasks = [ ...this.userTasks, ...this.sharedTasks];

        for (let i = 0; i < 7; i++) {
            this.days[i].load(this.allTasks);        
        }
    }

    loadShared = (tasks) => {
        this.sharedTasks = tasks;
        this.allTasks = [ ...this.userTasks, ...this.sharedTasks];

        for (let i = 0; i < 7; i++) {
            this.days[i].load(this.allTasks);        
        }
    }
}