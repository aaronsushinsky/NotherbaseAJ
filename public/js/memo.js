class Memo {
    constructor(service, divID, onLoad = null, onSave = null, onEdit = null) {
        this.service = service;
        this.$div = $(`.memo#${divID}`);
        this.onLoad = onLoad;
        this.onSave = onSave;
        this.onEdit = onEdit;
        this.lines = {};

        this.load();
    }

    edit() {

    }

    load = async () => {
        let loaded = await memories.load(`memo-${this.service}`);
        
        if (this.onLoad) this.onLoad(loaded);

        if (loaded) {
            let keys = Object.keys(loaded.lines);

            for (let i = 0; i < keys.length; i++) {
                this.$div.find(`#${keys[i]}`).val(loaded.lines[keys[i]]);
            }
        }
        else console.log("No save file loaded!");
    }

    save = async () => {
        this.lines = {};

        let $inputs = this.$div.find("input");

        for (let i = 0; i < $inputs.length; i++) {
            this.lines[$inputs[i].id] = $inputs[i].value;            
        }

        let $textAreas = this.$div.find("textarea");

        for (let i = 0; i < $textAreas.length; i++) {
            this.lines[$textAreas[i].id] = $textAreas[i].value;            
        }

        if (this.onSave) this.onSave(this.lines);

        let s = await memories.save(`memo-${this.service}`, {
            lines: this.lines
        });

        console.log(s);
    }
}