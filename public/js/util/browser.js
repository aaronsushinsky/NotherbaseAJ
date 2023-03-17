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

        this.$div = $(`.browser#${id}`);

        this.$searchBox = $(`<div class="search"></div>`).appendTo(this.$div);
        this.$search = $(`<input type="text" placeholder="search">`).appendTo(this.$searchBox);
        this.$search.on("input", (e) => {
            return this.setFilter(e.currentTarget.value);
        });
        this.$searchList = $(`<ul class="selector"></ul>`).appendTo(this.$searchBox);

        this.$read = {
            div: $(`<div class="read"></div>`).appendTo(this.$div)
        };

        this.$edit = {
            div: $(`<div class="edit invisible"></div>`).appendTo(this.$div)
        };
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

    checkIfTextField($div) {
        return ($div.is("h1") || $div.is("h2") || $div.is("h3") || $div.is("h4") ||
            $div.is("h5") || $div.is("h6") || $div.is("p") || $div.is("div"));
    }

    checkIfImageField($div) {
        return $div.is("img");
    }

    prefix(field, postfix) {
        if (this.prefixes[field]) return this.prefixes[field] + postfix;
        else return postfix;
    }

    read = async () => {
        this.cancel();

        if (this.selected > -1 && this.selected < this.items.length) {
            let item = this.items[this.selected];
            
            for (let i = 0; i < this.fields.length; i++) {
                let $div = this.$read[this.fields[i]];
                if (typeof item[this.fields[i]] == "array") {
                    for (let j = 0; j < item[this.fields[i]].length; j++) {
                        $ul.append(`<li>${this.prefix(this.fields[i], item[this.fields[i]])}</li>`);
                    }
                }
                else if (this.checkIfTextField($div)) $div.text(this.prefix(this.fields[i], item[this.fields[i]]));
                else if (this.checkIfImageField($div)) $div.attr("src", this.prefix(this.fields[i], item[this.fields[i]]));
            }
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
        this.$read.div.addClass("invisible");
        this.$edit.div.removeClass("invisible");

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
        this.$edit.div.addClass("invisible");
        this.$read.div.removeClass("invisible");
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

    new = () => {
        this.selected = -1;
        
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