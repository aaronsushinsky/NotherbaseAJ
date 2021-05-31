class Plot {
    constructor(div, type, age) {
        this.div = div;
        this.div.on("click", this.pluck);
        this.type = type;
        this.age = age;
    }

    pluck = () => {
        this.age = 0;

        this.div.css("height", `${this.age}px`);
    }

    update = (delta) => {
        this.age += delta / (5000 + 10000 * Math.random());
        if (this.age > 100) this.age = 100;

        this.div.css("height", `${this.age}px`);
    }
}

class Gardener {
    constructor() {
        this.gardenElements = $(".garden");
        this.plotElements = $(".plot");
        this.plots = [];
        for (let i = 0; i < this.plotElements.length; i++) {
            this.plots.push(new Plot(this.plotElements.eq(i), "Dandelion", 0));
        }
    }

    update = () => {
        timing.update();
        
        for (let i = 0; i < this.plots.length; i++) {
            this.plots[i].update(timing.deltaTime);
        }
    }
}

const gardener = new Gardener();
setInterval(gardener.update, 1000);