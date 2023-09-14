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
        // this.futureMouse = [this.board.mousePosition[0], this.board.mousePosition[1]];
        // this.oldMouse = [this.board.mousePosition[0], this.board.mousePosition[1]];
        // this.oldPosition = [-1, -1];
        // this.oldSize = [parseFloat(this.$div.css("width").slice(0, -2)), parseFloat(this.$div.css("height").slice(0, -2))];
        // console.log(this.futureMouse, this.oldMouse, this.oldPosition, this.oldSize);
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
        this.board.attemptSave();
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
        this.board.attemptSave();
    }

    onUpdate = (interval, context) => {
        if (this.resizing) {
            this.futureMouse = [this.board.mousePosition[0], this.board.mousePosition[1]];
            this.setSize(this.oldSize[0] + (this.futureMouse[0] - this.oldMouse[0]), this.oldSize[1] + (this.futureMouse[1] - this.oldMouse[1]), "px");
        }
        if (this.moving) {
            this.futureMouse = [this.board.mousePosition[0], this.board.mousePosition[1]];
            this.moveTo(this.oldPosition[0] + (this.futureMouse[0] - this.oldMouse[0]), this.oldPosition[1] + (this.futureMouse[1] - this.oldMouse[1]), "px");
        }
    }

    pluck = () => {
        return this.$inputContents.detach();
    }
}

class FloatBoard extends Ground{
    constructor() {
        super($(`<div class="float-board"></div>`).appendTo($("body")), 33, { invertYAxis: true });

        this.$div.on("mousemove", (e) => { this.updateMouse(e); });
        this.$div.on("mouseup", () => { this.clickUp(); });

        this.$floatables = $(".floatables");

        this.floating = false;
        this.locked = false;

        this.$start = $(`<button class="float-elements">^</button>`).appendTo($("body"));
        this.$start.click(() => { this.toggleFloat(); });
        this.$lock = $(`<button class="invisible lock-elements">Unlocked</button>`).appendTo($("body"));
        this.$lock.click(() => { this.toggleLock(); });
        this.$default = $(`<button class="invisible default-elements">Default</button>`).appendTo($("body"));
        this.$default.click(() => { 
            this.defaultPositions(); 
            this.save();
        });

        this.mousePosition = [0, 0];
        this.lastSaveAttempt = 0;
        this.saving = false;
        this.items = {};

        this.load();
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

        //get floatables
        let iterator = 0;
        for (let i = 0; i < this.$floatables.length; i++) {
            let id = this.$floatables[i].id;
            if (!id) {
                id = `default${iterator}`;
                $(this.$floatables[i]).attr("id", id);
                iterator++;
            }
            if (!Array.isArray(this.items[id])) this.items[id] = [];

            //spawn floating divs
            let total = this.$floatables[i].children.length;
            if (this.items[id].length > total) this.items[id] = this.items[id].slice(0, total);
            for (let j = 0; j < total; j++) {
                let $floatable = $(this.$floatables[i].children[0]).detach();
                this.spawn(new Floatable($floatable, $floatable.attr("id"), this.$div, this));

                if (!this.items[id][j] || typeof this.items[id][j] != 'object') this.items[id][j] = {
                    position: [],
                    size: []
                };
            }
        }

        //position and size
        this.defaultPositions();
        this.updatePositions();

        //ui
        this.$lock.removeClass("invisible");
        this.$default.removeClass("invisible");
        this.$start.text('v');
    }

    fall = () => {
        this.floating = false;
        this.unlock();

        let iterator = 0;
        for (let i = 0; i < this.$floatables.length; i++) {
            let id = this.$floatables[i].id;
            let $floatableContainer = $(this.$floatables[i]);

            for (let j = 0; j < this.items[id].length; j++) {
                if (this.entities[iterator]) {
                    let $return = this.entities[iterator].pluck();
                    $floatableContainer.append($return);
                    iterator++;
                }
            }
        }

        this.despawnAll();

        this.$lock.addClass("invisible");
        this.$default.addClass("invisible");
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
        let divWidth = parseFloat(this.$div.css("width").slice(0, -2));
        let divHeight = parseFloat(this.$div.css("height").slice(0, -2));
        let rowSize = Math.ceil(this.entities.length / 2);

        for (let i = 0; i < this.entities.length; i++) {
            let row = Math.floor(i / rowSize);

            this.entities[i].moveTo((divWidth / rowSize) * (i % rowSize) + 5, (divHeight / 2) * row + 10, "px");
            this.entities[i].setSize(divWidth / (rowSize + 1), divHeight / 4);
        }
    }

    updatePositions = () => {
        let iterator = 0;

        for (let i = 0; i < this.$floatables.length; i++) {
            let id = this.$floatables[i].id;

            for (let j = 0; j < this.items[id].length; j++) {
                if (this.entities[iterator]) {
                    this.entities[iterator].moveTo(this.items[id][j].position[0], this.items[id][j].position[1], "px");
                    this.entities[iterator].setSize(this.items[id][j].size[0], this.items[id][j].size[1], "px");
    
                    iterator++;
                }
            }
        }
    }

    attemptSave = () => {
        this.saving = true;
        this.lastSaveAttempt = Date.now() + 2000;
    }

    save = async () => {
        this.saving = false;

        if (this.floating) {
            let iterator = 0;
            for (let i = 0; i < this.$floatables.length; i++) {
                let id = this.$floatables[i].id;
    
                for (let j = 0; j < this.items[id].length; j++) {
                    this.items[id][j] = {
                        position: this.entities[iterator].position,
                        size: this.entities[iterator].size
                    };
    
                    iterator++;
                }
            }
        }

        let res = await base.do("save-float-board", {
            route: "/pages/util",
            items: this.items,
            location: location.pathname
        });
    }

    load = async () => {
        let res = await base.do("load-float-board", {
            route: "/pages/util",
            location: location.pathname
        });

        this.items = res.data;

        if (!this.items || typeof this.items != 'object') this.items = {};
    }

    onUpdate = (interval = this.updateInterval) => {
        if (this.saving && this.lastSaveAttempt < Date.now()) {
            this.save();
        }
    }
}