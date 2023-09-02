class PlantPart extends Entity {
    constructor(kind, $parent, behaviors, part = null, recursionFactor = 0) {
        if (!part) super(Object.keys(behaviors)[0], kind, $parent);
        else super(part, kind, $parent);
        this.behaviors = behaviors;
        this.part = this.name;
        this.recursionFactor = recursionFactor + 1;
        /*{
            name: "stem",
            imgs: [ "/img/textures/substance.png" ],
            spawns: [{
                position: { minX: 0, minY: 0, maxX: 100, maxY: 100 },
                rotation: { minAngle: -45, maxAngle: 45 }
            }],
            growth: { minTime: 1000, spawnTime: 1100, maxTime: 2000 },
            size: { minX: 5, minY: 5, maxX: 10, maxY: 10 },
            children: {
                stem: {
                    cooldown: 100, 
                    potentialDelay: 100
                }
            },
            max: 1,
            spawnRate: { cooldown: 100, potentialDelay: 100 },
            recursionMax: 1
        }*/

        this.size = [0, 0];
        this.maxSize = [
            this.behaviors[this.part].size.minX + Math.random() * (this.behaviors[this.part].size.maxX - this.behaviors[this.part].size.minX),
            this.behaviors[this.part].size.minY + Math.random() * (this.behaviors[this.part].size.maxY - this.behaviors[this.part].size.minY)
        ];
        
        this.age = 0;
        this.maxAge = this.behaviors[this.part].growth.minTime + Math.random() * this.behaviors[this.part].growth.maxTime;

        //spawn self
        let spawn = Math.floor(Math.random() * this.behaviors[this.part].spawns.length);
        this.rotateTo(this.behaviors[this.part].spawns[spawn].rotation.minAngle + Math.random() * (this.behaviors[this.part].spawns[spawn].rotation.maxAngle - this.behaviors[this.part].spawns[spawn].rotation.minAngle));
        this.moveTo(this.behaviors[this.part].spawns[spawn].position.minX + Math.random() * (this.behaviors[this.part].spawns[spawn].position.maxX - this.behaviors[this.part].spawns[spawn].position.minX),
                    this.behaviors[this.part].spawns[spawn].position.minY + Math.random() * (this.behaviors[this.part].spawns[spawn].position.maxY - this.behaviors[this.part].spawns[spawn].position.minY));
        this.setImage(this.behaviors[this.part].imgs[0]);
        this.css("transition", `all .5s linear`);
    }

    onUpdate = (interval) => {
        this.oldAge = this.age;
        this.age += interval;
        //limit growth
        if (this.age >= this.maxAge) {
            this.age = this.maxAge;
        }

        //spawn maybe
        if (this.age > this.behaviors[this.part].growth.spawnTime) {
            let keys = Object.keys(this.behaviors[this.part].children);
            if (keys.length > 0) this.attemptSpawn(keys[Math.floor(Math.random() * keys.length)]);
        }

        if (this.oldAge != this.age) {
            //update size
            let ageRatio = this.age / this.maxAge;
            this.size = [ageRatio * this.maxSize[0], ageRatio * this.maxSize[1]];
            this.css("width", `${this.size[0]}px`);
            this.css("height", `${this.size[1]}px`);
        }
    }

    attemptSpawn = (partType) => {
        if (!Array.isArray(this.named[partType])) this.named[partType] = [];
        if (this.named[partType].length < this.behaviors[partType].max) {
            if (this.recursionFactor <= this.behaviors[partType].recursionMax) {
                let newPart = new PlantPart(this.kind, this.$div, this.behaviors, partType, this.recursionFactor);
                this.addChild(newPart, this.behaviors[this.part].children[partType].cooldown + Math.random() * this.behaviors[this.part].children[partType].potentialDelay);
            }
        }
    }
}