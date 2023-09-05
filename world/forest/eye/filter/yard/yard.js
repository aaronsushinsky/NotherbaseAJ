class Yard extends Ground {
    constructor(maxWeeds = 25, maxTrees = 5) {
        super($(".ground"), 50);
        this.maxWeeds = maxWeeds;
        this.maxTrees = maxTrees;

        this.weed = {
            stem: {
                imgs: [ "/img/textures/substance.png" ],
                spawns: [
                    {
                        position: { minX: 0, minY: -5, maxX: 95, maxY: 95 },
                        rotation: { minAngle: -5, maxAngle: 5 }
                    }
                ],
                growth: { minTime: 100, spawnTime: 110, maxTime: 200 },
                size: { minX: 5, minY: 5, maxX: 2, maxY: 2 },
                children: {
                    leaf: {
                        cooldown: 100, 
                        potentialDelay: 100
                    }
                },
                max: 1,
                spawnRate: { cooldown: 100, potentialDelay: 100 },
                recursionMax: 1
            },
            leaf: {
                imgs: [ "/img/textures/substance.png" ],
                spawns: [{
                    position: { minX: 0, minY: 90, maxX: 5, maxY: 100 },
                    rotation: { minAngle: -60, maxAngle: 60 }
                }],
                growth: { minTime: 100, spawnTime: 110, maxTime: 200 },
                size: { minX: 2, minY: 15, maxX: 5, maxY: 20 },
                children: {
                    
                },
                max: 6,
                spawnRate: { cooldown: 100, potentialDelay: 100 },
                recursionMax: 2
            }
        };

        this.tree = {
            trunk: {
                imgs: [ "/img/textures/used desk.png" ],
                spawns: [{
                    position: { minX: 0, minY: -5, maxX: 95, maxY: 95 },
                    rotation: { minAngle: -5, maxAngle: 5 }
                }],
                growth: { minTime: 20000, spawnTime: 100, maxTime: 40000 },
                size: { minX: 10, minY: 100, maxX: 10, maxY: 100 },
                children: {
                    branch: {
                        cooldown: 100, 
                        potentialDelay: 100
                    }
                },
                max: 1,
                spawnRate: { cooldown: 100, potentialDelay: 100 },
                recursionMax: 1
            },
            branch: {
                imgs: [ "/img/textures/used desk.png" ],
                spawns: [{
                    position: { minX: 0, minY: 70, maxX: 50, maxY: 100 },
                    rotation: { minAngle: -40, maxAngle: 40 }
                }],
                growth: { minTime: 10000, spawnTime: 11000, maxTime: 20000 },
                size: { minX: 2, minY: 10, maxX: 5, maxY: 50 },
                children: {
                    branch: {
                        cooldown: 100, 
                        potentialDelay: 100
                    },
                    leaf: {
                        cooldown: 100, 
                        potentialDelay: 100
                    }
                },
                max: 4,
                spawnRate: { cooldown: 100, potentialDelay: 100 },
                recursionMax: 4
            },
            leaf: {
                imgs: [ "/img/textures/substance.png" ],
                spawns: [{
                    position: { minX: 0, minY: 50, maxX: 80, maxY: 100 },
                    rotation: { minAngle: -60, maxAngle: 60 }
                }],
                growth: { minTime: 100, spawnTime: 110, maxTime: 200 },
                size: { minX: 1, minY: 1, maxX: 6, maxY: 10 },
                children: {},
                max: 15,
                spawnRate: { cooldown: 100, potentialDelay: 100 },
                recursionMax: 5
            }
        };
    }

    onUpdate = (interval) => {
        this.spawn(new PlantPart("weed", this.$ground, this.weed), 
                    this.weed.stem.spawnRate.cooldown + Math.random() * this.weed.stem.spawnRate.potentialDelay,
                    this.maxWeeds);

        this.spawn(new PlantPart("tree", this.$ground, this.tree), 
                    this.tree.trunk.spawnRate.cooldown + Math.random() * this.tree.trunk.spawnRate.potentialDelay,
                    this.maxTrees);
    }
}