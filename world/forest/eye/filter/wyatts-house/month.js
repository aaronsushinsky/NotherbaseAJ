class Month {
    constructor($parent, date, month = 0) {
        this.month = month;
        this.date = date;
        this.offsetDate = new Date(this.date.getTime());
        this.$parent = $parent;

        this.menuIsOpen = false;

        this.render();
        if (month === 0) this.renderCalendar();
    }

    renderCalendar = () => {
        this.$grid.empty();
        this.$days = [];

        let daysInMonth = new Date(1900 + this.date.getYear(), this.date.getMonth() + this.month - 1, 0).getDate();
        let startDay = new Date(1900 + this.date.getYear(), this.date.getMonth() + this.month, 1).getDay();

        for (let i = 0; i < startDay; i++) {
            $(`<div class="calendummy"></div>`).appendTo(this.$grid);
        }
        for (let i = 0; i < daysInMonth; i++) {
            let newDay = null;
            if (this.date.getDate() - 1 == i) newDay = $(`<div class="calenday current">${i + 1}</div>`).appendTo(this.$grid);
            else newDay = $(`<div class="calenday">${i + 1}</div>`).appendTo(this.$grid);
            this.$days.push(newDay);
        }
    }

    render = () => {
        const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        if (this.month === 0) this.$div = $(`<article class="month" id="${this.month}"></article>`).appendTo(this.$parent);
        else this.$div = $(`<article class="month small" id="${this.month}"></article>`).appendTo(this.$parent);
        let whichMonth = this.date.getMonth() + this.month;
        if (whichMonth > 11) whichMonth -= 12;
        this.$header = $(`<h4>${months[whichMonth]}</h4>`).appendTo(this.$div);
        if (this.month === 0) {
            this.$grid = $(`<div class="grid"></div>`).appendTo(this.$div);
            this.$days = [];
            this.$ui = $(`<div class="ui"></div>`).appendTo(this.$div);
            this.$toggle = $(`<button id="toggler">#</button>`).appendTo(this.$ui);
            this.$toggle.click(this.toggleMenu);
            this.$menu = $(`<div class="invisible">Options</div>`).appendTo(this.$ui);
        }
        this.$schedule = $(`<ul class="schedule"></ul>`).appendTo(this.$div);
    }

    load = (tasks) => {
        this.tasks = tasks;

        // let dayStart = new Date(this.date.getTime());
        // dayStart.setHours(0);
        // dayStart.setMinutes(0);
        // dayStart.setSeconds(0);
        // dayStart.setMilliseconds(0);

        // let dayEnd = new Date(this.date.getTime());
        // dayEnd.setHours(23);
        // dayEnd.setMinutes(59);
        // dayEnd.setSeconds(59);
        // dayEnd.setMilliseconds(999);

        // this.$schedule.empty();
        // this.$schedule.append(`<h6>Schedule</h6>`);

        // for (let i = 0; i < this.tasks.length; i++) {
        //     if (this.tasks[i].date >= dayStart.getTime() && this.tasks[i].date < dayEnd.getTime()) {
        //         this.$schedule.append(`<p>${this.tasks[i].name}</p>`);
        //     }
        // }
    }
}