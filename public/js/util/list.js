class ListItem {
    /* settings: {
        $template: override,
        onAdd: function,
        onEdit: function,
        onRemove: function,
        editOk: bool,
        removeOk: bool
    } */
    constructor(settings) {
        this.settings = settings;
        this.$div = null;
        if (!settings.$template) this.$template = $(`<li>New Item</li>`);
        else this.$template = settings.$template;
        
    }

    render = ($to) => {
        this.$div = this.$template.clone();
        if (removeOk) {
            this.$remove = $(`<button id="remove">X</button>`).appendTo(this.$div);
            this.$remove.click(this.remove);
        }
        $to.append(this.$div);
    }

    remove = () => {


        this.settings.onRemove();
    }
}

class List {
    /* settings: {
        onAdd: function,
        onEdit: function,
        onRemove: function,
        addOk: bool,
        removeOk: bool
    } */
    constructor(id = "", settings) {
        this.settings = settings;
        this.$div = $(`ul#${id}`);
        this.items = [];
    }

    add = (item) => {
        this.items.push(item);
        item.render(this.$div);
    }

    remove = () => {
        
    }

    render = ($to) => {
        this.$div = this.$template.clone();
        if (removeOk) {
            this.$remove = $(`<button id="remove">X</button>`).appendTo(this.$div);
            this.$remove.click(this.remove);
        }
        $to.append(this.$div);
    }

    getValues() {

    }
}