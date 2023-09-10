class Floatable extends Entity {
    constructor($inputContents, id, $parent, board) {
        super(id, "floating", $parent);

        this.$inputContents = $inputContents;

        this.$border = $(`<div class="mover"></div>`).appendTo(this.$div);
        this.$border.on("mousedown", () => { this.startMove(); });
        this.$border.on("mouseup", () => { this.endMove(); });

        this.$content = $(`<div class="content"></div>`).appendTo(this.$div);
        this.$content.append(this.$inputContents);

        this.resizing = false;

        this.$resizer = $(`<div class="resizer"></div>`).appendTo(this.$div);
        this.$resizer.on("mousedown", () => { this.startResize(); });
        this.$resizer.on("mouseup", () => { this.endResize(); });

        this.$div.on("mouseup", () => { this.endResize(); this.endMove(); });

        this.board = board;
    }

    lock = () => {
        this.locked = true;
        this.$resizer.addClass("invisible");
        this.$border.addClass("invisible");
    }

    unlock = () => {
        this.locked = false;
        this.$resizer.removeClass("invisible");
        this.$border.removeClass("invisible");
    }

    startMove = () => {
        if (!this.locked) {
            this.moving = true;
            this.oldMouse = [this.board.mousePosition[0], this.board.mousePosition[1]];
            this.oldPosition = [parseFloat(this.$div.css("left").slice(0, -2)), parseFloat(this.$div.css("top").slice(0, -2))];
            this.$div.addClass("unselectable");
        }
    }

    endMove = () => {
        this.moving = false;
        this.$div.removeClass("unselectable");
    }

    startResize = () => {
        if (!this.locked) {
            this.resizing = true;
            this.oldMouse = [this.board.mousePosition[0], this.board.mousePosition[1]];
            this.oldSize = [parseFloat(this.$div.css("width").slice(0, -2)), parseFloat(this.$div.css("height").slice(0, -2))];
            this.$div.addClass("unselectable");
        }
    }

    endResize = () => {
        this.resizing = false;
        this.$div.removeClass("unselectable");
    }

    onUpdate = (interval, context) => {
        if (this.resizing) {
            this.futureMouse = [this.board.mousePosition[0], this.board.mousePosition[1]];
            this.css("width", `${this.oldSize[0] + (this.futureMouse[0] - this.oldMouse[0])}px`);
            this.css("height", `${this.oldSize[1] + (this.futureMouse[1] - this.oldMouse[1])}px`);
        }
        if (this.moving) {
            this.futureMouse = [this.board.mousePosition[0], this.board.mousePosition[1]];
            this.css("left", `${this.oldPosition[0] + (this.futureMouse[0] - this.oldMouse[0])}px`);
            this.css("top", `${this.oldPosition[1] + (this.futureMouse[1] - this.oldMouse[1])}px`);
        }
    }
}

class FloatBoard extends Ground{
    constructor(id = null) {
        super($(`<div class="float-board"></div>`).appendTo($("body")), 33, { invertYAxis: true });
        if (this.id) this.$div.attr("id", this.id);

        this.$div.on("mousemove", (e) => { this.updateMouse(e); });
        this.$div.on("mouseup", () => { this.clickUp(); });

        this.floating = false;
        this.locked = false;
        this.$floatables = $(".floatable");

        this.$start = $(`<button class="float-elements">^</button>`).appendTo($("body"));
        this.$start.click(() => { this.toggleFloat(); });
        this.$lock = $(`<button class="invisible lock-elements">Unlocked</button>`).appendTo($("body"));
        this.$lock.click(() => { this.toggleLock(); });

        this.mousePosition = [0, 0];
    }

    updateMouse = (event) => {
        this.mousePosition = [event.pageX, event.pageY];
        //console.log(this.mousePosition);
    }

    clickUp = () => {
        for (let i = 0; i < this.entities.length; i++) {
            this.entities[i].endResize();
            this.entities[i].endMove();
        }
    }

    toggleFloat = () => {
        this.floating ? this.fall() : this.float();
    }

    float = () => {
        this.floating = true;

        for (let i = 0; i < this.$floatables.length; i++) {
            let $floatable = $(this.$floatables[i]).detach();
            console.log($floatable);
            this.spawn(new Floatable($floatable, $floatable.attr("id"), this.$div, this));
        }

        this.defaultPositions();

        this.$lock.removeClass("invisible");
        this.$start.text('v');
    }

    fall = () => {
        this.floating = false;
        this.unlock();

        this.despawnAll();

        this.$lock.addClass("invisible");
        this.$start.text('^');
    }

    toggleLock = () => {
        this.locked ? this.unlock() : this.lock();
    }

    lock = () => {
        this.locked = true;

        for (let i = 0; i < this.entities.length; i++) {
            this.entities[i].lock();
        }

        this.$lock.text('Locked');
    }

    unlock = () => {
        this.locked = false;

        for (let i = 0; i < this.entities.length; i++) {
            this.entities[i].unlock();
        }

        this.$lock.text('Unlocked');
    }

    defaultPositions = () => {
        let rowSize = Math.ceil(this.entities.length / 2);

        for (let i = 0; i < this.entities.length; i++) {
            let row = Math.floor(i / rowSize);

            this.entities[i].moveTo((100 / rowSize) * (i % rowSize) + 5, 50 * row + 10);
            this.entities[i].css("width", `calc(50vw / (${rowSize} + 1))`);
            this.entities[i].css("height", `25vh`);
        }
    }
}