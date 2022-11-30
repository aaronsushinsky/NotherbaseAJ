<%- include("./plant.js") %>

class Bush extends Plant {
    constructor(id, kind, ground) {
        super(id, kind, ground, {
            leafImages: [ "/img/textures/substance.png" ],
            stemImages: [ "/img/textures/substance.png" ],
            branchImages: [ "/img/textures/substance.png" ],
            fruitImages: [ "/img/textures/substance.png" ],
        }, {
            stem: {
                spawns: [
                    {
                        position: {
                            minX: 0,
                            minY: 0,
                            maxX: 100,
                            maxY: 100
                        },
                        rotation: {
                            minAngle: -5,
                            maxAngle: 5
                        }
                    }
                ],
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
                spawns: [
                    {
                        position: {
                            minX: 0,
                            minY: 50,
                            maxX: 0,
                            maxY: 50
                        },
                        rotation: {
                            minAngle: -30,
                            maxAngle: 30
                        }
                    }
                ],
                growth: {
                    minTime: 10000,
                    maxTime: 15000
                },
                size: {
                    minX: 5,
                    minY: 40,
                    maxX: 10,
                    maxY: 50
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