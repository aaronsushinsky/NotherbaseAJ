class Entity {
    constructor(name, kind, $parent) {
        this.$parent = $parent;
        this.children = [];
        this.named = {};
        this.name = name;
        this.kind = kind;
        this.spawnCooldown = 0;
        this.invertYAxis = false;

        this.position = [0, 0];
        this.angle = 0;
        this.animation = "linear";
        this.size = [0, 0];

        this.render();
    }

    flipYAxis = () => {
        this.invertYAxis = !this.invertYAxis;
    }

    css(prop, val) {
        if (this.$div) this.$div.css(prop, val);
    }

    moveTo(x, y, measure = "%", measure2 = null) {
        this.position = [x, y];
        this.css("left", `${x}` + measure);
        if (!this.invertYAxis) this.css("bottom", `${y}` + (measure2 ? measure2 : measure));
        else this.css("top", `${y}` + (measure2 ? measure2 : measure));
    }

    setSize(w, h, measure = "px", measure2 = null) {
        this.size = [w, h];
        this.css("width", `${w}` + measure);
        this.css("height", `${h}` + (measure2 ? measure2 : measure));
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

    update = (interval, context = null) => {
        this.spawnCooldown += interval;
        this.onUpdate(interval, context);

        for (let i = 0; i < this.children.length; i++) {
            this.children[i].update(interval);
        }
    }

    onUpdate = (interval) => {
        return null;
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
    constructor($div, updateInterval = 250, settings) {
        this.$div = $div;
        this.entities = [];
        this.updateInterval = updateInterval;
        this.spawnCooldown = 0;
        this.named = {};
        this.settings = {
            invertYAxis: false,
            ...settings
        }

        this.interval = setInterval(this.update, this.updateInterval);
    }

    spawn(entity, requireCooldown = 0, maxPopulation = 0) {
        if (this.settings.invertYAxis) entity.flipYAxis();

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

    despawnAll = () => {
        this.$div.empty();
        this.entities = [];
    }

    update = () => {
        this.spawnCooldown += this.updateInterval;
        let context = this.onUpdate();

        for (let i = 0; i < this.entities.length; i++) {
            this.entities[i].update(this.updateInterval, context);            
        }
    }

    onUpdate = (interval = this.updateInterval) => {
        return null;
    }
}