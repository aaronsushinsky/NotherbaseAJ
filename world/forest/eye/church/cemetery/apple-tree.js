class AppleTree extends Plant {
    constructor(id, kind, ground) {
        super(id, kind, ground, {
            leafImages: [ "/img/textures/knolls.png" ],
            stemImages: [ "/img/textures/wood.jpg" ],
            branchImages: [ "/img/textures/wood.jpg" ],
            fruitImages: [ "/img/textures/abstract steet art.png" ],
        }, {
            stem: {
                spawns: [
                    {
                        position: {
                            minX: 30,
                            minY: 30,
                            maxX: 70,
                            maxY: 70
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
                    minY: 50,
                    maxX: 10,
                    maxY: 100
                },
                children: {
                    leaves: {
                        max: 0
                    },
                    branches: {
                        max: 12,
                        spawnRate: {
                            cooldown: 500,
                            potentialDelay: 500
                        }
                    },
                    fruits: {
                        max: 0
                    }
                },
                max: 1,
                spawnRate: {
                    cooldown: 50,
                    potentialDelay: 50
                }
            },
            branch: {
                spawns: [
                    {
                        position: {
                            minX: 0,
                            minY: 50,
                            maxX: 100,
                            maxY: 100
                        },
                        rotation: {
                            minAngle: -100,
                            maxAngle: 100
                        }
                    }
                ],
                growth: {
                    minTime: 1000,
                    maxTime: 1000
                },
                size: {
                    minX: 5,
                    maxX: 5,
                    minY: 30,
                    maxY: 50
                },
                children: {
                    leaves: {
                        max: 12,
                        spawnRate: {
                            cooldown: 500,
                            potentialDelay: 500
                        }
                    },
                    branches: {
                        max: 0
                    },
                    fruits: {
                        max: 1,
                        spawnRate: {
                            cooldown: 1500,
                            potentialDelay: 500
                        }
                    }
                }
            },
            leaf: {
                spawns: [
                    {
                        position: {
                            minX: 0,
                            minY: 50,
                            maxX: 100,
                            maxY: 100
                        },
                        rotation: {
                            minAngle: -180,
                            maxAngle: 180
                        }
                    }
                ],
                growth: {
                    minTime: 100,
                    maxTime: 100
                },
                size: {
                    minX: 10,
                    minY: 20,
                    maxX: 10,
                    maxY: 20
                },
                children: {
                    leaves: {
                        max: 0
                    }
                }
            },
            fruit: {
                spawns: [
                    {
                        position: {
                            minX: 0,
                            minY: 50,
                            maxX: 100,
                            maxY: 100
                        },
                        rotation: {
                            minAngle: -10,
                            maxAngle: 10
                        }
                    }
                ],
                growth: {
                    minTime: 100,
                    maxTime: 100
                },
                size: {
                    minX: 10,
                    minY: 10,
                    maxX: 10,
                    maxY: 10
                },
                children: {
                    leaves: {
                        max: 0
                    }
                }
            }
        });
    }
}