class NBField {
    constructor(settings, children) {
        this.settings = {
            name: "default",
            label: "",
            placeholder: "",
            multiple: false,
            lockLength: false,
            readOnly: false,
            hidden: false,
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
        if (!this.fields.settings.hidden) {
            if (this.nested) {
                if (this.fields.settings.multiple) this.$div = $(`<div class="read nested multiple ${this.fields.settings.name}"></div>`);
                else this.$div = $(`<div class="read nested ${this.fields.settings.name}"></div>`);
            }
            else this.$div = $(`<div class="read ${this.fields.settings.name}"></div>`);

            this.renderHeader();

            this.load(null);

            return this.$div;
        }
        else return null;
    }

    renderHeader = () => {
        let mods = "";
        if (this.fields.children === "long-string") mods += "long-string ";
        if (this.fields.children === "image") mods += "image ";

        if (this.fields.settings.label) {
            if (this.nested) {
                if (this.multiple) this.$header = $(`<h5 class="${mods}${this.fields.settings.name}">${this.fields.settings.label}</h5>`).appendTo(this.$div);
                else this.$header = $(`<h6 class="${mods}${this.fields.settings.name}">${this.fields.settings.label}</h6>`).appendTo(this.$div);
            } 
            else this.$header = $(`<h4 class="${mods}${this.fields.settings.name}">${this.fields.settings.label}</h4>`).appendTo(this.$div);
        }
    }

    static renderFieldTo = function renderFieldTo(field, $parent = this.$div, item = null) {
        let $rendered = null;

        if (field.children === "image") {
            if (item) $rendered = $(`<img class="image ${field.settings.name}" src="${item}">`).appendTo($parent);
            else $rendered = $(`<img class="image ${field.settings.name}" src="${field.settings.placeholder}">`).appendTo($parent);
        }
        else if (field.children === "date-time") {
            if (item) $rendered = $(`<time class="${field.settings.name}" datetime="${item}">${(new Date(item)).toLocaleString()}</time>`).appendTo($parent);
            else $rendered = $(`<time class="${field.settings.name}"></time>`).appendTo($parent);
        }
        else if (field.children === "date") {
            if (item) $rendered = $(`<time class="${field.settings.name}" datetime="${item}">${(new Date(item)).toLocaleDateString()}</time>`).appendTo($parent);
            else $rendered = $(`<time class="${field.settings.name}"></time>`).appendTo($parent);
        }
        else if (field.children === "time") {
            if (item) $rendered = $(`<time class="${field.settings.name}">${(new Date(item)).toLocaleTimeString()}</time>`).appendTo($parent);
            else $rendered = $(`<time class="${field.settings.name}"></time>`).appendTo($parent);
        }
        else if (field.children === "number") {
            if (item) $rendered = $(`<p class="${field.settings.name}">${item}</p>`).appendTo($parent);
            else $rendered = $(`<p class="${field.settings.name}"></p>`).appendTo($parent);
        }
        else if (field.children === "boolean") {
            $rendered = $(`<p class="${field.settings.name}">${item}</p>`).appendTo($parent);
        }
        else if (field.children === "long-string") {
            if (item) $rendered = $(`<p class="long-string ${field.settings.name}">${item.replace(/(?:\r\n|\r|\n)/g, '<br />')}</p>`).appendTo($parent);
            else $rendered = $(`<p class="long-string ${field.settings.name}"></p>`).appendTo($parent);
        }
        else {
            //console.log(item, $parent);
            if (item) $rendered = $(`<p class="${field.settings.name}">${item.replace(/(?:\r\n|\r|\n)/g, '<br />')}</p>`).appendTo($parent);
            else $rendered = $(`<p class="${field.settings.name}"></p>`).appendTo($parent);
        }

        return $rendered;
    }

    load = (item = null) => {
        if (!this.fields.settings.hidden) {
            this.$div.empty();  
            this.renderHeader();

            if (item) {
                if (this.fields.settings.multiple && this.nested) {
                    if (Array.isArray(item)) for (let i = 0; i < item.length; i++) {
                        this.add(item[i]);
                    }
                }
                else this.set(item);
            }
            else ReadBox.renderFieldTo(this.fields, this.$div, item);
        }
    }

    add = (item = null) => {
        let $newLI = $(`<li id="${this.$items.length}"></li>`).appendTo(this.$div);

        if (Array.isArray(this.fields.children)) {
            for (let i = 0; i < this.fields.children.length; i++) {
                let toLoad = null;
                if (item) toLoad = item[this.fields.children[i].settings.name];

                let newBox = new ReadBox(this.fields.children[i], true);
                if (newBox) {
                    let $newBox = newBox.render();
                    if ($newBox) {
                        $newBox.appendTo($newLI);
                        newBox.load(toLoad);
                    }
                }
            }
        }
        else ReadBox.renderFieldTo(this.fields, $newLI, item);
    }

    set = (item) => {
        if (Array.isArray(this.fields.children)) {
            for (let i = 0; i < this.fields.children.length; i++) {
                let toLoad = null;
                if (item) toLoad = item[this.fields.children[i].settings.name];

                let newBox = new ReadBox(this.fields.children[i], true);
                if (newBox) {
                    let $newBox = newBox.render();
                    if ($newBox) {
                        $newBox.appendTo(this.$div);
                        newBox.load(toLoad);
                    }
                }
            }
        }
        else ReadBox.renderFieldTo(this.fields, this.$div, item);
    }
}

class EditBox extends ViewBox {
    constructor(fields, nested = false, loadOverride = null, extraData = null) {
        super(fields, nested);
        this.loadOverride = loadOverride;
        this.extraData = extraData;
    }

    render = () => {
        if (!this.fields.settings.hidden) {
            if (this.nested) {
                if (this.fields.settings.multiple) {
                    this.$div = $(`<div class="edit nested multiple  ${this.fields.settings.name}"></div>`);
                    this.$add = $(`<button>Add</button>`).appendTo(this.$div);
                    this.$add.click(this.add);
                }
                else this.$div = $(`<div class="edit nested ${this.fields.settings.name}"></div>`);
            }
            else this.$div = $(`<div class="edit  ${this.fields.settings.name}"></div>`);
    
            this.renderHeader();
    
            this.load(null);
    
            return this.$div;
        }
    }

    static renderFieldTo = function renderFieldTo(field, $parent = this.$div, item = null, $domCapture = this.$items) {
        if (field.settings.readOnly) {
            let $rendered = ReadBox.renderFieldTo(field, $parent, item);
            $domCapture.push($rendered);
        }
        else if (field.children === "number") {
            let $editItem = null;
            if (item) $editItem = $(`<input class="${field.settings.name}" type="number" step="any" value="${item}" placeholder="${field.settings.placeholder}">`).appendTo($parent);
            else $editItem = $(`<input class="${field.settings.name}" type="number" step="any" placeholder="${field.settings.placeholder}">`).appendTo($parent);
            $domCapture.push($editItem);
        }
        else if (field.children === "options") {            
            let $editItem = $(`<select class="${field.settings.name}" id="pet-select"></select>`).appendTo($parent);
            for (let i = 0; i < field.settings.options.length; i++) {
                $(`<option class="${field.settings.name}" value="${field.settings.options[i]}">${field.settings.options[i]}</option>`).appendTo($editItem);
            }
            if (item) $editItem.find(`option:contains("${item}")`).prop('selected', true);
            else $editItem.find(`option:contains("${field.settings.placeholder}")`).prop('selected', true);
            $domCapture.push($editItem);
        }
        else if (field.children === "boolean") {
            let $editItem = $(`<input class="${field.settings.name}" type="checkbox">`).appendTo($parent);
            if (item === null) $editItem.prop('checked', field.settings.placeholder);
            else $editItem.prop('checked', item);
             
            $domCapture.push($editItem);
        }
        else if (field.children === "date-time") {
            let date = new Date(item);
            let $editItem = null;
            if (item) {
                $editItem = $(`<input class="${field.settings.name}" type="datetime-local" value="${date}">`).appendTo($parent);
            }
            else {
                let placeholder = (new Date(field.settings.placeholder - (new Date()).getTimezoneOffset() * 60000).toISOString()).slice(0, -1);
                $editItem = $(`<input class="${field.settings.name}" type="datetime-local" value="${placeholder}">`).appendTo($parent);
            }
            $domCapture.push($editItem);
        }
        else if (field.children === "date") {
            let $editItem = null;
            if (item) {
                let date = new Date(item);
                let day = ("0" + date.getDate()).slice(-2);
                let month = ("0" + (date.getMonth() + 1)).slice(-2);
                let out = `${date.getFullYear()}-${month}-${day}`;
                $editItem = $(`<input class="${field.settings.name}" type="date" value="${out}">`).appendTo($parent);
            }
            else {
                let date = new Date(field.settings.placeholder);
                let day = ("0" + date.getDate()).slice(-2);
                let month = ("0" + (date.getMonth() + 1)).slice(-2);
                let placeholder = `${date.getFullYear()}-${month}-${day}`;
                $editItem = $(`<input class="${field.settings.name}" type="date" value="${placeholder}">`).appendTo($parent);
            }
            $domCapture.push($editItem);
        }
        else if (field.children === "time") {
            let $editItem = null;
            if (item) {
                let date = new Date(item);
                let hours = ("0" + date.getHours()).slice(-2);
                let minutes = ("0" + date.getMinutes()).slice(-2);
                let seconds = ("0" + date.getSeconds()).slice(-2);
                let out = `${hours}:${minutes}:${seconds}`;
                $editItem = $(`<input class="${field.settings.name}" type="time" value="${out}">`).appendTo($parent);
            }
            else {
                let date = new Date(field.settings.placeholder);
                let hours = ("0" + date.getHours()).slice(-2);
                let minutes = ("0" + date.getMinutes()).slice(-2);
                let seconds = ("0" + date.getSeconds()).slice(-2);
                let placeholder = `${hours}:${minutes}:${seconds}`;
                $editItem = $(`<input class="${field.settings.name}" type="time" value="${placeholder}">`).appendTo($parent);
            }
            $domCapture.push($editItem);
        }
        else if (field.children === "long-string") {
            let $editItem = null;
            if (item) $editItem = $(`<textarea class="${field.settings.name}" rows="4" placeholder="${field.settings.placeholder}">${item}</textarea>`).appendTo($parent);
            else $editItem = $(`<textarea class="${field.settings.name}" rows="4" placeholder="${field.settings.placeholder}"></textarea>`).appendTo($parent);
            $domCapture.push($editItem);
        }
        else {
            let $editItem = null;
            if (item) $editItem = $(`<input class="${field.settings.name}" type="text" placeholder="${field.settings.placeholder}" value="${item}">`).appendTo($parent);
            else $editItem = $(`<input class="${field.settings.name}" type="text" placeholder="${field.settings.placeholder}">`).appendTo($parent);
            $domCapture.push($editItem);
        }
    }

    renderHeader = () => {
        if (this.fields.settings.label) {
            if (this.nested) {
                if (this.multiple) this.$header = $(`<h6>${this.fields.settings.label}</h6>`).appendTo(this.$div);
                else this.$header = $(`<h6>${this.fields.settings.label}</h6>`).appendTo(this.$div);
            } 
            else this.$header = $(`<h4>${this.fields.settings.label}</h4>`).appendTo(this.$div);
        }
    }

    save = () => {
        let toGo = [];

        if (!this.fields.settings.hidden && !this.fields.settings.readOnly) {
            if (this.fields.settings.multiple && this.nested) {
                for (let i = 0; i < this.$items.length; i++) {
                    if (this.$items[i]) {
                        let og = null;
                        if (this.item && this.item[i]) og = this.item[i]; 
                        let saved = this.saveFields(this.$items[i], og);
                        toGo.push(saved);
                    }
                }
            }
            else toGo = this.saveFields();
        }
        else toGo = this.item;

        return toGo;
    }

    saveFields = ($items = this.$items, originalItem = null) => {
        let toGo = {};

        if (Array.isArray(this.fields.children)) {
            let offset = 0;

            for (let i = 0; i < this.fields.children.length; i++) {
                if (!this.fields.children[i].settings.hidden && !this.fields.children[i].settings.readOnly) {
                    let saved = $items[i - offset].save();
                    toGo[this.fields.children[i].settings.name] = saved;
                }
                else {
                    if (originalItem[this.fields.children[i].settings.name]) {
                        toGo[this.fields.children[i].settings.name] = originalItem[this.fields.children[i].settings.name];
                    }
                    else toGo[this.fields.children[i].settings.name] = null;
                    if (this.fields.children[i].settings.hidden) offset++;
                }
            }
        }
        else toGo = this.saveField(this.fields.children, $items[0]);   

        return toGo;
    }

    saveField = (field, $input) => {
        if (field == "string") {
            return $input.val();
        }
        else if (field === "options") {
            return $input.val();
        }
        else if (field == "long-string") {
            return $input.val();
        }
        else if (field == "number") {
            return parseFloat($input.val());
        }
        else if (field == "image") {
            return $input.val();
        }
        else if (field == "date-time") {
            return new Date($input.val()).getTime();
        }
        else if (field == "date") {
            let date = $input.val().split("-");
            return new Date(date[0], date[1] - 1, date[2]).getTime();
        }
        else if (field == "time") {
            let time = $input.val().split(" ")[0].split(":");
            let date = new Date();
            date.setHours(time[0]);
            date.setMinutes(time[1]);
            date.setSeconds(time[2]);
            return date.getTime();
        }
        else if (field == "boolean") {
            return $input.prop("checked") ? true : false;
        }
    }

    load = (item = null) => {
        this.$div.empty();
        this.$items = [];
        this.item = item;

        if (!this.fields.settings.hidden) {
            if (this.loadOverride) this.loadOverride(item);
            else {
                this.renderHeader();
        
                if (this.fields.settings.multiple && this.nested) {
                    if (!this.fields.settings.lockLength) {
                        this.$add = $(`<button>Add</button>`).appendTo(this.$div);
                        this.$add.click(() => { this.add(); });
                    }
        
                    if (Array.isArray(item)) {
                        for (let i = 0; i < item.length; i++) {
                            this.add(item[i]);
                        }
                    }
        
                    if (!this.fields.settings.lockLength && this.$items.length < 1) this.add();
                }
                else this.set(item);
            }
        }
    }

    add = (item = null) => {
        this.$items.push([]);
        let $domCapture = this.$items[this.$items.length - 1];
        let $newLI = $(`<li class="${this.fields.settings.name}" id="${this.$items.length - 1}"></li>`).appendTo(this.$div);

        if (Array.isArray(this.fields.children)) {
            for (let i = 0; i < this.fields.children.length; i++) {
                let toLoad = null;
                if (item) toLoad = item[this.fields.children[i].settings.name];

                let newBox = new EditBox(this.fields.children[i], true, this.loadOverride);
                if (newBox) {
                    let $newBox = newBox.render();
                    if ($newBox) {
                        $newBox.appendTo($newLI);
                        newBox.load(toLoad);
                        $domCapture.push(newBox);
                    }
                }
            }
        }
        else EditBox.renderFieldTo(this.fields, $newLI, item, $domCapture);

        if (!this.fields.settings.lockLength) {
            let $remove = $(`<button class="remove">X</button>`).appendTo($newLI);
            let which = this.$items.length - 1;
            $remove.click(() => { this.remove(which); });
        }
    }

    set = (item) => {
        if (Array.isArray(this.fields.children)) {
            for (let i = 0; i < this.fields.children.length; i++) {
                let toLoad = null;
                if (item) toLoad = item[this.fields.children[i].settings.name];

                let newBox = new EditBox(this.fields.children[i], true, this.loadOverride);
                if (newBox) {
                    let $newBox = newBox.render();
                    if ($newBox) {
                        $newBox.appendTo(this.$div);
                        newBox.load(toLoad);
                        this.$items.push(newBox);
                    }
                }
            }
        }
        else EditBox.renderFieldTo(this.fields, this.$div, item, this.$items);
    }

    remove = (which) => {
        this.$div.find(`#${which}`).remove();
        this.$items[which] = null;
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
    constructor(id, fields, editable = true, onSave = null, otherSettings) {
        this.id = id;
        this.items = [];
        this.filter = "";
        this.selected = -1;
        this.fields = fields;
        this.onSave = onSave;
        this.mode = "single";
        this.editable = editable;
        this.otherSettings = {
            onSaveRoute: null,
            onRefresh: null,
            onSaveOne: null,
            onDeleteOne: null,
            editBoxLoadOverride: null,
            disableCreate: false,
            disableSave: false,
            disableDelete: false,
            ...otherSettings
        };

        this.readBox = new ReadBox(this.fields);
        this.editBox = new EditBox(this.fields, false, this.otherSettings.editBoxLoadOverride);
        this.filtersBox = new FiltersBox(this.fields, this.renderSearchResults);

        this.render();

        if (!Browser.styled) {
            $("head").append(`<link href='/styles/browser.css' rel='stylesheet' />`);
            Browser.styled = true;
        }
    }

    static styled = false;

    render = () => {
        this.$div = $(`.browser#${this.id}`);

        if (this.fields.settings.multiple) {
            this.$searchBox = $(`<div class="search"></div>`).appendTo(this.$div);
            this.$toFilter = $(`<button class="filter-toggle">Filter</button>`).appendTo(this.$div);
            this.$toFilter.click(this.toggleFilters);
            this.$searchList = $(`<ul class="selector"></ul>`).appendTo(this.$searchBox);

            if (!this.otherSettings.disableCreate && this.editable) {
                this.$create = $(`<button class="create">+</button>`).appendTo(this.$div);
                this.$create.click(this.create);
            }

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
    
            if (!this.otherSettings.disableSave) {
                this.$save = $(`<button class="save invisible">Save</button>`).appendTo(this.$div);
                this.$save.click(this.save);
            }
            this.$cancel = $(`<button class="cancel invisible">Cancel</button>`).appendTo(this.$div);
            this.$cancel.click(this.cancel);  

            if (this.fields.settings.multiple && !this.otherSettings.disableDelete) {
                this.$delete = $(`<button class="delete invisible">Delete</button>`).appendTo(this.$div);
                this.$delete.click(this.delete);
            }
        }

        this.$alert = $(`<p id="alert"></p>`).appendTo(this.$div);
        this.$hideAlert = $(`<button id="hide">X</button>`).appendTo(this.$alert);
        this.$hideAlert.click(this.hideAlert);
        this.hideAlert();
    }

    renderSearchResults = () => {
        this.$searchList.empty();

        for (let i = 0; i < this.items.length; i++) {
            let label = this.items[i].name || this.items[i].title || this.items[i].header || this.items[i].whenSearched || Object.values(this.items[i])[0];

            if (label?.toLowerCase) {
                if (label.toLowerCase().includes(this.filtersBox.getFilter())) {
                    let $result = $(`<li id="${i}">${label}</li>`).appendTo(this.$searchList);
                    $result.on("click", (e) => { 
                        this.select(i);
                    });
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

    load = (items) => {
        this.items = items;

        if (this.fields.settings.multiple && !Array.isArray(this.items)) {
            this.items = [];
            console.log("items overridden due to multiple");
        }

        if (this.otherSettings.onRefresh) {
            this.otherSettings.onRefresh(this.items);
        }

        if (this.fields.settings.multiple) this.renderSearchResults();
        else this.read();
    }

    save = async () => {
        let newItem = this.editBox.save();

        if (this.fields.settings.multiple) {
            if (this.selected < 0) {
                this.selected = this.items.length;
                this.items.push(newItem);
            }
            else this.items[this.selected] = {
                ...this.items[this.selected],
                ...newItem
            };
            newItem = this.items[this.selected];
        }
        else {
            this.items = {
                ...this.items,
                ...newItem
            };
            newItem = this.items;
        }
        
        if (this.onSave) {
            let toGo = {
                id: this.id,
                items: this.items
            };
            if (this.otherSettings.onSaveRoute) toGo.route = this.otherSettings.onSaveRoute;
            
            await base.do(this.onSave, toGo);
        }
        else if (this.otherSettings.onSaveOne) {
            let toGo = {
                id: this.id,
                item: newItem
            };
            if (this.otherSettings.onSaveRoute) toGo.route = this.otherSettings.onSaveRoute;
            
            await base.do(this.otherSettings.onSaveOne, toGo);
        }

        if (this.otherSettings.onRefresh) {
            this.otherSettings.onRefresh(this.items);
        }
        
        this.cancel();
        this.renderSearchResults();
        this.select(this.selected);
    }

    read = () => {
        this.cancel();

        if (this.fields.settings.multiple) {
            let item = null;
            if (this.selected > -1 && this.selected < this.items.length) item = this.items[this.selected];
            this.readBox.load(item);
        }
        else this.readBox.load(this.items);
    }

    edit = () => {
        this.readBox.hide();
        this.$toEdit.addClass("invisible");
        if (!this.otherSettings.disableCreate) this.$create.addClass("invisible");

        this.editBox.show();
        this.$cancel.removeClass("invisible");
        if (!this.otherSettings.disableSave) this.$save.removeClass("invisible");
        if (!this.otherSettings.disableDelete) this.$delete.removeClass("invisible");

        if (this.fields.settings.multiple) {
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
            if (!this.otherSettings.disableSave) this.$save.addClass("invisible");
            if (!this.otherSettings.disableDelete) this.$delete.addClass("invisible");
            this.$toEdit.removeClass("invisible");
            if (!this.otherSettings.disableCreate) this.$create.removeClass("invisible");
        }

        this.readBox.show();
    }

    delete = async () => {
        if (this.selected > -1 && this.selected < this.items.length) {
            let deleted = this.items.splice(this.selected, 1)[0];
    
            if (this.onSave) {
                let toGo = {
                    id: this.id,
                    items: this.items
                };
                if (this.otherSettings.onSaveRoute) toGo.route = this.otherSettings.onSaveRoute;
                await base.do(this.onSave, toGo);
            }
            else if (this.otherSettings.onDeleteOne) {
                let toGo = {
                    id: this.id,
                    item: deleted
                };
                if (this.otherSettings.onSaveRoute) toGo.route = this.otherSettings.onSaveRoute;
                await base.do(this.otherSettings.onDeleteOne, toGo);
            }
        }

        if (this.otherSettings.onRefresh) {
            this.otherSettings.onRefresh(this.items);
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
            if (which >= $searchResults.length) which = $searchResults.length;
            if ($searchResults.length > 1) $($searchResults[which]).addClass("selected");
            else $searchResults.addClass("selected");
        }
        
        this.read();
    }

    getSelectedItem = () => {
        return this.items[this.selected];
    }

    alert = (msg) => {
        this.$alert.text(msg);
        this.$hideAlert = $(`<button id="hide">X</button>`).appendTo(this.$alert);
        this.$hideAlert.click(this.hideAlert);
        this.$alert.removeClass("invisible");
    }

    hideAlert = () => {
        this.$alert.addClass("invisible");
        this.$alert.text("");
    }
}