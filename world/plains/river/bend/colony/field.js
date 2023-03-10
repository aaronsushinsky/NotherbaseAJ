class Field {
    constructor($parent, field = null) {
        this.init = {
            spawns: 5,
            min: 5,
            max: 10,
            types: ["food", "water", "material"]
        };
        this.ants = [];
        this.resources = [];

        this.$div = $(`<div class="field"><h4>Field</h4></div>`);
        $parent.append(this.$div);
        
        for (let j = 0; j < this.init.types.length; j++) {
            for (let i = 0; i < this.init.spawns; i++) {
                let resource = new Resource(this.$div, {
                    type: this.init.types[j],
                    amount: this.init.min + Math.floor(Math.random() * (this.init.max - this.init.min))
                });

                this.resources.push(resource);
            }
        }
    }
}