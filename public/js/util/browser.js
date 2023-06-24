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

        let keys = Object.keys(this.fields);

        for (let i = 0; i < keys.length; i++) {
            let field = this.fields[keys[i]];

            if (Array.isArray(field)) {
                let newBox = new ReadBox(field[0], true);
                newBox.render().appendTo(this.$div);
                this.$items.push(newBox);
            }
            else if (field.type == "image") {
                let $newItem = $(`<img src="${field.placeholder}">`).appendTo(this.$div);
                this.$items.push($newItem);
            }
            else {
                let $newItem = $(`<p>${field.label}: no item</p>`).appendTo(this.$div);
                this.$items.push($newItem);
            }
        }

        return this.$div;
    }

    render = () => {
        if (this.nested) {
            this.$div = $(`<div class="read nested"></div>`);
        }
        else {
            this.$div = $(`<div class="edit"></div>`);
            this.renderFieldsTo(this.$div, this.$items)
        }

        return this.$div;
    }

    renderFieldsTo = ($parent, $items) => {
        let keys = Object.keys(this.fields);

        for (let i = 0; i < keys.length; i++) {
            let field = this.fields[keys[i]];

            if (Array.isArray(field)) {
                let newBox = new ReadBox(field[0], true);
                newBox.render().appendTo($parent);
                $items.push(newBox);
            }
            else if (field.type === "image") {
                let $newItem = $(`<img src="${field.placeholder}">`).appendTo($parent);
                $items.push($newItem);
            }
            else {
                let $newItem = $(`<p>${field.label}: no item</p>`).appendTo($parent);
                $items.push($editItem);
            }
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

    load = (item) => {
        if (this.nested) {
            for (let i = 0; i < this.$items.length; i++) {
                this.loadFieldsTo(item[i], this.$items[i]);
            }
        }
        else {
            this.loadFieldsTo(item, this.$items);
        }
    }

    loadFieldsTo = (item, $inputs) => {
        let keys = Object.keys(this.fields);
    
        for (let i = 0; i < keys.length; i++) {
            let field = this.fields[keys[i]];
            let toLoad = null;
            if (item) toLoad = item[keys[i]];

            if (Array.isArray(field)) {
                $inputs[i].load(toLoad);
            }
            else if (field.type == "image") {
                $inputs[i].val(toLoad);
            }
            else if (field.type == "date") {
                $inputs[i].val(toLoad);
            }
            else if (field.type == "boolean") {
                $inputs[i].prop("checked", toLoad);
            }
            else {
                console.log($inputs[i]);
                if (toLoad) $inputs[i].text(`${field.label}: ${toLoad.replace(/(?:\r\n|\r|\n)/g, '<br />')}`);
                else $inputs[i].text(`${field.label}: no item`);
            }
        }
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
            this.add();
        }
        else {
            this.$div = $(`<div class="edit"></div>`);
            this.renderFieldsTo(this.$div, this.$items)
        }

        return this.$div;
    }

    renderFieldsTo = ($parent, $items) => {
        let keys = Object.keys(this.fields);

        for (let i = 0; i < keys.length; i++) {
            let field = this.fields[keys[i]];

            if (Array.isArray(field)) {
                let newBox = new EditBox(field[0], true);
                newBox.render().appendTo($parent);
                $items.push(newBox);
            }
            else if (field.type === "number") {
                let $editItem = $(`<input type="number" placeholder="${field.placeholder}">`).appendTo($parent);
                $items.push($editItem);
            }
            else {
                let $editItem = $(`<input type="text" placeholder="${field.placeholder}">`).appendTo($parent);
                $items.push($editItem);
            }
        }
    }

    save = () => {
        if (this.nested) {
            let toGo = [];
            for (let i = 0; i < this.$items.length; i++) {
                toGo.push(this.saveFields(this.$items[i]));
            }

            return toGo;
        }
        else {
            console.log(this.saveFields(this.$items));
            return this.saveFields(this.$items);
        }
    }

    saveFields = ($inputs) => {
        let toGo = {};
        let keys = Object.keys(this.fields);
    
        for (let i = 0; i < keys.length; i++) {
            let field = this.fields[keys[i]];

            if (Array.isArray(field)) {
                toGo[keys[i]] = $inputs[i].save();
            }
            else if (field.type == "string") {
                toGo[keys[i]] = $inputs[i].val();
            }
            else if (field.type == "number") {
                toGo[keys[i]] = $inputs[i].val();
            }
            else if (field.type == "image") {
                toGo[keys[i]] = $inputs[i].val();
            }
            else if (field.type == "date") {
                toGo[keys[i]] = $inputs[i].val();
            }
            else if (field.type == "boolean") {
                toGo[keys[i]] = $inputs[i].prop("checked");
            }
        }

        return toGo;
    }

    load = (item) => {
        if (this.nested) {
            for (let i = 0; i < this.$items.length; i++) {
                this.loadFieldsTo(item[i], this.$items[i]);
            }
        }
        else {
            this.loadFieldsTo(item, this.$items);
        }
    }

    loadFieldsTo = (item, $inputs) => {
        let keys = Object.keys(this.fields);
    
        for (let i = 0; i < keys.length; i++) {
            let field = this.fields[keys[i]];
            let toLoad = null;
            if (item) toLoad = item[keys[i]];

            if (Array.isArray(field.type)) {
                $inputs[i].load(toLoad);
            }
            else if (field.type == "string") {
                $inputs[i].val(toLoad);
            }
            else if (field.type == "image") {
                $inputs[i].val(toLoad);
            }
            else if (field.type == "date") {
                $inputs[i].val(toLoad);
            }
            else if (field.type == "boolean") {
                $inputs[i].prop("checked", toLoad);
            }
        }
    }

    add = () => {
        let $newLI = $(`<li></li>`).appendTo(this.$div);
        this.$items.push([]);

        this.renderFieldsTo($newLI, this.$items[this.$items.length - 1]);

        let $remove = $(`<button>X</button>`).appendTo($newLI);
        $remove.click(() => { this.remove($newLI); });
    }

    remove = ($which) => {
        $which.remove();
        this.$lis.splice(this.$lis.findIndex((e) => { return e === $which; }));
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

        if (Array.isArray(this.fields)) {
            this.mode = "multiple";
            this.readBox = new ReadBox(this.fields[0]);
            this.editBox = new EditBox(this.fields[0]);
            this.filtersBox = new FiltersBox(this.fields[0], this.renderSearchResults);
        }
        else {
            this.readBox = new ReadBox(this.fields);
            this.editBox = new EditBox(this.fields);
            this.filtersBox = new FiltersBox(this.fields, this.renderSearchResults);
        }


        this.render();
    }

    static str(label = "", placeholder = "") {
        return {
            type: "string",
            label,
            placeholder
        };
    }

    static img(label = "", placeholder = "") {
        return {
            type: "image",
            label,
            placeholder
        };
    }

    static num(label = "", placeholder = "0") {
        return {
            type: "number",
            label,
            placeholder
        };
    }

    render = () => {
        this.$div = $(`.browser#${this.id}`);

        if (this.mode === "multiple") {
            this.$searchBox = $(`<div class="search"></div>`).appendTo(this.$div);
            this.$toFilter = $(`<button class="filter-toggle">Filter</button>`).appendTo(this.$div);
            this.$toFilter.click(this.toggleFilters);
            this.$searchList = $(`<ul class="selector"></ul>`).appendTo($(`<section></section>`).appendTo(this.$searchBox));

            this.$create = $(`<button class="create">+</button>`).appendTo(this.$div);
            this.$create.click(this.create);

            this.$delete = $(`<button class="delete invisible">Delete</button>`).appendTo(this.$div);
            this.$delete.click(this.delete);

            let $filters = this.filtersBox.render().appendTo(this.$div);
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
        }
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
        if (this.mode === "multiple") {
            if (!Array.isArray(res)) {
                this.items = [];
                console.log("Overriding due to multiple");
            }
        }
        this.renderSearchResults();
    }

    save = async () => {
        let newItem = this.editBox.save();

        if (this.mode === "multiple") {
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

        if ("multiple") {
            let item = null;
            if (this.selected > -1 && this.selected < this.items.length) item = this.items[this.selected];
            this.editBox.load(item);
        }
        else this.editBox.load(this.items);
    }

    toggleFilters = () => {
        this.filters.toggle();
    }

    cancel = () => {
        if ("editable") {
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
        console.log("sgr");
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