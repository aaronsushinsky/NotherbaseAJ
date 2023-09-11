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
        if (this.day === 0) this.$div = $(`<article class="floatable day" id="${this.day}"></article>`).appendTo(this.$parent);
        else this.$div = $(`<article class="floatable small day" id="${this.day}"></article>`).appendTo(this.$parent);

        const weekday = ["Sun", "Mon"," Tue", "Wed", "Thu", "Fri", "Sat"];
        //const weekday = ["Wednesday", "Wednesday"," Wednesday", "Wednesday", "Wednesday", "Wednesday", "Wednesday"];
        let dayName = weekday[this.offsetDate.getDay()];
        if (this.day === 0) this.$header = $(`<h4 class="date">${dayName}: ${this.date.toLocaleDateString()}</h4>`).appendTo(this.$div);
        else this.$header = $(`<h4 class="date">${dayName}: ${this.offsetDate.getMonth() + 1}/${this.offsetDate.getDate()}</h4>`).appendTo(this.$div);

        if (this.day === 0) {
            //get weather forecast
            this.$weather = $(`<div class="weather">Loading the weather outside.</div>`).appendTo(this.$div);
            $.get(`https://api.weather.gov/points/46.7253,-122.9534`, (data) => {
                if (data.properties.forecast) $.get(data.properties.forecast, (data) => {
                    let current = data.properties.periods[0];
                    $(".week .day#0 .weather").text(`${current.name}: ${current.temperature} °F, ${current.shortForecast}, ${current.windSpeed}`);
                });
            });

            //load billboard
            this.$billboard = $(`<div class="billboard" id="today"></div>`).appendTo(this.$div);
            this.$billboard.append(`<h4>To Do</h4>`);
            base.load("todo-today").then((res) => { this.billboard = new Billboard("today", res.items, { onSave: "save-todo" }); });
        }

        //render schedule
        this.$schedule = $(`<ul class="schedule"></ul>`).appendTo(this.$div);
        if (this.day === 0) this.$schedule.append(`<h4>Schedule</h4>`);
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

        let monthEnd = new Date(this.offsetDate.getTime());
        monthEnd.setDate(15);
        monthEnd.setMonth(monthEnd.getMonth() + 1);
        monthEnd.setDate(0);
        monthEnd.setHours(23);
        monthEnd.setMinutes(59);
        monthEnd.setSeconds(59);
        monthEnd.setMilliseconds(999);

        this.$schedule.empty();
        if (this.day === 0) this.$schedule.append(`<h4>Schedule</h4>`);

        for (let i = 0; i < this.tasks.length; i++) {
            let testDate = this.tasks[i].date;

            if (this.tasks[i].recurring) {
                let newDate = new Date(testDate);

                if (this.tasks[i].frequency === "weekly") while (newDate.getTime() < dayStart.getTime()) {
                    newDate.setDate(newDate.getDate() + 7);
                }
                else if (this.tasks[i].frequency === "monthly") {
                    if (monthEnd.getDate() < newDate.getDate()) {
                        newDate.setDate(monthEnd.getDate());
                    }
                    newDate.setFullYear(dayEnd.getFullYear());
                    newDate.setMonth(dayEnd.getMonth());
                }
                else if (this.tasks[i].frequency === "yearly") while (newDate.getTime() < dayStart.getTime()) {
                    newDate.setFullYear(newDate.getFullYear() + 1);
                }

                testDate = newDate.getTime();
            }
            
            if (testDate >= dayStart.getTime() && testDate <= dayEnd.getTime()) {
                this.$schedule.append(`<p>${this.tasks[i].name}</p>`);
            }
        }
    }
}