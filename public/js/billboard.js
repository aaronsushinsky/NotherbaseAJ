class Billboard {
    constructor(id, header = "", items = [], onSave = []) {
        this.items = items;
        this.id = id;
        this.$div = $(`.billboard#${id}`);
        this.header = header;
        this.maxItems = 999;
        this.locked = false;
        this.itemTypes = ["img, txt"];
        this.onSave = [...onSave];

        this.render();
        this.load(items);
    }

    load = (items = []) => {
        this.items = items;

        this.renderItems();
        this.flipToMain();
    }

    save = async () => {
        for (let i = 0; i < this.onSave.length; i++) {
            await base.do(this.onSave[i], {
                id: this.id,
                items: this.items
            });
        }
    }

    submit = async () => {
        this.flipToLoading();
        this.items.push({
            type: "txt",
            value: this.$task.val()
        });
        
        await this.save();
        this.renderItems();
        this.flipToMain();
    }

    deleteItem = async (e) => {
        this.flipToLoading();
        this.items.splice(parseInt(e.currentTarget.id), 1);

        await this.save();
        this.renderItems();
        this.flipToMain();
    }

    render() {
        this.$div.empty();

        this.$loading = $(`<div class="loading"><h5>Loading...</h5></div>`).appendTo(this.$div);
        this.$main = $(`<div class="main invisible"></div>`).appendTo(this.$div);
        this.$header = $(`<h3>${this.header}</h3>`).appendTo(this.$main);
        this.$items = $(`<ul></ul>`).appendTo(this.$main);
        this.$flipToNew = $(`<button id="flip">#</button>`).appendTo(this.$main);
        this.$flipToNew.click(this.flipToNew);

        this.$new = $(`<div class="new invisible"></div>`).appendTo(this.$div);
        this.$new.append(`<h3>Submit a new item:</h3>`);
        this.$task = $(`<input type="text" id="task">`).appendTo(this.$new);
        this.$task.keyup((e) => {
            if (e.which == 13) this.submit();
        });
        this.$submit = $(`<button id="submit">Submit</button>`).appendTo(this.$new);
        this.$submit.click(this.submit);
        this.$flipToMain = $(`<button id="flip">#</button>`).appendTo(this.$new);
        this.$flipToMain.click(this.flipToMain);
    }

    renderItems = () => {
        this.$items.empty();

        for (let i = 0; i < this.items.length; i++) {
            let item = this.items[i];

            if (this.itemTypes.includes(item.type)) {
                let out = $('<li></li>');
                if (item.type === "txt") out.append(item.value);
                else if (item.type === "img") out.append(`<img src="${v}"></img>`);
                let deleteButton = $(`<button id="${i}">X</button>`).appendTo(out);
                deleteButton.click(this.deleteItem);
                
                this.$items.append(out);
            }
        }
    }

    flipToMain = () => {
        this.$loading.addClass("invisible");
        this.$new.addClass("invisible");
        this.$main.removeClass("invisible");
        this.$task.val("");
    }

    flipToNew = () => {
        this.$loading.addClass("invisible");
        this.$new.removeClass("invisible");
        this.$main.addClass("invisible");
        this.$task.focus();
    }

    flipToLoading = () => {
        this.$main.addClass("invisible");
        this.$new.addClass("invisible");
        this.$loading.removeClass("invisible");
    }
}