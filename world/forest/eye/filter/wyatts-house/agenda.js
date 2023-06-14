<%- include("./day.js"); %>
<%- include("./month.js"); %>

class Agenda {
    constructor(id) {
        this.id = id;
        this.days = [];
        this.months = [];
        this.schedule = [];
        
        this.loading = this.load();
        this.render();
        await this.loading;
        this.renderDays();
        this.renderMonths();
    }

    render = () => {
        this.$div = $(`.agenda#${this.id}`);
        this.$week = $(`<section class="week"></section>`).appendTo(this.$div);
        this.$weekHeader = $(`<h4>This Week</h4>`).appendTo(this.$week);

        this.$year = $(`<section class="year"></section>`).appendTo(this.$div);
        this.$yearHeader = $(`<h4>This Year</h4>`).appendTo(this.$year);
    }

    load = async () => {
        base.load(`${this.id}-agenda`).then((res) => { 
            this.schedule = res.schedule;
        });
    }

    renderDays = () => {

    }

    renderMonths = () => {
        
    }
}