class ViewBox {
    constructor(fields, nested = false) {
        this.$div = null;
        this.hidden = false;
        this.fields = fields;
        this.$items = [];
        this.nested = nested;
    }

    render = () => { /* override this */ }

    save = () => { /* override this */ }

    load = (item) => { /* override this */ }

    show = () => {
        this.$div.removeClass("invisible");
        this.hidden = false;
    }

    hide = () => {
        this.$div.addClass("invisible");
        this.hidden = true;
    }

    toggle = () => {
        if (this.hidden) this.show();
        else this.hide();
    }
}

class ReadBox extends ViewBox {
    constructor(fields, nested) {
        super(fields, nested);
    }

    render = () => { 
        if (this.nested) this.$div = $(`<div class="read nested"></div>`);
        else this.$div = $(`<div class="read"></div>`);

        for (let i = 0; i < this.fields.length; i++) {
            if (Array.isArray(this.fields[i].type)) {
                let newBox = new ReadBox(this.fields[i].type, true);
                newBox.render().appendTo(this.$div);
                this.$items.push(newBox);
            }
            else if (this.fields[i].type == Image) {
                let $newItem = $(`<img src="${this.fields[i].placeholder}">`).appendTo(this.$div);
                this.$items.push($newItem);
            }
            else {
                let $newItem = $(`<p>${this.fields[i].label}: no item</p>`).appendTo(this.$div);
                this.$items.push($newItem);
            }
        }

        return this.$div;
    }

    save = () => {
        let newItem = {};

        for (let i = 0; i < this.fields.length; i++) {
            if (Array.isArray(this.fields[i].type)) {
                newItem[this.fields[i].name] = this.$items[i].save();
            }
            else if (this.fields[i].type == Boolean) newItem[this.fields[i].name] = this.$items[i].prop("checked");
            else newItem[this.fields[i].name] = this.$items[i].val();
        }

        return newItem;
    }

    load = (item) => {
        for (let i = 0; i < this.$items.length; i++) {
            if (typeof this.$items[i] == ReadBox) {
                this.$items[i].load(item[this.fields[i].name]);
            }
            else if (fields[i].type == Image) {
                if (item) {
                    this.$items[i].attr("src", `<img src="${item[this.fields[i].name]}">`);
                }
                else {
                    this.$items[i].attr("src", `<img src="${this.fields[i].placeholder}">`);
                }
            }
            else {
                if (item) {
                    this.$read.$items[i].text(`${this.fields[i].label}: ${item[this.fields[i].name].replace(/(?:\r\n|\r|\n)/g, '<br />')}`);
                }
                else {
                    this.$read.$items[i].text(`${this.fields[i].label}: no item`);
                }
            }
        }
    }
}

class EditBox extends ViewBox {
    constructor(fields, nested = false) {
        super(fields, nested);
    }

    render = () => {
        if (this.nested) this.$div = $(`<div class="edit nested"></div>`);
        else this.$div = $(`<div class="edit"></div>`);

        return this.$div;
    }

    // renderFields = ($readParent = this.$read, 
    //                 $editParent = this.$edit, 
    //                 $readItems = this.$read.$items, 
    //                 $editItems = this.$edit.$items, 
    //                 fields = this.fields ) => 
    // {
    //     for (let i = 0; i < fields.length; i++) {
    //         if (Array.isArray(fields[i].type)) {
    //             let $readItem = $(`<div>${fields[i].label}: no item</div>`).appendTo($readParent);
    //             $readItem.$items = [];
    //             $readItems.push($readItem);

    //             let $editItem = $(`<div></div>`).appendTo($editParent);
    //             $editItems.$items = [];
    //             $editItems.push($editItem);

    //             this.renderFields($readItem, $editItem, $readItem.$items, $editItem.$items, fields[i].type);
    //         }
    //         else if (fields[i].type == String) {
    //             let $readItem = $(`<p>${fields[i].label}: no item</p>`).appendTo($readParent);
    //             $readItems.push($readItem);

    //             let $editItem = $(`<input type="text" placeholder="${fields[i].placeholder}">`).appendTo($editParent);
    //             $editItems.push($editItem);
    //         }
    //         else if (fields[i].type == Date) {
    //             let $readItem = $(`<p>${fields[i].label}: no item</p>`).appendTo($readParent);
    //             $readItems.push($readItem);

    //             let $editItem = $(`<input type="datetime-local" value="${fields[i].placeholder}">`).appendTo($editParent);
    //             $editItems.push($editItem);
    //         }
    //         else if (fields[i].type == Boolean) {
    //             let $readItem = $(`<p>${fields[i].label}: no item</p>`).appendTo($readParent);
    //             $readItems.push($readItem);

    //             let $editItem = $(`<input type="checkbox" checked="${fields[i].placeholder}">`).appendTo($editParent);
    //             $editItems.push($editItem);
    //         }
    //     }
    // }

    load = () => {
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
}

class FiltersBox extends ViewBox {
    constructor(fields, onFilterChange) {
        super();
        this.filter = "";
        this.onFilterChange = onFilterChange;
    }

    render = () => {
        if (this.nested) this.$div = $(`<div class="filters nested"></div>`);
        else this.$div = $(`<div class="filters"></div>`);
        
        this.$search = $(`<input type="text" placeholder="search">`).appendTo(this.$div);
        this.$search.on("input", (e) => { return this.setFilter(e.currentTarget.value); });
        
        return this.$div;
    }

    setFilter = (filter) => {
        this.filter = filter;
        this.onFilterChange();
    }

    getFilter = () => {
        return this.filter.toLowerCase();
    }
}

class Browser {
    constructor(id, fields, onSave = null) {
        this.id = id;
        this.items = [];
        this.filter = "";
        this.selected = -1;
        this.fields = fields;
        this.onSave = onSave;

        this.readBox = new ReadBox(this.fields);
        this.editBox = new EditBox(this.fields);
        this.filtersBox = new FiltersBox(this.fields, this.renderSearchResults);

        this.render();
    }

    static field(type = Number, label = "", placeholder = "0") {
        return {
            type,
            label,
            placeholder
        };
    }

    render = () => {
        this.$div = $(`.browser#${this.id}`);

        this.$searchBox = $(`<div class="search"></div>`).appendTo(this.$div);
        this.$toFilter = $(`<button class="filter-toggle">Filter</button>`).appendTo(this.$div);
        this.$toFilter.click(this.toggleFilters);
        this.$searchList = $(`<ul class="selector"></ul>`).appendTo($(`<section></section>`).appendTo(this.$searchBox));

        this.readBox.render().appendTo(this.$div);

        this.$toEdit = $(`<button class="edit">Edit</button>`).appendTo(this.$div);
        this.$toEdit.click(this.edit);
        this.$create = $(`<button class="create">+</button>`).appendTo(this.$div);
        this.$create.click(this.create);

        let $edit = this.editBox.render();
        this.editBox.hide();
        $edit.appendTo(this.$div);

        this.$delete = $(`<button class="delete invisible">Delete</button>`).appendTo(this.$div);
        this.$delete.click(this.delete);
        this.$save = $(`<button class="save invisible">Save</button>`).appendTo(this.$div);
        this.$save.click(this.save);
        this.$cancel = $(`<button class="cancel invisible">Cancel</button>`).appendTo(this.$div);
        this.$cancel.click(this.cancel);

        let $filters = this.filtersBox.render().appendTo(this.$div);
        this.filtersBox.hide();
        $filters.appendTo(this.$div);
    }

    renderSearchResults = () => {
        this.$searchList.empty();

        for (let i = 0; i < this.items.length; i++) {
            let label = this.items[i].name || this.items[i].title || this.items[i].header || this.items[i].whenSearched || Object.values(this.items[i])[0];
            if (label.toLowerCase().includes(this.filtersBox.getFilter())) {
                let $result = $(`<li id="${i}">${label}</li>`).appendTo(this.$searchList);
                $result.on("click", () => { this.select(i); });
            }
        };
        if (this.items.length < 1) {
            this.$searchList.append(`<p>No Items</p>`);
        }
    }

    load = (res) => {
        this.items = res;
        this.renderSearchResults();
    }

    save = async () => {
        let newItem = this.editBox.save();

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

    read = () => {
        this.cancel();

        let item = null;
        if (this.selected > -1 && this.selected < this.items.length) item = this.items[this.selected];
        this.readBox.load(item);
    }

    edit = () => {
        this.readBox.hide();
        this.$toEdit.addClass("invisible");
        this.$create.addClass("invisible");

        this.editBox.show();
        this.$cancel.removeClass("invisible");
        this.$save.removeClass("invisible");
        this.$delete.removeClass("invisible");

        let item = null;
        if (this.selected > -1 && this.selected < this.items.length) item = this.items[this.selected];
        this.editBox.load(item);
    }

    toggleFilters = () => {
        this.filters.toggle();
    }

    cancel = () => {
        this.editBox.show();
        this.$cancel.addClass("invisible");
        this.$save.addClass("invisible");
        this.$delete.addClass("invisible");

        this.readBox.hide();
        this.$toEdit.removeClass("invisible");
        this.$create.removeClass("invisible");
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