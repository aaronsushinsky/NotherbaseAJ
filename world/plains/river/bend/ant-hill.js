class Human {
    constructor(health = 1) {
        this.$window = $(".ant-hill-game .window");
        this.$div = null;
        this.health = health;

        this.spawn();
    }

    spawn() {
        this.$window.append(`<img src="/img/ant-hill/human.png" class="human"></img>`);
        this.$div = this.$window.find(".human");
    }

    kill() {
        this.$div.remove();
        console.log("killed");
    }
}

class AntHill {
    constructor() {
        this.$bio = $(".ant-hill-game .bio");
        this.$ants = $(".ant-hill-game .ants");
        this.$workerButtons = $(".ant-hill-game .workers button");
        this.bio = 10;
        this.bioCap = 1000;
        this.beatFrequency = 500;
        this.$heart = $(".ant-hill-game #heart");
        this.$workers = $(".ant-hill-game .workers p");
        this.workers = {
            males: 0,
            miners: 0,
            warriors: 0,
            builders: 0,
            females: 1
        };
        this.workerCap = 10;
        this.cost = {
            males: 10,
            miners: 100,
            warriors: 1000,
            builders: 1000,
            females: 100000
        }
        this.humanSpawnCooldown = 60000;
        this.human = null;

        this.updateUI();

        setInterval(this.beat, this.beatFrequency);
        setInterval(this.spawnHuman, this.humanSpawnCooldown)
    }

    beat = () => {
        this.$heart.animate({
            height: "0px",
            opacity: 0
        }, 3*this.beatFrequency / 4, () => {
            this.$heart.animate({
                height: "10px",
                opacity: 100
            }, this.beatFrequency / 4);
        });

        if (this.human) {
            if (this.workers.warriors > 0) {
                this.workers.warriors--;
                this.human.kill();
                this.human = null;
            }
            else if (this.getTotalAnts() > 0) {
                let chosen = -1;
                do {
                    chosen = Math.floor(Math.random() * Object.keys(this.workers).length);
                } while (Object.values(this.workers)[chosen] < 1);

                this.workers[Object.keys(this.workers)[chosen]]--;
            }
            else {
                this.human.kill();
                this.human = null;
            }
        }

        this.bio += this.workers.males * (this.beatFrequency / 1000) * 5;
        if (this.bio > this.bioCap) this.bio = this.bioCap;

        this.updateCaps();
        this.updateUI();
    }

    getTotalAnts() {
        return this.workers.males +  this.workers.miners + this.workers.warriors + this.workers.builders + this.workers.females;
    }

    updateUI() {
        this.$bio.text(`${this.bio}/${this.bioCap} BIO`);
        this.$ants.text(`${this.getTotalAnts()}/${this.workerCap} ANTS`);

        for (let i = 0; i < Object.values(this.workers).length; i++) {
            if (this.bio >= Object.values(this.cost)[i] && this.getTotalAnts() < this.workerCap) $(this.$workerButtons[i]).prop("disabled", false);
            else $(this.$workerButtons[i]).prop("disabled", true);
    
            $(this.$workers[i]).text(`${Object.values(this.workers)[i]} ${Object.keys(this.workers)[i]}`);
        }
    }

    updateCaps() {
        this.bioCap = (this.workers.builders + 1) * 1000;
        this.workerCap = (this.workers.miners + 1) * 10;
    }

    birthWorker(which) {
        if (this.bio >= this.cost[which] && this.getTotalAnts() < this.workerCap) {
            this.workers[which]++;
            this.bio -= this.cost[which];

            this.updateCaps();
            this.updateUI();
        }
    }

    spawnHuman = () => {
        if (!this.human) {
            this.human = new Human();
        }
    }
}