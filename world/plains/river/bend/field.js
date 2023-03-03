class Field extends Entity {
    constructor(field = null) {
        super();

        this.init = {
            spawns: 5,
            min: 5,
            max: 10,
            types: ["food", "water", "material"]
        };

        for (let j = 0; j < this.init.types.length; j++) {
            for (let i = 0; i < this.init.spawns; i++) {
                let resource = new Resource({
                    type: this.init.types[j],
                    amount: this.init.min + Math.floor(Math.random() * (this.init.max - this.init.min))
                });

                this.addChild(resource);
            }
        }
    }

    grabResource(type, amount) {
        // if (this.resources[type][0].amount > amount) {
        //     this.resources[type][0].amount -= amount;
        //     return amount;
        // }
        // else {
        //     amount = this.resources[type][0].amount;
        //     this.resources.shift();
        //     return amount;
        // }
    }

    onRender = () => `<div class="field"><h4>Field</h4></div>`;
}