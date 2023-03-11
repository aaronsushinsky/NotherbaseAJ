class Billboard {
    constructor(id, items = [], settings) {
        this.defaultSettings = {
            maxItems: 999,
            itemTypes: ["img", "txt"],
            onSave: null,
            free: true
        }
        this.settings = {
            ...this.defaultSettings,
            ...settings
        }
        this.items = items;
        this.id = id;
        this.$div = $(`.billboard#${id}`);
        this.$init = this.$div.clone();

        this.render();
        this.load(items);
    }

    load = (items = []) => {
        this.items = items;

        this.renderItems();
        this.flipToMain();
    }

    save = () => {
        if (this.settings.onSave) {
            return base.do(this.settings.onSave, {
                id: this.id,
                items: this.items
            });
        }
    }

    submit = async (type = "txt") => {
        if (this.items.length < this.settings.maxItems) {
            this.items.push({
                type: type,
                value: this.$txt.val()
            });
    
            let saving = this.save();
            this.flipToLoading();
            
            this.renderItems();
            await saving;
            this.flipToMain();
        }
    }

    deleteItem = async (e) => {
        this.items.splice(parseInt(e.currentTarget.id), 1);

        let saving = this.save();
        this.flipToLoading();

        this.renderItems();
        await saving;
        this.flipToMain();
    }

    render() {
        this.$div.empty();
        this.$div.append(this.$init.children().clone());

        this.$loading = $(`<div class="loading"><h6>Loading...</h6></div>`).appendTo(this.$div);
        this.$main = $(`<div class="main invisible"></div>`).appendTo(this.$div);
        this.$items = $(`<ul></ul>`).appendTo(this.$main);

        if (this.settings.free) {
            this.$flipToNew = $(`<button class="flip">#</button>`).appendTo(this.$main);
            this.$flipToNew.click(this.flipToNew);

            this.$new = $(`<div class="new invisible"></div>`).appendTo(this.$div);
            this.$new.append(`<h6>Submit a new item:</h6>`);
            this.$txt = $(`<input type="text" id="task">`).appendTo(this.$new);
            this.$txt.keyup((e) => {
                if (e.which == 13) this.submit();
            });
            this.$submit = $(`<button id="submit">Submit Text</button>`).appendTo(this.$new);
            this.$submit.click(() => this.submit());
            this.$submitImg = $(`<button id="submit-img">Submit Image URL</button>`).appendTo(this.$new);
            this.$submitImg.click(() => { this.submit("img"); });
            this.$flipToMain = $(`<button class="flip">#</button>`).appendTo(this.$new);
            this.$flipToMain.click(this.flipToMain);
        }
    }

    renderItems = () => {
        this.$items.empty();

        for (let i = 0; i < this.items.length; i++) {
            let item = this.items[i];

            if (this.settings.itemTypes.includes(item.type)) {
                let out = $('<li></li>');
                if (item.type === "txt") out.append(item.value);
                else if (item.type === "img") out.append(`<img src="${item.value}"></img>`);
                if (this.settings.free) {
                    let deleteButton = $(`<button class="delete" id="${i}">X</button>`).appendTo(out);
                    deleteButton.click(this.deleteItem);
                }
                
                this.$items.append(out);
            }
        }
    }

    flipToMain = () => {
        this.$loading.addClass("invisible");
        if (this.settings.free) {
            this.$txt.val("");
            this.$new.addClass("invisible");
        }
        this.$main.removeClass("invisible");
    }

    flipToNew = () => {
        this.$loading.addClass("invisible");
        this.$new.removeClass("invisible");
        this.$main.addClass("invisible");
        this.$txt.focus();
    }

    flipToLoading = () => {
        this.$main.addClass("invisible");
        if (this.settings.free) this.$new.addClass("invisible");
        this.$loading.removeClass("invisible");
    }
}