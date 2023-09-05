class WeatherSystem {
    constructor(climate = "sun", settings = {}) {
        this.$head = $("head");
        this.$body = $("body");
        this.$main = $("main");
        this.$footer = $("footer");

        this.allClimates = ["sun", "rain"];//, "fog", "night", "storm"];
        this.climate = climate;
        if (climate === "random") this.climate = this.allClimates[Math.floor(Math.random() * this.allClimates.length)];
        this.time = new Date();
        this.settings = {
            ...settings
        }

        this.render();
    }

    update = () => {
    }

    render = () => {
        this.$head.append(`<link href='/styles/weather/global.css' rel='stylesheet' />`);
        this.$head.append(`<link href='/styles/weather/${this.climate}.css' rel='stylesheet' />`);
        this.$space = $(`<div id="weather-system"></div>`).appendTo(this.$body);
    }
}