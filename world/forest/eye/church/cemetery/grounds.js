class Grounds extends Ground {
    constructor(maxWeeds = 50) {
        super($(".ground"), 500);
        this.maxWeeds = maxWeeds;

        this.weed = {
            stem: {
                imgs: [ "/img/textures/substance.png" ],
                spawns: [
                    {
                        position: { minX: 2, minY: 50, maxX: 45, maxY: 95 },
                        rotation: { minAngle: -5, maxAngle: 5 }
                    },
                    {
                        position: { minX: 25, minY: 25, maxX: 75, maxY: 75 },
                        rotation: { minAngle: -5, maxAngle: 5 }
                    },
                    {
                        position: { minX: 60, minY: 0, maxX: 95, maxY: 40 },
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
                growth: { minTime: 1000, spawnTime: 1100, maxTime: 2000 },
                size: { minX: 2, minY: 5, maxX: 5, maxY: 30 },
                children: {
                    leaf: {
                        cooldown: 100, 
                        potentialDelay: 100
                    }
                },
                max: 6,
                spawnRate: { cooldown: 100, potentialDelay: 100 },
                recursionMax: 2
            }
        };
    }

    onUpdate = (interval) => {
        if (this.entities.length < this.maxWeeds) {
            this.spawn(new PlantPart("weed", this.$ground, this.weed), 
                        this.weed.stem.spawnRate.cooldown + Math.random() * this.weed.stem.spawnRate.potentialDelay);
        }
    }
}