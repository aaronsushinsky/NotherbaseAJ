class WeatherSystem {
    constructor(biome, settings) {
        this.$body = $("body");
        this.$main = $("main");
        this.$footer = $("footer");

        this.biome = biome;
        this.settings = {
            ...settings
        }
    }

    update = () => {
    }
}