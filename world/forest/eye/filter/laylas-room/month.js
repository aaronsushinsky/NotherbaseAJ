class Month {
    constructor($parent, date, month = 0) {
        this.month = month;
        this.date = date;
        this.offsetDate = new Date(this.date.getTime());
        this.offsetDate.setMonth(this.date.getMonth() + this.month);
        this.$parent = $parent;

        this.menuIsOpen = false;

        this.render();
        if (month === 0) this.renderCalendar();
    }

    renderCalendar = () => {
        this.$grid.empty();
        this.$days = [];

        let daysInMonth = new Date(1900 + this.date.getYear(), this.date.getMonth() + this.month, 0).getDate();
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
            this.$legend = $(`<div class="legend"></div>`).appendTo(this.$div);
            $(`<p>Sun</p>`).appendTo(this.$legend);
            $(`<p>Mon</p>`).appendTo(this.$legend);
            $(`<p>Tues</p>`).appendTo(this.$legend);
            $(`<p>Wed</p>`).appendTo(this.$legend);
            $(`<p>Thur</p>`).appendTo(this.$legend);
            $(`<p>Fri</p>`).appendTo(this.$legend);
            $(`<p>Sat</p>`).appendTo(this.$legend);
            this.$grid = $(`<div class="grid"></div>`).appendTo(this.$div);
            this.$days = [];
            // this.$ui = $(`<div class="ui"></div>`).appendTo(this.$div);
            // this.$toggle = $(`<button id="toggler">#</button>`).appendTo(this.$ui);
            // this.$toggle.click(this.toggleMenu);
            // this.$menu = $(`<div class="invisible">Options</div>`).appendTo(this.$ui);
        }
        else this.$schedule = $(`<ul class="schedule"></ul>`).appendTo(this.$div);
    }

    load = (tasks) => {
        this.tasks = tasks;

        let monthStart = new Date(this.offsetDate.getTime());
        monthStart.setDate(1);
        monthStart.setHours(0);
        monthStart.setMinutes(0);
        monthStart.setSeconds(0);
        monthStart.setMilliseconds(0);

        let monthEnd = new Date(this.offsetDate.getTime());
        monthEnd.setMonth(monthEnd.getMonth() + 1);
        monthEnd.setDate(0);
        monthEnd.setHours(23);
        monthEnd.setMinutes(59);
        monthEnd.setSeconds(59);
        monthEnd.setMilliseconds(999);

        if (this.month === 0) {
            for (let i = 0; i < this.$days.length; i++) {
                this.$days[i].empty();
                this.$days[i].append(`${i + 1}`);
            }
        }
        else this.$schedule.empty();

        for (let i = 0; i < this.tasks.length; i++) {
            let testDate = this.tasks[i].date;
            let newDate = new Date(testDate);

            if (this.tasks[i].recurring) {
                if (this.tasks[i].frequency === "yearly") while (newDate.getTime() < monthStart.getTime()) {
                    newDate.setFullYear(newDate.getFullYear() + 1);
                    testDate = newDate.getTime();
                }
                else if (this.tasks[i].frequency === "monthly") {
                    if (monthEnd.getDate() < newDate.getDate()) {
                        newDate.setDate(monthEnd.getDate());
                    }
                    newDate.setFullYear(monthStart.getFullYear());
                    newDate.setMonth(monthStart.getMonth());
                    testDate = newDate.getTime();
                }
            }

            if (testDate >= monthStart.getTime() && testDate <= monthEnd.getTime()) {
                if (this.month === 0) {
                    this.$days[newDate.getDate() - 1].append(`<p>${this.tasks[i].name}</p>`);
                }
                else if (this.tasks[i].frequency != "monthly" && this.tasks[i].frequency != "weekly") {
                    this.$schedule.append(`<p>${this.tasks[i].name}</p>`);
                }
            }
        }
    }
}