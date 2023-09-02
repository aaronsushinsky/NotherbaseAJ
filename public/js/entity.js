class Entity {
    constructor(name, kind, $parent) {
        this.$parent = $parent;
        this.children = [];
        this.named = {};
        this.name = name;
        this.kind = kind;
        this.spawnCooldown = 0;

        this.position = [0, 0];
        this.angle = 0;
        this.animation = "linear";

        this.render();
    }

    css(prop, val) {
        if (this.$div) this.$div.css(prop, val);
    }

    moveTo(x, y) {
        this.position = [x, y];
        this.css("left", `${x}%`);
        this.css("bottom", `${y}%`);
    }

    rotateTo(angle) {
        this.angle = angle;
        this.css("transform", `rotate(${angle}deg)`);
    }

    addChild = (child, requireCooldown = 0) => {
        if (requireCooldown <= 0 || requireCooldown < this.spawnCooldown) {
            this.spawnCooldown = 0;
            this.children.push(child);
            this.$div.append(child.$div);
            if (!Array.isArray(this.named[child.name])) this.named[child.name] = [];
            this.named[child.name].push(child);
        }
    }

    setImage(imgPath) {
        this.css("background", `url("${imgPath}")`);
    }

    update = (interval) => {
        this.spawnCooldown += interval;
        this.onUpdate(interval);

        for (let i = 0; i < this.children.length; i++) {
            this.children[i].update(interval);
        }
    }

    onUpdate = (interval) => {
        
    }

    render = () => {
        this.$div = $(`<div class="${this.kind} entity ${this.name}"></div>`);
        this.css("position", "absolute");
        this.css("transform-origin", "bottom");

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
        this.spawnCooldown = 0;
        this.named = {};

        this.interval = setInterval(this.update, this.updateInterval);
    }

    spawn(entity, requireCooldown = 0, maxPopulation = 0) {
        if (!Array.isArray(this.named[entity.name])) this.named[entity.name] = [];

        if ((this.named[entity.name].length < maxPopulation || maxPopulation < 1) && 
        (requireCooldown <= 0 || requireCooldown < this.spawnCooldown)) {
            this.spawnCooldown = 0;
            this.entities.push(entity);
            this.$div.append(entity.$div);
            if (!Array.isArray(this.named[entity.name])) this.named[entity.name] = [];
            this.named[entity.name].push(entity);
        }
    }

    despawn(which) {
        //despawn entity
    }

    update = () => {
        this.spawnCooldown += this.updateInterval;
        this.onUpdate();

        for (let i = 0; i < this.entities.length; i++) {
            this.entities[i].update(this.updateInterval);            
        }
    }

    onUpdate = (interval = this.updateInterval) => {

    }
}