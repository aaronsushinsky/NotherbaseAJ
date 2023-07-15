class NonoTile {
    constructor (tryFinishGame, $parent, position, modifier) {
        this.$div = $(`<div class="nono-tile" id="${position[0]},${position[1]}"></div>`).appendTo($parent);
        this.position = position;
        this.state = "blank";
        this.$div.addClass(this.state);
        this.correctState = this.getRandomState(modifier);
        this.solved = this.checkIfSolved();
        this.tryFinishGame = tryFinishGame;

        this.$div.on("click", this.clicked);
    }

    getRandomState(modifier) {
        let roll = Math.floor(Math.random() * (2 + modifier));
        if (roll < 1) return "blank";
        else return "punched";
    }

    checkIfSolved() {
        if ((this.state === "blank" || this.state === "marked") && this.correctState === "blank") return true;
        else if (this.state === "punched" && this.correctState === "punched") return true;
        else return false;
    }

    clicked = () => {
        this.$div.removeClass(this.state);

        if (this.state === "blank") this.state = "marked";
        else if (this.state === "marked") this.state = "punched";
        else if (this.state === "punched") this.state = "blank";

        this.$div.addClass(this.state);

        this.solved = this.checkIfSolved();
        this.tryFinishGame();
    }
}

class NonoGame {
    constructor () {
        this.difficulty = 0;
        this.level = 0;
        this.levelMax = 5;
        this.nonoSize = 100;
        this.maxNonoId = 4;

        this.dimensions = [this.level, this.level];
        this.hints = [[], []];
        this.tiles = [];

        this.$board = $(".nono-board");
        this.$bars = [];
        this.$columns = [];
        this.$rows = [];
        this.$nono = $(`<img class="nono" src="/img/nono/nono-${Math.floor(Math.random() * (this.maxNonoId + 1))}.png">`).appendTo(this.$board);
        this.$topHints = $(`<div class="top hints"></div>`).appendTo(this.$board);
        this.$sideHints = $(`<div class="side hints"></div>`).appendTo(this.$board);
        this.$field = $(`<div class="nono-field"></div>`).appendTo(this.$board);
        this.$field.on("scroll", (event) => {
            // event.currentTarget.scrollLeft;
            // event.currentTarget.scrollWidth; //max
            // event.currentTarget.scrollTop;
            // event.currentTarget.scrollHeight; //max
        });
    }

    startNew(level = this.level, difficulty = this.difficulty) {
        this.level = level;
        this.difficulty = difficulty;
        this.dimensions = [this.level + 2, this.level + 3];

        this.generateTiles();
        this.generateHints();
    }

    generateTiles() {
        do {
            this.$field.empty();
            this.tiles = [];
            this.$bars = [];

            for (let i = 0; i < this.dimensions[0]; i++) {
                let $currentBar = $(`<div class="bar"></div>`).appendTo(this.$field);
                this.$bars.push($currentBar);

                for (let j = 0; j < this.dimensions[1]; j++) {
                    this.tiles.push(new NonoTile(this.tryFinishGame, $currentBar, [i, j], 1 - (this.difficulty / 10)));
                }
            }
        } while (this.checkForSolve());
    }

    generateHints() {
        this.$topHints.empty();
        this.$columns = [];
        this.$sideHints.empty();
        this.$rows = [];

        this.hints = [[], []];


        for (let i = 0; i < this.dimensions[0]; i++) {
            this.$rows.push($(`<div class="row"></div>`).appendTo(this.$sideHints));

            let current = 0;
            this.hints[0].push([]);

            for (let j = 0; j < this.dimensions[1]; j++) {
                if (this.tiles[i * this.dimensions[1] + j].correctState === "punched") current++;
                else if (current > 0) {
                    let last = this.hints[0][i].push(current);
                    current = 0;
                    this.$rows[i].append(`<p class="hint">${this.hints[0][i][last - 1]}</p>`);
                }
            }

            if (current > 0 || this.hints[0][i].length < 1) {
                let last = this.hints[0][i].push(current);
                this.$rows[i].append(`<p class="hint">${this.hints[0][i][last - 1]}</p>`);
            }
        }
        
        
        for (let i = 0; i < this.dimensions[1]; i++) {
            this.$columns.push($(`<div class="column"></div>`).appendTo(this.$topHints));

            let current = 0;
            this.hints[1].push([]);

            for (let j = 0; j < this.dimensions[0]; j++) {
                if (this.tiles[j * this.dimensions[1] + i].correctState === "punched") current++;
                else if (current > 0) {
                    let last = this.hints[1][i].push(current);
                    current = 0;
                    this.$columns[i].append(`<p class="hint">${this.hints[1][i][last - 1]}</p>`);
                }
            }

            if (current > 0 || this.hints[1][i].length < 1) {
                let last = this.hints[1][i].push(current);
                this.$columns[i].append(`<p class="hint">${this.hints[1][i][last - 1]}</p>`);
            }
        }
    }

    checkForSolve() {
        let solved = true;

        for (let i = 0; i < this.tiles.length; i++) {
            if (!this.tiles[i].solved) {
                solved = false;
                break;
            }
        }

        return solved;
    }

    tryFinishGame = async () => {
        if (this.checkForSolve()) {
            this.level++;
            if (this.level > this.levelMax) {
                this.difficulty += this.level - this.levelMax;
                if (this.difficulty > 7) this.difficulty = 7;
                this.level -= this.levelMax + 1;
            }

            let response = await base.do("complete-nono", {
                level: this.level,
                difficulty: this.difficulty
            });

            let $tiles = $(".nono-tile");
            $tiles.off("click");
            $tiles.addClass("borderless");
            $tiles = $(".nono-tile.marked");
            $tiles.addClass("blank");
            $tiles.removeClass("marked");

            setTimeout(() => {this.startNew();}, 2000);
        }
    }
}

let nonoGame = new NonoGame();