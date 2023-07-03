class NBField {
    constructor(settings, children) {
        this.settings = {
            name: "default",
            label: "",
            placeholder: "",
            multiple: false,
            ...settings
        }

        this.children = children;
    }
}

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

        if (this.fields.settings.label) this.$header = $(`<h5>${this.fields.settings.label}</h5>`).appendTo(this.$div);

        this.load(null);

        return this.$div;
    }

    renderFieldTo = (field, $parent = this.$div, item = null) => {
        if (field.children === "image") {
            if (item) $(`<img src="${item}">`).appendTo($parent);
            else $(`<img src="${field.settings.placeholder}">`).appendTo($parent);
        }
        else {
            if (item) $(`<p>${item.replace(/(?:\r\n|\r|\n)/g, '<br />')}</p>`).appendTo($parent);
            else $(`<p>${field.settings.placeholder}</p>`).appendTo($parent);
        }
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

    load = (item = null) => {
        this.$div.empty();
        if (this.fields.settings.label) this.$header = $(`<h5>${this.fields.settings.label}</h5>`).appendTo(this.$div);

        if (item) {
            for (let i = 0; i < this.fields.children.length; i++) {
                if (this.fields.children[i] instanceof NBField) {
                    let toLoad = null;
                    if (item) toLoad = item[this.fields.children[i].name];
    
                    let newBox = new ReadBox(this.fields.children[i], true);
                    newBox.render().appendTo(this.$div);
                    newBox.load(toLoad);
                }
                else this.renderFieldTo(this.fields, this.$div, item);
            }
        }
        else $(`<p>${this.fields.settings.placeholder}</p>`).appendTo(this.$div);
    }
}

class EditBox extends ViewBox {
    constructor(fields, nested = false) {
        super(fields, nested);
    }

    render = () => {
        if (this.nested) {
            this.$div = $(`<div class="edit nested"></div>`);
            this.$add = $(`<button>Add</button>`).appendTo(this.$div);
            this.$add.click(this.add);
        }
        else this.$div = $(`<div class="edit"></div>`);

        if (this.fields.settings.label) this.$header = $(`<h5>${this.fields.settings.label}</h5>`).appendTo(this.$div);

        this.load(null);

        return this.$div;
    }

    renderFieldTo = (field, $parent = this.$div, item = null, $domCapture = this.$items) => {
        if (field.children === "number") {
            let $editItem = null;
            if (item) $editItem = $(`<input type="number" value="${item}" placeholder="${field.settings.placeholder}">`).appendTo($parent);
            else $editItem = $(`<input type="number" placeholder="${field.settings.placeholder}">`).appendTo($parent);
            $domCapture.push($editItem);
        }
        else {
            let $editItem = null;
            if (item) $editItem = $(`<input type="text" placeholder="${field.settings.placeholder}" value="${item}">`).appendTo($parent);
            else $editItem = $(`<input type="text" placeholder="${field.settings.placeholder}">`).appendTo($parent);
            $domCapture.push($editItem);
        }
    }

    save = () => {
        let toGo = {};

        for (let i = 0; i < this.fields.children.length; i++) {
            if (this.fields.children[i] instanceof NBField) {
                toGo[this.fields.children[i].name] = this.$items[i].save();
            }
            else toGo[this.fields.children[i]] = this.saveField(this.fields.children[i], this.$items[i])
        }

        return toGo;
    }

    saveField = (field, $input) => {
        if (field == "string") {
            return $input.val();
        }
        else if (field == "number") {
            return $input.val();
        }
        else if (field == "image") {
            return $input.val();
        }
        else if (field == "date") {
            return $input.val();
        }
        else if (field == "boolean") {
            return $input.prop("checked");
        }
    }

    load = (item = null) => {
        this.$div.empty();
        this.$items = [];

        if (this.fields.settings.label) this.$header = $(`<h5>${this.fields.settings.label}</h5>`).appendTo(this.$div);
        
        if (this.nested && this.fields.settings.multiple) {
            this.$add = $(`<button>Add</button>`).appendTo(this.$div);
            this.$add.click(() => {
                this.add();
            });
        }

        if (this.fields.settings.multiple) {
            if (Array.isArray(item)) for (let i = 0; i < item.length; i++) {
                this.add(item[i]);
            }

            this.add();
        }
        else this.add(item);
    }

    add = (item = null) => {
        let $parent = this.$div;
        let $domCapture = this.$items;

        if (this.nested && this.multiple) {
            this.$items.push([]);
            $domCapture = this.$items[this.$items.length - 1];
            let $newLI = $(`<li id="${this.$items.length - 1}"></li>`).appendTo(this.$div);
            $parent = $newLI;
        }

        for (let i = 0; i < this.fields.children.length; i++) {
            if (this.fields.children[i] instanceof NBField) {
                let toLoad = null;
                if (item) toLoad = item[this.fields.children[i].name];

                let newBox = new EditBox(this.fields.children[i], true);
                newBox.render().appendTo($parent);
                newBox.load(toLoad);
                $domCapture.push(newBox);
            }
            else this.renderFieldTo(this.fields, $parent, item, $domCapture);
        }

        if (this.nested && this.multiple) {
            let $remove = $(`<button>X</button>`).appendTo($parent);
            $remove.click(() => { this.remove(this.$items.length - 1); });
        }
    }

    remove = (which) => {
        this.$div.find(`#${which}`).remove();
        this.$items.splice(which, 1);
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
    constructor(id, fields, editable = true, onSave = null) {
        this.id = id;
        this.items = [];
        this.filter = "";
        this.selected = -1;
        this.fields = fields;
        this.onSave = onSave;
        this.mode = "single";
        this.editable = editable;

        this.multiple = this.fields.settings.multiple;

        this.readBox = new ReadBox(this.fields);
        this.editBox = new EditBox(this.fields);
        this.filtersBox = new FiltersBox(this.fields, this.renderSearchResults);

        this.render();
    }

    static str(placeholder = "") {
        return {
            type: "string",
            placeholder
        };
    }

    static img(placeholder = "") {
        return {
            type: "image",
            placeholder
        };
    }

    static num(placeholder = "0") {
        return {
            type: "number",
            placeholder
        };
    }

    static field(label, fields, placeholder) {
        return {
            label,
            fields,
            placeholder
        }
    }

    render = () => {
        this.$div = $(`.browser#${this.id}`);

        if (this.multiple) {
            this.$searchBox = $(`<div class="search"></div>`).appendTo(this.$div);
            this.$toFilter = $(`<button class="filter-toggle">Filter</button>`).appendTo(this.$div);
            this.$toFilter.click(this.toggleFilters);
            this.$searchList = $(`<ul class="selector"></ul>`).appendTo($(`<section></section>`).appendTo(this.$searchBox));

            this.$create = $(`<button class="create">+</button>`).appendTo(this.$div);
            this.$create.click(this.create);

            let $filters = this.filtersBox.render();
            this.filtersBox.hide();
            $filters.appendTo(this.$div);
        }

        this.readBox.render().appendTo(this.$div);

        if (this.editable) {
            this.$toEdit = $(`<button class="edit">Edit</button>`).appendTo(this.$div);
            this.$toEdit.click(this.edit);
    
            let $edit = this.editBox.render();
            this.editBox.hide();
            $edit.appendTo(this.$div);
    
            this.$save = $(`<button class="save invisible">Save</button>`).appendTo(this.$div);
            this.$save.click(this.save);
            this.$cancel = $(`<button class="cancel invisible">Cancel</button>`).appendTo(this.$div);
            this.$cancel.click(this.cancel);  

            if (this.multiple) {
                this.$delete = $(`<button class="delete invisible">Delete</button>`).appendTo(this.$div);
                this.$delete.click(this.delete);
            }
        }

    }

    renderSearchResults = () => {
        this.$searchList.empty();

        for (let i = 0; i < this.items.length; i++) {
            let label = this.items[i].name || this.items[i].title || this.items[i].header || this.items[i].whenSearched || Object.values(this.items[i])[0];

            if (label?.toLowerCase) {
                if (label.toLowerCase().includes(this.filtersBox.getFilter())) {
                    let $result = $(`<li id="${i}">${label}</li>`).appendTo(this.$searchList);
                    $result.on("click", () => { this.select(i); });
                }
            }
            else {
                if (("Name Error").includes(this.filtersBox.getFilter())) {
                    let $result = $(`<li id="${i}">Name Error</li>`).appendTo(this.$searchList);
                    $result.on("click", () => { this.select(i); });
                }
            }
        };
        if (this.items.length < 1) {
            this.$searchList.append(`<p>No Items</p>`);
        }
    }

    load = (res) => {
        this.items = res;

        if (this.multiple) this.renderSearchResults();
        else this.read();
    }

    save = async () => {
        let newItem = this.editBox.save();

        console.log(newItem);

        if (this.multiple) {
            if (this.selected < 0) {
                this.selected = this.items.length;
                this.items.push(newItem);
            }
            else this.items[this.selected] = newItem;
        }
        else this.items = newItem;


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

        if (this.multiple) {
            let item = null;
            if (this.selected > -1 && this.selected < this.items.length) item = this.items[this.selected];
            this.readBox.load(item);
        }
        else this.readBox.load(this.items);
    }

    edit = () => {
        this.readBox.hide();
        this.$toEdit.addClass("invisible");
        this.$create.addClass("invisible");

        this.editBox.show();
        this.$cancel.removeClass("invisible");
        this.$save.removeClass("invisible");
        this.$delete.removeClass("invisible");

        if (this.multiple) {
            let item = null;
            if (this.selected > -1 && this.selected < this.items.length) item = this.items[this.selected];
            this.editBox.load(item);
        }
        else this.editBox.load(this.items);
    }

    toggleFilters = () => {
        this.filtersBox.toggle();
    }

    cancel = () => {
        if (this.editable) {
            this.editBox.hide();
            this.$cancel.addClass("invisible");
            this.$save.addClass("invisible");
            this.$delete.addClass("invisible");
            this.$toEdit.removeClass("invisible");
            this.$create.removeClass("invisible");
        }

        this.readBox.show();
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