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
        this.$search = $(`<input type="text" placeholder="search">`).appendTo(this.$searchBox);
        this.$search.on("input", (e) => { return this.setFilter(e.currentTarget.value); });
        this.$searchList = $(`<ul class="selector"></ul>`).appendTo($(`<section></section>`).appendTo(this.$searchBox));

        this.$read = $(`<div class="read"></div>`).appendTo(this.$div);
        this.$read.$create = $(`<button class="create">+</button>`).appendTo(this.$read);
        this.$read.$create.click(this.create);
        this.$read.$items = [];

        this.$edit = $(`<div class="edit invisible"></div>`).appendTo(this.$div);
        this.$edit.$cancel = $(`<button class="cancel">Cancel</button>`).appendTo(this.$edit);
        this.$edit.$cancel.click(this.cancel);
        this.$edit.$items = [];

        this.renderFields();
    }

    renderFields = () => {
        for (let i = 0; i < this.fields.length; i++) {
            if (this.fields[i].type == String) {
                let $readItem = $(`<p>${this.fields[i].label}: ${this.fields[i].placeholder}</p>`).appendTo(this.$read);
                this.$read.$items.push($readItem);

                let $editItem = $(`<input type="text" placeholder="${this.fields[i].placeholder}">`).appendTo(this.$edit);
                this.$edit.$items.push($editItem);
            }
            else if (this.fields[i].type == Date) {
                let $readItem = $(`<p>${this.fields[i].label}: ${this.fields[i].placeholder.toLocaleString()}</p>`).appendTo(this.$read);
                this.$read.$items.push($readItem);

                let $editItem = $(`<input type="date-time" placeholder="${this.fields[i].placeholder}">`).appendTo(this.$edit);
                this.$edit.$items.push($editItem);
            }
            else if (this.fields[i].type == Boolean) {
                let $readItem = $(`<p>${this.fields[i].label}: ${this.fields[i].placeholder}</p>`).appendTo(this.$read);
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
                $(`<li id="${i}">${label}</li>`).appendTo(this.$searchList).on("click", () => { this.select(i); });
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
            newItem[this.fields[i]] = this.$edit[this.fields[i]].val();
        }

        if (this.selected < 0) this.items.push(newItem);
        else this.items[this.selected] = newItem;

        if (this.onSave) await base.do(this.onSave, {
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

    read = async () => {
        this.cancel();

        if (this.selected > -1 && this.selected < this.items.length) {
            let item = this.items[this.selected];
            
            
        }
        else {
            for (let i = 0; i < this.fields.length; i++) {
                let $div = this.$read[this.fields[i]];
                if (this.checkIfTextField($div)) $div.text("None");
                else if (this.checkIfImageField($div)) $div.attr("src", "/img/food/default.jpg");
            }
        }
    }

    edit = () => {
        this.$read.addClass("invisible");
        this.$edit.removeClass("invisible");

        if (this.selected >= 0) {
            let item = this.items[this.selected];

            for (let i = 0; i < this.fields.length; i++) {
                this.$edit[this.fields[i]].val(item[this.fields[i]]);
            }
        }
        else {
            for (let i = 0; i < this.fields.length; i++) {
                this.$edit[this.fields[i]].val("");
            }
        }
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
                    items: this.items
                });
            }
            
            this.renderSearchResults();
            this.cancel();
            this.select(-1);
        }
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
            $searchResults.find(`#${which}`).addClass("selected");
        }
        
        this.read();
    }
}