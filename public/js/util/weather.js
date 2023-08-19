class WeatherSystem {
    constructor(biome = "sun", settings = {}) {
        this.$head = $("head");
        this.$body = $("body");
        this.$main = $("main");
        this.$footer = $("footer");

        this.biome = biome;
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
        this.$head.append(`<link href='/styles/weather/${this.biome}.css' rel='stylesheet' />`);
        this.$space = $(`<div id="weather-system"></div>`).appendTo(this.$body);
    }
}