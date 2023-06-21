class Browser {
    constructor(id, fields, onSave = null) {
        this.id = id;
        this.items = [];
        this.filter = "";
        this.selected = -1;
        this.lastSearch = 0;
        this.fields = fields;
        this.onSave = onSave;
        this.prefixes = {};

        this.render();
    }

    render = () => {
        this.$div = $(`.browser#${this.id}`);

        this.$searchBox = $(`<div class="search"></div>`).appendTo(this.$div);
        this.$searchBox.$toFilter = $(`<button class="filters">Filter</button>`).appendTo(this.$searchBox);
        this.$searchBox.$toFilter.click(this.toggleFilters);
        this.$searchList = $(`<ul class="selector"></ul>`).appendTo($(`<section></section>`).appendTo(this.$searchBox));

        this.$read = $(`<div class="read"></div>`).appendTo(this.$div);
        this.$read.$edit = $(`<button class="edit">Edit</button>`).appendTo(this.$read);
        this.$read.$edit.click(this.edit);
        this.$read.$create = $(`<button class="create">+</button>`).appendTo(this.$read);
        this.$read.$create.click(this.create);
        this.$read.$items = [];

        this.$edit = $(`<div class="edit invisible"></div>`).appendTo(this.$div);
        this.$edit.$delete = $(`<button class="delete">Delete</button>`).appendTo(this.$edit);
        this.$edit.$delete.click(this.delete);
        this.$edit.$save = $(`<button class="save">Save</button>`).appendTo(this.$edit);
        this.$edit.$save.click(this.save);
        this.$edit.$cancel = $(`<button class="cancel">Cancel</button>`).appendTo(this.$edit);
        this.$edit.$cancel.click(this.cancel);
        this.$edit.$items = [];

        this.$filter = $(`<div class="filter invisible"></div>`).appendTo(this.$div);
        this.$search = $(`<input type="text" placeholder="search">`).appendTo(this.$filter);
        this.$search.on("input", (e) => { return this.setFilter(e.currentTarget.value); });

        this.renderFields();
    }

    renderFields = () => {
        for (let i = 0; i < this.fields.length; i++) {
            if (this.fields[i].type == String) {
                let $readItem = $(`<p>${this.fields[i].label}: no item</p>`).appendTo(this.$read);
                this.$read.$items.push($readItem);

                let $editItem = $(`<input type="text" placeholder="${this.fields[i].placeholder}">`).appendTo(this.$edit);
                this.$edit.$items.push($editItem);
            }
            else if (this.fields[i].type == Date) {
                let $readItem = $(`<p>${this.fields[i].label}: no item</p>`).appendTo(this.$read);
                this.$read.$items.push($readItem);

                let $editItem = $(`<input type="datetime-local" value="${this.fields[i].placeholder}">`).appendTo(this.$edit);
                this.$edit.$items.push($editItem);
            }
            else if (this.fields[i].type == Boolean) {
                let $readItem = $(`<p>${this.fields[i].label}: no item</p>`).appendTo(this.$read);
                this.$read.$items.push($readItem);

                let $editItem = $(`<input type="checkbox" checked="${this.fields[i].placeholder}">`).appendTo(this.$edit);
                this.$edit.$items.push($editItem);
            }
        }
    }

    renderSearchResults = () => {
        this.$searchList.empty();

        for (let i = 0; i < this.items.length; i++) {
            let label = this.items[i].name || this.items[i].title || this.items[i].header || this.items[i].whenSearched || Object.values(this.items[i])[0];
            if (label.toLowerCase().includes(this.filter.toLowerCase())) {
                let $result = $(`<li id="${i}">${label}</li>`).appendTo(this.$searchList);
                $result.on("click", () => { this.select(i); });
            }
        };
        if (this.items.length < 1) {
            this.$searchList.append(`<p>No Items</p>`);
        }
    }

    setFilter = (filter) => {
        if (Date.now() - this.lastSearch > 500) {
            this.lastSearch = Date.now();
            this.filter = filter;
            this.renderSearchResults();
        }
    }

    load = (res) => {
        if (res?.items?.length) {
            this.items = res.items;
            this.renderSearchResults();
        }
        else console.log(res);
    }

    save = async () => {
        let newItem = {};

        for (let i = 0; i < this.fields.length; i++) {
            if (this.fields[i].type == Boolean) newItem[this.fields[i].name] = this.$edit.$items[i].prop("checked");
            else newItem[this.fields[i].name] = this.$edit.$items[i].val();
        }
        console.log(newItem);

        if (this.selected < 0) {
            this.selected = this.items.length;
            this.items.push(newItem);
        }
        else this.items[this.selected] = newItem;

        if (this.onSave) await base.do(this.onSave, {
            id: this.id,
            items: this.items
        });
        
        this.cancel();
        this.renderSearchResults();
        this.select(this.selected);
    }

    prefix(field, postfix) {
        if (this.prefixes[field]) return (this.prefixes[field] + postfix).replace(/(?:\r\n|\r|\n)/g, '<br />');
        else return postfix.replace(/(?:\r\n|\r|\n)/g, '<br />');
    }

    read = () => {
        this.cancel();

        if (this.selected > -1 && this.selected < this.items.length) {
            let item = this.items[this.selected];
            
            for (let i = 0; i < this.fields.length; i++) {
                this.$read.$items[i].text(`${this.fields[i].label}: ${item[this.fields[i].name]}`);
            }
        }
        else {
            for (let i = 0; i < this.fields.length; i++) {
                this.$read.$items[i].text(`${this.fields[i].label}: ${this.fields[i].placeholder}`);
            }
        }
    }

    edit = () => {
        this.$read.addClass("invisible");
        this.$edit.removeClass("invisible");

        if (this.selected >= 0) {
            let item = this.items[this.selected];

            for (let i = 0; i < this.fields.length; i++) {
                if (this.fields[i].type == String) {
                    this.$edit.$items[i].val(item[this.fields[i].name]);
                }
                else if (this.fields[i].type == Date) {
                    this.$edit.$items[i].val(item[this.fields[i].name]);
                }
                else if (this.fields[i].type == Boolean) {
                    this.$edit.$items[i].prop("checked", item[this.fields[i].name]);
                }
            }
        }
        else {
            for (let i = 0; i < this.fields.length; i++) {
                if (this.fields[i].type == String) {
                    this.$edit.$items[i].val("");
                }
                else if (this.fields[i].type == Date) {
                    this.$edit.$items[i].val("");
                }
                else if (this.fields[i].type == Boolean) {
                    this.$edit.$items[i].prop("checked", this.fields[i].placeholder);
                }
            }
        }
    }

    toggleFilters = () => {
        this.$filter.toggleClass("invisible");
    }

    cancel = () => {
        this.$edit.addClass("invisible");
        this.$read.removeClass("invisible");
    }

    delete = async () => {
        if (this.selected > -1 && this.selected < this.items.length) {
            this.items.splice(this.selected, 1);
    
            if (this.onSave) {
                await base.do(this.onSave, {
                    id: this.id,
                    items: this.items
                });
            }
        }

        this.renderSearchResults();
        this.cancel();
        this.select(-1);
    }

    create = () => {
        this.select(-1);
        
        this.edit();
    }

    select = (which) => {
        this.selected = which;
        let $searchResults = this.$searchList.find("li");
        $searchResults.removeClass("selected");

        if (which > -1) {
            if ($searchResults.length > 1) $searchResults.find(`#${which}`).addClass("selected");
            else $searchResults.addClass("selected");
        }
        
        this.read();
    }
}