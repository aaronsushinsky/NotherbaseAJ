class Limb {
    constructor(id, kind, $parent) {
        this.children = [];
        this.$div = null;
        this.$parent = $parent;
        this.id = id;
        this.kind = kind;
        this.img = "";
        this.position = [];
        this.rotation = 0;
        this.beatCooldown = 1000;
    }

    css(prop, val) {
        if (this.$div) this.$div.css(prop, val);
    }

    update = () => {
        this.beat();

        for (let i = 0; i < this.children.length; i++) {
            this.children[i].update();
        }
    }

    beat = () => {

    }

    render = () => {
        if (this.$div) this.$div.remove();
        this.$div = $(`<div class="limb ${this.kind}" id="${this.id}"></div>`).appendTo(this.$parent);
        this.css("background", `url("${this.img}")`);
        this.css("left", `${this.position[0]}%`);
        this.css("bottom", `${this.position[1]}%`);
        this.moveTo(this.position);
        this.rotateTo(this.rotation);

        for (let i = 0; i < this.children.length; i++) {
            this.children[i].$parent = this.$div;
            this.children[i].render();
        }
    }

    moveTo(position) {
        this.position = position;
        this.css("left", `${position[0]}%`);
        this.css("bottom", `${position[1]}%`);
    }

    setImage(imgPath) {
        this.img = imgPath;
        this.css("background", `url("${imgPath}")`);
    }

    addChild = (limb) => {
        limb.setBeat(this.beatCooldown);
        this.children.push(limb);
        this.children[this.children.length - 1].render();
    }

    rotateTo(angle) {
        this.rotation = angle;
        this.css("transform", `rotate(${angle}deg)`);
    }

    setBeat(beat) {
        this.beatCooldown = beat;
    }
}

class Entity {
    constructor(id, kind, ground) {
        this.$ground = $(ground);
        this.bodies = [];
        this.id = id;
        this.kind = kind;
        this.timeout = null;
        this.beatCooldown = 1000;
        this.position = [0, 0];
        this.animation = "linear";

        this.render();
        this.update();
    }

    moveTo(position) {
        this.position = position;
        this.body.moveTo(position);
    }

    rotateTo(angle) {
        this.body.rotateTo(angle);
    }

    addBody = (limb) => {
        limb.setBeat(this.beatCooldown);
        this.bodies.push(limb);
        this.bodies[this.bodies.length - 1].render();
    }

    setBodyImage(imgPath) {
        for (let i = 0; i < this.bodies.length; i++) {
            this.bodies[i].setImage(imgPath);
        }
    }

    update = () => {
        this.beat();

        for (let i = 0; i < this.bodies.length; i++) {
            this.bodies[i].update();
        }

        this.timeout = setTimeout(this.update, this.beatCooldown);
    }

    setBeat(beat) {
        this.beatCooldown = beat;
        for (let i = 0; i < this.bodies.length; i++) {
            this.bodies[i].setBeat(beat);
        }
    }

    beat = () => {
        
    }

    render = () => {
        for (let i = 0; i < this.bodies.length; i++) {
            this.bodies[i].render();
        }
    }
}