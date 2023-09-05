class Lawn extends Ground {
    constructor(maxGrass = 25) {
        super($(".ground#lawn"));
        this.maxGrass = maxGrass;

        this.grass = {
            stem: {
                imgs: [ "/img/textures/substance.png" ],
                spawns: [
                    {
                        position: { minX: 0, minY: 0, maxX: 95, maxY: 95 },
                        rotation: { minAngle: -1, maxAngle: 1 }
                    }
                ],
                growth: { minTime: 100, spawnTime: 110, maxTime: 200 },
                size: { minX: 10, minY: 1, maxX: 2, maxY: 2 },
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
                    position: { minX: 0, minY: 90, maxX: 75, maxY: 99 },
                    rotation: { minAngle: -5, maxAngle: 5 }
                }],
                growth: { minTime: 100, spawnTime: 110, maxTime: 200 },
                size: { minX: 15, minY: 50, maxX: 30, maxY: 100 },
                children: {},
                max: 6,
                spawnRate: { cooldown: 100, potentialDelay: 100 },
                recursionMax: 2
            }
        };
    }

    onUpdate = (interval) => {
        this.spawn(new PlantPart("grass", this.$ground, this.grass), 
                    this.grass.stem.spawnRate.cooldown + Math.random() * this.grass.stem.spawnRate.potentialDelay,
                    this.maxGrass);
    }
}