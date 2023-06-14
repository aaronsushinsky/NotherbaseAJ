class Billboard {
    constructor(id, items = [], settings) {
        this.settings = {
            maxItems: 999,
            itemTypes: ["img", "txt"],
            onSave: null,
            free: true,
            ...settings
        }
        this.items = items;
        this.id = id;
        this.$div = $(`.billboard#${id}`);
        this.$init = this.$div.clone();
        this.currentItem = -1;

        this.render();
        this.load(items);
    }

    load = (items = []) => {
        this.items = items;

        this.renderItems();
        this.flipToMain();
    }

    save = async () => {
        let saving = null;

        if (this.settings.onSave) {
            saving = base.do(this.settings.onSave, {
                id: this.id,
                items: this.items
            });
        }

        this.flipToLoading();
        this.renderItems();
        await saving;
        this.flipToMain();
    }

    submit = async (type = "txt") => {
        if (this.currentItem >= 0) {
            this.items[this.currentItem] = {
                type: type,
                value: this.$input.val()
            };
    
            this.save();
        }
        else if (this.items.length < this.settings.maxItems) {
            this.items.push({
                type: type,
                value: this.$input.val()
            });
    
            this.save();
        }
    }

    editItem = (which = this.currentItem) => {
        this.currentItem = which;
        this.flipToEdit();
        if (this.currentItem > -1) this.$input.val(this.items[this.currentItem].value);
    }

    newItem = () => {
        this.editItem(-1);
    }

    deleteItem = async (which = this.currentItem) => {
        if (which >= 0) this.items.splice(which, 1);

        this.save();
    }

    render() {
        this.$div.empty();
        this.$div.append(this.$init.children().clone());

        this.$loading = $(`<div class="loading"><h6>Loading...</h6></div>`).appendTo(this.$div);
        this.$main = $(`<div class="main invisible"></div>`).appendTo(this.$div);
        this.$items = $(`<ul></ul>`).appendTo(this.$main);

        if (this.settings.free) {
            this.$new = $(`<button class="new">+</button>`).appendTo(this.$main);
            this.$new.click(this.newItem);

            this.$edit = $(`<div class="edit invisible"></div>`).appendTo(this.$div);
            this.$edit.append(`<h6>Submit a new item:</h6>`);
            this.$input = $(`<input type="text" id="task">`).appendTo(this.$edit);
            this.$input.keyup((e) => {
                if (e.which == 13) this.submit(this.items[this.currentItem].type);
            });
            this.$submit = $(`<button id="submit">Submit Text</button>`).appendTo(this.$edit);
            this.$submit.click(() => this.submit());
            this.$submitImg = $(`<button id="submit-img">Submit Image URL</button>`).appendTo(this.$edit);
            this.$submitImg.click(() => { this.submit("img"); });
            this.$delete = $(`<button id="delete">Delete</button>`).appendTo(this.$edit);
            this.$delete.click(() => { this.deleteItem(); });
            this.$cancel = $(`<button class="cancel">Cancel</button>`).appendTo(this.$edit);
            this.$cancel.click(this.flipToMain);
        }
    }

    renderItems = () => {
        this.$items.empty();

        for (let i = 0; i < this.items.length; i++) {
            let item = this.items[i];

            if (this.settings.itemTypes.includes(item.type)) {
                let out = $('<li></li>');
                if (this.settings.free) out.click(() => { this.editItem(i); });
                if (item.type === "img") out.append(`<img src="${item.value}"></img>`);
                else out.append(item.value);
                
                this.$items.append(out);
            }
        }
    }

    flipToMain = () => {
        this.currentItem = -1;
        this.$loading.addClass("invisible");
        if (this.settings.free) {
            this.$input.val("");
            this.$edit.addClass("invisible");
        }
        this.$main.removeClass("invisible");
    }

    flipToEdit = () => {
        this.$loading.addClass("invisible");
        this.$edit.removeClass("invisible");
        this.$main.addClass("invisible");
        this.$input.focus();
    }

    flipToLoading = () => {
        this.$main.addClass("invisible");
        if (this.settings.free) this.$edit.addClass("invisible");
        this.$loading.removeClass("invisible");
    }
}