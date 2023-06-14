class Fruit extends Limb {
    constructor(id, kind, $parent, imgs, behaviors) {
        super(id, kind, $parent);
        this.imgs = imgs;
        this.behaviors = behaviors;
        let spawn = Math.floor(Math.random() * this.behaviors.fruit.spawns.length);
        this.rotation = this.behaviors.fruit.spawns[spawn].rotation.minAngle + Math.random() * (this.behaviors.fruit.spawns[spawn].rotation.maxAngle - this.behaviors.fruit.spawns[spawn].rotation.minAngle);
        this.position = [
            this.behaviors.fruit.spawns[spawn].position.minX + Math.random() * (this.behaviors.fruit.spawns[spawn].position.maxX - this.behaviors.fruit.spawns[spawn].position.minX),
            this.behaviors.fruit.spawns[spawn].position.minY + Math.random() * (this.behaviors.fruit.spawns[spawn].position.maxY - this.behaviors.fruit.spawns[spawn].position.minY)
        ];
        this.size = [0, 0];
        this.maxSize = [
            this.behaviors.fruit.size.minX + Math.random() * this.behaviors.fruit.size.maxX,
            this.behaviors.fruit.size.minY + Math.random() * this.behaviors.fruit.size.maxY
        ];
        this.age = 0;
        this.maxAge = this.behaviors.fruit.growth.minTime + Math.random() * this.behaviors.fruit.growth.maxTime;

        this.setImage(this.imgs.fruitImages[0]);
    }

    beat = () => {
        this.grow();
    }

    grow = () => {
        if (this.age < this.maxAge) {
            this.age += this.beatCooldown;

            if (this.age >= this.maxAge) {
                this.age = this.maxAge;
            }

            this.size = [(this.age / this.maxAge) * this.maxSize[0], (this.age / this.maxAge) * this.maxSize[1]];

            this.css("width", `${this.size[0]}px`);
            this.css("height", `${this.size[1]}px`);
        }
    }
}

class Leaf extends Limb {
    constructor(id, kind, $parent, imgs, behaviors) {
        super(id, kind, $parent);
        this.imgs = imgs;
        this.behaviors = behaviors;
        let spawn = Math.floor(Math.random() * this.behaviors.leaf.spawns.length);
        this.rotation = this.behaviors.leaf.spawns[spawn].rotation.minAngle + Math.random() * (this.behaviors.leaf.spawns[spawn].rotation.maxAngle - this.behaviors.leaf.spawns[spawn].rotation.minAngle);
        this.position = [
            this.behaviors.leaf.spawns[spawn].position.minX + Math.random() * (this.behaviors.leaf.spawns[spawn].position.maxX - this.behaviors.leaf.spawns[spawn].position.minX),
            this.behaviors.leaf.spawns[spawn].position.minY + Math.random() * (this.behaviors.leaf.spawns[spawn].position.maxY - this.behaviors.leaf.spawns[spawn].position.minY)
        ];
        this.size = [0, 0];
        this.maxSize = [
            this.behaviors.leaf.size.minX + Math.random() * this.behaviors.leaf.size.maxX,
            this.behaviors.leaf.size.minY + Math.random() * this.behaviors.leaf.size.maxY
        ];
        this.age = 0;
        this.maxAge = this.behaviors.leaf.growth.minTime + Math.random() * this.behaviors.leaf.growth.maxTime;

        this.setImage(this.imgs.leafImages[0]);
    }

    beat = () => {
        this.grow();
    }

    grow = () => {
        if (this.age < this.maxAge) {
            this.age += this.beatCooldown;

            if (this.age >= this.maxAge) {
                this.age = this.maxAge;
            }

            this.size = [(this.age / this.maxAge) * this.maxSize[0], (this.age / this.maxAge) * this.maxSize[1]];

            this.css("width", `${this.size[0]}px`);
            this.css("height", `${this.size[1]}px`);
        }
    }
}

class Branch extends Limb {
    constructor(id, kind, $parent, imgs, behaviors) {
        super(id, kind, $parent);
        this.imgs = imgs;
        this.behaviors = behaviors;
        let spawn = Math.floor(Math.random() * this.behaviors.branch.spawns.length);
        this.rotation = this.behaviors.branch.spawns[spawn].rotation.minAngle + Math.random() * (this.behaviors.branch.spawns[spawn].rotation.maxAngle - this.behaviors.branch.spawns[spawn].rotation.minAngle);
        this.position = [
            this.behaviors.branch.spawns[spawn].position.minX + Math.random() * (this.behaviors.branch.spawns[spawn].position.maxX - this.behaviors.branch.spawns[spawn].position.minX),
            this.behaviors.branch.spawns[spawn].position.minY + Math.random() * (this.behaviors.branch.spawns[spawn].position.maxY - this.behaviors.branch.spawns[spawn].position.minY)
        ];
        this.size = [0, 0];
        this.maxSize = [
            this.behaviors.branch.size.minX + Math.random() * this.behaviors.branch.size.maxX,
            this.behaviors.branch.size.minY + Math.random() * this.behaviors.branch.size.maxY
        ];
        this.age = 0;
        this.maxAge = this.behaviors.branch.growth.minTime + Math.random() * this.behaviors.branch.growth.maxTime;

        this.branches = {
            amount: 0,
            cooldown: 0
        }
        if (this.behaviors.branch.children.branches.max > 0) {
            this.branches.cooldown = this.behaviors.branch.children.branches.spawnRate.cooldown + Math.random() * this.behaviors.branch.children.branches.spawnRate.potentialDelay;
        }

        this.leaves = {
            amount: 0,
            cooldown: 0
        }
        if (this.behaviors.branch.children.leaves.max > 0) {
            this.leaves.cooldown = this.behaviors.branch.children.leaves.spawnRate.cooldown + Math.random() * this.behaviors.branch.children.leaves.spawnRate.potentialDelay;
        }

        this.fruits = {
            amount: 0,
            cooldown: 0
        }
        if (this.behaviors.branch.children.fruits.max > 0) {
            this.fruits.cooldown = this.behaviors.branch.children.fruits.spawnRate.cooldown + Math.random() * this.behaviors.branch.children.fruits.spawnRate.potentialDelay;
        }

        this.setImage(this.imgs.branchImages[0]);
    }

    beat = () => {
        //this.attemptSpawn("branches");
        this.attemptSpawn("leaves");
        this.attemptSpawn("fruits");
        this.grow();
    }

    grow = () => {
        if (this.age < this.maxAge) {
            this.age += this.beatCooldown;

            if (this.age >= this.maxAge) {
                this.age = this.maxAge;
            }

            this.size = [(this.age / this.maxAge) * this.maxSize[0], (this.age / this.maxAge) * this.maxSize[1]];

            this.css("width", `${this.size[0]}px`);
            this.css("height", `${this.size[1]}px`);
        }
    }

    attemptSpawn = (partType) => {
        if (this[partType].amount < this.behaviors.stem.children[partType].max) {
            this[partType].cooldown -= this.beatCooldown;

            if (this[partType].cooldown <= 0) {
                let newPart = null;
                switch (partType) {
                    case "branches":
                        newPart = new Branch(this.id, this.kind, this.$div, this.imgs, this.behaviors);
                        break;
                    case "leaves":
                        newPart = new Leaf(this.id, this.kind, this.$div, this.imgs, this.behaviors);
                        break;
                    case "fruits":
                        newPart = new Fruit(this.id, this.kind, this.$div, this.imgs, this.behaviors);
                        break;
                }
                this.addChild(newPart);
                this[partType].amount++;
                if (this.behaviors.stem.children[partType].max > 0) {
                    this[partType].cooldown = this.behaviors.stem.children[partType].spawnRate.cooldown + Math.random() * this.behaviors.stem.children[partType].spawnRate.potentialDelay;
                }
            }
        }
    }
}

class Stem extends Limb {
    constructor(id, kind, $parent, imgs, behaviors) {
        super(id, kind, $parent);
        this.imgs = imgs;
        this.behaviors = behaviors;
        let spawn = Math.floor(Math.random() * this.behaviors.stem.spawns.length);
        this.rotation = this.behaviors.stem.spawns[spawn].rotation.minAngle + Math.random() * (this.behaviors.stem.spawns[spawn].rotation.maxAngle - this.behaviors.stem.spawns[spawn].rotation.minAngle);
        this.position = [
            this.behaviors.stem.spawns[spawn].position.minX + Math.random() * (this.behaviors.stem.spawns[spawn].position.maxX - this.behaviors.stem.spawns[spawn].position.minX),
            this.behaviors.stem.spawns[spawn].position.minY + Math.random() * (this.behaviors.stem.spawns[spawn].position.maxY - this.behaviors.stem.spawns[spawn].position.minY)
        ];
        this.size = [0, 0];
        this.maxSize = [
            this.behaviors.stem.size.minX + Math.random() * this.behaviors.stem.size.maxX,
            this.behaviors.stem.size.minY + Math.random() * this.behaviors.stem.size.maxY
        ];
        this.age = 0;
        this.maxAge = this.behaviors.stem.growth.minTime + Math.random() * this.behaviors.stem.growth.maxTime;

        this.branches = {
            amount: 0,
            cooldown: 0
        }
        if (this.behaviors.stem.children.branches.max > 0) {
            this.branches.cooldown = this.behaviors.stem.children.branches.spawnRate.cooldown + Math.random() * this.behaviors.stem.children.branches.spawnRate.potentialDelay;
        }

        this.leaves = {
            amount: 0,
            cooldown: 0
        }
        if (this.behaviors.stem.children.leaves.max > 0) {
            this.leaves.cooldown = this.behaviors.stem.children.leaves.spawnRate.cooldown + Math.random() * this.behaviors.stem.children.leaves.spawnRate.potentialDelay;
        }

        this.fruits = {
            amount: 0,
            cooldown: 0
        }
        if (this.behaviors.stem.children.fruits.max > 0) {
            this.fruits.cooldown = this.behaviors.stem.children.fruits.spawnRate.cooldown + Math.random() * this.behaviors.stem.children.fruits.spawnRate.potentialDelay;
        }

        this.setImage(this.imgs.stemImages[0]);
    }

    beat = () => {
        this.attemptSpawn("branches");
        this.attemptSpawn("leaves");
        this.attemptSpawn("fruits");
        this.grow();
    }

    grow = () => {
        if (this.age < this.maxAge) {
            this.age += this.beatCooldown;

            if (this.age >= this.maxAge) {
                this.age = this.maxAge;
            }

            this.size = [(this.age / this.maxAge) * this.maxSize[0], (this.age / this.maxAge) * this.maxSize[1]];

            this.css("width", `${this.size[0]}px`);
            this.css("height", `${this.size[1]}px`);
        }
    }

    attemptSpawn = (partType) => {
        if (this[partType].amount < this.behaviors.stem.children[partType].max) {
            this[partType].cooldown -= this.beatCooldown;
            
            if (this[partType].cooldown <= 0) {
                let newPart = null;
                switch (partType) {
                    case "branches":
                        newPart = new Branch(this.id, this.kind, this.$div, this.imgs, this.behaviors);
                        break;
                    case "leaves":
                        newPart = new Leaf(this.id, this.kind, this.$div, this.imgs, this.behaviors);
                        break;
                    case "fruits":
                        newPart = new Fruit(this.id, this.kind, this.$div, this.imgs, this.behaviors);
                        break;
                }
                console.log(newPart);
                this.addChild(newPart);
                this[partType].amount++;
                if (this.behaviors.stem.children[partType].max > 0) {
                    this[partType].cooldown = this.behaviors.stem.children[partType].spawnRate.cooldown + Math.random() * this.behaviors.stem.children[partType].spawnRate.potentialDelay;
                }
            }
        }
    }
}

class Plant extends Entity {
    constructor(id, kind, ground, imgs, behaviors) {
        super(id, kind, ground);

        this.animation = "none";
        this.behaviors = behaviors;
        this.imgs = imgs;

        this.newStemCooldown = 0;
    }

    beat = () => {
        if (this.bodies.length < this.behaviors.stem.max) {
            this.newStemCooldown -= this.beatCooldown;

            if (this.newStemCooldown <= 0) {
                this.addBody(new Stem(this.id, this.kind, this.$ground, this.imgs, this.behaviors));
                this.newStemCooldown = this.behaviors.stem.spawnRate.cooldown + Math.random() * this.behaviors.stem.spawnRate.potentialDelay;
            }
        }
    }
}