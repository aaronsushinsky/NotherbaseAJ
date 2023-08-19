class HarvestGame {
    #Tree = class Tree {
        constructor($OGtree, $ground) {
            this.$div = $OGtree.clone();
            this.$leaves = this.$div.find(".leaves");
            this.$trunk = this.$div.find(".trunk");
            this.cut = false;
            this.maxYield = 5;
            this.age = 0;
            this.timeToGrow = 100000;
            this.clicksToDie = 10;
            this.maxWidth = 200;
            this.maxHeight = 300;
            this.position = [Math.floor(Math.random() * 100), Math.floor(Math.random() * 100)];

            $ground.append(this.$div);
            this.$div.css("display", "initial");
            this.updateCSS();

            this.$trunk.on("click", this.click);
        }

        click = () => {
            this.clicksToDie--;
            this.$trunk.addClass("shake");
            this.$leaves.addClass("shake");
            this.$trunk[0].addEventListener('animationend', () => {
                this.$trunk.removeClass("shake");
                this.$leaves.removeClass("shake");
            });

            if (this.clicksToDie <= 0) {
                this.$div.remove();
                this.cut = true;
            }
        }

        update(delta) {
            this.age += delta;
            if (this.age >= this.timeToGrow) this.age = this.timeToGrow;

            this.updateCSS();
        }
        
        updateCSS() {
            let size = this.age / this.timeToGrow;
            if (size > 1) size = 1;
            this.$div.css("width", `${size * this.maxWidth}px`);
            this.$div.css("height", `${size * this.maxHeight}px`);

            this.$div.css("left", `calc(${this.position[0]}% - ${size * this.maxWidth / 2}px)`);
            this.$div.css("bottom", `${this.position[1] - 5}%`);
            this.$div.css("z-index", (100 - this.position[1]) + 25);
        }
    }

    #Weed = class Weed {
        constructor($OGweed, $ground) {
            this.$div = $OGweed.clone();
            this.$leaves = this.$div.find(".leaf");
            this.cut = false;
            this.age = 0;
            this.timeToGrow = 100;
            this.maxWidth = 20;
            this.maxHeight = 30;

            $ground.append(this.$div);
            this.$div.css("display", "initial");
            this.$div.css("left", `${Math.floor(Math.random() * 110) - 5}%`);
            let z = Math.floor(Math.random() * 100) - 5;
            this.$div.css("bottom", `${z}%`);
            this.$div.css("z-index", (100 - z) + 25);
            this.updateCSS();

            this.$leaves.on("click", this.click);
        }

        click = () => {
            this.$div.remove();

            this.cut = true;
        }

        update(delta) {
            this.age += delta;

            this.updateCSS();
        }
        
        updateCSS() {
            let size = this.age / this.timeToGrow;
            if (size > 1) size = 1;
            this.$div.css("width", `${size * this.maxWidth}px`);
            this.$div.css("height", `${size * this.maxHeight}px`);
        }
    }

    constructor() {
        this.$ground = $(".ground");
        this.$OGtree = $(".tree");
        this.$OGweed = $(".weed");
        this.$OGtree.css("display", "none");
        this.$OGweed.css("display", "none");
        this.trees = [];
        this.maxTrees = 10;
        this.weeds = [];
        this.maxWeeds = 100;
        this.fps = 5;
        setInterval(this.update, 1000 / this.fps);
    }

    update = () => {
        this.checkForCuts();
        this.attemptSpawn();
        this.updateGrowth(1000 / this.fps);
    }

    checkForCuts() {
        for (let i = 0; i < this.trees.length; i++) {
            if (this.trees[i].cut) {
                this.trees.splice(i, 1);
                base.do("cut-tree");
            }
        }

        for (let i = 0; i < this.weeds.length; i++) {
            if (this.weeds[i].cut) {
                this.weeds.splice(i, 1);
                base.do("pull-weed");
            }
        }
    }

    attemptSpawn() {
        if (Math.floor(Math.random() * 10) < 3) {
            if (this.trees.length < this.maxTrees) {
                let newTree = new this.#Tree(this.$OGtree, this.$ground);

                this.trees.push(newTree);
            }
        }
        else if (Math.floor(Math.random() * 10) < 3) {
            if (this.weeds.length < this.maxWeeds) {
                let newWeed = new this.#Weed(this.$OGweed, this.$ground);

                this.weeds.push(newWeed);
            }
        }
    }

    updateGrowth(delta) {
        for (let i = 0; i < this.trees.length; i++) {
            this.trees[i].update(delta);
        }

        for (let i = 0; i < this.weeds.length; i++) {
            this.weeds[i].update(delta);
        }
    }
}