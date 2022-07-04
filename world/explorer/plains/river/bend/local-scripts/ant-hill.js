class AntHill {
    constructor() {
        this.$total = $(".ant-hill-game .total");
        this.$workerButtons = $(".ant-hill-game .workers button");
        this.bio = 10;
        this.beatFrequency = 500;
        this.$heart = $(".ant-hill-game #heart");
        this.$males = $(".ant-hill-game #males-count");
        this.$miners = $(".ant-hill-game #miners-count");
        this.$warriors = $(".ant-hill-game #warriors-count");
        this.$builders = $(".ant-hill-game #builders-count");
        this.$females = $(".ant-hill-game #females-count");
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

        this.updateUI();

        setInterval(this.beat, this.beatFrequency);
    }

    beat = () => {
        this.$heart.animate({
            height: "0px",
            opacity: 0
        }, 3*this.beatFrequency/4, () => {
            this.$heart.animate({
                height: "10px",
                opacity: 100
            }, this.beatFrequency/4);
        });
    }

    updateUI() {
        this.$total.text(`${this.bio} BIO`);

        if (this.bio >= this.cost.males) $(this.$workerButtons[0]).prop("disabled", false);
        else $(this.$workerButtons[0]).prop("disabled", true);

        this.$males.text(`${this.workers.males} Males`);
    }

    birthMale() {
        if (this.bio >= 10) {
            this.workers.males++;
            this.bio -= 10;
            this.updateUI();
        }
    }

    birthMiner() {
        if (this.bio >= 100) {
            this.workers.miners++;
            this.bio -= 100;
            this.updateUI();
        }
    }

    birthWarrior() {
        if (this.bio >= 100) {
            this.workers.warriors++;
            this.bio -= 100;
            this.updateUI();
        }
    }

    birthBuilder() {
        if (this.bio >= 100) {
            this.workers.builders++;
            this.bio -= 100;
            this.updateUI();
        }
    }

    birthFemale() {
        if (this.bio >= 10000) {
            this.workers.females++;
            this.bio -= 10000;
            this.updateUI();
        }
    }
}