class NonoGame {
    constructor () {
        this.maxNonoId = 4;
        this.difficulty = 0;
        this.difficultyMax = 7;

        this.level = 2;
        this.levelMax = 7;

        this.dimensions = [this.level, this.level];
        this.hints = [[], []];
        this.tiles = [];

        this.render();
    }

    render = () => {
        this.$board = $(".nono-board");
        this.$board.empty();

        this.$bars = [];
        this.$columns = [];
        this.$rows = [];

        this.$nono = $(`<img class="nono" src="/img/nono/nono-${Math.floor(Math.random() * (this.maxNonoId + 1))}.png">`).appendTo(this.$board);
        this.$topHints = $(`<div class="top hints"></div>`).appendTo(this.$board);
        this.$sideHints = $(`<div class="side hints"></div>`).appendTo(this.$board);
        this.$field = $(`<div class="nono-field"></div>`).appendTo(this.$board);
        this.field = new Ground(this.$field);
    }

    click = (whichX, whichY) => {
        if (!this.tiles[whichY][whichX]) {
            if (this.tryFill(whichX, whichY)) this.addTiles();
        }
    }

    tryFill = (whichX, whichY) => {
        if (null) {
            this.tiles[which] = true;
            return true;
        }
        else return false;
    }

    addTiles() {
        if (this.level < this.levelMax) this.level++;

        this.renderTiles();

        this.generateRules();
    }

    renderTiles = () => {

    }

    generateRules = () => {

    }
}

let nonoGame = new NonoGame();