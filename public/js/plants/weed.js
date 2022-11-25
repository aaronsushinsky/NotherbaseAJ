<%- include("./plant.js") %>

class Weed extends Plant {
    constructor(id, kind, ground) {
        super(id, kind, ground, {
            leafImages: [ "/img/textures/substance.png" ],
            stemImages: [ "/img/textures/substance.png" ],
            branchImages: [ "/img/textures/substance.png" ],
            fruitImages: [ "/img/textures/substance.png" ],
        }, {
            stem: {
                spawns: [{
                    position: {
                        minX: 0,
                        minY: 0,
                        maxX: 1,
                        maxY: 1
                    },
                    rotation: {
                        minAngle: 85,
                        maxAngle: 95
                    }
                }],
                growth: {
                    minTime: 1000,
                    maxTime: 2000
                },
                size: {
                    minX: 5,
                    minY: 5,
                    maxX: 10,
                    maxY: 10
                },
                children: {
                    leaves: {
                        max: 6,
                        spawnRate: {
                            cooldown: 500,
                            potentialDelay: 500
                        }
                    },
                    branches: {
                        max: 0
                    },
                    fruits: {
                        max: 0
                    }
                },
                max: 1,
                spawnRate: {
                    cooldown: 500,
                    potentialDelay: 500
                }
            },
            branch: {},
            leaf: {
                spawns: [{
                    position: {
                        minX: 0,
                        minY: 0,
                        maxX: 1,
                        maxY: 1
                    },
                    rotation: {
                        minAngle: 80,
                        maxAngle: 100
                    }
                }],
                growth: {
                    minTime: 1000,
                    maxTime: 2000
                },
                size: {
                    minX: 2,
                    minY: 2,
                    maxX: 10,
                    maxY: 100
                },
                children: {
                    leaves: {
                        max: 0
                    }
                }
            },
            fruit: {}
        });
    }
}