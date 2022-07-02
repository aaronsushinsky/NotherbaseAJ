class AntHill {
    constructor() {
        this.$total = $(".ant-hill-game .total");
        this.$workerButtons = $(".ant-hill-game .workers button");
        this.bio = 10;
        this.workers = {
            males: 0,
            miners: 0,
            warriors: 0,
            builders: 0,
            females: 0
        };
        this.cost = {
            males: 10,
            miners: 100,
            warriors: 1000,
            builders: 1000,
            females: 1000
        }

        this.update();
    }

    update() {
        this.$total.text(`${this.bio} BIO`);

        if (this.bio >= this.cost.males) this.$workerButtons[0].prop("disabled", false);
        else this.$workerButtons[0].prop("disabled", true);
    }

    birthMale() {
        if (this.bio >= 10) {
            this.workers.males++;
            this.bio -= 10;
            this.update();
        }
    }

    birthMiner() {
        
    }

    birthWarrior() {
        
    }

    birthBuilder() {
        
    }

    birthFemale() {
        
    }
}