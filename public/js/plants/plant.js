<%- include("../entity.js") %>

class Fruit extends Limb {
    constructor(id, kind, $parent, imgs, behaviors) {
        super(id, kind, $parent);
        this.imgs = imgs.fruitImages;
        this.behaviors = behaviors;
    }
}

class Leaf extends Limb {
    constructor(id, kind, $parent, imgs, behaviors) {
        super(id, kind, $parent);
        this.imgs = imgs.leafImages;
        this.behaviors = behaviors;
    }
}

class Branch extends Limb {
    constructor(id, kind, $parent, imgs, behaviors) {
        super(id, kind, $parent);
        this.imgs = imgs.branchImages;
        this.behaviors = behaviors;
    }
}

class Stem extends Limb {
    constructor(id, kind, $parent, imgs, behaviors) {
        super(id, kind, $parent);
        this.imgs = imgs.stemImages;
        this.behaviors = behaviors;
        this.size = [0, 0];
        this.maxSize = [
            this.behaviors.stem.size.minX + Math.random() * this.behaviors.stem.size.maxX,
            this.behaviors.stem.size.minY + Math.random() * this.behaviors.stem.size.maxY
        ];
        this.age = 0;
        this.maxAge = this.behaviors.stem.growth.minTime + Math.random() * this.behaviors.stem.growth.maxTime;

        this.newBranchCooldown = 0;
        this.branches = 0;
        if (this.behaviors.stem.children.branches.max > 0) {
            this.newBranchCooldown = this.behaviors.stem.children.branches.spawnRate.cooldown + Math.random() * this.behaviors.stem.children.branches.spawnRate.potentialDelay;
        }

        this.newLeafCooldown = 0;
        this.leaves = 0;
        if (this.behaviors.stem.children.leaves.max > 0) {
            this.newLeafCooldown = this.behaviors.stem.children.leaves.spawnRate.cooldown + Math.random() * this.behaviors.stem.children.leaves.spawnRate.potentialDelay;
        }

        this.newFruitCooldown = 0;
        this.fruits = 0;
        if (this.behaviors.stem.children.fruits.max > 0) {
            this.newFruitCooldown = this.behaviors.stem.children.fruits.spawnRate.cooldown + Math.random() * this.behaviors.stem.children.fruits.spawnRate.potentialDelay;
        }

        this.setImage(this.imgs[0]);
    }

    beat = () => {
        if (this.branches < this.behaviors.stem.children.branches.max) {
            this.newBranchCooldown -= this.beatCooldown;

            if (this.newBranchCooldown <= 0) {
                this.addChild(new Branch(this.id, this.kind, this.$ground, this.imgs, this.behaviors));
                this.branches++;
                if (this.behaviors.stem.children.branches.max > 0) {
                    this.newBranchCooldown = this.behaviors.stem.children.branches.spawnRate.cooldown + Math.random() * this.behaviors.stem.children.branches.spawnRate.potentialDelay;
                }
            }
        }

        if (this.leaves < this.behaviors.stem.children.leaves.max) {
            this.newLeafCooldown -= this.beatCooldown;

            if (this.newLeafCooldown <= 0) {
                this.addChild(new Leaf(this.id, this.kind, this.$ground, this.imgs, this.behaviors));
                this.leaves++;
                if (this.behaviors.stem.children.leaves.max > 0) {
                    this.newLeafCooldown = this.behaviors.stem.children.leaves.spawnRate.cooldown + Math.random() * this.behaviors.stem.children.leaves.spawnRate.potentialDelay;
                }
            }
        }

        if (this.fruits < this.behaviors.stem.children.fruits.max) {
            this.newFruitCooldown -= this.beatCooldown;

            if (this.newFruitCooldown <= 0) {
                this.addChild(new Fruit(this.id, this.kind, this.$ground, this.imgs, this.behaviors));
                this.fruits++;
                if (this.behaviors.stem.children.fruits.max > 0) {
                    this.newFruitCooldown = this.behaviors.stem.children.fruits.spawnRate.cooldown + Math.random() * this.behaviors.stem.children.fruits.spawnRate.potentialDelay;
                }
            }
        }

        if (this.age < this.maxAge) {
            this.age += this.beatCooldown;

            if (this.age >= this.maxAge) {
                this.age = this.maxAge;
            }

            this.size = [(this.age / this.maxAge) * this.maxSize[0], (this.age / this.maxAge) * this.maxSize[1]];

            this.css("width", this.size[0]);
            this.css("height", this.size[1]);
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