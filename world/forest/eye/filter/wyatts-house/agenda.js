<%- include("./day.js"); %>
<%- include("./month.js"); %>

class Agenda {
    constructor(id) {
        this.id = id;
        this.days = [];
        this.months = [];
        this.schedule = [];
        this.date = new Date();
        
        this.render();
        this.load();
    }

    render = () => {
        this.$div = $(`.agenda#${this.id}`);
        this.$week = $(`<section class="week"></section>`).appendTo(this.$div);
        for (let i = 0; i < 7; i++) {
            this.days.push(new Day(this.$week, this.date, i));       
        }

        this.$year = $(`<section class="year"></section>`).appendTo(this.$div);
        for (let i = 0; i < 12; i++) {
            this.months.push(new Month(this.$year, this.date, i));       
        }
    }

    load = async () => {
        base.load(`${this.id}-agenda`).then((res) => { 
            this.schedule = res.schedule;

            console.log("Agenda Loaded");
        });
    }
}