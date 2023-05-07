class Fish {
    constructor(id) {
        this.$water = $(".water");
        this.id = id;
        this.$div = $(`<div class="fish" id="${id}"><div class="tail"></div></div>`).appendTo(this.$water);
        this.$tail = this.$div.find(".tail");
        this.color = [Math.floor(Math.random() * 255), Math.floor(Math.random() * 255), Math.floor(Math.random() * 255)];
        this.$div.css("background-color", `rgb(${this.color[0]}, ${this.color[1]}, ${this.color[2]})`);
        this.darkColor = [this.color[0] / 2, this.color[2], this.color[1]];
        this.$tail.css("background-color", `rgb(${this.darkColor[0]}, ${this.darkColor[1]}, ${this.darkColor[2]})`);
        this.position = [20 + Math.floor(Math.random() * 50), 50 - Math.floor(Math.random() * 25)];
        this.$div.css("left", `${this.position[0]}%`);
        this.$div.css("bottom", `${this.position[1]}%`);
        this.direction = Math.random() * 360;
        this.mass = 1 + Math.random() * .75;
        this.ySize = .2 + Math.random() * .65;
        this.xSize = .1 + Math.random() * (this.mass - (this.ySize - .2));
        
        this.$div.animate({
            opacity: 1
        }, 5000 - Math.random() * 3000);

        this.slow = 3;
        this.fast = 20;
        this.speed = this.slow;
        this.jumping = false;
        this.beat = 2000 + Math.random() * 1000;
        this.timeout = null;

        this.$div.hover(() => {
            this.speed = this.fast;
            if (!this.jumping) {
                clearTimeout(this.timeout);
                this.update();
            }
        });

        this.update();
    }

    update = () => {
        this.$tail.removeClass("wag");
        let newPosition = [];

        if (this.jumping) {
            this.direction = 90;
            newPosition = [this.position[0], 75];
            this.jumping = false;
        }
        else {
            this.direction = this.direction + (-5 + Math.random() * 10);
            if (this.direction > 360) this.direction -= 360;
            if (this.direction < 0) this.direction += 360;
    
            let rads = this.direction * Math.PI / 180;
            newPosition = [this.position[0] + (Math.cos(rads) * this.speed), this.position[1] - (Math.sin(rads) * this.speed)];
    
            if (newPosition[1] > 90 && this.speed === this.fast) {
                this.direction = 270;
                newPosition = [this.position[0], 115];
                this.jumping = true;
            }
            else if (Math.sqrt(Math.pow(newPosition[0] - 50, 2) + Math.pow(newPosition[1] - 50, 2)) > 45){
                this.direction += 180;
                if (this.direction > 360) this.direction -= 360;
        
                rads = this.direction * Math.PI / 180;
                newPosition = [this.position[0] + (Math.cos(rads) * this.speed), this.position[1] - (Math.sin(rads) * this.speed)];
            }
        }

        this.position = newPosition;

        
        this.render();
        this.timeout = setTimeout(this.update, this.beat);
        if (this.speed === this.fast) this.speed = this.slow;
    }

    render = () => {
        this.$div.animate({
            left: `${this.position[0]}%`,
            bottom: `${this.position[1]}%`
        }, {
            duration: this.beat, 
            easing: "linear",
            queue: false
        });

        
        this.$tail.addClass("wag");

        if (this.direction > 270 || this.direction < 90) this.$div.css("transform", `rotate(${this.direction}deg) scaleX(${this.xSize}) scaleY(${this.ySize})`);
        else this.$div.css("transform", `rotate(${this.direction - 180}deg) scaleX(${-this.xSize}) scaleY(${this.ySize})`);
    }
}

class Weed {
    constructor(id) {
        this.$water = $(".water");
        this.id = id;
        this.$div = $(`<div class="weed" id="${id}"></div>`).appendTo(this.$water);

        this.render();
    }

    render = () => {
        this.$div.css("left", `${5 + Math.random() * 90}%`);
        this.$div.css("height", `${25 + Math.random() * 65}%`);
    }
}

class Boat {
    constructor() {

    }
}

class Pond {
    constructor() {
        this.$div = $(".water");
        this.fish = [];
        this.maxFish = 10;
        this.maxWeeds = 5;
        this.weeds = [];
        this.mouse = [];

        this.spawnFish();
    this.spawnWeeds();
    }

    spawnFish() {
        for (let i = 0; i < this.maxFish; i++) {
            this.fish.push(new Fish(i));
        }
    }

    spawnWeeds() {
        for (let i = 0; i < this.maxWeeds; i++) {
            this.weeds.push(new Weed(i));
        }
    }
}

let pond = new Pond();