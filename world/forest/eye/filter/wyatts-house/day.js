class Day {
    constructor ($parent, date, day = 0) {
        this.$div = null;
        this.day = day;
        this.date = date;
        this.offsetDate = new Date(this.date.getTime());
        this.offsetDate.setDate(this.date.getDate() + this.day);
        this.$parent = $parent;

        this.render();
    }

    render = () => {
        if (this.day === 0) this.$div = $(`<article class="day" id="${this.day}"></article>`).appendTo(this.$parent);
        else this.$div = $(`<article class="day small" id="${this.day}"></article>`).appendTo(this.$parent);

        const weekday = ["Sunday", "Monday"," Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        let dayName = weekday[this.offsetDate.getDay()];
        if (this.day === 0) this.$header = $(`<h4 class="date">${dayName}: ${this.date.toLocaleDateString()}</h4>`).appendTo(this.$div);
        else this.$header = $(`<h4 class="date">${dayName}: ${this.offsetDate.getMonth()}/${this.offsetDate.getDate()}</h4>`).appendTo(this.$div);

        if (this.day === 0) {
            this.$weather = $(`<div class="weather">Loading the weather outside.</div>`).appendTo(this.$div);
            $.get(`https://api.weather.gov/points/46.7253,-122.9534`, (data) => {
                if (data.properties.forecast) $.get(data.properties.forecast, (data) => {
                    let current = data.properties.periods[0];
                    $(".week .day#0 .weather").text(`${current.name}: ${current.temperature} °F, ${current.shortForecast}, ${current.windSpeed}`);
                });
            });
            this.$billboard = $(`<div class="billboard" id="today"></div>`).appendTo(this.$div);
            this.$billboard.append(`<h4>To Do</h4>`);
            base.load("todo-today").then((res) => { this.billboard = new Billboard("today", res.items, { onSave: "save-todo" }); });
        }

        this.$schedule = $(`<ul class="schedule"></ul>`).appendTo(this.$div);
        if (this.day === 0) this.$schedule.append(`<h6>Schedule</h6>`);
    }

    load = (tasks) => {
        this.tasks = tasks;

        let dayStart = new Date(this.offsetDate.getTime());
        dayStart.setHours(0);
        dayStart.setMinutes(0);
        dayStart.setSeconds(0);
        dayStart.setMilliseconds(0);

        let dayEnd = new Date(this.offsetDate.getTime());
        dayEnd.setHours(23);
        dayEnd.setMinutes(59);
        dayEnd.setSeconds(59);
        dayEnd.setMilliseconds(999);

        this.$schedule.empty();
        if (this.day === 0) this.$schedule.append(`<h6>Schedule</h6>`);

        for (let i = 0; i < this.tasks.length; i++) {
            let testDate = this.tasks[i].date;
            if (this.tasks[i].recurring) {
                let newDate = new Date(testDate);
                if (this.tasks[i].frequency === "weekly") while (newDate.getTime() < dayStart.getTime()) {
                    newDate.setDate(newDate.getDate() + 7);
                }
                else if (this.tasks[i].frequency === "monthly") while (newDate.getTime() < dayStart.getTime()) {
                    newDate.setMonth(newDate.getMonth() + 1);
                }
                else if (this.tasks[i].frequency === "yearly") while (newDate.getTime() < dayStart.getTime()) {
                    newDate.setFullYear(newDate.getFullYear() + 1);
                }
                testDate = newDate.getTime();
            }
            if (testDate >= dayStart.getTime() && testDate < dayEnd.getTime()) {
                this.$schedule.append(`<p>${this.tasks[i].name}</p>`);
            }
        }
    }
}