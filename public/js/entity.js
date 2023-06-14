class Entity {
    constructor(id, kind, parent) {
        this.$parent = parent;
        this.children = [];
        this.id = id;
        this.kind = kind;

        this.position = [0, 0];
        this.angle = 0;
        this.animation = "linear";

        this.render();
        this.update();
    }

    css(prop, val) {
        if (this.$div) this.$div.css(prop, val);
    }

    moveTo(x, y) {
        this.position = [x, y];
        this.css("left", `${x}%`);
        this.css("top", `${y}%`);
    }

    rotateTo(angle) {
        this.angle = angle;
        this.css("transform", `rotate(${angle}deg)`);
    }

    addChild = (child) => {
        this.children.push(child);
        this.$div.append(child.$div);
    }

    setImage(imgPath) {
        this.css("background", `url("${imgPath}")`);
    }

    update = (interval) => {
        this.onUpdate(interval);

        for (let i = 0; i < this.children.length; i++) {
            this.children[i].update(interval);
        }
    }

    onUpdate = (interval) => {
        
    }

    render = () => {
        this.$div = $(`<div class="entity" id="${this.id}"></div>`);

        for (let i = 0; i < this.children.length; i++) {
            this.children[i].render();
            this.$div.append(this.children[i].$div);
        }
    }
}

class Ground {
    constructor(div, updateInterval = 250) {
        this.$div = div;
        this.entities = [];
        this.updateInterval = updateInterval;

        this.interval = setInterval(this.update, this.updateInterval);
    }

    spawn(entity) {
        this.entities.push(entity);
        this.$div.append(entity.$div);
    }

    despawn(which) {
        //despawn entity
    }

    update = () => {
        this.onUpdate();

        for (let i = 0; i < this.entities.length; i++) {
            this.entities[i].update(this.updateInterval);            
        }
    }

    onUpdate = () => {

    }
}